import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './shared/layout/AppLayout'
import Login from './pages/Login/Login'
import ProductList from './pages/ProductList/ProductList'
import MyPage from './pages/MyPage/MyPage'
import ProductRegister from './pages/ProductRegister/ProductRegister' 
import ProductDetail from './pages/ProductDetail/ProductDetail'
import ProtectedRoute from './shared/components/ProtectedRoute' 

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/products" replace />} />
        
        {/* 🔓 누구나 볼 수 있는 페이지 (비로그인 허용) */}
        <Route path="/products" element={<ProductList />} />

        <Route path="/products/:productId" element={<ProductDetail />} />
        
        {/* 🔒 로그인한 사용자만 접근 가능한 페이지 그룹 */}
        <Route element={<ProtectedRoute />}>
          <Route path="/products/new" element={<ProductRegister />} />
          <Route path="/Mypage" element={<MyPage />} />

        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  )
}