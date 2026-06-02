import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MOCK_PRODUCTS } from '../ProductList/constants/productConstants'
import CommentList from './components/CommentList'
import CommentForm from './components/CommentForm'
import './ProductDetail.css'

const COMMENT_SAMPLES = [
  { writer: '구매자A', content: '아직 판매 중인가요?' },
  { writer: '판매자', content: '네, 아직 판매 중입니다.' },
  { writer: '구매자B', content: '오늘 교내에서 거래 가능할까요?' },
  { writer: '판매자', content: '네, 대양홀 앞에서 가능합니다.' },
  { writer: '구매자C', content: '상태 사진을 조금 더 볼 수 있을까요?' },
]

function getCommentStorageKey(productId) {
  return `product_comments_${productId}`
}

function createInitialComments(count) {
  return Array.from({ length: count }, (_, index) => {
    const sample = COMMENT_SAMPLES[index % COMMENT_SAMPLES.length]

    return {
      id: index + 1,
      writer: sample.writer,
      content: sample.content,
      createdAt: index === 0 ? '방금 전' : `${index}시간 전`,
    }
  })
}

function loadComments(product) {
  const storageKey = getCommentStorageKey(product.id)
  const savedComments = localStorage.getItem(storageKey)
  const initialCount = product.commentCount ?? 0

  if (savedComments) {
    try {
      const parsedComments = JSON.parse(savedComments)

      if (Array.isArray(parsedComments)) {
        if (parsedComments.length > 0 || initialCount === 0) {
          return parsedComments
        }
      }
    } catch {
      return createInitialComments(initialCount)
    }
  }

  return createInitialComments(initialCount)
}

export default function ProductDetail() {
  const { productId } = useParams()
  const [comments, setComments] = useState([])
  const [isCommentLoaded, setIsCommentLoaded] = useState(false)

  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((item) => item.id === Number(productId))
  }, [productId])

  useEffect(() => {
    if (!product) return

    setIsCommentLoaded(false)
    setComments(loadComments(product))
    setIsCommentLoaded(true)
  }, [product])

  useEffect(() => {
    if (!product || !isCommentLoaded) return

    localStorage.setItem(
      getCommentStorageKey(product.id),
      JSON.stringify(comments)
    )
  }, [comments, product, isCommentLoaded])

  function handleAddComment(content) {
    const newComment = {
      id: Date.now(),
      writer: '나',
      content,
      createdAt: '방금 전',
    }

    setComments((prevComments) => [...prevComments, newComment])
  }

  if (!product) {
    return (
      <section className="product-detail">
        <div className="product-detail__not-found">
          <h1>상품을 찾을 수 없습니다.</h1>
          <p>존재하지 않거나 삭제된 상품입니다.</p>
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
            <span>판매자 {product.seller ?? '판매자'}</span>
            <span>{product.location ?? '세종대학교'}</span>
          </div>

          <p className="product-detail__content">
            {product.content ?? '등록된 상품 설명이 없습니다.'}
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