import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';
import { CarrinhoModule } from './carrinho/carrinho.module';


@Module({
  imports: [PrismaModule, ProdutoModule, CarrinhoModule],
})
export class AppModule {}
