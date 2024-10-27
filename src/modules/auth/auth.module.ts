import { Module } from '@nestjs/common';
import { AuthController } from '@controllers/auth.controller';
import { FirebaseAdminModule } from '@modules/auth/firebase-admin.module';

@Module({
  imports: [FirebaseAdminModule],
  controllers: [AuthController],
})
export class AuthModule {}