import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          <div className="text-gray-600 font-medium">Loading...</div>
        </div>
      </div>
    )
  }
