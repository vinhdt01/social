import { Entity, Column, PrimaryGeneratedColumn , OneToMany} from 'typeorm';
import { Post } from './post.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
   
  @Column()
  user_id: string;

  @Column()
  fullName: string;
  
  @Column()
  email: string;

   

  @Column()
  provider: string;

  @Column({ default: true })
  avatar: string;
  

  @Column({ default: 1 })
  permission: Number;

  @Column({ default: 1 })
  isActive: boolean;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
   
}   