export const formatDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export const formatTime = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    })
}

export const formatDateTime = (date: Date | string): string => {
    return `${formatDate(date)} at ${formatTime(date)}`
}

export const isToday = (date: Date): boolean => {
    const today = new Date()
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    )
}

export const isFuture = (date: Date): boolean => {
    return date > new Date()
}

export const getTimeUntil = (date: Date): string => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()

    if (diff < 0) return 'Past'

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
        const days = Math.floor(hours / 24)
        return `${days} day${days > 1 ? 's' : ''}`
    }

    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`
    }

    return `${minutes} minute${minutes > 1 ? 's' : ''}`
}

export const addHours = (date: Date, hours: number): Date => {
    const newDate = new Date(date)
    newDate.setHours(newDate.getHours() + hours)
    return newDate
}