import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  Post } from '@entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private PostRepository: Repository<Post>,
  ) {}

 

  async findAll(): Promise<Post[]> {
    return this.PostRepository.
    createQueryBuilder('post') // 'user' là alias cho bảng User
    .where('post.isActive = :isActive', { isActive: true })
    .orderBy('post.fullName', 'ASC') // Sắp xếp theo tên
    .getMany(); // Trả về danh sách người dùng
    ;
  }

  async findOne(id: number): Promise<Post> {
    return this.PostRepository.findOneBy({ id });
  }

 
}
