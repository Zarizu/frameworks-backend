import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { BattlesController } from './battles.controller';
import { BattlesRepository } from './battles.repository';
import { BattlesService } from './battles.service';
import { GladiatorsModule } from '../gladiators/gladiators.module';

@Module({
  imports: [
    PrismaModule,
    GladiatorsModule,
  ],
  controllers: [BattlesController],
  providers: [
    BattlesService,
    BattlesRepository,
  ],
})
export class BattlesModule {}