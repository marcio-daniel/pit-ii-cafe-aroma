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
    return <p>Carregando carrinho...</p>
  }

  return (
    <div>
      <h1 className="titulo-pagina">Carrinho</h1>
      {erro && <div className="alerta">{erro}</div>}
      {!carrinho?.itens.length ? (
        <p className="muted">
          Seu carrinho esta vazio. <Link to="/">Continuar comprando</Link>
        </p>
      ) : (
        <>
          <table className="tabela">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preco</th>
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
          <p className="preco">Total: {formatarPreco(carrinho.total)}</p>
          <Link className="botao" to="/checkout">
            Finalizar pedido
          </Link>
        </>
      )}
    </div>
  )
}
