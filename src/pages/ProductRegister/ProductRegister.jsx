import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from './api';
import ProhibitedItemsModal from './components/ProhibitedItemsModal';
import './ProductRegister.css';

export default function ProductRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '도서',
    price: '',
    description: '',
    status: '판매중',
    location: '학생회관'
  });
  const [customLocation, setCustomLocation] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // 서버 등록 실패용 공통 에러
  const [errors, setErrors] = useState({}); // 각 필드별 유효성 검증 에러
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (name === 'location' && errors.customLocation) {
      setErrors((prev) => ({ ...prev, customLocation: '' }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      alert('사진은 최대 10장까지만 등록할 수 있습니다.');
      return;
    }
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newUrls]);
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = '상품명을 입력해주세요.';
    if (!formData.price.trim()) newErrors.price = '가격을 입력해주세요.';
    if (!formData.description.trim()) newErrors.description = '설명을 입력해주세요.';
    if (formData.location === '직접입력' && !customLocation.trim()) {
      newErrors.customLocation = '거래 장소를 입력해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const finalLocation = formData.location === '직접입력' ? customLocation : formData.location;
      await createProduct({ ...formData, location: finalLocation, images });
      navigate('/products');
    } catch {
      setError('상품 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-register">
      <div className="product-register__container">
        <h2 className="product-register__title">상품 정보</h2>
        {error && <p className="product-register__error">{error}</p>}

        <form onSubmit={handleSubmit} className="product-register__form">

          <div className="product-register__field">
            <label>상품 이미지</label>
            <div className="product-register__image-list">
              <label className="product-register__upload-btn">
                <span className="product-register__upload-icon">📸</span>
                <span>{images.length}/10</span>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} disabled={loading || images.length >= 10} />
              </label>

              {images.map((url, index) => (
                <div key={index} className="product-register__preview-wrap">
                  <img src={url} alt={`미리보기 ${index + 1}`} className="product-register__preview-img" />
                  <button type="button" className="product-register__remove-btn" onClick={() => handleRemoveImage(index)} disabled={loading}>✕</button>
                </div>
              ))}
            </div>
          </div>

          <div className="product-register__field">
            <label htmlFor="title">상품명</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              placeholder="상품명을 입력해주세요" 
              value={formData.title} 
              onChange={handleChange} 
              disabled={loading} 
              className={errors.title ? 'product-register__input--error' : ''}
            />
            {errors.title && <p className="product-register__field-error">{errors.title}</p>}
          </div>

          <div className="product-register__field">
            <div className="product-register__label-row">
              <label htmlFor="category">카테고리</label>
              <button type="button" className="product-register__info-btn" onClick={() => setIsModalOpen(true)}>
                ⚠️ 거래 제한 품목 안내
              </button>
            </div>
            <select id="category" name="category" value={formData.category} onChange={handleChange} disabled={loading}>
              <option value="도서"> 도서/음반/문구</option>
              <option value="전자기기"> 전자기기/가전</option>
              <option value="생활용품"> 생활용품</option>
              <option value="의류/잡화"> 의류/잡화</option>
              <option value="뷰티"> 뷰티</option>
              <option value="무료나눔"> 무료나눔</option>
              <option value="기타"> 기타</option>
            </select>
          </div>

          <div className="product-register__field">
            <label htmlFor="price">판매 가격 </label>
            <input 
              type="number" 
              id="price" 
              name="price" 
              placeholder="₩ 판매 가격" 
              value={formData.price} 
              onChange={handleChange} 
              disabled={loading} 
              className={`product-register__no-spin ${errors.price ? 'product-register__input--error' : ''}`} 
            />
            {errors.price && <p className="product-register__field-error">{errors.price}</p>}
          </div>

          <div className="product-register__field">
            <label htmlFor="description">설명</label>
            <div className="product-register__textarea-container">
              <textarea
                id="description"
                name="description"
                rows="10"
                placeholder="신뢰할 수 있는 거래를 위해 상품 설명을 자세히 적어주세요.&#10;&#10;- 구매 시기 (년, 월, 일)&#10;- 사용 기간&#10;- 제품 상태(하자 여부)&#10;- 희망 거래 방식 및 기타 특이사항&#10;&#10;※ 학교 커뮤니티 규정에 어긋나는 금지 물품 등록 시 게시물이 삭제될 수 있습니다."
                value={formData.description}
                onChange={handleChange}
                maxLength={5000}
                disabled={loading}
                className={errors.description ? 'product-register__input--error' : ''}
              ></textarea>
              <div className="product-register__char-count">
                {formData.description ? formData.description.length : 0} / 5000
              </div>
            </div>
            {errors.description && <p className="product-register__field-error">{errors.description}</p>}
          </div>

          <div className="product-register__field">
            <label htmlFor="location">희망 거래 장소</label>
            <select id="location" name="location" value={formData.location} onChange={handleChange} disabled={loading}>
              <option value="학생회관">학생회관</option>
              <option value="대양AI센터">대양AI센터</option>
              <option value="군자관">군자관</option>
              <option value="학술정보원">학술정보원</option>
              <option value="광개토관">광개토관</option>
              <option value="정문/어린이대공원역">정문</option>
              <option value="쪽문">쪽문</option>
              <option value="직접입력">직접 입력</option>
            </select>
            {formData.location === '직접입력' && (
              <>
                <input 
                  type="text" 
                  placeholder="희망하시는 거래 장소를 적어주세요" 
                  value={customLocation} 
                  onChange={(e) => {
                    setCustomLocation(e.target.value);
                    if (errors.customLocation) {
                      setErrors((prev) => ({ ...prev, customLocation: '' }));
                    }
                  }} 
                  disabled={loading} 
                  className={`product-register__custom-input ${errors.customLocation ? 'product-register__input--error' : ''}`} 
                />
                {errors.customLocation && <p className="product-register__field-error">{errors.customLocation}</p>}
              </>
            )}
          </div>

          <div className="product-register__buttons">
            <button type="button" className="product-register__cancel-btn" onClick={() => navigate('/products')} disabled={loading}>취소</button>
            <button type="submit" className="product-register__submit-btn" disabled={loading}>{loading ? '등록 중...' : '등록하기'}</button>
          </div>
        </form>
      </div>

      <ProhibitedItemsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}