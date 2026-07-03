import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {

    constructor(
        private prisma: PrismaService
    ) {}

    create(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findById(id: number) {
        return this.prisma.user.findUnique({
            where: { id }
        });
    }

    update(id: number, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({
            where: { id },
            data
        });
    }

    delete(id: number) {
        return this.prisma.user.delete({
            where: { id }
        });
    }

}