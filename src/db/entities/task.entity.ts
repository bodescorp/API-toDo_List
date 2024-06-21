import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'varchar' })
  status: string;
  @Column({ type: 'varchar' })
  user_id:string

  @ManyToOne(() => UserEntity, user => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({name: "user_id", referencedColumnName: "id"})
  user?: UserEntity;
}
