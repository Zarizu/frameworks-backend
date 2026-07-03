import { IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBattleDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  totalSteps!: number;

  @ApiProperty()
  @IsString()
  fileId!: string;
}
