import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

export default function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await login({ email, password })
      if (data?.accessToken) {
        localStorage.setItem('accessToken', data.accessToken)
      }
      navigate('/products')
    } catch (err) {
      setError(err.message ?? '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label htmlFor="email" className="login-form__label">
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-form__input"
          placeholder="student@sejong.ac.kr"
        />
      </div>

      <div>
        <label htmlFor="password" className="login-form__label">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-form__input"
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      {error && <p className="login-form__error">{error}</p>}

      <button type="submit" disabled={loading} className="login-form__submit">
        {loading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  )
}
