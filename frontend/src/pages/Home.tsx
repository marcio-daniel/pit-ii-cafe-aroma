import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatarPreco, listarProdutos, type Produto } from '../api'

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    listarProdutos()
      .then(setProdutos)
      .catch((e: Error) => setErro(e.message))
  }, [])

  return (
    <div>
      <h1 className="titulo-pagina">Nossa vitrine</h1>
      <p className="muted">Cafes especiais, kits e acessorios da Aroma da Serra.</p>
      {erro && <div className="alerta">{erro}</div>}
      <div className="grade">
        {produtos.map((produto) => (
          <article key={produto.id} className="card">
            <p className="muted">{produto.categoria}</p>
            <h3>{produto.nome}</h3>
            <p className="muted">{produto.descricao}</p>
            <p className="preco">{formatarPreco(produto.preco)}</p>
            <Link className="botao" to={`/produto/${produto.id}`}>
              Ver detalhes
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
