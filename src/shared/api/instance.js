const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'

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