/**
 * useAuth — convenience hook for consuming AuthContext.
 *
 * Usage:
 *   const { user, login, logout, isLoading } = useAuth()
 */

import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return context
}
