import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { motion } from "framer-motion"
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    Image,
    MessageSquare,
    TrendingUp,
    Clock,
    AlertCircle,
    Plus,
    LogOut,
    Settings,
    Bell,
} from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { ProtectedRoute } from "@/components/admin/protectedRoute"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { authService } from "@/services/auth"
import { ANIMATION_VARIANTS } from "@/utils/constants"

// Dummy dashboard data
const dashboardStats = [
    {
        id: "patients",
        label: "Total Patients",
        value: "245",
        change: "+12%",
        trend: "up",
        icon: Users,
        color: "from-blue-500 to-blue-600",
    },
    {
        id: "appointments",
        label: "This Month",
        value: "48",
        change: "+8%",
        trend: "up",
        icon: Calendar,
        color: "from-green-500 to-green-600",
    },
    {
        id: "pending",
        label: "Pending Requests",
        value: "7",
        change: "2 urgent",
        trend: "neutral",
        icon: Clock,
        color: "from-orange-500 to-orange-600",
    },
    {
        id: "journal",
        label: "Journal Entries",
        value: "55",
        change: "+5 this week",
        trend: "up",
        icon: FileText,
        color: "from-purple-500 to-purple-600",
    },
]

const recentActivity = [
    {
        id: 1,
        type: "appointment",
        title: "New appointment request",
        description: "Sarah Johnson requested an appointment for Jan 25",
        time: "5 minutes ago",
        urgent: true,
    },
    {
        id: 2,
        type: "journal",
        title: "Blog post published",
        description: "Understanding CBT: A Practical Guide",
        time: "2 hours ago",
        urgent: false,
    },
    {
        id: 3,
        type: "testimonial",
        title: "New testimonial received",
        description: "5-star review from Michael Chen",
        time: "5 hours ago",
        urgent: false,
    },
    {
        id: 4,
        type: "contact",
        title: "Contact form submission",
        description: "Emily Rodriguez - General inquiry",
        time: "1 day ago",
        urgent: false,
    },
]

const upcomingAppointments = [
    {
        id: 1,
        patient: "Alice Williams",
        time: "Today, 2:00 PM",
        type: "Follow-up Session",
        status: "confirmed",
    },
    {
        id: 2,
        patient: "Robert Brown",
        time: "Today, 4:00 PM",
        type: "Initial Consultation",
        status: "confirmed",
    },
    {
        id: 3,
        patient: "Maria Garcia",
        time: "Tomorrow, 10:00 AM",
        type: "Therapy Session",
        status: "pending",
    },
]

