const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'

async function request(path, options = {}) {
  const { headers = {}, body, ...rest } = options

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  }

  if (body !== undefined) {
    config.body = JSON.stringify(body)
  }

  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${path}`, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message ?? `요청 실패 (${response.status})`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}
