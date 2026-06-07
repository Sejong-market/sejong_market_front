const asset = (path) => `${import.meta.env.BASE_URL}${path}`.replace(/\/{2,}/g, '/')

export const MOCK_PRODUCTS = [
 {
"productId": 1,
"title": "맥북 프로 13인치",
"price": 1200000,
"status": "FOR_SALE",
"imageUrl": asset('products/macbook.png'),
"sellerNickname": "세종이",
"createdAt": "2026-05-27T16:00:00"
},
{
"productId": 2,
"title": "아이패드 에어 5세대",
"price": 450000,
"status": "FOR_SALE",
"imageUrl": asset('products/ipad.png'),
"sellerNickname": "세종이",
"createdAt": "2026-05-25T14:30:00"
},
{
"productId": 3,
"title": "오픈소스 sw",
"price": 25000,
"status": "RESERVED",
"imageUrl": asset('products/opensource.png'),
"sellerNickname": "세종이",
"createdAt": "2026-05-12T00:00:00"
},
{
"productId": 4,
"title": "자전거",
"price": 80000,
"status": "FOR_SALE",
"imageUrl": asset('products/bicycle.png'),
"sellerNickname": "세종이",
"createdAt": "2026-05-10T00:00:00"
},
{
"productId": 5,
"title": "LG 전자레인지",
"price": 60000,
"status": "FOR_SALE",
"imageUrl": asset('products/lg microwave.png'),
"sellerNickname": "세종이",
"createdAt": "2026-05-05T00:00:00"
},
{
"productId": 6,
"title": "시디즈 t50",
"price": 150000,
"status": "SOLD_OUT",
"imageUrl": asset('products/cydix t50.png'),
"sellerNickname": "세종이",
"createdAt": "2026-05-01T00:00:00"
}, 
];
