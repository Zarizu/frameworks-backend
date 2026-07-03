import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddContestantDto {
  @ApiProperty()
  @IsInt()
  gladiatorId!: number;
}