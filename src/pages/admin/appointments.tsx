import React, { useState } from "react"
import { navigate } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import {
    Calendar as CalendarIcon,
    Clock,
    User,
    Mail,
    Phone,
    CheckCircle,
    XCircle,
    AlertCircle,
    Filter,
    Search,
    Plus,
    MessageSquare,
    ArrowLeft,
} from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { ProtectedRoute } from "@/components/admin/protectedRoute"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { formatDate, formatTime } from "@/utils/date"
import { ANIMATION_VARIANTS } from "@/utils/constants"

// Dummy appointment requests
const appointmentRequests = [
    {
        id: 1,
        patientName: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+1 (555) 123-4567",
        preferredDate: "2024-01-25",
        preferredTime: "14:00",
        urgency: "medium",
        reason: "Initial consultation for anxiety management",
        requestedAt: "2024-01-21T10:30:00",
        status: "pending",
    },
    {
        id: 2,
        patientName: "Michael Chen",
        email: "m.chen@example.com",
        phone: "+1 (555) 234-5678",
        preferredDate: "2024-01-26",
        preferredTime: "10:00",
        urgency: "high",
        reason: "Follow-up session for depression treatment",
        requestedAt: "2024-01-21T09:15:00",
        status: "pending",
    },
    {
        id: 3,
        patientName: "Emily Rodriguez",
        email: "emily.r@example.com",
        phone: "+1 (555) 345-6789",
        preferredDate: "2024-01-27",
        preferredTime: "16:00",
        urgency: "low",
        reason: "Couples therapy session",
        requestedAt: "2024-01-20T14:20:00",
        status: "pending",
    },
]

// Dummy scheduled appointments
const scheduledAppointments = [
    {
        id: 101,
        patientName: "Alice Williams",
        date: "2024-01-22",
        time: "14:00",
        duration: 60,
        type: "Follow-up Session",
        status: "confirmed",
        notes: "Progress check on CBT techniques",
    },
    {
        id: 102,
        patientName: "Robert Brown",
        date: "2024-01-22",
        time: "16:00",
        duration: 90,
        type: "Initial Consultation",
        status: "confirmed",
        notes: "New patient assessment",
    },
    {
        id: 103,
        patientName: "Maria Garcia",
        date: "2024-01-23",
        time: "10:00",
        duration: 60,
        type: "Therapy Session",
        status: "confirmed",
        notes: "Ongoing treatment for PTSD",
    },
]

type TabType = "requests" | "calendar" | "scheduled"

const AdminAppointmentsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>("requests")
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [searchQuery, setSearchQuery] = useState("")
    const [filterUrgency, setFilterUrgency] = useState<string>("all")
    const [selectedRequest, setSelectedRequest] = useState<number | null>(null)

    const handleApprove = (requestId: number) => {
        console.log("Approve request:", requestId)
        // TODO: Implement approval logic with backend
        alert("Appointment approved! (Connect to backend to save)")
    }

    const handleDeny = (requestId: number) => {
        console.log("Deny request:", requestId)
        // TODO: Implement denial logic
        alert("Appointment denied. (Connect to backend to save)")
    }

    const filteredRequests = appointmentRequests.filter((req) => {
        const matchesSearch =
            searchQuery === "" ||
            req.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesFilter =
            filterUrgency === "all" || req.urgency === filterUrgency

        return matchesSearch && matchesFilter && req.status === "pending"
    })

    return (
        <ProtectedRoute adminOnly>
            <Layout title="Appointments Management" noFooter>
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
                                            Appointments
                                        </h1>
                                        <p className="text-neutral-muted">
                                            Manage appointment requests and schedule
                                        </p>
                                    </div>
                                </div>
                                <Button variant="primary">
                                    <Plus className="w-5 h-5 mr-2" />
                                    New Appointment
                                </Button>
                            </div>

                            {/* Tabs */}
                            <div className="flex items-center space-x-2 mt-6 border-b border-neutral-border">
                                <button
                                    onClick={() => setActiveTab("requests")}
                                    className={`px-6 py-3 font-medium transition-colors relative ${activeTab === "requests"
                                        ? "text-primary-deep"
                                        : "text-neutral-muted hover:text-neutral-text"
                                        }`}
                                >
                                    Requests
                                    {filteredRequests.length > 0 && (
                                        <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                                            {filteredRequests.length}
                                        </span>
                                    )}
                                    {activeTab === "requests" && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-deep"
                                        />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab("calendar")}
                                    className={`px-6 py-3 font-medium transition-colors relative ${activeTab === "calendar"
                                        ? "text-primary-deep"
                                        : "text-neutral-muted hover:text-neutral-text"
                                        }`}
                                >
                                    Calendar
                                    {activeTab === "calendar" && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-deep"
                                        />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab("scheduled")}
                                    className={`px-6 py-3 font-medium transition-colors relative ${activeTab === "scheduled"
                                        ? "text-primary-deep"
                                        : "text-neutral-muted hover:text-neutral-text"
                                        }`}
                                >
                                    Scheduled
                                    <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                                        {scheduledAppointments.length}
                                    </span>
                                    {activeTab === "scheduled" && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-deep"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="container-custom py-8">
                        <AnimatePresence mode="wait">
                            {/* Requests Tab */}
                            {activeTab === "requests" && (
                                <motion.div
                                    key="requests"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    {/* Search and Filter */}
                                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                            <input
                                                type="text"
                                                placeholder="Search by name or email..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep focus:ring-2 focus:ring-primary-light outline-none"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Filter className="w-5 h-5 text-neutral-muted" />
                                            <select
                                                value={filterUrgency}
                                                onChange={(e) => setFilterUrgency(e.target.value)}
                                                className="px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep outline-none"
                                            >
                                                <option value="all">All Urgency</option>
                                                <option value="high">High</option>
                                                <option value="medium">Medium</option>
                                                <option value="low">Low</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Requests List */}
                                    <div className="space-y-4">
                                        {filteredRequests.map((request, index) => (
                                            <motion.div
                                                key={request.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <Card hover>
                                                    <div className="p-6">
                                                        <div className="flex flex-col lg:flex-row gap-6">
                                                            {/* Patient Info */}
                                                            <div className="flex-1">
                                                                <div className="flex items-start justify-between mb-4">
                                                                    <div>
                                                                        <h3 className="text-xl font-semibold text-neutral-text mb-2">
                                                                            {request.patientName}
                                                                        </h3>
                                                                        <div className="flex items-center space-x-4 text-sm text-neutral-muted">
                                                                            <div className="flex items-center space-x-1">
                                                                                <Mail className="w-4 h-4" />
                                                                                <span>{request.email}</span>
                                                                            </div>
                                                                            <div className="flex items-center space-x-1">
                                                                                <Phone className="w-4 h-4" />
                                                                                <span>{request.phone}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <span
                                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${request.urgency === "high"
                                                                            ? "bg-red-100 text-red-700"
                                                                            : request.urgency === "medium"
                                                                                ? "bg-orange-100 text-orange-700"
                                                                                : "bg-blue-100 text-blue-700"
                                                                            }`}
                                                                    >
                                                                        {request.urgency.toUpperCase()}
                                                                    </span>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <div>
                                                                        <p className="text-sm font-semibold text-neutral-text mb-1">
                                                                            Preferred Date & Time:
                                                                        </p>
                                                                        <div className="flex items-center space-x-4 text-sm text-neutral-muted">
                                                                            <div className="flex items-center space-x-1">
                                                                                <CalendarIcon className="w-4 h-4" />
                                                                                <span>
                                                                                    {formatDate(request.preferredDate)}
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex items-center space-x-1">
                                                                                <Clock className="w-4 h-4" />
                                                                                <span>{request.preferredTime}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <p className="text-sm font-semibold text-neutral-text mb-1">
                                                                            Reason:
                                                                        </p>
                                                                        <p className="text-sm text-neutral-muted">
                                                                            {request.reason}
                                                                        </p>
                                                                    </div>

                                                                    <p className="text-xs text-neutral-muted">
                                                                        Requested:{" "}
                                                                        {formatDate(request.requestedAt)} at{" "}
                                                                        {formatTime(request.requestedAt)}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex flex-row lg:flex-col gap-3 lg:w-40">
                                                                <Button
                                                                    variant="primary"
                                                                    className="flex-1 lg:w-full"
                                                                    onClick={() => handleApprove(request.id)}
                                                                >
                                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                                    Approve
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    className="flex-1 lg:w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                                                    onClick={() => handleDeny(request.id)}
                                                                >
                                                                    <XCircle className="w-4 h-4 mr-2" />
                                                                    Deny
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    className="flex-1 lg:w-full"
                                                                >
                                                                    <MessageSquare className="w-4 h-4 mr-2" />
                                                                    Message
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </motion.div>
                                        ))}

                                        {filteredRequests.length === 0 && (
                                            <Card>
                                                <div className="text-center py-12">
                                                    <AlertCircle className="w-16 h-16 text-neutral-muted mx-auto mb-4" />
                                                    <h3 className="text-xl font-semibold text-neutral-text mb-2">
                                                        No pending requests
                                                    </h3>
                                                    <p className="text-neutral-muted">
                                                        All appointment requests have been processed
                                                    </p>
                                                </div>
                                            </Card>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Calendar Tab */}
                            {activeTab === "calendar" && (
                                <motion.div
                                    key="calendar"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <div className="grid lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2">
                                            <Card>
                                                <CardContent className="p-6">
                                                    <Calendar
                                                        onChange={(value) => setSelectedDate(value as Date)}
                                                        value={selectedDate}
                                                        className="w-full border-0 rounded-lg"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>
                                                        {formatDate(selectedDate.toISOString())}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-neutral-muted mb-4">
                                                        Appointments for this day:
                                                    </p>
                                                    <div className="space-y-3">
                                                        {scheduledAppointments
                                                            .filter(
                                                                (apt) =>
                                                                    apt.date ===
                                                                    selectedDate.toISOString().split("T")[0]
                                                            )
                                                            .map((apt) => (
                                                                <div
                                                                    key={apt.id}
                                                                    className="p-3 bg-primary-light rounded-lg"
                                                                >
                                                                    <p className="font-medium text-neutral-text">
                                                                        {apt.time} - {apt.patientName}
                                                                    </p>
                                                                    <p className="text-sm text-neutral-muted">
                                                                        {apt.type} ({apt.duration} min)
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        {scheduledAppointments.filter(
                                                            (apt) =>
                                                                apt.date ===
                                                                selectedDate.toISOString().split("T")[0]
                                                        ).length === 0 && (
                                                                <p className="text-sm text-neutral-muted italic">
                                                                    No appointments scheduled
                                                                </p>
                                                            )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Scheduled Tab */}
                            {activeTab === "scheduled" && (
                                <motion.div
                                    key="scheduled"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <div className="space-y-4">
                                        {scheduledAppointments.map((apt, index) => (
                                            <motion.div
                                                key={apt.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <Card hover>
                                                    <div className="p-6">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex-1">
                                                                <h3 className="text-xl font-semibold text-neutral-text mb-2">
                                                                    {apt.patientName}
                                                                </h3>
                                                                <div className="flex items-center space-x-4 text-sm text-neutral-muted mb-3">
                                                                    <div className="flex items-center space-x-1">
                                                                        <CalendarIcon className="w-4 h-4" />
                                                                        <span>{formatDate(apt.date)}</span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-1">
                                                                        <Clock className="w-4 h-4" />
                                                                        <span>
                                                                            {apt.time} ({apt.duration} min)
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <p className="text-sm text-neutral-text mb-2">
                                                                    <span className="font-medium">Type:</span>{" "}
                                                                    {apt.type}
                                                                </p>
                                                                {apt.notes && (
                                                                    <p className="text-sm text-neutral-muted">
                                                                        <span className="font-medium">Notes:</span>{" "}
                                                                        {apt.notes}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col space-y-2">
                                                                <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg text-center">
                                                                    {apt.status}
                                                                </span>
                                                                <Button variant="outline" size="sm">
                                                                    Edit
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Layout>
        </ProtectedRoute>
    )
}

export default AdminAppointmentsPage

export const Head = () => (
    <title>Appointments - Admin - Virtual Chamber</title>
)