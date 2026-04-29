/**
 * Axios instance and auth API calls.
 *
 * All backend requests go through this module.
 * To change the base URL (e.g. for staging), update VITE_API_BASE_URL in .env.
 * The Vite proxy rewrites /api → http://localhost:8000 in development,
 * so the base URL stays relative and works in any environment.
 */

import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Attach the JWT Bearer token to every request when one is stored.
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Auth endpoints ────────────────────────────────────────────────────────────

/**
 * POST /auth/login
 * @returns {{ access_token: string, token_type: string }}
 */
export async function login(email, password) {
  const { data } = await apiClient.post('/auth/login', { email, password })
  return data
}

/**
 * GET /auth/me — requires a valid Bearer token in localStorage.
 * @returns {Object} UserOut schema
 */
export async function getMe() {
  const { data } = await apiClient.get('/auth/me')
  return data
}

export default apiClient
