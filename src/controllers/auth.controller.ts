import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseAdminService } from '../services/firebase-admin.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  @Post('google')
  async googleSignIn(@Body('idToken') idToken: string) {
    console.log('Received ID token:', idToken); // Log nhận được ID token
    try {
      const decodedToken = await this.firebaseAdminService.verifyIdToken(idToken);
      console.log('Decoded token:', decodedToken); // Log kết quả xác minh
      console.log(decodedToken.email, 'login successfully');
      return { uid: decodedToken.uid, email: decodedToken.email };
    } catch (error) {
      console.error('Error verifying ID token:', error);
      throw error;
    }
  }
}