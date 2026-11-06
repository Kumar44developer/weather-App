import { useToast } from '../contexts/ToastContext'

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-white'
      case 'info':
      default:
        return 'bg-blue-500 text-white'
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
      default:
        return 'ℹ'
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-2 sm:right-4 z-50 flex flex-col gap-2 max-w-[calc(100%-1rem)] sm:max-w-md w-full px-2 sm:px-0">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`${getToastStyles(
            toast.type
