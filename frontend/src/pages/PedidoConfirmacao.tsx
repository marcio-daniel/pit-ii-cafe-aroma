import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buscarPedido, formatarPreco, type Pedido } from '../api'

export default function PedidoConfirmacao() {
  const { id } = useParams()
  const [pedido, setPedido] = useState<Pedido | null>(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!id) return
    buscarPedido(Number(id))
      .then(setPedido)
      .catch((e: Error) => setErro(e.message))
  }, [id])

  if (!pedido && !erro) {
    return <p>Carregando pedido...</p>
  }

  if (!pedido) {
    return <div className="alerta">{erro || 'Pedido nao encontrado'}</div>
  }

  return (
    <div>
      <h1 className="titulo-pagina">Pedido confirmado</h1>
      <div className="alerta sucesso">Pedido #{pedido.id} registrado com sucesso.</div>
      <article className="card">
        <p><strong>Status:</strong> {pedido.status}</p>
        <p><strong>Cliente:</strong> {pedido.clienteNome} ({pedido.clienteEmail})</p>
        <p><strong>Entrega:</strong> {pedido.endereco}, {pedido.cidade} - CEP {pedido.cep}</p>
        <p><strong>Pagamento:</strong> {pedido.formaPagamento}</p>
        <p className="preco">Total: {formatarPreco(pedido.total)}</p>
        <ul>
          {pedido.itens.map((item) => (
            <li key={item.produtoId}>
              {item.quantidade}x {item.nome} — {formatarPreco(item.subtotal)}
            </li>
          ))}
        </ul>
      </article>
      <p>
        <Link className="botao" to="/">Voltar a loja</Link>
      </p>
    </div>
  )
}
