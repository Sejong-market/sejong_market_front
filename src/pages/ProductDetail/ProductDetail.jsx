import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CommentList from './components/CommentList'
import CommentForm from './components/CommentForm'
import { createProductComment, fetchProductDetail } from './api'
import { resolveImageUrl } from '../../shared/utils/imageUrl'
import './ProductDetail.css'

const STATUS_LABEL = {
  FOR_SALE: '판매중',
  RESERVED: '예약중',
  SOLD_OUT: '판매완료',
  판매중: '판매중',
  예약중: '예약중',
  판매완료: '판매완료',
}

function formatDateTime(value) {
  if (!value) return ''

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function normalizeComment(comment) {
  return {
    id: comment.commentId,
    writer: comment.writerNickname,
    content: comment.content,
    createdAt: formatDateTime(comment.createdAt),
    isMine: comment.isMine,
  }
}

function normalizeProduct(product) {
  return {
    id: product.productId,
    title: product.title,
    content: product.content,
    price: product.price,
    status: STATUS_LABEL[product.status] ?? product.status,
    image: resolveImageUrl(product.imageUrl),
    seller: product.seller?.nickname ?? '판매자',
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    isMine: product.isMine,
    commentCount: product.commentCount ?? product.comments?.length ?? 0,
    comments: product.comments?.map(normalizeComment) ?? [],
  }
}

export default function ProductDetail() {
  const { productId } = useParams()

  const [product, setProduct] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProductDetail() {
      setLoading(true)
      setError('')

      try {
        const data = await fetchProductDetail(productId)
        const normalizedProduct = normalizeProduct(data)

        setProduct(normalizedProduct)
        setComments(normalizedProduct.comments)
      } catch (err) {
        const status = err?.status

        if (status === 400) {
          setProduct(null)
          setError('상품을 찾을 수 없습니다.')
          return
        }

        if (err?.message === 'Failed to fetch') {
          setError('서버에 연결할 수 없습니다. 백엔드 서버 실행 여부를 확인해주세요.')
          return
        }

        setError(err?.message || '상품 정보를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }

    loadProductDetail()
  }, [productId])

  async function handleAddComment(content) {
    try {
      const newComment = await createProductComment(productId, content)
      const normalizedComment = normalizeComment(newComment)

      setComments((prevComments) => [...prevComments, normalizedComment])
      setProduct((prevProduct) =>
        prevProduct
          ? {
              ...prevProduct,
              commentCount: prevProduct.commentCount + 1,
            }
          : prevProduct
      )
    } catch (err) {
      const status = err?.status

      if (status === 401 || status === 403) {
        throw new Error('댓글 작성은 로그인 후 이용할 수 있습니다.')
      }

      if (status === 400) {
        throw new Error('댓글 내용을 확인해주세요.')
      }

      if (err?.message === 'Failed to fetch') {
        throw new Error('서버에 연결할 수 없습니다. 백엔드 서버 실행 여부를 확인해주세요.')
      }

      throw new Error(err?.message || '댓글 등록에 실패했습니다.')
    }
  }

  if (loading) {
    return (
      <section className="product-detail">
        <div className="product-detail__not-found">
          <h1>상품 정보를 불러오는 중입니다.</h1>
          <p>잠시만 기다려주세요.</p>
        </div>
      </section>
    )
  }

  if (error && !product) {
    return (
      <section className="product-detail">
        <div className="product-detail__not-found">
          <h1>{error}</h1>
          <p>존재하지 않거나 삭제된 상품일 수 있습니다.</p>
          <Link to="/products" className="product-detail__back-link">
            ← 상품 목록으로 돌아가기
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="product-detail">
      <div className="product-detail__top">
        <Link to="/products" className="product-detail__back-link">
          ← 상품 목록으로 돌아가기
        </Link>
      </div>

      <div className="product-detail__card">
        <div className="product-detail__image-wrap">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="product-detail__image"
            />
          ) : (
            <div className="product-detail__image-placeholder">
              이미지 없음
            </div>
          )}
        </div>

        <div className="product-detail__info">
          <span className="product-detail__status">{product.status}</span>
          <h1 className="product-detail__title">{product.title}</h1>
          <p className="product-detail__price">
            {product.price.toLocaleString()}원
          </p>

          <div className="product-detail__meta">
            <span>판매자 {product.seller}</span>
            {product.updatedAt && (
              <span>수정일 {formatDateTime(product.updatedAt)}</span>
            )}
          </div>

          <p className="product-detail__content">
            {product.content || '등록된 상품 설명이 없습니다.'}
          </p>
        </div>
      </div>

      <div className="product-detail__comments">
        <div className="product-detail__comments-header">
          <div className="product-detail__comments-title-row">
            <h2>댓글 문의</h2>
            <span>{comments.length}개</span>
          </div>
          <p>실시간 채팅 대신 댓글로 구매 의사를 남길 수 있습니다.</p>
        </div>

        <CommentList comments={comments} />
        <CommentForm onSubmit={handleAddComment} />
      </div>
    </section>
  )
}