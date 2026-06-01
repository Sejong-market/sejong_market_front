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
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        images: images.length > 0 ? images : ['/products/default.png']
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
            <input type="text" id="title" name="title" placeholder="상품명을 입력해주세요" value={formData.title} onChange={handleChange} disabled={loading} />
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
              <option value="정문/어린이대공원역">정문</option>
              <option value="쪽문(쪽문상권)">쪽문</option>
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

      <ProhibitedItemsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}