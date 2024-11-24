import { Module , NestModule , MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAdminService } from '@services/firebase-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import  { AuthModule } from '@modules/auth/auth.module'
import  { PostModule } from '@modules/post/post.module'

import { AuthorizationMiddleware } from '@middlewares/authorization.middleware';

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
    AuthModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService , FirebaseAdminService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude('auth/google') // Loại trừ route login
      .forRoutes('*'); // Áp dụng middleware cho tất cả các route trừ login
  }
}