"use client"

import type React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import api from "../api"

const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border: 1px solid #e1e8ed;
`

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &::before {
    content: '🛒';
    font-size: 1.2em;
  }
`

const EmptyMessage = styled.p`
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 1rem 0;
`

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Item = styled.li`
  background: #f8f9fa;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  &:hover {
    background: #e9ecef;
    transform: translateX(5px);
  }
`

const ItemInfo = styled.div`
  flex: 1;
`

const ItemName = styled.span`
  font-weight: 600;
  color: #2c3e50;
`

const ItemDetails = styled.span`
  color: #7f8c8d;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  button {
    background: #00b894;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #019875;
    }
  }

  span {
    width: 30px;
    text-align: center;
    font-weight: bold;
  }
`

const Price = styled.span`
  font-weight: 700;
  color: #27ae60;
  font-size: 1.1rem;
  margin-right: 1rem;
`

const RemoveButton = styled.button`
  background: #e74c3c;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c0392b;
  }
`

const FinalizarButton = styled.button`
  background: linear-gradient(135deg, #00b894, #00a085);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 184, 148, 0.4);
  }
  &:active {
    transform: translateY(0);
  }
`

const Total = styled.div`
  background: #e8f5e8;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #27ae60;
`

interface Item {
  id: number
  quantidade: number
  produto: {
    id: number
    nome: string
    preco: number
    descricao: string
  }
}

interface Props {
  carrinhoId: number | null
  refresh: boolean
  finalizarCompra: () => void
}

const Carrinho: React.FC<Props> = ({ carrinhoId, refresh, finalizarCompra }) => {
  const [itens, setItens] = useState<Item[]>([])

  useEffect(() => {
    if (carrinhoId) {
      api.get(`/carrinho/${carrinhoId}`).then((res) => {
        setItens(res.data.itens)
      })
    }
  }, [carrinhoId, refresh])

  const calcularTotal = () => {
    return itens.reduce((total, item) => total + item.produto.preco * item.quantidade, 0)
  }

  const atualizarQuantidade = async (itemId: number, novaQuantidade: number) => {
    if (novaQuantidade <= 0) {
      removerItem(itemId);
      return;
    }
    await api.patch(`/carrinho/${carrinhoId}/item/${itemId}`, {
      quantidade: novaQuantidade,
    })
    const atualizados = itens.map(item =>
      item.id === itemId ? { ...item, quantidade: novaQuantidade } : item
    )
    setItens(atualizados)
  }

  const removerItem = async (itemId: number) => {
    await api.delete(`/carrinho/${carrinhoId}/item/${itemId}`)
    setItens(itens.filter(item => item.id !== itemId))
  }

  return (
    <Container>
      <Title>Carrinho de Compras</Title>
      {itens.length === 0 ? (
        <EmptyMessage>O carrinho está vazio.</EmptyMessage>
      ) : (
        <>
          <ItemList>
            {itens.map((item) => (
              <Item key={item.id}>
                <ItemInfo>
                  <ItemName>{item.produto.nome}</ItemName>
                  <ItemDetails>
                    <QuantityControl>
                      <button onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}>-</button>
                      <span>{item.quantidade}</span>
                      <button onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}>+</button>
                    </QuantityControl>
                    x R$ {item.produto.preco.toFixed(2)}
                  </ItemDetails>
                </ItemInfo>
                <Price>R$ {(item.produto.preco * item.quantidade).toFixed(2)}</Price>
                <RemoveButton onClick={() => removerItem(item.id)}>Excluir</RemoveButton>
              </Item>
            ))}
          </ItemList>
          <Total>Total: R$ {calcularTotal().toFixed(2)}</Total>
          <FinalizarButton onClick={finalizarCompra}>Finalizar Compra</FinalizarButton>
        </>
      )}
    </Container>
  )
}

export default Carrinho
