import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, Check, Calendar, MessageSquare, AlertCircle } from "lucide-react"
import { notificationApi } from "@/services/api"

interface Notification {
    _id: string
    type: "appointment_request" | "contact_message" | "system" | "appointment_reminder"
    message: string
    isRead: boolean
    createdAt: string
}

export const NotificationBell: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const fetchNotifications = async () => {
        setIsLoading(true)
        try {
            const [notifResponse, countResponse] = await Promise.all([
                notificationApi.getAll(true),
                notificationApi.getUnreadCount(),
            ])
            if (notifResponse.success && notifResponse.data) {
                setNotifications(notifResponse.data as Notification[])
            }
            if (countResponse.success && countResponse.data) {
                setUnreadCount((countResponse.data as any).count || 0)
            }
        } catch (error) {
            console.error("Failed to fetch notifications:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchNotifications()
        // Poll for new notifications every 30 seconds
        const interval = setInterval(fetchNotifications, 30000)
        return () => clearInterval(interval)
    }, [])

    const handleMarkAsRead = async (id: string) => {
        try {
            await notificationApi.markAsRead(id)
            setNotifications((prev) =>
                prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
            )
            setUnreadCount((prev) => Math.max(0, prev - 1))
        } catch (error) {
            console.error("Failed to mark as read:", error)
        }
    }

    const handleMarkAllAsRead = async () => {
        try {
            await notificationApi.markAllAsRead()
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
            setUnreadCount(0)
        } catch (error) {
            console.error("Failed to mark all as read:", error)
        }
    }

    const getIcon = (type: Notification["type"]) => {
        switch (type) {
            case "appointment_request":
            case "appointment_reminder":
                return <Calendar className="w-4 h-4" />
            case "contact_message":
                return <MessageSquare className="w-4 h-4" />
            default:
                return <AlertCircle className="w-4 h-4" />
        }
    }

    const getTypeColor = (type: Notification["type"]) => {
        switch (type) {
            case "appointment_request":
                return "bg-blue-100 text-blue-600"
            case "appointment_reminder":
                return "bg-orange-100 text-orange-600"
            case "contact_message":
                return "bg-green-100 text-green-600"
            default:
                return "bg-gray-100 text-gray-600"
        }
    }

    return (
        <div className="relative">
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 hover:bg-primary-light rounded-full transition-colors"
            >
                <Bell className="w-6 h-6 text-primary-deep" />
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </motion.span>
                )}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-neutral-border z-50 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-neutral-border flex items-center justify-between">
                                <h3 className="font-semibold text-neutral-text">Notifications</h3>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={handleMarkAllAsRead}
                                        className="text-xs text-primary-deep hover:underline"
                                    >
                                        Mark all as read
                                    </button>
                                )}
                            </div>

                            {/* Notifications List */}
                            <div className="max-h-80 overflow-y-auto">
                                {isLoading ? (
                                    <div className="p-4 text-center text-neutral-muted">
                                        Loading...
                                    </div>
                                ) : notifications.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <Bell className="w-10 h-10 text-neutral-border mx-auto mb-2" />
                                        <p className="text-neutral-muted text-sm">
                                            No notifications yet
                                        </p>
                                    </div>
                                ) : (
                                    notifications.slice(0, 10).map((notification) => (
                                        <div
                                            key={notification._id}
                                            onClick={() => !notification.isRead && handleMarkAsRead(notification._id)}
                                            className={`px-4 py-3 border-b border-neutral-border last:border-0 cursor-pointer hover:bg-neutral-offWhite transition-colors ${!notification.isRead ? "bg-primary-light/30" : ""
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                                                    {getIcon(notification.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-neutral-text line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-neutral-muted mt-1">
                                                        {new Date(notification.createdAt).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>
                                                {!notification.isRead && (
                                                    <div className="w-2 h-2 bg-primary-deep rounded-full flex-shrink-0 mt-2" />
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            {notifications.length > 0 && (
                                <div className="px-4 py-3 border-t border-neutral-border">
                                    <a
                                        href="/admin/appointments"
                                        className="text-sm text-primary-deep hover:underline block text-center"
                                    >
                                        View all notifications
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
