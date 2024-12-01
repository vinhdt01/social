import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Add ObjectType decorator
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
   
  @Field(() => String)
  @Column()
  user_id: string;

  @Field(() => String)
  @Column()
  fullName: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  provider: string;

  @Field(() => String, { nullable: true })
  @Column({ default: true })
  avatar: string;
  
  @Field(() => Int)
  @Column({ default: 1 })
  permission: number; // Changed to lowercase number

  @Field(() => Boolean)
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [Post], { nullable: true }) 
  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @Field(() => [Like], { nullable: true }) 
  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @Field(() => [Comment], { nullable: true }) 
  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}