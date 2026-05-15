import { api } from '../../shared/api/instance'

export function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString()
  const path = query ? `/products?${query}` : '/products'
  return api.get(path)
}

export function fetchProductDetail(productId) {
  return api.get(`/products/${productId}`)
}
