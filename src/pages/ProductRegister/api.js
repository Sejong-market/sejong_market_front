import { api } from '../../shared/api/instance';

export function createProduct(formData) {
  // FormData 객체를 그대로 전송하며, 헤더는 인스턴스(인터셉터)에서 자동으로 토큰이 주입됩니다.
  return api.post('/api/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}