export const MOCK_PROFILE = {
  email: 'user@example.com',
  nickname: '세종이',
};

export const MOCK_PRODUCTS = [
  {
    id: 1, 
    productId: 1,
    title: '중고 노트북 팝니다',
    price: 500000,
    status: '판매중', // ProductCard 내부 getStatusClass 로직에 맞춤
    image: 'http://example.com/img1.jpg', // ProductCard에서 image를 사용함
    sellerNickname: '세종이',
    createdAt: '2026-05-28T13:15:43'
  },
  {
    id: 2,
    productId: 2,
    title: '전공 서적 세트',
    price: 25000,
    status: '판매완료',
    image: 'http://example.com/img2.jpg',
    sellerNickname: '세종이',
    createdAt: '2026-05-27T10:00:00'
  }
];