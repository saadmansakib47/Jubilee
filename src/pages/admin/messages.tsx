import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import {
    Mail,
    Phone,
    User,
    Calendar,
    Clock,
    Search,
    Filter,
    Trash2,
    Eye,
    ArrowLeft,
    AlertCircle,
    CheckCircle,
    Reply,
    X,
    Loader2,
    MessageSquare,
} from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { ProtectedRoute } from "@/components/admin/protectedRoute"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { contactApi } from "@/services/api"
import { ANIMATION_VARIANTS } from "@/utils/constants"

interface ContactMessage {
    _id: string
    name: string
    email: string
    phone: string
    subject: string
    message: string
    preferredContact: "email" | "phone"
    urgency: "low" | "medium" | "high"
    status: "unread" | "read" | "replied"
    createdAt: string
    updatedAt: string
}

const AdminMessagesPage: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState<string | null>(null)
    const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null)

    // Fetch messages on mount
    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await contactApi.getMessages() as any
            if (response.success && response.data) {
                setMessages(response.data)
            } else {
                setError(response.error || "Failed to load messages")
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleStatusUpdate = async (messageId: string, newStatus: string) => {
        setIsUpdatingStatus(messageId)

        try {
            const response = await contactApi.updateMessageStatus(messageId, newStatus) as any
            if (response.success) {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg._id === messageId ? { ...msg, status: newStatus as ContactMessage["status"] } : msg
                    )
                )
                if (selectedMessage?._id === messageId) {
                    setSelectedMessage((prev) => prev ? { ...prev, status: newStatus as ContactMessage["status"] } : null)
                }
            }
        } catch (err) {
            console.error("Failed to update status:", err)
        } finally {
            setIsUpdatingStatus(null)
        }
    }

    const handleDelete = async (messageId: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return

        setIsDeleting(messageId)

        try {
            const response = await contactApi.deleteMessage(messageId) as any
            if (response.success) {
                setMessages((prev) => prev.filter((msg) => msg._id !== messageId))
                if (selectedMessage?._id === messageId) {
                    setIsModalOpen(false)
                    setSelectedMessage(null)
                }
            }
        } catch (err) {
            console.error("Failed to delete message:", err)
        } finally {
            setIsDeleting(null)
        }
    }

    const openMessageModal = (message: ContactMessage) => {
        setSelectedMessage(message)
        setIsModalOpen(true)

        // Mark as read if currently unread
        if (message.status === "unread") {
            handleStatusUpdate(message._id, "read")
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    // Filter messages
    const filteredMessages = messages.filter((msg) => {
        const matchesSearch =
            searchQuery === "" ||
            msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.subject.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesFilter = filterStatus === "all" || msg.status === filterStatus

        return matchesSearch && matchesFilter
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "unread":
                return "bg-orange-100 text-orange-700"
            case "read":
                return "bg-blue-100 text-blue-700"
            case "replied":
                return "bg-green-100 text-green-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    const getUrgencyBadge = (urgency: string) => {
        switch (urgency) {
            case "high":
                return "bg-red-100 text-red-700"
            case "medium":
                return "bg-orange-100 text-orange-700"
            case "low":
                return "bg-blue-100 text-blue-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    const unreadCount = messages.filter((msg) => msg.status === "unread").length

    return (
        <ProtectedRoute adminOnly>
            <Layout title="Contact Messages" noFooter>
                <div className="min-h-screen bg-neutral-offWhite">
                    {/* Header */}
                    <div className="bg-white border-b border-neutral-border">
                        <div className="container-custom py-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => navigate("/admin/dashboard")}
                                        className="p-2 hover:bg-primary-light rounded-lg transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-neutral-text" />
                                    </button>
                                    <div>
                                        <h1 className="font-display text-3xl font-semibold text-neutral-text">
                                            Contact Messages
                                            {unreadCount > 0 && (
                                                <span className="ml-3 px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                                                    {unreadCount} new
                                                </span>
                                            )}
                                        </h1>
                                        <p className="text-neutral-muted">
                                            View and manage messages from visitors
                                        </p>
                                    </div>
                                </div>
                                <Button variant="outline" onClick={fetchMessages}>
                                    Refresh
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="container-custom py-8">
                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-12 h-12 text-primary-deep animate-spin" />
                            </div>
                        )}

                        {/* Error State */}
                        {!isLoading && error && (
                            <Card>
                                <div className="text-center py-12">
                                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-neutral-text mb-2">
                                        Failed to load messages
                                    </h3>
                                    <p className="text-neutral-muted mb-4">{error}</p>
                                    <Button variant="primary" onClick={fetchMessages}>
                                        Try Again
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {/* Messages List */}
                        {!isLoading && !error && (
                            <>
                                {/* Search and Filter */}
                                <div className="flex flex-col md:flex-row gap-4 mb-6">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                        <input
                                            type="text"
                                            placeholder="Search by name, email, or subject..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep focus:ring-2 focus:ring-primary-light outline-none"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Filter className="w-5 h-5 text-neutral-muted" />
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep outline-none"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="unread">Unread</option>
                                            <option value="read">Read</option>
                                            <option value="replied">Replied</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Messages Grid */}
                                <div className="space-y-4">
                                    {filteredMessages.map((message, index) => (
                                        <motion.div
                                            key={message._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Card
                                                hover
                                                className={`cursor-pointer ${message.status === "unread" ? "border-l-4 border-l-orange-500" : ""}`}
                                                onClick={() => openMessageModal(message)}
                                            >
                                                <div className="p-6">
                                                    <div className="flex flex-col lg:flex-row gap-4">
                                                        {/* Message Info */}
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between mb-3">
                                                                <div>
                                                                    <h3 className="text-lg font-semibold text-neutral-text">
                                                                        {message.name}
                                                                    </h3>
                                                                    <div className="flex items-center space-x-3 text-sm text-neutral-muted mt-1">
                                                                        <div className="flex items-center space-x-1">
                                                                            <Mail className="w-4 h-4" />
                                                                            <span>{message.email}</span>
                                                                        </div>
                                                                        {message.phone && (
                                                                            <div className="flex items-center space-x-1">
                                                                                <Phone className="w-4 h-4" />
                                                                                <span>{message.phone}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(message.status)}`}>
                                                                        {message.status.toUpperCase()}
                                                                    </span>
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getUrgencyBadge(message.urgency)}`}>
                                                                        {message.urgency.toUpperCase()}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <h4 className="font-medium text-neutral-text mb-2">
                                                                {message.subject}
                                                            </h4>
                                                            <p className="text-sm text-neutral-muted line-clamp-2">
                                                                {message.message}
                                                            </p>

                                                            <div className="flex items-center space-x-4 mt-4 text-xs text-neutral-muted">
                                                                <div className="flex items-center space-x-1">
                                                                    <Calendar className="w-3 h-3" />
                                                                    <span>{formatDate(message.createdAt)}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    <span>{formatTime(message.createdAt)}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex flex-row lg:flex-col gap-2 lg:w-32">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    openMessageModal(message)
                                                                }}
                                                            >
                                                                <Eye className="w-4 h-4 mr-1" />
                                                                View
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="flex-1 text-red-500 hover:bg-red-50"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleDelete(message._id)
                                                                }}
                                                                disabled={isDeleting === message._id}
                                                            >
                                                                {isDeleting === message._id ? (
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <Trash2 className="w-4 h-4 mr-1" />
                                                                        Delete
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}

                                    {filteredMessages.length === 0 && (
                                        <Card>
                                            <div className="text-center py-12">
                                                <MessageSquare className="w-16 h-16 text-neutral-muted mx-auto mb-4" />
                                                <h3 className="text-xl font-semibold text-neutral-text mb-2">
                                                    No messages found
                                                </h3>
                                                <p className="text-neutral-muted">
                                                    {searchQuery || filterStatus !== "all"
                                                        ? "Try adjusting your search or filters"
                                                        : "No contact messages yet"}
                                                </p>
                                            </div>
                                        </Card>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Message Detail Modal */}
                <AnimatePresence>
                    {isModalOpen && selectedMessage && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsModalOpen(false)}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            />

                            {/* Modal */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            >
                                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                                    {/* Modal Header */}
                                    <div className="sticky top-0 bg-white px-6 py-4 border-b border-neutral-border flex items-center justify-between rounded-t-3xl">
                                        <div>
                                            <h2 className="font-display text-2xl font-semibold text-neutral-text">
                                                Message Details
                                            </h2>
                                            <p className="text-sm text-neutral-muted">
                                                From {selectedMessage.name}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="p-2 hover:bg-neutral-offWhite rounded-full transition-colors"
                                        >
                                            <X className="w-5 h-5 text-neutral-muted" />
                                        </button>
                                    </div>

                                    {/* Modal Content */}
                                    <div className="p-6 space-y-6">
                                        {/* Sender Info */}
                                        <div className="bg-neutral-offWhite rounded-xl p-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-medium text-neutral-muted">Name</label>
                                                    <p className="text-neutral-text font-medium">{selectedMessage.name}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-neutral-muted">Email</label>
                                                    <p className="text-neutral-text font-medium">{selectedMessage.email}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-neutral-muted">Phone</label>
                                                    <p className="text-neutral-text font-medium">{selectedMessage.phone || "N/A"}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-neutral-muted">Preferred Contact</label>
                                                    <p className="text-neutral-text font-medium capitalize">{selectedMessage.preferredContact}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label className="text-sm font-medium text-neutral-muted block mb-1">Subject</label>
                                            <p className="text-lg font-semibold text-neutral-text">{selectedMessage.subject}</p>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="text-sm font-medium text-neutral-muted block mb-1">Message</label>
                                            <div className="bg-neutral-offWhite rounded-xl p-4">
                                                <p className="text-neutral-text whitespace-pre-wrap">{selectedMessage.message}</p>
                                            </div>
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-neutral-muted">Status:</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedMessage.status)}`}>
                                                    {selectedMessage.status.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-neutral-muted">Urgency:</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getUrgencyBadge(selectedMessage.urgency)}`}>
                                                    {selectedMessage.urgency.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="text-neutral-muted">
                                                Received: {formatDate(selectedMessage.createdAt)} at {formatTime(selectedMessage.createdAt)}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-border">
                                            {selectedMessage.status !== "replied" && (
                                                <Button
                                                    variant="primary"
                                                    onClick={() => handleStatusUpdate(selectedMessage._id, "replied")}
                                                    disabled={isUpdatingStatus === selectedMessage._id}
                                                >
                                                    {isUpdatingStatus === selectedMessage._id ? (
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    ) : (
                                                        <Reply className="w-4 h-4 mr-2" />
                                                    )}
                                                    Mark as Replied
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline"
                                                onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`, "_blank")}
                                            >
                                                <Mail className="w-4 h-4 mr-2" />
                                                Reply via Email
                                            </Button>
                                            {selectedMessage.phone && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => window.open(`tel:${selectedMessage.phone}`, "_blank")}
                                                >
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    Call
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                className="text-red-500 hover:bg-red-50"
                                                onClick={() => handleDelete(selectedMessage._id)}
                                                disabled={isDeleting === selectedMessage._id}
                                            >
                                                {isDeleting === selectedMessage._id ? (
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                )}
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </Layout>
        </ProtectedRoute>
    )
}

export default AdminMessagesPage

export const Head = () => (
    <title>Contact Messages - Admin - Virtual Chamber</title>
)
