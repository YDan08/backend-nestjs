import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data: { ...data, birthAt: data.birthAt ? new Date(data.birthAt) : null },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(data: UpdatePutUserDTO, id: number) {
    return this.prisma.user.update({
      data: { ...data, birthAt: data.birthAt ? new Date(data.birthAt) : null },
      where: { id },
    });
  }

  async updatePartial(data: UpdatePatchUserDTO, id: number) {
    const dataUpdate: any = {};

    if (data.birthAt) {
      dataUpdate.birthAt = new Date(data.birthAt);
    }

    if (data.email) {
      dataUpdate.email = data.email;
    }

    if (data.name) {
      dataUpdate.name = data.name;
    }
    if (data.password) {
      dataUpdate.password = data.password;
    }

    return this.prisma.user.update({ data: dataUpdate, where: { id } });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}