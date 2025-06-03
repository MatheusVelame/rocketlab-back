"use client"

import type React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import api from "../api"
import AdicionarProduto from "./AdicionarProduto"

const Container = styled.div`
  margin-bottom: 2rem;
`

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
`

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`

const SearchButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`

const ProductCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e8ed;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`

const ProductName = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
`

const ProductPrice = styled.div`
  color: #27ae60;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const ProductDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
  line-height: 1.5;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const ActionButton = styled.button<{ variant?: "primary" | "secondary" | "danger" }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background: linear-gradient(135deg, #00b894, #00a085);
          color: white;
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 3px 10px rgba(0, 184, 148, 0.4);
          }
        `
      case "danger":
        return `
          background: linear-gradient(135deg, #ff6b6b, #ee5a24);
          color: white;
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 3px 10px rgba(238, 90, 36, 0.4);
          }
        `
      default:
        return `
          background: #f8f9fa;
          color: #495057;
          border: 1px solid #dee2e6;
          &:hover {
            background: #e9ecef;
            transform: translateY(-1px);
          }
        `
    }
  }}
`

const EditForm = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const EditInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`

interface Produto {
  id: number
  nome: string
  preco: number
  descricao: string
}

interface Props {
  adicionarAoCarrinho: (produtoId: number) => void
  refresh: boolean
  onRefresh: () => void
}

const ProdutoList: React.FC<Props> = ({ adicionarAoCarrinho, refresh, onRefresh }) => {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [editando, setEditando] = useState<Produto | null>(null)
  const [busca, setBusca] = useState<string>("")

  const carregarProdutos = () => {
    api.get("/produtos").then((res) => setProdutos(res.data))
  }

  const buscarProdutos = () => {
    if (busca.trim() === "") {
      carregarProdutos()
    } else {
      api
        .get(`/produtos/buscar?nome=${busca}`)
        .then((res) => setProdutos(res.data))
        .catch(() => setProdutos([]))
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [refresh])

  const deletarProduto = async (id: number) => {
    try {
      await api.delete(`/produtos/${id}`)
      carregarProdutos()
    } catch (error) {
      console.error("Erro ao deletar:", error)
    }
  }

  const salvarEdicao = async () => {
    if (editando) {
      await api.put(`/produtos/${editando.id}`, {
        nome: editando.nome,
        preco: editando.preco,
        descricao: editando.descricao,
      })
      setEditando(null)
      carregarProdutos()
      onRefresh()
    }
  }

  return (
    <Container>
      <AdicionarProduto onProdutoAdicionado={carregarProdutos} />

      <Title>Produtos Disponíveis</Title>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <SearchButton onClick={buscarProdutos}>Buscar</SearchButton>
      </SearchContainer>

      <ProductGrid>
        {produtos.map((produto) => (
          <ProductCard key={produto.id}>
            {editando?.id === produto.id ? (
              <>
                <EditForm>
                  <EditInput
                    type="text"
                    value={editando.nome}
                    onChange={(e) => setEditando({ ...editando, nome: e.target.value })}
                  />
                  <EditInput
                    type="number"
                    value={editando.preco}
                    onChange={(e) => setEditando({ ...editando, preco: Number.parseFloat(e.target.value) })}
                  />
                  <EditInput
                    type="text"
                    value={editando.descricao}
                    onChange={(e) => setEditando({ ...editando, descricao: e.target.value })}
                  />
                </EditForm>
                <ButtonGroup>
                  <ActionButton variant="primary" onClick={salvarEdicao}>
                    Salvar
                  </ActionButton>
                  <ActionButton onClick={() => setEditando(null)}>Cancelar</ActionButton>
                </ButtonGroup>
              </>
            ) : (
              <>
                <ProductName>{produto.nome}</ProductName>
                <ProductPrice>R$ {produto.preco.toFixed(2)}</ProductPrice>
                <ProductDescription>{produto.descricao}</ProductDescription>
                <ButtonGroup>
                  <ActionButton variant="primary" onClick={() => adicionarAoCarrinho(produto.id)}>
                    Adicionar ao Carrinho
                  </ActionButton>
                  <ActionButton onClick={() => setEditando(produto)}>Editar</ActionButton>
                  <ActionButton variant="danger" onClick={() => deletarProduto(produto.id)}>
                    Excluir
                  </ActionButton>
                </ButtonGroup>
              </>
            )}
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  )
}

export default ProdutoList
