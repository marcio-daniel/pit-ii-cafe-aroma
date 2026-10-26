import { motion } from 'framer-motion'
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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h1 className="titulo-pagina">Pedidos</h1>
      <p className="page-lead">Visão simples dos pedidos recebidos pela loja.</p>
      {erro && <div className="alerta">{erro}</div>}
      {!pedidos.length && !erro ? (
        <div className="painel">
          <p className="muted">Nenhum pedido ainda.</p>
        </div>
      ) : (
        <div className="tabela-wrap">
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
        </div>
      )}
    </motion.div>
  )
}
