import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from '@prisma/client';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() data: Omit<Produto, 'id'>) {
    return this.produtoService.create(data);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Omit<Produto, 'id'>) {
    return this.produtoService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
