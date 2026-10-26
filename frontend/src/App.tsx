import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import PedidoConfirmacao from './pages/PedidoConfirmacao'
import ProdutoDetalhe from './pages/ProdutoDetalhe'

export default function App() {
  return (
    <div className="app-shell">
      <header className="topo">
        <Link className="marca" to="/">
          Café <span>Aroma da Serra</span>
        </Link>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'ativo' : undefined)}>
            Vitrine
          </NavLink>
          <NavLink to="/carrinho" className={({ isActive }) => (isActive ? 'ativo' : undefined)}>
            Carrinho
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => (isActive ? 'ativo' : undefined)}>
            Admin
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProdutoDetalhe />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedido/:id" element={<PedidoConfirmacao />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  )
}
