// src/pages/ProductRegister/api.js

import { api } from '../../shared/api/instance'

export async function createProduct(productData) {
  try {
    return await api.post('/products', productData)
  } catch (error) {
    console.warn("⚠️ 백엔드 서버가 꺼져 있어 로컬 더미 모드로 전환합니다:", error.message)
    
    return {
      id: Date.now(), // 임시 ID
      ...productData,
      createdAt: new Date().toISOString()
    }
  }
}