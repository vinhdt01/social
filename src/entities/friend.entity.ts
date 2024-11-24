import { Entity, Column, PrimaryGeneratedColumn , OneToMany} from 'typeorm';
import { Post } from './post.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;
   
  @Column()
  user_id: string;

  @Column()
  status: string;
  
  @Column()
  permission: string;

 
}   