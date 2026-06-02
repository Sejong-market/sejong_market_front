import { useState } from 'react';
// import { updateMyProfile } from '../api'; // 실제 API 연동 시 주석 해제

export default function ProfileEditModal({ isOpen, onClose, currentNickname, onRefresh }) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nickname.trim() && !password.trim()) {
      setError('변경할 닉네임이나 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const data = {};
      if (nickname.trim()) data.nickname = nickname;
      if (password.trim()) data.password = password;

      // 실제 API 호출 로직 (현재 UI-First 단계이므로 임시 주석 처리)
      // await updateMyProfile(data);
      
      // 모달 닫기 및 데이터 새로고침
      onRefresh(); 
      onClose();
    } catch (err) {
      if (err.response?.status === 400) {
        setError('잘못된 요청 형식입니다.');
      } else if (err.response?.status === 401) {
        setError('인증에 실패했습니다. 다시 로그인해주세요.');
      } else {
        setError('정보 수정 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="profile-modal__title">회원 정보 수정</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="profile-modal__field">
            <label>새 닉네임</label>
            <input
              type="text"
              placeholder={`현재 닉네임: ${currentNickname}`}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          
          <div className="profile-modal__field">
            <label>새 비밀번호</label>
            <input
              type="password"
              placeholder="변경할 비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <div className="profile-modal__error">{error}</div>}
          
          <div className="profile-modal__actions">
            <button
              type="button"
              className="profile-modal__btn profile-modal__btn--cancel"
              onClick={onClose}
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              className="profile-modal__btn profile-modal__btn--submit"
              disabled={loading}
            >
              {loading ? '수정 중...' : '수정 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}