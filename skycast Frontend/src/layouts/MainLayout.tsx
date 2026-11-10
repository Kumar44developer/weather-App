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
