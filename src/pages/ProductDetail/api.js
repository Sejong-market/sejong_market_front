import { api } from '../../shared/api/instance'

export function fetchProductDetail(productId) {
  return api.get(`/products/${productId}`)
}

export function fetchProductComments(productId) {
  return api.get(`/products/${productId}/comments`)
}

export function createProductComment(productId, content) {
  return api.post(`/products/${productId}/comments`, { content })
}