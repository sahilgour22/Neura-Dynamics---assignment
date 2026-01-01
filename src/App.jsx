import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Layout>
  )
}

export default App

