"use client"

import { useState, useEffect, createContext, useContext } from 'react'
import { X } from 'lucide-react'

type ToastProps = {
  title: string
  description?: string
  type?: 'default' | 'success' | 'error' | 'warning'
  duration?: number
  action?: React.ReactNode
}

type ToastContextType = {
  toast: (props: ToastProps) => void
    removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(ToastProps & { id: number })[]>([])
  const [lastId, setLastId] = useState(0)

  const toast = (props: ToastProps) => {
    const id = lastId + 1
    setLastId(id)
    setToasts((prev) => [...prev, { ...props, id }])
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setToasts((prev) => {
        if (prev.length === 0) return prev
        return prev.filter((toast) => {
          if (toast.duration === undefined) return true
          return toast.duration > 0
        })
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{toast.title}</h3>
                {toast.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {toast.action && <div className="mt-2">{toast.action}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
} 