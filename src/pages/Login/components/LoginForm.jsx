import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, signup } from '../api'

export default function LoginForm() {
  const navigate = useNavigate()

  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    email: '',
    password: '',
    nickname: '',
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const isSignup = mode === 'signup'

  function handleChange(event) {
    const { name, value } = event.target

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  function changeMode(nextMode) {
    setMode(nextMode)
    setError('')
    setSuccessMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!form.email.trim() || !form.password.trim()) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }

    if (isSignup && !form.nickname.trim()) {
      setError('닉네임을 입력해주세요.')
      return
    }

    setLoading(true)

    try {
      if (isSignup) {
        const response = await signup({
          email: form.email,
          password: form.password,
          nickname: form.nickname,
        })

        const data = response?.data ?? response

        if (data?.accessToken) {
          localStorage.setItem('accessToken', data.accessToken)
          navigate('/products')
          return
        }

        setSuccessMessage('회원가입이 완료되었습니다. 로그인해주세요.')
        setMode('login')
        setForm((prevForm) => ({
          ...prevForm,
          password: '',
        }))
        return
      }

      const response = await login({
        email: form.email,
        password: form.password,
      })

      const data = response?.data ?? response

      if (data?.accessToken) {
        localStorage.setItem('accessToken', data.accessToken)
      }

      navigate('/products')
            } catch (err) {
      const status = err?.response?.status

      if (status === 401) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
        return
      }

      if (status === 404) {
        setError('가입되지 않은 이메일입니다.')
        return
      }

      if (status >= 500) {
        setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
        return
      }

      if (err?.message === 'Failed to fetch') {
        setError('서버에 연결할 수 없습니다. 백엔드 서버 실행 여부를 확인해주세요.')
        return
      }

      setError(
        err?.response?.data?.message ||
          err?.message ||
          '요청 처리에 실패했습니다.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="login-form__tabs">
        <button
          type="button"
          onClick={() => changeMode('login')}
          className={`login-form__tab ${
            mode === 'login' ? 'login-form__tab--active' : ''
          }`}
        >
          로그인
        </button>

        <button
          type="button"
          onClick={() => changeMode('signup')}
          className={`login-form__tab ${
            mode === 'signup' ? 'login-form__tab--active' : ''
          }`}
        >
          회원가입
        </button>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {isSignup && (
          <div>
            <label htmlFor="nickname" className="login-form__label">
              닉네임
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={form.nickname}
              onChange={handleChange}
              required={isSignup}
              className="login-form__input"
              placeholder="닉네임을 입력하세요"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="login-form__label">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
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
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="login-form__input"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
      {error && (
        <div className="login-form__error" role="alert">
          <strong>로그인 실패</strong>
          <span>{error}</span>
        </div>
      )}  
      {successMessage && (
          <p className="login-form__success">{successMessage}</p>
        )}

        <button type="submit" disabled={loading} className="login-form__submit">
          {loading
            ? isSignup
              ? '회원가입 중...'
              : '로그인 중...'
            : isSignup
              ? '회원가입'
              : '로그인'}
        </button>
      </form>

      <p className="login-form__helper">
        {isSignup
          ? '이미 계정이 있으신가요? 로그인 탭을 선택하세요.'
          : '계정이 없으신가요? 회원가입 탭을 선택하세요.'}
      </p>
    </div>
  )
}