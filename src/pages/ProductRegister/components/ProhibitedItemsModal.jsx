import './ProhibitedItemsModal.css';

export default function ProhibitedItemsModal({ isOpen, onClose }) {
  if (!isOpen) return null; // 팝업이 닫혀있을 때는 아무것도 렌더링하지 않음

  return (
    <div className="prohibited-modal-overlay" onClick={onClose}>
      <div className="prohibited-modal" onClick={(e) => e.stopPropagation()}>
        <div className="prohibited-modal__header">
          <h3>🚫 거래 제한 품목 안내</h3>
          <button type="button" className="prohibited-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="prohibited-modal__body">
          <p className="prohibited-modal__notice">
            안전하고 법적으로 올바른 교내 거래를 위해 아래 물품은 등록 및 거래가 엄격히 제한됩니다. 
            위반 시 게시물이 삭제되거나 이용 제재를 받을 수 있습니다.
          </p>
          <ul className="prohibited-modal__list">
            <li>
              <strong>주류 및 기호식품</strong>
              <span>주류 전체(전통주 포함), 담배, 전자담배 및 관련 기기 일체</span>
            </li>
            <li>
              <strong>의약품 및 건강기능식품</strong>
              <span>처방전 필요 약품, 일반 의약품, 타이레놀, 비타민/홍삼 등 개봉·미개봉 건강기능식품 전체</span>
            </li>
            <li>
              <strong>대학/학사 관련 권리 매매</strong>
              <span>학생증 대여·양도, 대리 수강신청 권리, 교재 PDF 불법 복제본 등 법적/학칙 위반 품목</span>
            </li>
            <li>
              <strong>가품 및 지식재산권 침해 물품</strong>
              <span>짝퉁, 레플리카, 저작권 및 상표권을 침해하는 모든 위조 상품</span>
            </li>
            <li>
              <strong>개인정보 및 유료 계정</strong>
              <span>OTT 공유 계정, 계정 분양, 기프티콘 단가 후려치기용 번호판, 개인정보가 포함된 문서</span>
            </li>
            <li>
              <strong>기타 법적 제한 물품</strong>
              <span>도수 있는 안경/콘택트렌즈, 수제 식품(직접 만든 반찬 등), 총포/도검류, 성인용품</span>
            </li>
          </ul>
        </div>
        <div className="prohibited-modal__footer">
          <button type="button" className="prohibited-modal__confirm" onClick={onClose}>확인했습니다</button>
        </div>
      </div>
    </div>
  );
}