import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateGladiatorDto {
  @ApiProperty({
    example: 'Maximus',
    required: false,
    minLength: 2,
    maxLength: 30,
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'O nome do gladiador deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome do gladiador não pode estar vazio.' })
  @Length(2, 30, {
    message: 'O nome do gladiador deve ter entre 2 e 30 caracteres.',
  })
  name?: string;
}