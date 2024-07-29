import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import IndexPage from './pages/IndexPage'
import FavoritesPage from './pages/FavoritesPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
    </BrowserRouter>
  )
}
