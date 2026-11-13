import { useState, FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated, loading: authLoading } = useAuth()
  const { error: showError, success: showSuccess } = useToast()

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }


  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      showSuccess('Login successful! Welcome back.')
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Login failed. Please try again.'
      showError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 p-6 sm:p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl animate-fade-in-up">
        <div className="animate-slide-in-left">
          <h2 className="mt-2 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            Sign in to SkyCast
          </h2>
        </div>
        <form className="mt-6 sm:mt-8 space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-lg shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-t-lg relative block w-full px-3 py-2.5 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-base transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-b-lg relative block w-full px-3 py-2.5 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-base transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                placeholder="Password"
              />
            </div>
          </div>


          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all duration-200"
              />
