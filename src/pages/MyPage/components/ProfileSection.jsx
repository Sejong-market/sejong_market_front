export default function ProfileSection({ profile, loading }) {
  if (loading) {
    return <div className="profile-section__loading">프로필을 불러오는 중...</div>
  }

  if (!profile) {
    return <div className="profile-section__empty">프로필 정보가 없습니다.</div>
  }

  return (
    <div className="profile-section">
      <div className="profile-section__avatar">{profile.nickname?.[0] ?? '?'}</div>
      <div>
        <h2 className="profile-section__name">{profile.nickname}</h2>
        <p className="profile-section__email">{profile.email}</p>
        {profile.department && (
          <p className="profile-section__department">{profile.department}</p>
        )}
      </div>
    </div>
  )
}
