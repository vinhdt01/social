import { Module } from '@nestjs/common';
import { AuthController } from '@controllers/auth/auth.controller';
import { FirebaseAdminModule } from '@modules/auth/firebase-admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';

@Module({
  imports: [FirebaseAdminModule ,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
})
export class AuthModule {}