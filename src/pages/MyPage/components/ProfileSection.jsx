export default function ProfileSection({ profile, loading }) {
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
    </div>
  );
}