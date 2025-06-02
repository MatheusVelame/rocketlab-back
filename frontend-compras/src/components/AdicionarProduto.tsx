import React, { useState } from 'react';
import api from '../api';

interface Props {
  onProdutoAdicionado: () => void;
}

const AdicionarProduto: React.FC<Props> = ({ onProdutoAdicionado }) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState('');

  const adicionar = async () => {
    if (!nome || preco <= 0 || !descricao) {
      alert('Preencha todos os campos!');
      return;
    }

    await api.post('/produtos', { nome, preco, descricao });
    setNome('');
    setPreco(0);
    setDescricao('');
    onProdutoAdicionado();
  };

  return (
    <div>
      <h2>Adicionar Produto</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(parseFloat(e.target.value))}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button onClick={adicionar}>Adicionar Produto</button>
    </div>
  );
};

export default AdicionarProduto;
