import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { authService, type LoginCredentials } from "@/services/auth"
import { ANIMATION_VARIANTS } from "@/utils/constants"

// Login form validation schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

const AdminLoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    // Check if already authenticated
    useEffect(() => {
        if (typeof window !== "undefined" && authService.isAuthenticated()) {
            navigate("/admin/dashboard")
        }
    }, [])

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            const credentials: LoginCredentials = {
                email: data.email,
                password: data.password,
            }

            await authService.login(credentials)

            // Redirect to dashboard
            navigate("/admin/dashboard")
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Layout title="Admin Login" noFooter>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light/30 to-secondary-light/30 py-12 px-4">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-primary-deep/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-deep/10 rounded-full blur-3xl" />
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={ANIMATION_VARIANTS.staggerContainer}
                    className="w-full max-w-md relative z-10"
                >
                    {/* Logo/Header */}
                    <motion.div variants={ANIMATION_VARIANTS.fadeIn} className="text-center mb-8">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-deep to-secondary-deep flex items-center justify-center shadow-strong">
                            <Lock className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="font-display text-4xl font-semibold text-neutral-text mb-2">
                            Admin Portal
                        </h1>
                        <p className="text-neutral-muted">
                            Sign in to manage your virtual chamber
                        </p>
                    </motion.div>


                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <Card className="bg-red-50 border-2 border-red-200 p-4">
                                <div className="flex items-center space-x-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <motion.div variants={ANIMATION_VARIANTS.fadeUp}>
                        <Card className="p-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-text mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                        <input
                                            {...register("email")}
                                            type="email"
                                            className={`w-full pl-12 pr-4 py-3 rounded-lg border ${errors.email
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                : "border-neutral-border focus:border-primary-deep focus:ring-primary-light"
                                                } focus:ring-2 outline-none transition-all`}
                                            placeholder="admin@virtualchamber.com"
                                            autoComplete="email"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-text mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                        <input
                                            {...register("password")}
                                            type={showPassword ? "text" : "password"}
                                            className={`w-full pl-12 pr-12 py-3 rounded-lg border ${errors.password
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                : "border-neutral-border focus:border-primary-deep focus:ring-primary-light"
                                                } focus:ring-2 outline-none transition-all`}
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-muted hover:text-neutral-text"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            {...register("rememberMe")}
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-neutral-border text-primary-deep focus:ring-primary-light"
                                        />
                                        <span className="text-sm text-neutral-text">
                                            Remember me
                                        </span>
                                    </label>
                                    <button
                                        type="button"
                                        className="text-sm text-primary-deep hover:underline"
                                        onClick={() => navigate("/admin/forgot-password")}
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Signing in...
                                        </span>
                                    ) : (
                                        <>
                                            <Lock className="w-5 h-5 mr-2" />
                                            Sign In
                                        </>
                                    )}
                                </Button>
                            </form>

                            {/* Security Notice */}
                            <div className="mt-6 pt-6 border-t border-neutral-border">
                                <p className="text-xs text-center text-neutral-muted">
                                    🔒 Your session is secured with encryption.
                                    <br />
                                    For security, you'll be automatically logged out after 1 hour of
                                    inactivity.
                                </p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Back to Home Link */}
                    <motion.div
                        variants={ANIMATION_VARIANTS.fadeIn}
                        className="text-center mt-6"
                    >
                        <button
                            onClick={() => navigate("/")}
                            className="text-sm text-neutral-muted hover:text-primary-deep transition-colors"
                        >
                            ← Back to Home
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </Layout>
    )
}

export default AdminLoginPage

export const Head = () => <title>Admin Login - Virtual Chamber</title>