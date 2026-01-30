import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Menu, X, Download, LogOut, LayoutDashboard, User } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { NotificationBell } from "@/components/admin/NotificationBell"
import { authService } from "@/services/auth"
import { NAV_LINKS, SITE_CONFIG } from "@/utils/constants"
import { cn } from "@/utils/cn"

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const { scrollY } = useScroll()


    const handleLogout = () => {
        authService.logout()
        setIsAdmin(false)
        if (typeof window !== "undefined") {
            window.location.href = "/"
        }
    }


    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
    )

    const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Check admin status on mount and when auth changes
    useEffect(() => {
        const checkAdmin = () => {
            setIsAdmin(authService.isAdmin())
        }
        checkAdmin()

        // Re-check periodically in case of login/logout
        const interval = setInterval(checkAdmin, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <motion.nav
                style={{
                    backgroundColor,
                    backdropFilter: backdropBlur,
                    WebkitBackdropFilter: backdropBlur,
                }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled && "shadow-soft"
                )}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 group">
                            <motion.div
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-deep to-secondary-deep flex items-center justify-center overflow-hidden"
                            >
                                <StaticImage
                                    src="../../../images/avatar.png"
                                    alt="Logo"
                                    placeholder="blurred"
                                    className="w-full h-full"
                                />
                            </motion.div>
                            <span className="font-display text-xl font-semibold text-primary-deep">
                                {SITE_CONFIG.name}
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1 h-full">
                            {NAV_LINKS.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="h-full"
                                >
                                    <Link
                                        to={link.href}
                                        className="px-4 text-neutral-text hover:text-primary-deep font-poppins font-medium uppercase tracking-wider text-sm transition-colors duration-200 relative group h-full flex items-center"
                                        activeClassName="text-primary-deep"
                                    >
                                        <span className="relative h-full flex items-center">
                                            {link.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-deep transition-all duration-500 group-hover:w-full" />
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="hidden lg:flex items-center space-x-4">
                            {/* Notification Bell for Admin */}
                            {isAdmin && <NotificationBell />}

                            {isAdmin ? (
                                <div className="flex items-center space-x-2">
                                    <Link to="/admin/dashboard">
                                        <Button variant="outline" size="md" className="rounded-[16px] font-poppins font-medium uppercase tracking-wider text-sm border-primary-light text-primary-deep hover:bg-primary-light">
                                            <LayoutDashboard className="w-4 h-4 mr-2" />
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="md"
                                        onClick={handleLogout}
                                        className="rounded-[16px] font-poppins font-medium uppercase tracking-wider text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Link to="/admin/login">
                                    <Button variant="ghost" size="md" className="rounded-[16px] font-poppins font-medium uppercase tracking-wider text-sm text-neutral-muted hover:text-primary-deep">
                                        <User className="w-4 h-4 mr-2" />
                                        Admin Login
                                    </Button>
                                </Link>
                            )}

                            <Button
                                variant="outline"
                                size="md"
                                className="rounded-[16px] font-poppins font-medium uppercase tracking-wider text-sm"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download CV
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 text-primary-deep hover:bg-primary-light rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: "100%" },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-2xl z-40 lg:hidden"
            >
                <div className="flex flex-col h-full pt-24 px-6 pb-6">
                    <div className="flex-1 space-y-2">
                        {NAV_LINKS.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={link.href}
                                    className="block px-4 py-3 text-lg font-poppins font-medium uppercase tracking-wide text-neutral-text hover:text-primary-deep hover:bg-primary-light rounded-lg transition-all"
                                    activeClassName="text-primary-deep bg-primary-light"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="space-y-3 pt-6 border-t border-neutral-border">

                        {isAdmin ? (
                            <>
                                <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block">
                                    <Button variant="outline" size="md" className="w-full mt-3 rounded-[16px] font-poppins font-medium uppercase tracking-wide border-primary-light text-primary-deep">
                                        <LayoutDashboard className="w-5 h-5 mr-2" />
                                        Admin Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="md"
                                    onClick={handleLogout}
                                    className="w-full rounded-[16px] font-poppins font-medium uppercase tracking-wide text-red-500"
                                >
                                    <LogOut className="w-5 h-5 mr-2" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Link to="/admin/login" onClick={() => setIsOpen(false)} className="block">
                                <Button variant="ghost" size="md" className="w-full rounded-[16px] font-poppins font-medium uppercase tracking-wide text-neutral-muted">
                                    <User className="w-5 h-5 mr-2" />
                                    Admin Login
                                </Button>
                            </Link>
                        )}

                        <Button variant="outline" size="md" className="w-full rounded-[16px] font-poppins font-medium uppercase tracking-wide">
                            <Download className="w-5 h-5 mr-2" />
                            Download CV
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Overlay */}
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