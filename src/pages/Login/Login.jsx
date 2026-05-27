import LoginForm from './components/LoginForm'
import './Login.css'

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__logo">
          <span>世</span>
        </div>

        <h1 className="login-card__title">세종마켓</h1>
        <p className="login-card__subtitle">
          세종대학교 캠퍼스 중고거래에 오신 것을 환영합니다
        </p>

        <LoginForm />
      </div>
    </div>
  )
}