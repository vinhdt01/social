import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Định nghĩa GraphQL Object Type
@Entity('comments') // Định nghĩa TypeORM Entity
export class Comment {
  @Field(() => Int) // Trường ID trong GraphQL
  @PrimaryGeneratedColumn()
  id: number;

  @Field() // Trường content trong GraphQL
  @Column()
  content: string;

  @Field(() => User) // Quan hệ với User
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => Post) // Quan hệ với Post
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
