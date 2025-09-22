import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(pagination?: PaginationDTO) {
    try {
      const limit = pagination?.limit ?? 10;
      const offset = pagination?.offset ?? 0;

      const tasks = await this.prisma.tasks.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        tasks,
        message: 'Tasks was finded',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to find a task', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const task = await this.prisma.tasks.findFirst({
        where: { id },
      });

      if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }

      return {
        task,
        message: 'Task was finded',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to find a task', HttpStatus.BAD_REQUEST);
    }
  }

  async create(body: CreateTaskDTO) {
    try {
      const task = await this.prisma.tasks.create({
        data: {
          ...body,
          completed: false,
          userId: body.userId,
        },
      });

      return {
        task,
        message: 'Task was created',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create a task',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, body: UpdateTaskDTO) {
    try {
      const findTask = await this.prisma.tasks.findFirst({
        where: { id },
      });

      if (!findTask) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }

      const task = await this.prisma.tasks.update({
        where: { id },
        data: {
          name: body.name ?? findTask.name,
          description: body.description ?? findTask.description,
          completed: body.completed ?? findTask.completed,
        },
      });

      return {
        task,
        message: 'Task was updated',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update a task',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    try {
      const findTask = await this.prisma.tasks.findFirst({
        where: { id },
      });

      if (!findTask) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }

      await this.prisma.tasks.delete({
        where: {
          id: findTask.id,
        },
      });

      return {
        message: 'Task was deleted',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to deleted a task',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
