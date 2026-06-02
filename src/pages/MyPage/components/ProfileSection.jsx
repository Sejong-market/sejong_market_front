// src/pages/MyPage/components/ProfileSection.jsx

export default function ProfileSection({ profile, loading, onEditClick, onDeleteAccount }) { // ◀ onDeleteAccount prop 추가
  if (loading) {
    return <div className="profile-section__loading">프로필을 불러오는 중...</div>;
  }

  if (!profile) {
    return <div className="profile-section__empty">프로필 정보가 없습니다.</div>;
  }

  const initial = profile.nickname ? profile.nickname.charAt(0) : '?';

  return (
    <div className="profile-section">
      <div className="profile-section__avatar">{initial}</div>
      <div className="profile-section__info">
        <div className="profile-section__name">{profile.nickname}</div>
        <div className="profile-section__email">{profile.email}</div>
      </div>
      
      {/* 정보 수정과 회원 탈퇴 버튼이 수직 정렬되도록 컨테이너로 감싸줍니다 */}
      <div className="profile-section__actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
        <button 
          type="button" 
          className="profile-section__edit-btn"
          onClick={onEditClick}
        >
          정보 수정
        </button>
        
        {/* 요청하신 작은 회색 글씨 스타일의 회원 탈퇴 기능 링크/버튼 추가 */}
        <button
          type="button"
          className="profile-section__delete-btn"
          onClick={onDeleteAccount} 
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}