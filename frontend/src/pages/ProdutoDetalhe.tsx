import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adicionarAoCarrinho, buscarProduto, formatarPreco, type Produto } from '../api'

export default function ProdutoDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [produto, setProduto] = useState<Produto | null>(null)
  const [quantidade, setQuantidade] = useState(1)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')

  useEffect(() => {
    if (!id) return
    buscarProduto(Number(id))
      .then(setProduto)
      .catch((e: Error) => setErro(e.message))
  }, [id])

  async function adicionar() {
    if (!produto) return
    setErro('')
    setOk('')
    try {
      await adicionarAoCarrinho(produto.id, quantidade)
      setOk('Produto adicionado ao carrinho.')
    } catch (e) {
      setErro((e as Error).message)
    }
  }

  if (!produto && !erro) {
    return <p>Carregando...</p>
  }

  if (!produto) {
    return <div className="alerta">{erro || 'Produto nao encontrado'}</div>
  }

  return (
    <div>
      <p className="muted">
        <Link to="/">Voltar para a vitrine</Link>
      </p>
      <article className="card">
        <p className="muted">{produto.categoria}</p>
        <h1 className="titulo-pagina">{produto.nome}</h1>
        <p>{produto.descricao}</p>
        <p className="preco">{formatarPreco(produto.preco)}</p>
        <div className="acoes">
          <label>
            Qtd
            <input
              className="qtd"
              type="number"
              min={1}
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
            />
          </label>
          <button className="botao" type="button" onClick={adicionar}>
            Adicionar ao carrinho
          </button>
          <button className="botao secundario" type="button" onClick={() => navigate('/carrinho')}>
            Ir ao carrinho
          </button>
        </div>
        {ok && <p className="alerta sucesso">{ok}</p>}
        {erro && <p className="alerta">{erro}</p>}
      </article>
    </div>
  )
}
