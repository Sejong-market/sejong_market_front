export const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기상품 순 (관심많은순)" },
  { value: "price-high", label: "가격 높은순" },
  { value: "price-low", label: "가격 낮은순" },
];

// Vite의 BASE_URL (로컬: '/', GitHub Pages: '/sejong_market_front/')을 prefix로 붙여
// 어느 환경에서도 public/products/*.png 이미지가 올바르게 해석되도록 한다.
const asset = (path) => `${import.meta.env.BASE_URL}${path}`.replace(/\/{2,}/g, '/')

/* prettier-ignore */
export const MOCK_PRODUCTS = [
  { id: 1, title: '맥북 프로 14인치', price: 1200000, status: '판매중', image: asset('products/macbook.png'), likeCount: 26, chatCount: 5, createdAt: '2026-05-18' },
  { id: 2, title: '아이패드 에어 5세대', price: 450000, status: '판매중', image: asset('products/ipad.png'), likeCount: 150, chatCount: 20, createdAt: '2026-05-15' },
  { id: 3, title: '오픈소스 sw', price: 25000, status: '예약중', image: asset('products/opensource.png'), likeCount: 80, chatCount: 5, createdAt: '2026-05-12' },
  { id: 4, title: '자전거', price: 80000, status: '판매중', image: asset('products/bicycle.png'), likeCount: 30, chatCount: 4, createdAt: '2026-05-10' },
  { id: 5, title: 'LG 전자레인지', price: 60000, status: '판매중', image: asset('products/lg microwave.png'), likeCount: 120, chatCount: 18, createdAt: '2026-05-05' },
  { id: 6, title: '시디즈 t50', price: 150000, status: '판매완료', image: asset('products/cydix t50.png'), likeCount: 10, chatCount: 2, createdAt: '2026-05-01' },
];