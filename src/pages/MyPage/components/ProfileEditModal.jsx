import { useState } from 'react';
import { updateMyProfile } from '../api';

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
      // 입력된 데이터만 페이로드에 담아 전송
      const updateData = {};
      if (nickname.trim()) updateData.nickname = nickname;
      if (password.trim()) updateData.password = password;

      await updateMyProfile(updateData);
      
      alert('회원 정보가 성공적으로 수정되었습니다.');
      setNickname('');
      setPassword('');
      onRefresh(); // 수정 완료 후 마이페이지 최신화
      onClose();
    } catch (err) {
      if (err?.status === 400) {
        setError('잘못된 요청 형식입니다.');
      } else if (err?.status === 401 || err?.status === 403) {
        setError('인증에 실패했습니다. 다시 로그인해주세요.');
      } else {
        setError('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
            <button type="button" className="profile-modal__btn profile-modal__btn--cancel" onClick={onClose} disabled={loading}>
              취소
            </button>
            <button type="submit" className="profile-modal__btn profile-modal__btn--submit" disabled={loading}>
              {loading ? '수정 중...' : '수정 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}