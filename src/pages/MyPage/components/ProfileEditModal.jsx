import { useEffect, useState } from 'react';
import { updateMyProfile } from '../api';

export default function ProfileEditModal({ isOpen, onClose, currentNickname, onRefresh }) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setNickname('');
    setPassword('');
    setError('');
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedNickname = nickname.trim();
    const trimmedPassword = password.trim();

    if (!trimmedNickname && !trimmedPassword) {
      setError('변경할 닉네임이나 비밀번호를 입력해주세요.');
      return;
    }

    if (trimmedNickname && trimmedNickname.length > 45) {
      setError('닉네임은 45자 이내로 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      await updateMyProfile({
        nickname: trimmedNickname,
        password: trimmedPassword,
      });

      alert('회원 정보가 성공적으로 수정되었습니다.');
      onRefresh();
      onClose();
    } catch (err) {
      if (err?.status === 400) {
        setError('잘못된 요청 형식입니다.');
      } else if (err?.status === 401 || err?.status === 403) {
        setError('인증에 실패했습니다. 다시 로그인해주세요.');
      } else if (err?.message === 'Failed to fetch') {
        setError('서버에 연결할 수 없습니다. 백엔드 실행 여부를 확인해주세요.');
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
            <label htmlFor="mypage-nickname">새 닉네임</label>
            <input
              id="mypage-nickname"
              type="text"
              placeholder={`현재 닉네임: ${currentNickname}`}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={45}
              autoComplete="nickname"
            />
          </div>

          <div className="profile-modal__field">
            <label htmlFor="mypage-password">새 비밀번호</label>
            <input
              id="mypage-password"
              type="password"
              placeholder="변경할 비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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
