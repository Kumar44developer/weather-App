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
