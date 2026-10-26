import { motion } from 'framer-motion'
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
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <p className="hero-eyebrow">Cafeteria gourmet · delivery</p>
        <h1>Café Aroma da Serra</h1>
        <p className="hero-lead">
          Cafés especiais, kits de manhã e acessórios — direto da serra para a sua mesa.
        </p>
        <a className="botao" href="#vitrine">
          Ver vitrine
        </a>
      </motion.section>

      <section id="vitrine">
        <div className="secao-titulo">
          <h2>Vitrine</h2>
          <p className="muted">{produtos.length} produtos disponíveis</p>
        </div>
        {erro && <div className="alerta">{erro}</div>}
        <div className="grade">
          {produtos.map((produto, index) => (
            <motion.article
              key={produto.id}
              className="card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * Math.min(index, 8) }}
              whileHover={{ y: -4 }}
            >
              <span className="tag">{produto.categoria}</span>
              <h3>{produto.nome}</h3>
              <p className="muted">{produto.descricao}</p>
              <p className="preco">{formatarPreco(produto.preco)}</p>
              <Link className="botao" to={`/produto/${produto.id}`}>
                Ver detalhes
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
