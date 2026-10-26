import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  atualizarItemCarrinho,
  formatarPreco,
  obterCarrinho,
  removerItemCarrinho,
  type Carrinho as CarrinhoTipo,
} from '../api'

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState<CarrinhoTipo | null>(null)
  const [erro, setErro] = useState('')

  async function carregar() {
    try {
      setCarrinho(await obterCarrinho())
    } catch (e) {
      setErro((e as Error).message)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  async function mudarQtd(produtoId: number, quantidade: number) {
    try {
      setCarrinho(await atualizarItemCarrinho(produtoId, quantidade))
    } catch (e) {
      setErro((e as Error).message)
    }
  }

  async function remover(produtoId: number) {
    try {
      setCarrinho(await removerItemCarrinho(produtoId))
    } catch (e) {
      setErro((e as Error).message)
    }
  }

  if (!carrinho && !erro) {
    return <p className="muted">Carregando carrinho...</p>
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h1 className="titulo-pagina">Carrinho</h1>
      <p className="page-lead">Revise os itens antes de finalizar o pedido.</p>
      {erro && <div className="alerta">{erro}</div>}
      {!carrinho?.itens.length ? (
        <div className="painel">
          <p className="muted">
            Seu carrinho está vazio. <Link to="/">Continuar comprando</Link>
          </p>
        </div>
      ) : (
        <>
          <div className="tabela-wrap">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Qtd</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carrinho.itens.map((item) => (
                  <tr key={item.produtoId}>
                    <td>{item.nome}</td>
                    <td>{formatarPreco(item.precoUnitario)}</td>
                    <td>
                      <input
                        className="qtd"
                        type="number"
                        min={1}
                        value={item.quantidade}
                        onChange={(e) => mudarQtd(item.produtoId, Number(e.target.value))}
                      />
                    </td>
                    <td>{formatarPreco(item.subtotal)}</td>
                    <td>
                      <button className="botao perigo" type="button" onClick={() => remover(item.produtoId)}>
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="total-linha">
            <span className="muted">Total</span>
            <span className="preco" style={{ margin: 0 }}>
              {formatarPreco(carrinho.total)}
            </span>
          </div>
          <Link className="botao" to="/checkout">
            Finalizar pedido
          </Link>
        </>
      )}
    </motion.div>
  )
}
