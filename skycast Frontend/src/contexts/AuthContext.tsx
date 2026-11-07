import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService, UserResponse } from '../services/auth'

interface AuthContextType {
  user: UserResponse | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = authService.getToken()
      if (token) {
        try {
          const userData = await authService.getCurrentUser()
          setUser(userData)
        } catch (error) {
          // Token invalid, clear it
          authService.logout()
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password })
    authService.setToken(response.access_token)

    const userData = await authService.getCurrentUser()
    setUser(userData)

    // Navigation handled by component using this function
    window.location.href = '/dashboard'
  }

  const register = async (name: string, email: string, password: string) => {
    await authService.register({ name, email, password })

    // After registration, automatically log in
    await login(email, password)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
