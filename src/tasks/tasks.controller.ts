import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) { }

  @Get()
  @UseInterceptors(LoggerInterceptor)
  @UseInterceptors(AddHeaderInterceptor)
  findAllTasks(@Query() params: PaginationDTO) {
    return this.taskService.findAll(params)
  }

  @Get(":id")
  findOneTask(@Param("id", ParseIntPipe) id: number) {
    return this.taskService.findOne(id)
  }

  @Post()
  @UseInterceptors(BodyCreateTaskInterceptor)
  createTask(@Body() body: CreateTaskDTO) {
    return this.taskService.create(body)
  }

  @Patch(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTaskDTO) {
    return this.taskService.update(id, body)
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id)
  }
}
