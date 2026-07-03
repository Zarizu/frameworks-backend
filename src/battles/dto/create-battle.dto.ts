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

export class CreateBattleDto {
  @ApiProperty({
    example: 'Final do Torneio',
    minLength: 3,
    maxLength: 60,
  })
  @IsDefined({ message: 'O nome da batalha é obrigatório.' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'O nome da batalha deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome da batalha não pode estar vazio.' })
  @Length(3, 60, {
    message: 'O nome da batalha deve ter entre 3 e 60 caracteres.',
  })
  name!: string;

  @ApiProperty({
    example: 500,
    minimum: 1,
  })
  @IsDefined({ message: 'O número total de steps é obrigatório.' })
  @Type(() => Number)
  @IsInt({ message: 'O total de steps deve ser um número inteiro.' })
  @Min(1, {
    message: 'O total de steps deve ser maior que zero.',
  })
  totalSteps!: number;

  @ApiProperty({
    example: 'battle-01.json',
  })
  @IsDefined({ message: 'O fileId é obrigatório.' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({
    message: 'O fileId deve ser uma string.',
  })
  @IsNotEmpty({
    message: 'O fileId não pode estar vazio.',
  })
  @Length(1, 255, {
    message: 'O fileId deve ter entre 1 e 255 caracteres.',
  })
  fileId!: string;
}