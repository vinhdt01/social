import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from '@controllers/post/post.controller';
import { Post } from '@entities/post.entity';
import { User } from '@entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post , User])],
  controllers: [PostController],
})
export class PostModule {}