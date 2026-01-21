import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { authService } from "@/services/auth"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"

interface ProtectedRouteProps {
    children: React.ReactNode
    adminOnly?: boolean
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    adminOnly = false,
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            // Check if we're in the browser
            if (typeof window === "undefined") {
                return
            }

            const isAuthenticated = authService.isAuthenticated()

            if (!isAuthenticated) {
                // Redirect to login
                navigate("/admin/login")
                return
            }

            // Verify token
            const isValid = await authService.verifyToken()
            if (!isValid) {
                authService.logout()
                navigate("/admin/login")
                return
            }

            // Check admin role if required
            if (adminOnly && !authService.isAdmin()) {
                navigate("/")
                return
            }

            setIsAuthorized(true)
            setIsLoading(false)
        }

        checkAuth()
    }, [adminOnly])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 border-4 border-primary-deep border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-lg text-neutral-muted">Verifying access...</p>
                </motion.div>
            </div>
        )
    }

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <Lock className="w-16 h-16 text-primary-deep mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-neutral-text mb-2">
                        Access Denied
                    </h2>
                    <p className="text-neutral-muted">
                        You don't have permission to view this page.
                    </p>
                </motion.div>
            </div>
        )
    }

    return <>{children}</>
}