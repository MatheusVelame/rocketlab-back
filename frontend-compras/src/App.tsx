import React, { useState, useEffect } from 'react';
import ProdutoList from './components/ProdutoList';
import Carrinho from './components/Carrinho';
import api from './api';
import './App.css';

function App() {
  const [carrinhoId, setCarrinhoId] = useState<number | null>(null);
  const [refreshCarrinho, setRefreshCarrinho] = useState(false);
  const [refreshProdutos, setRefreshProdutos] = useState(false);

  useEffect(() => {
    criarCarrinho();
  }, []);

  const criarCarrinho = async () => {
    const res = await api.post('/carrinho');
    setCarrinhoId(res.data.id);
  };

  const adicionarAoCarrinho = async (produtoId: number) => {
    if (carrinhoId === null) return;
    await api.post(`/carrinho/${carrinhoId}/adicionar`, {
      produtoId,
      quantidade: 1,
    });
    setRefreshCarrinho(!refreshCarrinho);
  };

  const finalizarCompra = async () => {
    if (carrinhoId === null) return;
    await api.post(`/carrinho/${carrinhoId}/finalizar`);
    alert('Compra finalizada!');
    criarCarrinho();
    setRefreshCarrinho(!refreshCarrinho);
  };

  return (
    <div>
      <h1>Sistema de Compras</h1>
      <ProdutoList 
        adicionarAoCarrinho={adicionarAoCarrinho} 
        refresh={refreshProdutos} 
        onRefresh={() => setRefreshProdutos(!refreshProdutos)}
      />
      <Carrinho 
        carrinhoId={carrinhoId} 
        refresh={refreshCarrinho} 
        finalizarCompra={finalizarCompra} 
      />
    </div>
  );
}

export default App;
