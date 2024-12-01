import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field(() => User, { nullable: true }) // Liên kết với User, có thể null
  @ManyToOne(() => User, (user) => user.posts, { nullable: true })
  user: User;

  @Field(() => [String], { nullable: true }) // Danh sách hình ảnh, có thể null
  @Column('simple-array', { nullable: true })
  images: string[];

  @Field(() => [Like], { nullable: true }) // Liên kết với Like, có thể null
  @OneToMany(() => Like, (like) => like.post, { nullable: true })
  likes: Like[];

  @Field(() => [Comment], { nullable: true }) // Liên kết với Comment, có thể null
  @OneToMany(() => Comment, (comment) => comment.post, { nullable: true })
  comments: Comment[];
}