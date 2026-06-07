import { api } from '../../shared/api/instance'

// 1. 내 정보 조회
export function fetchMyProfile() {
  return api.get('/users/mypage')
}

// 2. 내 정보 수정 (닉네임 또는 비밀번호)
export function updateMyProfile(data) {
  return api.patch('/users/mypage', data)
}

// 3. 회원 탈퇴
export function deleteMyAccount() {
  return api.delete('/users/mypage')
}

// 4. 내가 등록한 상품 조회 (페이징 쿼리 파라미터 적용)
export function fetchMyProducts(params = {}) {
  const defaultParams = { page: 0, size: 10, sort: 'createdAt,desc', ...params }
  const query = new URLSearchParams(defaultParams).toString()

  const path = query ? `/users/mypage/products?${query}` : '/users/mypage/products'
  return api.get(path)
}
