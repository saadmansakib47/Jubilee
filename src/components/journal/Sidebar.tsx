import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import {
    BookOpen,
    FileText,
    Stethoscope,
    GraduationCap,
    ChevronLeft,
    ChevronRight,
    Home,
    Plus,
    Settings,
} from "lucide-react"
import { authService } from "@/services/auth"
import { cn } from "@/utils/cn"

interface SidebarLink {
    id: string
    label: string
    href: string
    icon: React.ElementType
    count?: number
}

const sidebarLinks: SidebarLink[] = [
    {
        id: "blog",
        label: "Blogs",
        href: "/journal/blog",
        icon: BookOpen,
        count: 12,
    },
    {
        id: "research",
        label: "Research & Publications",
        href: "/journal/research",
        icon: FileText,
        count: 8,
    },
    {
        id: "case-studies",
        label: "Case Studies",
        href: "/journal/case-studies",
        icon: Stethoscope,
        count: 15,
    },
    {
        id: "internship",
        label: "Internship Notes",
        href: "/journal/internship-notes",
        icon: GraduationCap,
        count: 20,
    },
]

interface JournalSidebarProps {
    currentPath?: string
    defaultOpen?: boolean
}

export const JournalSidebar: React.FC<JournalSidebarProps> = ({
    currentPath = "",
    defaultOpen = true,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        setIsAdmin(authService.isAdmin())
    }, [])

    return (
        <>
            {/* Toggle Button - Fixed position */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed top-24 z-50 bg-primary-deep text-white p-3 rounded-r-xl shadow-strong hover:bg-secondary-deep transition-all duration-300",
                    isOpen ? "left-64" : "left-0"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? (
                    <ChevronLeft className="w-5 h-5" />
                ) : (
                    <ChevronRight className="w-5 h-5" />
                )}
            </motion.button>

            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.aside
                        initial={{ x: -280, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -280, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed left-0 top-20 bottom-0 w-64 bg-white/80 backdrop-blur-lg border-r border-neutral-border z-40 overflow-y-auto"
                    >
                        <div className="p-6 space-y-8">
                            {/* Header */}
                            <div>
                                <h2 className="font-display text-2xl font-semibold text-neutral-text mb-2">
                                    Journal
                                </h2>
                                <p className="text-sm text-neutral-muted">
                                    Insights, research, and experiences
                                </p>
                            </div>

                            {/* Navigation Links */}
                            <nav className="space-y-2">
                                {/* Home Link */}
                                <Link
                                    to="/journal"
                                    className={cn(
                                        "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                        currentPath === "/journal"
                                            ? "bg-primary-deep text-white shadow-medium"
                                            : "text-neutral-text hover:bg-primary-light hover:text-primary-deep"
                                    )}
                                >
                                    <Home className="w-5 h-5" />
                                    <span className="font-medium">All Entries</span>
                                </Link>

                                {/* Category Links */}
                                {sidebarLinks.map((link, index) => {
                                    const Icon = link.icon
                                    const isActive = currentPath.includes(link.href)

                                    return (
                                        <motion.div
                                            key={link.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                to={link.href}
                                                className={cn(
                                                    "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                                                    isActive
                                                        ? "bg-primary-deep text-white shadow-medium"
                                                        : "text-neutral-text hover:bg-primary-light hover:text-primary-deep"
                                                )}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Icon className="w-5 h-5" />
                                                    <span className="font-medium">{link.label}</span>
                                                </div>
                                                {link.count && (
                                                    <span
                                                        className={cn(
                                                            "text-xs font-semibold px-2 py-1 rounded-full",
                                                            isActive
                                                                ? "bg-white/20"
                                                                : "bg-neutral-border group-hover:bg-primary-deep/20"
                                                        )}
                                                    >
                                                        {link.count}
                                                    </span>
                                                )}
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </nav>

                            {/* Recent Activity */}
                            <div className="pt-6 border-t border-neutral-border">
                                <h3 className="text-sm font-semibold text-neutral-text mb-4">
                                    Recent Activity
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { title: "New blog post", time: "2 hours ago" },
                                        { title: "Research published", time: "1 day ago" },
                                        { title: "Case study added", time: "3 days ago" },
                                    ].map((activity, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            className="flex items-start space-x-2"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-primary-deep mt-2 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-neutral-text">
                                                    {activity.title}
                                                </p>
                                                <p className="text-xs text-neutral-muted">
                                                    {activity.time}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="pt-6 border-t border-neutral-border">
                                <h3 className="text-sm font-semibold text-neutral-text mb-4">
                                    Popular Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Mental Health",
                                        "CBT",
                                        "Trauma",
                                        "Anxiety",
                                        "Depression",
                                        "Mindfulness",
                                    ].map((tag, index) => (
                                        <motion.button
                                            key={tag}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + index * 0.05 }}
                                            className="px-3 py-1 bg-primary-light text-primary-deep text-xs rounded-full hover:bg-primary-deep hover:text-white transition-colors"
                                        >
                                            {tag}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Admin Actions (visible only to admin) */}
                            {isAdmin && (
                                <div className="pt-6 border-t border-neutral-border">
                                    <h3 className="text-sm font-semibold text-neutral-text mb-4">
                                        Admin Actions
                                    </h3>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => alert("New Post modal - connect to backend")}
                                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-deep text-white rounded-lg text-sm font-medium hover:bg-secondary-deep transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>New Post</span>
                                        </button>
                                        <button
                                            onClick={() => navigate("/admin/dashboard")}
                                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-neutral-border text-neutral-text rounded-lg text-sm font-medium hover:border-primary-deep hover:text-primary-deep transition-colors"
                                        >
                                            <Settings className="w-4 h-4" />
                                            <span>Manage Content</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Overlay for mobile */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                />
            )}
        </>
    )
}