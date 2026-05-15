import { api } from '../../shared/api/instance'

export function login(credentials) {
  return api.post('/auth/login', credentials)
}

export function logout() {
  return api.post('/auth/logout')
}
