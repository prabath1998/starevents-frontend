import axios from 'axios'

const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const useProxy = import.meta.env.VITE_USE_PROXY === 'true'
const baseURL = useProxy ? '/api' : base

const http = axios.create({
  baseURL,
  withCredentials: false,
})

let accessToken = localStorage.getItem('access_token')
let refreshToken = localStorage.getItem('refresh_token')

export function setTokens({ access, refresh }) {
  if (access) { accessToken = access; localStorage.setItem('access_token', access) }
  if (refresh) { refreshToken = refresh; localStorage.setItem('refresh_token', refresh) }
}

export function clearTokens() {
  accessToken = null; refreshToken = null
  localStorage.removeItem('access_token'); localStorage.removeItem('refresh_token')
}

http.interceptors.request.use(config => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

// auto-refresh on 401
let refreshing = null
http.interceptors.response.use(
  r => r,
  async err => {
    const original = err.config
    if (err.response?.status === 401 && refreshToken && !original._retry) {
      original._retry = true
      try {
        refreshing = refreshing || axios.post(`${baseURL}/auth/refresh`, { refreshToken })
        const { data } = await refreshing
        refreshing = null
        setTokens({ access: data.accessToken, refresh: data.refreshToken })
        original.headers.Authorization = `Bearer ${data.accessToken}`
        return http(original)
      } catch (e) {
        refreshing = null
        clearTokens()
        window.location.href = '/login'
      }
    }
    throw err
  }
)

export default http
