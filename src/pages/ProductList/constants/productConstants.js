const asset = (path) => `${import.meta.env.BASE_URL}${path}`.replace(/\/{2,}/g, '/')

/* prettier-ignore */
export const MOCK_PRODUCTS = [
  { id: 1, title: '맥북 프로 14인치', price: 1200000, status: '판매중', image: asset('products/macbook.png'), createdAt: '2026-05-18' },
  { id: 2, title: '아이패드 에어 5세대', price: 450000, status: '판매중', image: asset('products/ipad.png'), createdAt: '2026-05-15' },
  { id: 3, title: '오픈소스 sw', price: 25000, status: '예약중', image: asset('products/opensource.png'), createdAt: '2026-05-12' },
  { id: 4, title: '자전거', price: 80000, status: '판매중', image: asset('products/bicycle.png'), createdAt: '2026-05-10' },
  { id: 5, title: 'LG 전자레인지', price: 60000, status: '판매중', image: asset('products/lg microwave.png'), createdAt: '2026-05-05' },
  { id: 6, title: '시디즈 t50', price: 150000, status: '판매완료', image: asset('products/cydix t50.png'), createdAt: '2026-05-01' },
];