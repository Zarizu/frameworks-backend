import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GladiatorsRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(userId: number, name: string) {

    return this.prisma.gladiator.create({

      data: {
        name,

        user: {
          connect: {
            id: userId,
          },
        },
      },

    });

  }

  findAll() {

    return this.prisma.gladiator.findMany({

      include: {
        user: true,
      },

    });

  }

  findById(id: number) {

    return this.prisma.gladiator.findUnique({

      where: { id },

      include: {
        user: true,
      },

    });

  }

  update(id: number, name: string) {

    return this.prisma.gladiator.update({

      where: { id },

      data: {
        name,
      },

    });

  }

  delete(id: number) {

    return this.prisma.gladiator.delete({

      where: { id },
    });

  }

}