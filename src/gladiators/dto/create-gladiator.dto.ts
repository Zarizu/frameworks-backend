import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateGladiatorDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
  })
  @IsDefined({ message: 'O ID do usuário é obrigatório.' })
  @Type(() => Number)
  @IsInt({ message: 'O ID do usuário deve ser um número inteiro.' })
  @Min(1, { message: 'O ID do usuário deve ser maior que zero.' })
  userId!: number;

  @ApiProperty({
    example: 'Minimus',
    minLength: 2,
    maxLength: 30,
  })
  @IsDefined({ message: 'O nome do gladiador é obrigatório.' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'O nome do gladiador deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome do gladiador não pode estar vazio.' })
  @Length(2, 30, {
    message: 'O nome do gladiador deve ter entre 2 e 30 caracteres.',
  })
  name!: string;
}