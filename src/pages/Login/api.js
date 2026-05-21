import { api } from '../../shared/api/instance'

export function login(credentials) {
  return api.post('/auth/login', credentials)
}

export function signup(userInfo) {
  return api.post('/auth/signup', userInfo)
}

export function logout() {
  return api.post('/auth/logout')
}