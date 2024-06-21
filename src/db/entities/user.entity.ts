import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  username: string;
  @Column({ type: 'varchar', name:'password_hash' })
  passwordHash: string;
  @OneToMany(() => TaskEntity, task => task.user, { onDelete: 'SET NULL' })
  tasks?: TaskEntity[];
 
}
