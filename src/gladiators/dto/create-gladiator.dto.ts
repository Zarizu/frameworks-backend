import { IsInt, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateGladiatorDto {
  
  @ApiProperty()
  @IsInt()
  userId!: number;

  @ApiProperty({ example: 'Minimus' })
  @IsString()
  @Length(2, 30)
  name!: string;

}