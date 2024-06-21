import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FindAllParameters,
  TaskDto,
  TaskRouteParameters,
  TaskStatusEnum,
} from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TenantInterceptor } from 'src/tenant/tenant.interceptor';

@ApiTags('task')
@ApiBearerAuth()
@UseInterceptors(TenantInterceptor)
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
 
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid task data.' })
  async create(@Body() task: TaskDto): Promise<TaskDto> {
    return await this.taskService.create(task);
  }
 


  @Get('/:id')
  @ApiOperation({ summary: 'Find a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully found.',
  })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  @ApiUnauthorizedResponse({description:'user Unauthorized'})
  async findById(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.findById(id);
  }



  @Get()
  @ApiOperation({ summary: 'Find all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved tasks.',
    type: TaskDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid filter parameters.' })
  @ApiUnauthorizedResponse({description:'User Unauthorized'})
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Filter tasks by title containing the provided string.',
  })
  @ApiQuery({
    name: 'status',
    enum: TaskStatusEnum,
    required: false,
    description: 'Filter tasks by status.',
    isArray: true,
  })
  async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
    return await this.taskService.findAll(params);
  }



  @Put('/:id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  @ApiBadRequestResponse({ description: 'Invalid task data or parameters.' })
  @ApiUnauthorizedResponse({description:'User unauthorized'})
  async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
    await this.taskService.update(params.id, task);
  }



  @Delete('/:id')
  @ApiOperation({ summary: 'Remove a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully removed.',
  })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiParam({ name: 'id', description: 'ID of the task to remove.', type: 'string' })
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
