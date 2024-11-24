import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Image, image => image.post)
  images: Image[];

  @OneToMany(() => Like, like => like.post)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}