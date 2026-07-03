import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';

export class AddContestantDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
  })
  @IsDefined({ message: 'O ID do gladiador é obrigatório.' })
  @Type(() => Number)
  @IsInt({ message: 'O ID do gladiador deve ser um número inteiro.' })
  @Min(1, { message: 'O ID do gladiador deve ser maior que zero.' })
  gladiatorId!: number;
}