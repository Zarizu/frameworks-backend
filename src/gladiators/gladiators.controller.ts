import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGladiatorDto } from './dto/create-gladiator.dto';
import { UpdateGladiatorDto } from './dto/update-gladiator.dto';
import { GladiatorsService } from './gladiators.service';

@Controller('gladiators')
export class GladiatorsController {

  constructor(
    private readonly service: GladiatorsService,
  ) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(
    @Body() dto: CreateGladiatorDto,
  ) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGladiatorDto,
  ) {
    return this.service.update(
      Number(id),
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.service.remove(Number(id));
  }

}