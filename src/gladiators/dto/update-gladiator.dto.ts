import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGladiatorDto {

  @ApiProperty({ example: 'Maximus' })
  @IsOptional()
  @IsString()
  @Length(2, 30)
  name?: string;

}