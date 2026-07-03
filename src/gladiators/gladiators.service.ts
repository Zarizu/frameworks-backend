import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { GladiatorsRepository } from './gladiators.repository';
import { UsersRepository } from '../users/users.repository';
import { CreateGladiatorDto } from './dto/create-gladiator.dto';
import { UpdateGladiatorDto } from './dto/update-gladiator.dto';

@Injectable()
export class GladiatorsService {

  constructor(

    private readonly gladiatorsRepository: GladiatorsRepository,

    private readonly usersRepository: UsersRepository,

  ) {}

  async create(dto: CreateGladiatorDto) {

    const user = await this.usersRepository.findById(dto.userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.gladiatorsRepository.create(
      dto.userId,
      dto.name,
    );

  }

  findAll() {
    return this.gladiatorsRepository.findAll();
  }

  findOne(id: number) {
    return this.gladiatorsRepository.findById(id);
  }

  update(id: number, dto: UpdateGladiatorDto) {
    return this.gladiatorsRepository.update(
      id,
      dto.name!,
    );
  }

  remove(id: number) {
    return this.gladiatorsRepository.delete(id);
  }

}