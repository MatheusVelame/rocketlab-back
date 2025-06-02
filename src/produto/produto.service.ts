import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Produto } from '@prisma/client';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  create(data: Omit<Produto, 'id'>) {
    return this.prisma.produto.create({ data });
  }

  findAll() {
    return this.prisma.produto.findMany();
  }

  findOne(id: number) {
    return this.prisma.produto.findUnique({ where: { id } });
  }

  update(id: number, data: Omit<Produto, 'id'>) {
    return this.prisma.produto.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.produto.delete({ where: { id } });
  }
}
