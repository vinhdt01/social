import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@services/ user.service';
import { UsersResolver } from './resolvers/user.resolver';
import { User } from '@entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forFeature([User]) , 
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/users-schema.gql'), // Tự động tạo schema
    playground: true,
    debug: true,
    path: '/graphql/users', // Endpoint riêng cho User
  }),

],
  providers: [UserService, UsersResolver],
  exports: [UserService], // Xuất UserService nếu cần sử dụng ở module khác

})
export class UserModule {}
