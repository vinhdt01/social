import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FirebaseAdminService } from '@services/firebase-admin.service';
 
@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    const idToken = authHeader.split('Bearer ')[1];
    console.log(idToken , 'idToken')
    if (!idToken) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decodedToken = await this.firebaseAdminService.verifyIdToken(idToken);
      req['user'] = decodedToken   // Gắn thông tin người dùng vào req.user với loại AuthUser
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}