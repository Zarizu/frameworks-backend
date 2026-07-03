import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { GladiatorsModule } from './gladiators/gladiators.module';
import { BattlesModule } from './battles/battles.module';

@Module({
  imports: [PrismaModule, UsersModule, GladiatorsModule, BattlesModule],
  controllers: [AppController],
})
export class AppModule {}
