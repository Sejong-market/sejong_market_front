export default function ProductRegisterForm({
  formData, customLocation, setCustomLocation, images, loading, errors, setErrors,
  handleChange, handleImageChange, handleRemoveImage, handleSubmit, navigate, setIsModalOpen
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* 상품 이미지 업로드 필드 */}
      <div className="product-register__field">
        <label>상품 이미지 ({images.length}/10)</label>
        <div className="product-register__image-container">
          <label htmlFor="image-upload" className="product-register__upload-btn">
            <span className="product-register__upload-icon">📷</span>
            <span>이미지 등록</span>
          </label>
          <input 
            type="file" 
            id="image-upload" 
            multiple 
            accept="image/*" 
            onChange={handleImageChange} 
            disabled={loading} 
            style={{ display: 'none' }} 
          />
          {images.map((url, index) => (
            <div key={index} className="product-register__preview-wrap">
              <img src={url} alt="미리보기" className="product-register__preview-img" />
              <button type="button" className="product-register__remove-btn" onClick={() => handleRemoveImage(index)} disabled={loading}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* 제목 필드 */}
      <div className="product-register__field">
        <label htmlFor="title">제목</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          placeholder="글 제목을 입력해주세요" 
          value={formData.title} 
          onChange={handleChange} 
          disabled={loading} 
          className={errors.title ? 'product-register__input--error' : ''} 
        />
        {errors.title && <p className="product-register__field-error">{errors.title}</p>}
      </div>

    {/* 카테고리 필드*/}
    <div className="product-register__field">
      <div className="product-register__label-row">
        <label htmlFor="category">카테고리</label>
        {/* 거래 제한 품목*/}
        <button 
          type="button" 
          className="product-register__notice-btn" 
          onClick={() => setIsModalOpen(true)}
        >
          [🚫 거래 제한 품목 안내 🚫]
        </button>
      </div>
        <select id="category" name="category" value={formData.category} onChange={handleChange} disabled={loading}>
          <option value="도서">도서</option>
          <option value="전공도서">전공도서</option>
          <option value="생활가전">생활가전</option>
          <option value="의류">의류</option>
          <option value="기타">기타</option>
        </select>
        {errors.category && <p className="product-register__field-error">{errors.category}</p>}
    </div>

      {/* 가격 필드 */}
      <div className="product-register__field">
        <label htmlFor="price">가격 (₩)</label>
        <input 
          type="number" 
          id="price" 
          name="price" 
          placeholder="가격을 입력해주세요" 
          value={formData.price} 
          onChange={handleChange} 
          disabled={loading} 
          className={errors.price ? 'product-register__input--error' : ''} 
        />
        {errors.price && <p className="product-register__field-error">{errors.price}</p>}
      </div>

      {/* 설명 필드 */}
      <div className="product-register__field">
        <label htmlFor="description">설명</label>
        <textarea 
          id="description" 
          name="description" 
          rows="5" 
          placeholder="상품 상태를 자세히 적어주세요." 
          value={formData.description} 
          onChange={handleChange} 
          disabled={loading}
        ></textarea>
      </div>

      {/* 희망 거래 장소 필드 */}
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

      {/* 하단 취소 및 등록 버튼 */}
      <div className="product-register__buttons">
        <button type="button" className="product-register__cancel-btn" onClick={() => navigate('/products')} disabled={loading}>취소</button>
        <button type="submit" className="product-register__submit-btn" disabled={loading}>{loading ? '등록 중...' : '등록하기'}</button>
      </div>
    </form>
  );
}