import { Controller, Post, Body, Req , Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '@entities/post.entity';
import { User } from '@entities/user.entity';
import { Request } from 'express';
import { AuthUser } from '@interfaces/index';
@Injectable()

@Controller('posts')
export class PostController {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async createPost(@Body() createPostDto: { title: string; content: string }, @Req() req: Request & { user: AuthUser }) {
    const userId = req.user.user_id; // Lấy user_id từ request (giả sử đã được xác thực và gắn vào request)
    const user = await this.userRepository.findOne({ where: { user_id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const post = new PostEntity();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.user = user;

    await this.postRepository.save(post);

    return post;
  }
}