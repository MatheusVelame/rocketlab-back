import React, { useEffect, useState } from 'react';
import api from '../api';
import AdicionarProduto from './AdicionarProduto';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

interface Props {
  adicionarAoCarrinho: (produtoId: number) => void;
  refresh: boolean;
  onRefresh: () => void;
}

const ProdutoList: React.FC<Props> = ({ adicionarAoCarrinho, refresh, onRefresh }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editando, setEditando] = useState<Produto | null>(null);
  const [busca, setBusca] = useState<string>("");

  const carregarProdutos = () => {
    api.get('/produtos').then((res) => setProdutos(res.data));
  };

  const buscarProdutos = () => {
    if (busca.trim() === "") {
      carregarProdutos();
    } else {
      api.get(`/produtos/buscar?nome=${busca}`)
        .then(res => setProdutos(res.data))
        .catch(() => setProdutos([]));
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, [refresh]);

  const deletarProduto = async (id: number) => {
    try {
      await api.delete(`/produtos/${id}`);
      carregarProdutos();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const salvarEdicao = async () => {
    if (editando) {
      await api.put(`/produtos/${editando.id}`, {
        nome: editando.nome,
        preco: editando.preco,
        descricao: editando.descricao,
      });
      setEditando(null);
      carregarProdutos();
      onRefresh();
    }
  };

  return (
    <div>
      <AdicionarProduto onProdutoAdicionado={carregarProdutos} />

      <h2>Produtos</h2>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Buscar produto"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button onClick={buscarProdutos}>Buscar</button>
      </div>

      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {editando?.id === produto.id ? (
              <div>
                <input
                  type="text"
                  value={editando.nome}
                  onChange={(e) => setEditando({ ...editando, nome: e.target.value })}
                />
                <input
                  type="number"
                  value={editando.preco}
                  onChange={(e) => setEditando({ ...editando, preco: parseFloat(e.target.value) })}
                />
                <input
                  type="text"
                  value={editando.descricao}
                  onChange={(e) => setEditando({ ...editando, descricao: e.target.value })}
                />
                <button onClick={salvarEdicao}>Salvar</button>
                <button onClick={() => setEditando(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                {produto.nome} - R$ {produto.preco} <br />
                {produto.descricao}
                <br />
                <button onClick={() => adicionarAoCarrinho(produto.id)}>Adicionar ao Carrinho</button>
                <button onClick={() => setEditando(produto)}>Editar</button>
                <button onClick={() => deletarProduto(produto.id)}>Excluir</button>
                <hr />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProdutoList;
