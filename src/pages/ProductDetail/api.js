import { api } from '../../shared/api/instance'

export function fetchProductDetail(productId) {
  return api.get(`/products/${productId}`)
}

export function createProductComment(productId, content) {
  return api.post('/comments', {
    productId: Number(productId),
    content,
  })
}