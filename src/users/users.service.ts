import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const users = await this.prisma.users.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          Tasks: true,
        },
      });

      return {
        users,
        message: 'Users was finded',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to find users', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return {
        user,
        message: 'User was finded',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to find an user', HttpStatus.BAD_REQUEST);
    }
  }

  async create(body: CreateUserDTO) {
    try {
      const user = await this.prisma.users.create({
        data: {
          name: body.name,
          email: body.email,
          passwordHash: body.password,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return {
        user,
        message: 'User was created',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create an user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, body: UpdateUserDTO) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const updatedUser = await this.prisma.users.update({
        where: {
          id,
        },
        data: {
          name: body.name ?? user.name,
          passwordHash: body.password ?? user.passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return {
        user: updatedUser,
        message: 'User was updated',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update an user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await this.prisma.users.delete({
        where: {
          id,
        },
      });

      return {
        message: 'User was deleted',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to delete an user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
