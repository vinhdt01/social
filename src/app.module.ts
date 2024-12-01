import { Module , NestModule , MiddlewareConsumer , RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAdminService } from '@services/firebase-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import  { AuthModule } from '@modules/auth/auth.module'
import  { PostModule } from '@modules/post/post.module'
import { UserModule } from '@modules/user/user.module'
import { AuthorizationMiddleware } from '@middlewares/authorization.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

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
     CacheModule.register({
      isGlobal: true,
      store: redisStore,
      url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`,
      ttl: 200000,
      max: 100,
    }),  
    ConfigModule.forRoot(),
    AuthModule,
    PostModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService , FirebaseAdminService ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(
        { path: 'auth/(.*)', method: RequestMethod.ALL }, // Loại trừ tất cả GET bắt đầu bằng /auth/
        { path: 'public', method: RequestMethod.ALL },    // Loại trừ tất cả các phương thức của /public
      )
      .forRoutes('*');  
  }
}