import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  provider: number;

  @Column({ default: true })
  avatar: string;

  @Column({ default: true })
  google_id: string;

  @Column({ default: true })
  permission: string;

  @Column({ default: true })
  isActive: boolean;
}   