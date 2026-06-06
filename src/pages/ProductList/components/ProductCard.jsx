// src/pages/ProductList/components/ProductCard.jsx
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const navigate = useNavigate()

  // 백엔드 Status 문자열 코드와 기존 CSS 클래스 매핑
  const getStatusClass = (status) => {
    if (status === 'FOR_SALE') return 'status--selling'
    if (status === 'RESERVED') return 'status--reserved'
    if (status === 'SOLD_OUT') return 'status--sold-out'
    return ''
  }

  // 화면에 노출할 한글 텍스트 매핑
  const getStatusLabel = (status) => {
    if (status === 'FOR_SALE') return '판매중'
    if (status === 'RESERVED') return '예약중'
    if (status === 'SOLD_OUT') return '판매완료'
    return status
  }

  const handleCardClick = () => {
    navigate(`/products/${product.productId}`) // id -> productId 변경
  }

  const handleCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      navigate(`/products/${product.productId}`) // id -> productId 변경
    }
  }

  const formatRelativeDate = (createdAt) => {
    if (!createdAt) return '-'
    const createdDate = new Date(createdAt)
    if (Number.isNaN(createdDate.getTime())) return createdAt

    const now = new Date()
    const diffMs = now.getTime() - createdDate.getTime()
    const diffMinutes = Math.floor(diffMs / 60000)

    if (diffMinutes < 1) return '방금 전'
    if (diffMinutes < 60) return `${diffMinutes}분 전`
    
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours}시간 전`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}일 전`
  }

  return (
    <div
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      <div className="product-card__image-wrap">
        {/* image -> imageUrl 변경 */}
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="product-card__image"
          />
        ) : (
          <div className="product-card__placeholder">이미지 없음</div>
        )}

        <span className={`product-card__status ${getStatusClass(product.status)}`}>
          {getStatusLabel(product.status)}
        </span>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">{product.price?.toLocaleString()}원</p>

        <span className="product-card__id">
          {formatRelativeDate(product.createdAt)}
        </span>
      </div>
    </div>
  )
}