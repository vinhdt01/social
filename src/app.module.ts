import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAdminService } from '@services/firebase-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import  { AuthModule } from '@modules/auth/auth.module'
import { AuthController } from '@controllers/auth.controller'; // Import AuthController
 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-db',
      port: Number(process.env.DBMYSQL_DOCKER_PORT) ?? 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot(),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService , FirebaseAdminService],
})
export class AppModule {}
