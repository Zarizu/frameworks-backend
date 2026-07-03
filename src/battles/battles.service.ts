import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BattlesRepository } from './battles.repository';
import { CreateBattleDto } from './dto/create-battle.dto';
import { UpdateBattleDto } from './dto/update-battle.dto';
import { GladiatorsService } from '../gladiators/gladiators.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class BattlesService {
constructor(
    private readonly battlesRepository: BattlesRepository,
    private readonly gladiatorsService: GladiatorsService,
) {}

  create(dto: CreateBattleDto) {
    return this.battlesRepository.create(dto);
  }

  findAll() {
    return this.battlesRepository.findAll();
  }

  async findOne(id: number) {
    const battle = await this.battlesRepository.findById(id);

    if (!battle) {
      throw new NotFoundException('Batalha não encontrada.');
    }

    return battle;
  }

  async update(
    id: number,
    dto: UpdateBattleDto,
  ) {
    await this.findOne(id);

    return this.battlesRepository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.battlesRepository.delete(id);
  }

  async findContestants(battleId: number) {

    await this.findOne(battleId);

    return this.battlesRepository.findContestants(
        battleId,
    );

  }

  async addContestant(
      battleId: number,
      gladiatorId: number,
  ) {

      await this.findOne(battleId);

      await this.gladiatorsService.findOne(gladiatorId);

      const contestants =
          await this.battlesRepository.findContestants(
              battleId,
          );

      if (contestants.length >= 5) {
          throw new BadRequestException(
              'A batalha já possui 5 participantes.',
          );
      }

      const exists =
          await this.battlesRepository.findContestant(
              battleId,
              gladiatorId,
          );

      if (exists) {
          throw new BadRequestException(
              'Gladiador já participa da batalha.',
          );
      }

      return this.battlesRepository.addContestant(
          battleId,
          gladiatorId,
      );
  }

  async removeContestant(
      battleId: number,
      gladiatorId: number,
  ) {

      await this.findOne(battleId);

      return this.battlesRepository.removeContestant(
          battleId,
          gladiatorId,
      );

  }
}