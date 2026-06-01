import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from './api';
import './ProductRegister.css';

export default function ProductRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    status: '판매중',
    location: '학생회관'
  });
  const [customLocation, setCustomLocation] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.title.trim() || !formData.price || !formData.description.trim()) {
      alert('모든 필드를 입력해주세요.');
      setLoading(false);
      return;
    }

    const numericPrice = Number(formData.price);
    if (numericPrice <= 0) {
      alert('판매 가격은 0원 이하로 입력할 수 없습니다.');
      setLoading(false);
      return;
    }

    if (formData.location === '직접입력' && !customLocation.trim()) {
      alert('희망 거래 장소를 직접 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      const submitData = {
        ...formData,
        price: numericPrice,
        location: formData.location === '직접입력' ? customLocation.trim() : formData.location,
        image: imagePreview || '/products/default.png'
      };
      await createProduct(submitData);
      alert('중고 물품이 성공적으로 등록되었습니다 🎉');
      navigate('/products'); 
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
          <div className="product-register__field">
            <label>상품 이미지</label>
            <div className="product-register__image-wrap">
              <label className="product-register__image-label">
                사진 선택하기 📸
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} disabled={loading} />
              </label>
              {imagePreview && <img src={imagePreview} alt="미리보기" className="product-register__image-preview" />}
            </div>
          </div>

          <div className="product-register__field">
            <label htmlFor="title">상품명</label>
            <input type="text" id="title" name="title" placeholder="상품 이름을 입력해주세요" value={formData.title} onChange={handleChange} disabled={loading} />
          </div>

          <div className="product-register__field">
            <label htmlFor="price">판매 가격 (₩)</label>
            <input type="number" id="price" name="price" placeholder="숫자만 입력해주세요" value={formData.price} onChange={handleChange} disabled={loading} className="product-register__no-spin" />
          </div>

          <div className="product-register__field">
            <label htmlFor="location">희망 거래 장소</label>
            <select id="location" name="location" value={formData.location} onChange={handleChange} disabled={loading}>
              <option value="학생회관">학생회관</option>
              <option value="대양AI센터">대양AI센터</option>
              <option value="군자관">군자관</option>
              <option value="학술정보원">학술정보원(도서관)</option>
              <option value="광개토관">광개토관</option>
              <option value="정문/어린이대공원역">정문 / 어린이대공원역</option>
              <option value="쪽문(쪽문상권)">쪽문 주변</option>
              <option value="무관">무관 (장소 상관없음)</option>
              <option value="직접입력">✏️ 직접 입력</option>
            </select>
            {formData.location === '직접입력' && (
              <input type="text" placeholder="희망하시는 거래 장소를 상세히 적어주세요" value={customLocation} onChange={(e) => setCustomLocation(e.target.value)} disabled={loading} className="product-register__custom-input" />
            )}
          </div>

          <div className="product-register__field">
            <label htmlFor="description">설명</label>
            <textarea id="description" name="description" rows="5" placeholder="상품 상태를 자세히 적어주세요." value={formData.description} onChange={handleChange} disabled={loading}></textarea>
          </div>

          <div className="product-register__buttons">
            <button type="button" className="product-register__cancel-btn" onClick={() => navigate('/products')} disabled={loading}>취소</button>
            <button type="submit" className="product-register__submit-btn" disabled={loading}>{loading ? '등록 중...' : '등록하기'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}