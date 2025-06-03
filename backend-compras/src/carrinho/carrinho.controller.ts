import { Controller, Post, Body, Param, Get, Delete, Patch } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}

  @Post()
  criarCarrinho() {
    return this.carrinhoService.criarCarrinho();
  }

  @Post(':id/adicionar')
  adicionarItem(
    @Param('id') carrinhoId: string,
    @Body() body: { produtoId: number; quantidade: number },
  ) {
    return this.carrinhoService.adicionarItem(
      +carrinhoId,
      body.produtoId,
      body.quantidade,
    );
  }

  @Get(':id')
  visualizarCarrinho(@Param('id') carrinhoId: string) {
    return this.carrinhoService.visualizarCarrinho(+carrinhoId);
  }

  @Post(':id/finalizar')
  finalizarCompra(@Param('id') carrinhoId: string) {
    return this.carrinhoService.finalizarCompra(+carrinhoId);
  }
  
  @Patch(':carrinhoId/item/:itemId')
  atualizarQuantidade(
    @Param('itemId') itemId: string,
    @Body('quantidade') quantidade: number,
  ) {
    return this.carrinhoService.atualizarQuantidade(+itemId, quantidade);
  }

  @Delete(':carrinhoId/item/:itemId')
  removerItem(@Param('itemId') itemId: string) {
    return this.carrinhoService.removerItem(+itemId);
  }
}
