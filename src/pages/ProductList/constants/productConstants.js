export const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기상품 순 (관심많은순)" },
  { value: "price-high", label: "가격 높은순" },
  { value: "price-low", label: "가격 낮은순" },
];

/* prettier-ignore */
export const MOCK_PRODUCTS = [
  { id: 1, title: '맥북 프로 14인치', price: 1200000, status: '판매중', image: '/products/macbook.png', likeCount: 26, chatCount: 5, createdAt: '2026-05-18' },
  { id: 2, title: '아이패드 에어 5세대', price: 450000, status: '판매중', image: '/products/ipad.png', likeCount: 150, chatCount: 20, createdAt: '2026-05-15' },
  { id: 3, title: '오픈소스 sw', price: 25000, status: '예약중', image: '/products/opensource.png', likeCount: 80, chatCount: 5, createdAt: '2026-05-12' },
  { id: 4, title: '자전거', price: 80000, status: '판매중', image: '/products/bicycle.png', likeCount: 30, chatCount: 4, createdAt: '2026-05-10' },
  { id: 5, title: 'LG 전자레인지', price: 60000, status: '판매중', image: '/products/lg microwave.png', likeCount: 120, chatCount: 18, createdAt: '2026-05-05' },
  { id: 6, title: '시디즈 t50', price: 150000, status: '판매완료', image: '/products/cydix t50.png', likeCount: 10, chatCount: 2, createdAt: '2026-05-01' },
];