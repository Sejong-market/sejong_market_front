import { api } from '../../shared/api/instance';

export function createProduct(formData) {
  return api.post('/products', formData);
}