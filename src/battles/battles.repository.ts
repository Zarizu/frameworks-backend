import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { UpdateBattleDto } from './dto/update-battle.dto';

@Injectable()
export class BattlesRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(dto: CreateBattleDto) {
    return this.prisma.battle.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.battle.findMany({
      include: {
        contestants: true,
      },
    });
  }

  findById(id: number) {
    return this.prisma.battle.findUnique({
      where: { id },
      include: {
        contestants: true,
      },
    });
  }

  update(id: number, dto: UpdateBattleDto) {
    return this.prisma.battle.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: number) {
    return this.prisma.battle.delete({
      where: { id },
    });
  }

  async findContestants(battleId: number) {
    return this.prisma.battleContestant.findMany({
      where: {
        battleId,
      },
      include: {
        gladiator: true,
      },
    });
  }

  async findContestant(
    battleId: number,
    gladiatorId: number,
  ) {
    return this.prisma.battleContestant.findUnique({
      where: {
        battleId_gladiatorId: {
          battleId,
          gladiatorId,
        },
      },
    });
  }

  async addContestant(
    battleId: number,
    gladiatorId: number,
  ) {
    return this.prisma.battleContestant.create({
      data: {
        battle: {
          connect: {
            id: battleId,
          },
        },
        gladiator: {
          connect: {
            id: gladiatorId,
          },
        },
      },
    });
  }

  async removeContestant(
    battleId: number,
    gladiatorId: number,
  ) {
    return this.prisma.battleContestant.delete({
      where: {
        battleId_gladiatorId: {
          battleId,
          gladiatorId,
        },
      },
    });
  }
}