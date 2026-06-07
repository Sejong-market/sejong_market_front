import { Navigate, Outlet } from 'react-router-dom'
import { hasValidAccessToken } from '../api/instance'

export default function ProtectedRoute() {
  if (!hasValidAccessToken()) {
    alert('로그인이 필요한 서비스입니다.')
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
