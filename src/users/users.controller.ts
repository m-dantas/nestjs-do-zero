import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAllUsers() {
    return await this.usersService.findAll()
  }

  @Get(':id')
  async findOneUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id)
  }

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    return await this.usersService.create(body)
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
    return await this.usersService.update(id, body)
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id)
  }
}
