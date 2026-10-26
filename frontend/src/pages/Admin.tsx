import { useEffect, useState } from 'react'
import { formatarPreco, listarPedidosAdmin, type Pedido } from '../api'

export default function Admin() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    listarPedidosAdmin()
      .then(setPedidos)
      .catch((e: Error) => setErro(e.message))
  }, [])

  return (
    <div>
      <h1 className="titulo-pagina">Pedidos (admin)</h1>
      <p className="muted">Visao simples dos pedidos recebidos.</p>
      {erro && <div className="alerta">{erro}</div>}
      {!pedidos.length && !erro ? (
        <p className="muted">Nenhum pedido ainda.</p>
      ) : (
        <table className="tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Total</th>
              <th>Cidade</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.clienteNome}</td>
                <td>{pedido.status}</td>
                <td>{formatarPreco(pedido.total)}</td>
                <td>{pedido.cidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
