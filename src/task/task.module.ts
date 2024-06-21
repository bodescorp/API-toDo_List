import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { UserEntity } from 'src/db/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity,UserEntity])],
  controllers: [TaskController],
  providers: [TaskService],
  exports:[TaskService]
})
export class TaskModule {}