const AdminDashboardPage: React.FC = () => {
    const [user, setUser] = useState(authService.getUser())

    useEffect(() => {
        setUser(authService.getUser())
    }, [])

    const handleLogout = () => {
        authService.logout()
        navigate("/admin/login")
    }

    return (
        <ProtectedRoute adminOnly>
            <Layout title="Admin Dashboard" noFooter>
                <div className="min-h-screen bg-neutral-offWhite">
                    {/* Top Navigation Bar */}
                    <div className="bg-white border-b border-neutral-border sticky top-0 z-40">
                        <div className="container-custom">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center space-x-4">
                                    <LayoutDashboard className="w-6 h-6 text-primary-deep" />
                                    <h1 className="font-display text-2xl font-semibold text-neutral-text">
                                        Admin Dashboard
                                    </h1>
                                </div>

                                <div className="flex items-center space-x-4">
                                    {/* Notifications */}
                                    <button className="relative p-2 hover:bg-primary-light rounded-lg transition-colors">
                                        <Bell className="w-5 h-5 text-neutral-text" />
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                                    </button>

                                    {/* Settings */}
                                    <button className="p-2 hover:bg-primary-light rounded-lg transition-colors">
                                        <Settings className="w-5 h-5 text-neutral-text" />
                                    </button>

                                    {/* User Menu */}
                                    <div className="flex items-center space-x-3 pl-4 border-l border-neutral-border">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-sm font-medium text-neutral-text">
                                                {user?.name}
                                            </p>
                                            <p className="text-xs text-neutral-muted capitalize">
                                                {user?.role}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                            title="Logout"
                                        >
                                            <LogOut className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="container-custom py-8">
                        {/* Welcome Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h2 className="font-display text-3xl font-semibold text-neutral-text mb-2">
                                Welcome back, {user?.name?.split(" ")[0]}! 👋
                            </h2>
                            <p className="text-neutral-muted">
                                Here's what's happening with your practice today
                            </p>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={ANIMATION_VARIANTS.staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                        >
                            {dashboardStats.map((stat, index) => (
                                <motion.div
                                    key={stat.id}
                                    variants={ANIMATION_VARIANTS.staggerItem}
                                    custom={index}
                                >
                                    <Card hover className="h-full">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm text-neutral-muted mb-2">
                                                    {stat.label}
                                                </p>
                                                <p className="text-3xl font-bold text-neutral-text mb-2">
                                                    {stat.value}
                                                </p>
                                                <p
                                                    className={`text-sm ${stat.trend === "up"
                                                        ? "text-green-600"
                                                        : stat.trend === "down"
                                                            ? "text-red-600"
                                                            : "text-neutral-muted"
                                                        }`}
                                                >
                                                    {stat.change}
                                                </p>
                                            </div>
                                            <div
                                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-medium`}
                                            >
                                                <stat.icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Column - Recent Activity & Upcoming */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Quick Actions */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <Link to="/admin/appointments">
                                                <button className="w-full p-4 bg-primary-light hover:bg-primary-deep hover:text-white rounded-xl transition-all group text-center">
                                                    <Calendar className="w-8 h-8 mx-auto mb-2 text-primary-deep group-hover:text-white" />
                                                    <p className="text-sm font-medium">Appointments</p>
                                                </button>
                                            </Link>
                                            <Link to="/journal">
                                                <button className="w-full p-4 bg-primary-light hover:bg-primary-deep hover:text-white rounded-xl transition-all group text-center">
                                                    <FileText className="w-8 h-8 mx-auto mb-2 text-primary-deep group-hover:text-white" />
                                                    <p className="text-sm font-medium">New Post</p>
                                                </button>
                                            </Link>
                                            <Link to="/gallery">
                                                <button className="w-full p-4 bg-primary-light hover:bg-primary-deep hover:text-white rounded-xl transition-all group text-center">
                                                    <Image className="w-8 h-8 mx-auto mb-2 text-primary-deep group-hover:text-white" />
                                                    <p className="text-sm font-medium">Gallery</p>
                                                </button>
                                            </Link>
                                            <Link to="/testimonials">
                                                <button className="w-full p-4 bg-primary-light hover:bg-primary-deep hover:text-white rounded-xl transition-all group text-center">
                                                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-primary-deep group-hover:text-white" />
                                                    <p className="text-sm font-medium">Testimonials</p>
                                                </button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Recent Activity */}
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Recent Activity</CardTitle>
                                            <button className="text-sm text-primary-deep hover:underline">
                                                View all
                                            </button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentActivity.map((activity) => (
                                                <div
                                                    key={activity.id}
                                                    className="flex items-start space-x-4 p-4 hover:bg-primary-light/50 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    {activity.urgent && (
                                                        <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                                    )}
                                                    {!activity.urgent && (
                                                        <div className="w-2 h-2 rounded-full bg-primary-deep flex-shrink-0 mt-2" />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-neutral-text">
                                                            {activity.title}
                                                        </p>
                                                        <p className="text-sm text-neutral-muted truncate">
                                                            {activity.description}
                                                        </p>
                                                        <p className="text-xs text-neutral-muted mt-1">
                                                            {activity.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Upcoming Appointments */}
                            <div className="space-y-8">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Upcoming Appointments</CardTitle>
                                            <Link to="/admin/appointments">
                                                <button className="text-sm text-primary-deep hover:underline">
                                                    View all
                                                </button>
                                            </Link>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {upcomingAppointments.map((apt) => (
                                                <div
                                                    key={apt.id}
                                                    className="p-4 border-l-4 border-primary-deep bg-primary-light/30 rounded-r-lg"
                                                >
                                                    <p className="font-medium text-neutral-text mb-1">
                                                        {apt.patient}
                                                    </p>
                                                    <p className="text-sm text-neutral-muted mb-2">
                                                        {apt.type}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xs text-neutral-muted">
                                                            {apt.time}
                                                        </p>
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded-full ${apt.status === "confirmed"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                                }`}
                                                        >
                                                            {apt.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Link to="/admin/appointments">
                                            <Button variant="outline" className="w-full mt-4">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Schedule New
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* System Status */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>System Status</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-neutral-text">
                                                    Website
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                                    <span className="text-xs text-green-600">
                                                        Operational
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-neutral-text">
                                                    Backend API
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                                    <span className="text-xs text-green-600">
                                                        Connected
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-neutral-text">
                                                    Email Service
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                                    <span className="text-xs text-green-600">Active</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </ProtectedRoute>
    )
}

export default AdminDashboardPage

export const Head = () => <title>Dashboard - Admin - Virtual Chamber</title>