import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) return
    try {
      const payload = jwtDecode(token)
      const roles = []
        .concat(payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role || [])
      const idStr =
        payload.sub || payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
      setUser({ id: Number(idStr), email: payload.email, roles })
    } catch (e) {
      console.error('JWT decode failed', e)
    }
  }, [])

  const value = { user, setUser, logout: () => { localStorage.clear(); setUser(null) } }
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() { return useContext(AuthCtx) }
export function hasRole(user, role) { return user?.roles?.includes(role) }
