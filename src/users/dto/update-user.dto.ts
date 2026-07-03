import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'janedoe',
    required: false,
    minLength: 3,
    maxLength: 30,
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio.' })
  @Length(3, 30, {
    message: 'O nome de usuário deve ter entre 3 e 30 caracteres.',
  })
  username?: string;

  @ApiProperty({
    example: 'janedoe@email.com',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  @IsEmail({}, { message: 'O formato do e-mail é inválido.' })
  email?: string;
}