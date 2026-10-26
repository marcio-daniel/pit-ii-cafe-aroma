const baseUrl = import.meta.env.VITE_API_URL ?? ''

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    let message = 'Erro na requisicao'
    try {
      const body = await response.json()
      message = body.detail ?? body.message ?? message
    } catch {
    }
    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

export type Produto = {
  id: number
  nome: string
  descricao: string
  preco: number
  categoria: string
  ativo: boolean
}

export type ItemCarrinho = {
  produtoId: number
  nome: string
  precoUnitario: number
  quantidade: number
  subtotal: number
}

export type Carrinho = {
  itens: ItemCarrinho[]
  total: number
}

export type Pedido = {
  id: number
  dataCriacao: string
  status: string
  total: number
  formaPagamento: string
  endereco: string
  cidade: string
  cep: string
  clienteNome: string
  clienteEmail: string
  itens: ItemCarrinho[]
}

export function listarProdutos() {
  return request<Produto[]>('/api/produtos')
}

export function buscarProduto(id: number) {
  return request<Produto>(`/api/produtos/${id}`)
}

export function obterCarrinho() {
  return request<Carrinho>('/api/carrinho')
}

export function adicionarAoCarrinho(produtoId: number, quantidade: number) {
  return request<Carrinho>('/api/carrinho/itens', {
    method: 'POST',
    body: JSON.stringify({ produtoId, quantidade }),
  })
}

export function atualizarItemCarrinho(produtoId: number, quantidade: number) {
  return request<Carrinho>(`/api/carrinho/itens/${produtoId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantidade }),
  })
}

export function removerItemCarrinho(produtoId: number) {
  return request<Carrinho>(`/api/carrinho/itens/${produtoId}`, {
    method: 'DELETE',
  })
}

export function criarPedido(dados: {
  nome: string
  email: string
  telefone: string
  endereco: string
  cidade: string
  cep: string
  formaPagamento: string
}) {
  return request<Pedido>('/api/pedidos', {
    method: 'POST',
    body: JSON.stringify(dados),
  })
}

export function buscarPedido(id: number) {
  return request<Pedido>(`/api/pedidos/${id}`)
}

export function listarPedidosAdmin() {
  return request<Pedido[]>('/api/admin/pedidos')
}

export function formatarPreco(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
