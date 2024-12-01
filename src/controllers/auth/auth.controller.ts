import { Controller, Post, Body, Res } from '@nestjs/common';
import { FirebaseAdminService } from '@services/firebase-admin.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly firebaseAdminService: FirebaseAdminService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('google')
  async googleSignIn(@Body('idToken') idToken: string, @Res({ passthrough: true }) res: Response) {
    try {
      const decodedToken = await this.firebaseAdminService.verifyIdToken(idToken);
      let checkExistUser = await this.userRepository.findOne({ where: { email: decodedToken.email } });

      // Set cookie first
      res.cookie('token', decodedToken.uid, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      if (checkExistUser) {
        const { id, email, fullName } = checkExistUser;
        return {
          message: 'Login successful',
          token: decodedToken.uid,
          user: { id, email, fullName }
        };
      }

      const { user_id, name, email, picture } = decodedToken;
      const user = new User();
      user.user_id = user_id;
      user.fullName = name || '';
      user.email = email;
      user.provider = 'google';
      user.avatar = picture || '';
      user.isActive = true;

      const savedUser = await this.userRepository.save(user);
      
      return {
        message: 'Login successful',
        token: decodedToken.uid,
        user: {
          id: savedUser.id,
          email: savedUser.email,
          fullName: savedUser.fullName
        }
      };

    } catch (error) {
      console.error('Error verifying ID token:', error);
      return {
        message: 'Login Error',
        error: error.message
      };
    }
  }
}