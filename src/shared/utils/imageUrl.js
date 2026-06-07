const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'
const CDN_BASE = import.meta.env.VITE_CDN_BASE_URL

function getAssetBaseUrl() {
  if (CDN_BASE) {
    return CDN_BASE.replace(/\/$/, '')
  }

  return API_BASE.replace(/\/api\/?$/, '')
}

export function resolveImageUrl(imageUrl) {
  if (!imageUrl) {
    return null
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl
  }

  const base = getAssetBaseUrl()
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`

  return `${base}${path}`
}
