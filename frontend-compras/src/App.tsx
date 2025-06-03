"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import ProdutoList from "./components/ProdutoList"
import Carrinho from "./components/Carrinho"
import api from "./api"

const GlobalContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 1rem;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`

const Title = styled.h1`
  color: #2c3e50;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.2rem;
  font-weight: 300;
`

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

function App() {
  const [carrinhoId, setCarrinhoId] = useState<number | null>(null)
  const [refreshCarrinho, setRefreshCarrinho] = useState(false)
  const [refreshProdutos, setRefreshProdutos] = useState(false)

  useEffect(() => {
    criarCarrinho()
  }, [])

  const criarCarrinho = async () => {
    const res = await api.post("/carrinho")
    setCarrinhoId(res.data.id)
  }

  const adicionarAoCarrinho = async (produtoId: number) => {
    if (carrinhoId === null) return
    await api.post(`/carrinho/${carrinhoId}/adicionar`, {
      produtoId,
      quantidade: 1,
    })
    setRefreshCarrinho(!refreshCarrinho)
  }

  const finalizarCompra = async () => {
    if (carrinhoId === null) return
    await api.post(`/carrinho/${carrinhoId}/finalizar`)
    alert("Compra finalizada com sucesso! 🎉")
    criarCarrinho()
    setRefreshCarrinho(!refreshCarrinho)
  }

  return (
    <GlobalContainer>
      <Container>
        <Header>
          <Title>🛍️ Vshop</Title>
          <Subtitle>Sua loja online completa</Subtitle>
        </Header>

        <MainContent>
          <div>
            <ProdutoList
              adicionarAoCarrinho={adicionarAoCarrinho}
              refresh={refreshProdutos}
              onRefresh={() => setRefreshProdutos(!refreshProdutos)}
            />
          </div>

          <div>
            <Carrinho carrinhoId={carrinhoId} refresh={refreshCarrinho} finalizarCompra={finalizarCompra} />
          </div>
        </MainContent>
      </Container>
    </GlobalContainer>
  )
}

export default App
