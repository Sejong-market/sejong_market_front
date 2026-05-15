import { api } from '../../shared/api/instance'

export function fetchMyProfile() {
  return api.get('/users/me')
}

export function fetchMyProducts() {
  return api.get('/users/me/products')
}

export function fetchMyPurchases() {
  return api.get('/users/me/purchases')
}
