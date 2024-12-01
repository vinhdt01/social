import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Biến entity thành GraphQL Object Type
@Entity('likes')
export class Like {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { nullable: true }) // Cho phép postId là null
  @Column({ nullable: true })
  postId: number;

  @Field(() => User, { nullable: true }) // Quan hệ với User, cho phép null
  @ManyToOne(() => User, (user) => user.likes, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => Post, { nullable: true }) // Quan hệ với Post, cho phép null
  @ManyToOne(() => Post, (post) => post.likes, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
