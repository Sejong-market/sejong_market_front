import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from './api';
import './ProductRegister.css';

export default function ProductRegister() {
  const navigate = useNavigate();
  
  // 폼 입력 상태 관리
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    status: '판매중', // 기본값
    image: '/products/default.png' // 임시 기본 이미지 주소
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 인풋 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 간단한 유효성 검사
    if (!formData.title.trim() || !formData.price || !formData.description.trim()) {
      alert('모든 필드를 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      // 전송할 데이터 포맷 가공 (가격을 숫자형으로 변환)
      const submitData = {
        ...formData,
        price: Number(formData.price)
      };

      await createProduct(submitData);
      alert('상품이 성공적으로 등록되었습니다 🎉');
      navigate('/products'); // 등록 완료 후 목록 페이지로 이동
    } catch (err) {
      setError(err.message ?? '상품 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-register">
      <div className="product-register__container">
        <h2 className="product-register__title">중고상품 등록</h2>
        
        {error && <p className="product-register__error">{error}</p>}

        <form onSubmit={handleSubmit} className="product-register__form">
          {/* 상품 제목 */}
          <div className="product-register__field">
            <label htmlFor="title">상품명</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="상품 이름을 입력해주세요"
              value={formData.title}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* 상품 가격 */}
          <div className="product-register__field">
            <label htmlFor="price">판매 가격 (₩)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="숫자만 입력해주세요 (예: 15000)"
              value={formData.price}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* 판매 상태 */}
          <div className="product-register__field">
            <label htmlFor="status">판매 상태</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="판매중">판매중</option>
              <option value="예약중">예약중</option>
              <option value="판매완료">판매완료</option>
            </select>
          </div>

          {/* 상품 설명 */}
          <div className="product-register__field">
            <label htmlFor="description">설명</label>
            <textarea
              id="description"
              name="description"
              rows="6"
              placeholder="신뢰할 수 있는 거래를 위해 상품 상태를 자세히 적어주세요. (대여 가능 여부, 구매 시기, 하자 유무 등)"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
            ></textarea>
          </div>

          {/* 하단 버튼 구역 */}
          <div className="product-register__buttons">
            <button
              type="button"
              className="product-register__cancel-btn"
              onClick={() => navigate('/products')}
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              className="product-register__submit-btn"
              disabled={loading}
            >
              {loading ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}