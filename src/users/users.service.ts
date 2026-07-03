import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  create(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async update(
    id: number,
    dto: UpdateUserDto,
  ) {
    await this.findOne(id);

    return this.usersRepository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.usersRepository.delete(id);
  }
}