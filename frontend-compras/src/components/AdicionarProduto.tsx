import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api';

const Container = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const Form = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    background: white;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
  
  &::placeholder {
    color: #666;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

interface Props {
  onProdutoAdicionado: () => void;
}

const AdicionarProduto: React.FC<Props> = ({ onProdutoAdicionado }) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');

  const adicionar = async () => {
  const precoNumero = parseFloat(preco);
  if (!nome || precoNumero <= 0 || !descricao) {
    alert('Preencha todos os campos!');
    return;
  }

  await api.post('/produtos', { nome, preco: precoNumero, descricao });
  setNome('');
  setPreco('');
  setDescricao('');
  onProdutoAdicionado();
};


  return (
    <Container>
      <Title>Adicionar Produto</Title>
      <Form>
        <Input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Button onClick={adicionar}>Adicionar Produto</Button>
      </Form>
    </Container>
  );
};

export default AdicionarProduto;
