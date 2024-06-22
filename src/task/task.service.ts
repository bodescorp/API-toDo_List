import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { TenantService } from 'src/tenant/tenant.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly tenantService: TenantService,
  ) {}

  async create(task: TaskDto) {
    const taskToSave: TaskEntity = {
      title: task.title,
      description: task.description,
      status: TaskStatusEnum.IN_PROGRESS,
      user_id: this.tenantService.getTenant().id,
    };
    try {
      const createdTask = await this.taskRepository.save(taskToSave);

      return this.mapEntityToDto(createdTask);
    } catch (error) {
      throw new HttpException(
        'Invalid task data.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findById(id: string): Promise<TaskDto> {
    let foundTask: TaskEntity;
    try {
      foundTask = await this.taskRepository.findOne({
      where: [{ id, user_id: this.tenantService.getTenant().id }],
      });

      if (!foundTask) {
        throw new HttpException(
          `Task with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException('Invalid task data or parameters.', HttpStatus.BAD_REQUEST);
    }
    

    return this.mapEntityToDto(foundTask);
  }

  async findAll(params: FindAllParameters): Promise<TaskDto[]> {
    const searchParams: FindOptionsWhere<TaskEntity> = {};

    if (params.title) {
      searchParams.title = Like(`%${params.title}%`);
    }

    if (params.status) {
      searchParams.status = Like(`%${params.status}%`);
    }

    try {
      const taskFound = await this.taskRepository.find({
        where: [
          { ...searchParams, user_id: this.tenantService.getTenant().id },
        ],
      });

      return taskFound.map((taskEntity) => this.mapEntityToDto(taskEntity));
    } catch (error) {
      throw new HttpException('Error retrieving tasks', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, task: TaskDto) {
    const foundTask = await this.taskRepository.findOne({
      where: [{ id, user_id: this.tenantService.getTenant().id }],
    });

    if (!foundTask) {
      throw new HttpException(
        `Task with id ${task.id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedTaskEntity = this.mapDtoEntity(task);

    try {
      await this.taskRepository.update(id, updatedTaskEntity);
    } catch (error) {
      throw new HttpException('Invalid task data or parameters.', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.taskRepository.delete({
        id,
        user_id: this.tenantService.getTenant().id,
      });
      if (result.affected === 0) {
        throw new HttpException(
          `Task with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Invalid request.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(taskEntity: TaskEntity): TaskDto {
    return {
      id: taskEntity.id,
      title: taskEntity.title,
      description: taskEntity.description,
      status: TaskStatusEnum[taskEntity.status],
      user_id: this.tenantService.getTenant().id,
    };
  }

  private mapDtoEntity(taskDto: TaskDto): Partial<TaskEntity> {
    return {
      title: taskDto.title,
      description: taskDto.description,
      status: taskDto.status.toString(),
    };
  }
}
