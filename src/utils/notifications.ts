export const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // Implement notification logic (toast, alert, etc.)
    console.log(`[${type.toUpperCase()}]: ${message}`)
}

export const showSuccess = (message: string) => showNotification(message, 'success')
export const showError = (message: string) => showNotification(message, 'error')
export const showInfo = (message: string) => showNotification(message, 'info')
