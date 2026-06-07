const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'

function parseJwtPayload(token) {
  const parts = token.split('.')
  if (parts.length !== 3) {
    return null
  }

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    return JSON.parse(atob(padded))
  } catch {
    return null
  }
}

function isAccessTokenExpired(token) {
  const payload = parseJwtPayload(token)
  if (!payload?.exp) {
    return true
  }

  return Date.now() >= payload.exp * 1000
}

function resolveAccessToken() {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    return null
  }

  if (isAccessTokenExpired(token)) {
    localStorage.removeItem('accessToken')
    return null
  }

  return token
}

export function hasValidAccessToken() {
  return Boolean(resolveAccessToken())
}

async function parseResponseBody(response) {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

async function request(path, options = {}) {
  const { headers = {}, body, returnResponse = false, ...rest } = options
  const isFormData = body instanceof FormData

  const config = {
    headers: { ...headers },
    ...rest,
  }

  if (isFormData) {
    delete config.headers['Content-Type']
  } else {
    config.headers['Content-Type'] =
      config.headers['Content-Type'] ?? 'application/json'
  }

  if (body !== undefined) {
    config.body = isFormData ? body : JSON.stringify(body)
  }

  const token = resolveAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${path}`, config)
  const data = response.status === 204 ? null : await parseResponseBody(response)

  if (!response.ok) {
    const error = new Error(data?.message ?? `요청 실패 (${response.status})`)

    error.status = response.status
    error.data = data

    throw error
  }

  if (returnResponse) {
    return {
      data,
      headers: response.headers,
      status: response.status,
    }
  }

  return data
}

export const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),

  post: (path, body, options) =>
    request(path, { ...options, method: 'POST', body }),

  postWithResponse: (path, body, options) =>
    request(path, {
      ...options,
      method: 'POST',
      body,
      returnResponse: true,
    }),

  put: (path, body, options) =>
    request(path, { ...options, method: 'PUT', body }),

  patch: (path, body, options) =>
    request(path, { ...options, method: 'PATCH', body }),

  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}