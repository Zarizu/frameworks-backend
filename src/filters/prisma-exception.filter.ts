// src/common/filters/prisma-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    switch (exception.code) {
      case 'P2002': {
        const target = (exception.meta?.target as string[])?.join(', ');
        const httpException = new ConflictException(
          `Já existe um registro com esse valor${target ? ` para: ${target}` : ''}`,
        );
        return response.status(httpException.getStatus()).json(httpException.getResponse());
      }
      case 'P2025': {
        const httpException = new NotFoundException('Registro não encontrado');
        return response.status(httpException.getStatus()).json(httpException.getResponse());
      }
      case 'P2003': {
        const httpException = new BadRequestException(
          'Referência inválida: um dos IDs informados não existe',
        );
        return response.status(httpException.getStatus()).json(httpException.getResponse());
      }
      default: {
        const httpException = new BadRequestException('Erro ao processar a requisição');
        return response.status(httpException.getStatus()).json(httpException.getResponse());
      }
    }
  }
}