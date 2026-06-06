export default function ProductRegisterForm({
  formData, imagePreview, loading, errors,
  handleChange, handleImageChange, handleRemoveImage, handleSubmit, navigate
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* 대표 이미지 업로드 필드 (단일 이미지) */}
      <div className="product-register__field">
        <label>상품 대표 이미지 (선택, 최대 10MB)</label>
        <div className="product-register__image-container">
          {!imagePreview ? (
            <>
              <label htmlFor="image-upload" className="product-register__upload-btn">
                <span className="product-register__upload-icon">📷</span>
                <span>이미지 등록</span>
              </label>
              <input 
                type="file" 
                id="image-upload" 
                accept="image/jpg, image/jpeg, image/png, image/gif, image/webp" 
                onChange={handleImageChange} 
                disabled={loading} 
                style={{ display: 'none' }} 
              />
            </>
          ) : (
            <div className="product-register__preview-wrap">
              <img src={imagePreview} alt="대표 이미지 미리보기" className="product-register__preview-img" />
              <button type="button" className="product-register__remove-btn" onClick={handleRemoveImage} disabled={loading}>✕</button>
            </div>
          )}
        </div>
      </div>

      {/* 상품명 필드 */}
      <div className="product-register__field">
        <label htmlFor="title">상품명 (필수)</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          placeholder="상품명을 입력해주세요 (최대 100자)" 
          value={formData.title} 
          onChange={handleChange} 
          disabled={loading} 
          maxLength={100}
          className={errors.title ? 'product-register__input--error' : ''} 
        />
        {errors.title && <p className="product-register__field-error">{errors.title}</p>}
      </div>

      {/* 가격 필드 */}
      <div className="product-register__field">
        <label htmlFor="price">판매 가격 (필수)</label>
        <input 
          type="number" 
          id="price" 
          name="price" 
          placeholder="판매 가격을 입력해주세요 (원 단위)" 
          value={formData.price} 
          onChange={handleChange} 
          disabled={loading} 
          min={0}
          className={errors.price ? 'product-register__input--error' : ''} 
        />
        {errors.price && <p className="product-register__field-error">{errors.price}</p>}
      </div>

      {/* 상품 설명 필드 */}
      <div className="product-register__field">
        <label htmlFor="content">상품 설명 (선택)</label>
        <textarea 
          id="content" 
          name="content" 
          placeholder="구매자에게 필요한 상품 정보를 상세히 적어주세요 (최대 10,000자)&#10;&#10;- 구매 시기 (년, 월, 일)&#10;- 사용 기간&#10;- 제품 상태(하자 여부)&#10;- 희망 거래 방식 및 기타 특이사항&#10;&#10;※ 학교 커뮤니티 규정에 어긋나는 금지 물품 등록 시 게시물이 삭제될 수 있습니다." 
          value={formData.content} 
          onChange={handleChange} 
          disabled={loading} 
          maxLength={10000}
          className={errors.content ? 'product-register__input--error' : ''} 
        />
        {errors.content && <p className="product-register__field-error">{errors.content}</p>}
      </div>

      {/* 하단 취소 및 등록 버튼 */}
      <div className="product-register__buttons">
        <button type="button" className="product-register__cancel-btn" onClick={() => navigate('/products')} disabled={loading}>취소</button>
        <button type="submit" className="product-register__submit-btn" disabled={loading}>{loading ? '등록 중...' : '상품 등록하기'}</button>
      </div>
    </form>
  );
}