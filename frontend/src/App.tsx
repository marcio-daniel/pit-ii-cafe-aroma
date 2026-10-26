import { Link, Route, Routes } from 'react-router-dom'
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
        <Link className="marca" to="/">Cafe Aroma da Serra</Link>
        <nav className="nav">
          <Link to="/">Vitrine</Link>
          <Link to="/carrinho">Carrinho</Link>
          <Link to="/admin">Admin</Link>
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
