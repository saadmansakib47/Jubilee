// Authentication Service
// This handles login, logout, token management, and protected routes

interface LoginCredentials {
    email: string
    password: string
}

interface AuthUser {
    id: string
    email: string
    name: string
    role: "admin" | "user"
}

interface AuthResponse {
    success: boolean
    data?: {
        user: AuthUser
    }
    error?: string
}

import { authApi } from "./api"

class AuthService {
    private readonly USER_KEY = "vc_user"

    /**
     * Login with email and password
     */
    async login(credentials: LoginCredentials): Promise<AuthUser> {
        try {
            const response = await authApi.login(credentials.email, credentials.password) as AuthResponse

            if (response.success && response.data?.user) {
                const user = response.data.user
                this.setUser(user)
                return user
            } else {
                throw new Error(response.error || "Invalid credentials")
            }
        } catch (error) {
            throw new Error((error as Error).message || "Login failed")
        }
    }

    /**
     * Logout and clear session
     */
    async logout(): Promise<void> {
        try {
            await authApi.logout()
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            if (typeof window !== "undefined") {
                localStorage.removeItem(this.USER_KEY)
            }
        }
    }

    /**
     * Get current authenticated user from local storage
     */
    getUser(): AuthUser | null {
        if (typeof window !== "undefined") {
            const userStr = localStorage.getItem(this.USER_KEY)
            return userStr ? JSON.parse(userStr) : null
        }
        return null
    }

    /**
     * Set current user in local storage
     */
    setUser(user: AuthUser): void {
        if (typeof window !== "undefined") {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user))
        }
    }

    /**
     * Check if user is authenticated (using local user object as proxy)
     */
    isAuthenticated(): boolean {
        return !!this.getUser()
    }

    /**
     * Check if user is admin
     */
    isAdmin(): boolean {
        const user = this.getUser()
        return user?.role === "admin"
    }

    /**
     * Sync user data from backend
     */
    async syncUser(): Promise<AuthUser | null> {
        try {
            const response = await authApi.getProfile() as AuthResponse
            if (response.success && response.data?.user) {
                this.setUser(response.data.user)
                return response.data.user
            }
            return null
        } catch (error) {
            return null
        }
    }

    /**
     * Verify session with backend
     */
    async verifyToken(): Promise<boolean> {
        try {
            const response = await authApi.verify() as AuthResponse
            if (response.success && response.data?.user) {
                this.setUser(response.data.user)
                return true
            }
            return false
        } catch (error) {
            return false
        }
    }

    /**
     * Refresh authentication session
     */
    async refreshToken(): Promise<boolean> {
        try {
            const response = await authApi.refreshToken() as AuthResponse
            return response.success
        } catch (error) {
            return false
        }
    }

}

// Export singleton instance
export const authService = new AuthService()

// Export types
export type { LoginCredentials, AuthUser, AuthResponse }