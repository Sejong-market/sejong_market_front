import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentList from './components/CommentList'
import CommentForm from './components/CommentForm'
import './ProductDetail.css'

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: '맥북 프로 14인치',
    content: '상태 좋은 맥북 프로 14인치입니다. 충전기 포함이며 교내 직거래 가능합니다.',
    price: 1200000,
    status: '판매중',
    seller: '세종이',
    location: '대양홀 앞',
    image: '/src/assets/products/macbook.png',
  },
  {
    id: 2,
    title: '아이패드 에어 5세대',
    content: '필기용으로 사용했습니다. 케이스와 애플펜슬은 별도 문의 주세요.',
    price: 450000,
    status: '판매중',
    seller: '구매자A',
    location: '학술정보원 앞',
    image: '/src/assets/products/ipad.png',
  },
]

const INITIAL_COMMENTS = [
  {
    id: 1,
    writer: '구매자A',
    content: '아직 판매 중인가요?',
    createdAt: '방금 전',
  },
  {
    id: 2,
    writer: '판매자',
    content: '네, 아직 판매 중입니다.',
    createdAt: '방금 전',
  },
]

export default function ProductDetail() {
  const { productId } = useParams()
  const [comments, setComments] = useState(INITIAL_COMMENTS)

  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((item) => item.id === Number(productId)) ?? MOCK_PRODUCTS[0]
  }, [productId])

  function handleAddComment(content) {
    const newComment = {
      id: Date.now(),
      writer: '나',
      content,
      createdAt: '방금 전',
    }

    setComments((prevComments) => [...prevComments, newComment])
  }

  return (
    <section className="product-detail">
      <div className="product-detail__card">
        <div className="product-detail__image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail__image"
          />
        </div>

        <div className="product-detail__info">
          <span className="product-detail__status">{product.status}</span>
          <h1 className="product-detail__title">{product.title}</h1>
          <p className="product-detail__price">
            {product.price.toLocaleString()}원
          </p>

          <div className="product-detail__meta">
            <span>판매자 {product.seller}</span>
            <span>{product.location}</span>
          </div>

          <p className="product-detail__content">{product.content}</p>
        </div>
      </div>

      <div className="product-detail__comments">
        <div className="product-detail__comments-header">
          <h2>댓글 문의</h2>
          <p>실시간 채팅 대신 댓글로 구매 의사를 남길 수 있습니다.</p>
        </div>

        <CommentList comments={comments} />
        <CommentForm onSubmit={handleAddComment} />
      </div>
    </section>
  )
}