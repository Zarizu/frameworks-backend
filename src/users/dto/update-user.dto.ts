import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'janedova' })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  username?: string;

  @ApiProperty({ example: 'janedova@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}