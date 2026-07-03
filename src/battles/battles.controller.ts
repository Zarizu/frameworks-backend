import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { BattlesService } from './battles.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { UpdateBattleDto } from './dto/update-battle.dto';
import { AddContestantDto } from './dto/add-contestant.dto';

@Controller('battles')
export class BattlesController {
  constructor(
    private readonly battlesService: BattlesService,
  ) {}

  @Get()
  findAll() {
    return this.battlesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.battlesService.findOne(id);
  }

  @Get(':id/contestants')
  findContestants(
      @Param('id', ParseIntPipe) id: number,
  ) {
      return this.battlesService.findContestants(id);
  }

  @Post()
  create(
    @Body() dto: CreateBattleDto,
  ) {
    return this.battlesService.create(dto);
  }

  @Post(':id/contestants')
  addContestant(

      @Param('id', ParseIntPipe)
      id: number,

      @Body()
      dto: AddContestantDto,

  ) {

      return this.battlesService.addContestant(
          id,
          dto.gladiatorId,
      );

  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBattleDto,
  ) {
    return this.battlesService.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.battlesService.remove(id);
  }

  @Delete(':id/contestants/:gladiatorId')
  removeContestant(

      @Param('id', ParseIntPipe)
      id: number,

      @Param(
          'gladiatorId',
          ParseIntPipe,
      )
      gladiatorId: number,

  ) {

      return this.battlesService.removeContestant(
          id,
          gladiatorId,
      );

  }
}