import React, { useEffect, useState } from 'react';
import api from '../api';

interface Item {
  id: number;
  quantidade: number;
  produto: {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
  };
}

interface Props {
  carrinhoId: number | null;
  refresh: boolean;
  finalizarCompra: () => void;
}

const Carrinho: React.FC<Props> = ({ carrinhoId, refresh, finalizarCompra }) => {
  const [itens, setItens] = useState<Item[]>([]);

  useEffect(() => {
    if (carrinhoId) {
      api.get(`/carrinho/${carrinhoId}`).then((res) => {
        setItens(res.data.itens);
      });
    }
  }, [carrinhoId, refresh]);

  return (
    <div>
      <h2>Carrinho</h2>
      {itens.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul>
          {itens.map((item) => (
            <li key={item.id}>
              {item.produto.nome} - {item.quantidade}x R$ {item.produto.preco}
            </li>
          ))}
        </ul>
      )}
      <button onClick={finalizarCompra}>Finalizar Compra</button>
    </div>
  );
};

export default Carrinho;
