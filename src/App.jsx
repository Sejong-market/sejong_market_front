import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './shared/layout/AppLayout'
import Login from './pages/Login/Login'
import ProductList from './pages/ProductList/ProductList'
import MyPage from './pages/MyPage/MyPage'
import Chat from './pages/Chat/Chat'
import ProductRegister from './pages/ProductRegister/ProductRegister' 

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductRegister />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/chat" element={<Chat />} />
      </Route>

      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  )
}