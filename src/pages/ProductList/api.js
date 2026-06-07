import { api } from '../../shared/api/instance'

export function fetchProducts(params = {}) {
  const defaultParams = { page: 0, size: 20, sort: 'createdAt,desc', ...params }
  const query = new URLSearchParams(defaultParams).toString()
  
  const path = query ? `/products?${query}` : '/products'
  return api.get(path)
}

export function fetchProductDetail(productId) {
  return api.get(`/products/${productId}`)
}