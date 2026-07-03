import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBattleDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  totalSteps?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fileId?: string;
}