import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarPedido } from '../api'

export default function Checkout() {
  const navigate = useNavigate()
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    cep: '',
    formaPagamento: 'PIX',
  })

  function atualizar(campo: string, valor: string) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  async function enviar(e: FormEvent) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    try {
      const pedido = await criarPedido(form)
      navigate(`/pedido/${pedido.id}`)
    } catch (err) {
      setErro((err as Error).message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div>
      <h1 className="titulo-pagina">Checkout</h1>
      <p className="muted">Informe seus dados para concluir o pedido.</p>
      {erro && <div className="alerta">{erro}</div>}
      <form className="formulario" onSubmit={enviar}>
        <label>
          Nome
          <input value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} required />
        </label>
        <label>
          E-mail
          <input value={form.email} onChange={(e) => atualizar('email', e.target.value)} required />
        </label>
        <label>
          Telefone
          <input value={form.telefone} onChange={(e) => atualizar('telefone', e.target.value)} />
        </label>
        <label>
          Endereco
          <input value={form.endereco} onChange={(e) => atualizar('endereco', e.target.value)} required />
        </label>
        <label>
          Cidade
          <input value={form.cidade} onChange={(e) => atualizar('cidade', e.target.value)} required />
        </label>
        <label>
          CEP
          <input value={form.cep} onChange={(e) => atualizar('cep', e.target.value)} required />
        </label>
        <label>
          Forma de pagamento
          <select value={form.formaPagamento} onChange={(e) => atualizar('formaPagamento', e.target.value)}>
            <option value="PIX">PIX</option>
            <option value="Cartao">Cartao</option>
            <option value="Dinheiro na entrega">Dinheiro na entrega</option>
          </select>
        </label>
        <button className="botao" type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Confirmar pedido'}
        </button>
      </form>
    </div>
  )
}
