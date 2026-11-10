import { Link, Outlet } from 'react-router-dom'
import BackgroundVideo from '../components/BackgroundVideo'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export default function MainLayout() {
  const { logout, user } = useAuth()
  const { info: showInfo } = useToast()

  const handleLogout = () => {
    showInfo('Logging out...')
    logout()
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <BackgroundVideo />
      <div className="relative z-10">
        <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-20 animate-slide-down">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <Link 
                    to="/dashboard" 
                    className="text-xl sm:text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
                  >
                    SkyCast
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/dashboard"
                    className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium hover:text-indigo-600 transition-colors duration-200"
                  >
