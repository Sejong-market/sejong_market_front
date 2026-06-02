import { api } from '../../shared/api/instance';

export function createProduct(productData) {
  return api.post('/products', productData);
}