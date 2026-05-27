import { api } from '../../shared/api/instance'

export function login(credentials) {
  return api.postWithResponse('/users/login', credentials)
}

export function signup(userInfo) {
  return api.post('/users/signUp', userInfo)
}

export function logout() {
  return api.post('/users/logout')
}