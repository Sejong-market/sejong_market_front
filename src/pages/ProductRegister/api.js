import { api } from '../../shared/api/instance';

export async function createProduct(productData) {
  try {
    return await api.post('/products', productData);
  } catch (error) {
    return {
      id: Date.now(),
      ...productData,
      createdAt: new Date().toISOString()
    };
  }
}