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
    user: AuthUser
    token: string
    expiresIn: number
}

// Dummy backend URL - replace with actual Rust backend
const API_URL = process.env.GATSBY_API_URL || "http://localhost:8080"

class AuthService {
    private readonly TOKEN_KEY = "vc_auth_token"
    private readonly USER_KEY = "vc_user"

    /**
     * Login with email and password
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            // TODO: Replace with actual API call to Rust backend
            // const response = await fetch(`${API_URL}/api/auth/login`, {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(credentials),
            // })

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Dummy authentication (REMOVE IN PRODUCTION)
            if (credentials.email === "admin@virtualchamber.com" && credentials.password === "admin123") {
                const authResponse: AuthResponse = {
                    user: {
                        id: "1",
                        email: credentials.email,
                        name: "Dr. Admin",
                        role: "admin",
                    },
                    token: "dummy_jwt_token_" + Date.now(),
                    expiresIn: 3600, // 1 hour
                }

                // Store in localStorage
                this.setToken(authResponse.token)
                this.setUser(authResponse.user)

                return authResponse
            } else {
                throw new Error("Invalid credentials")
            }
        } catch (error) {
            throw new Error("Login failed: " + (error as Error).message)
        }
    }

    /**
     * Logout and clear session
     */
    logout(): void {
        if (typeof window !== "undefined") {
            localStorage.removeItem(this.TOKEN_KEY)
            localStorage.removeItem(this.USER_KEY)
        }
    }

    /**
     * Get current authentication token
     */
    getToken(): string | null {
        if (typeof window !== "undefined") {
            return localStorage.getItem(this.TOKEN_KEY)
        }
        return null
    }

    /**
     * Set authentication token
     */
    setToken(token: string): void {
        if (typeof window !== "undefined") {
            localStorage.setItem(this.TOKEN_KEY, token)
        }
    }

    /**
     * Get current user
     */
    getUser(): AuthUser | null {
        if (typeof window !== "undefined") {
            const userStr = localStorage.getItem(this.USER_KEY)
            return userStr ? JSON.parse(userStr) : null
        }
        return null
    }

    /**
     * Set current user
     */
    setUser(user: AuthUser): void {
        if (typeof window !== "undefined") {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user))
        }
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getToken()
    }

    /**
     * Check if user is admin
     */
    isAdmin(): boolean {
        const user = this.getUser()
        return user?.role === "admin"
    }

    /**
     * Verify token with backend
     */
    async verifyToken(): Promise<boolean> {
        const token = this.getToken()
        if (!token) return false

        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`${API_URL}/api/auth/verify`, {
            //   headers: { Authorization: `Bearer ${token}` },
            // })
            // return response.ok

            // Dummy verification
            return true
        } catch (error) {
            return false
        }
    }

    /**
     * Refresh authentication token
     */
    async refreshToken(): Promise<string | null> {
        const token = this.getToken()
        if (!token) return null

        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`${API_URL}/api/auth/refresh`, {
            //   method: "POST",
            //   headers: { Authorization: `Bearer ${token}` },
            // })
            // const data = await response.json()
            // this.setToken(data.token)
            // return data.token

            // Dummy refresh
            return token
        } catch (error) {
            return null
        }
    }

    /**
     * Request password reset
     */
    async requestPasswordReset(email: string): Promise<boolean> {
        try {
            // TODO: Replace with actual API call
            // await fetch(`${API_URL}/api/auth/reset-password`, {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ email }),
            // })

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return true
        } catch (error) {
            return false
        }
    }
}

// Export singleton instance
export const authService = new AuthService()

// Export types
export type { LoginCredentials, AuthUser, AuthResponse }