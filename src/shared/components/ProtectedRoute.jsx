// src/shared/components/ProtectedRoute.jsx 
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  if (!isLoggedIn) {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}