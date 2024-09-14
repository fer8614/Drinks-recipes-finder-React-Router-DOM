import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'

const IndexPage = lazy(() => import('./pages/IndexPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <Suspense fallback={<div>Loading...</div>}>
              <IndexPage />
            </Suspense>} index />
          <Route path="/favorites" element={
            <Suspense fallback={<div>Loading...</div>}>
              <FavoritesPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
