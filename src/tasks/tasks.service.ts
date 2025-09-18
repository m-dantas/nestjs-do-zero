import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {

  private tasks: TaskEntity[] = [
    { id: 1, name: 'Academia', description: 'Tomar vergonha na cara e ir', completed: false }
  ]

  findAll() {
    return {
      task: this.tasks,
      message: 'Tasks was finded'
    }
  }

  findOne(id: number) {
    const task = this.tasks.find(item => item.id === id)

    if (!task) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND)
    }

    return {
      task,
      message: 'Task was finded'
    }
  }

  create(body: CreateTaskDTO) {
    const id = this.tasks.length + 1
    const task = {
      id,
      ...body,
      completed: false
    }

    this.tasks.push(task)

    return {
      task,
      message: 'Task was created'
    }
  }

  update(id: number, body: UpdateTaskDTO) {
    const taskIndex = this.tasks.findIndex(item => item.id === id)

    if (taskIndex < 0) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND)
    }

    const task = this.tasks[taskIndex]

    this.tasks[taskIndex] = {
      ...task,
      ...body
    }

    return {
      task: this.tasks[taskIndex],
      message: 'Task was updated'
    }
  }

  delete(id: number) {
    const taskIndex = this.tasks.findIndex(item => item.id === id)

    if (taskIndex < 0) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND)
    }

    this.tasks.splice(taskIndex, 1)

    return {
      message: 'Task was deleted'
    }
  }
}
