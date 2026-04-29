/**
 * AuthContext — central authentication state.
 *
 * Provides:
 *   user        — current user object or null
 *   isLoading   — true while the initial /auth/me check is in-flight
 *   login()     — persist token, fetch user, return user object
 *   logout()    — clear token and user state
 */

import { createContext, useCallback, useEffect, useState } from 'react'
import { getMe, login as apiLogin } from '../api/authApi'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // On mount, restore session from localStorage if a token exists.
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      setIsLoading(false)
      return
    }
    getMe()
      .then(setUser)
      .catch(() => localStorage.removeItem('access_token'))
      .finally(() => setIsLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const { access_token } = await apiLogin(email, password)
    localStorage.setItem('access_token', access_token)
    const userData = await getMe()
    setUser(userData)
    return userData
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('access_token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
