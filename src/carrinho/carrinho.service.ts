import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarrinhoService {
  constructor(private prisma: PrismaService) {}

  async criarCarrinho() {
    return this.prisma.carrinho.create({ data: {} });
  }

  async adicionarItem(carrinhoId: number, produtoId: number, quantidade: number) {
    return this.prisma.itemCarrinho.create({
      data: {
        carrinhoId,
        produtoId,
        quantidade,
      },
    });
  }

  async visualizarCarrinho(carrinhoId: number) {
    return this.prisma.carrinho.findUnique({
      where: { id: carrinhoId },
      include: {
        itens: {
          include: { produto: true },
        },
      },
    });
  }

  async finalizarCompra(carrinhoId: number) {
    return this.prisma.carrinho.update({
      where: { id: carrinhoId },
      data: { finalizado: true },
    });
  }
}
