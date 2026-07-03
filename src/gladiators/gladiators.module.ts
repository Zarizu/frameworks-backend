import { Module } from '@nestjs/common';
import { GladiatorsController } from './gladiators.controller';
import { GladiatorsService } from './gladiators.service';
import { GladiatorsRepository } from './gladiators.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
  ],
  controllers: [GladiatorsController],
  providers: [
    GladiatorsService,
    GladiatorsRepository,
  ],
  exports: [
    GladiatorsService,
  ],
})
export class GladiatorsModule {}
