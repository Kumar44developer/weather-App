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
          )} backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl shadow-2xl flex items-start gap-2 sm:gap-3 animate-fade-in-up hover:scale-[1.02] transition-all duration-300`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <span className="font-bold text-base sm:text-lg flex-shrink-0">{getIcon(toast.type)}</span>
          <p className="flex-1 text-xs sm:text-sm leading-relaxed">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-white hover:text-gray-200 active:scale-90 font-bold text-lg sm:text-xl leading-none transition-transform duration-200"
            aria-label="Close"
          >
