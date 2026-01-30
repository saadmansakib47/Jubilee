import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { Navbar } from "@/components/layout/Navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import TNLogoOverlay from "@/components/ui/logoOverlay"
import { AppointmentModal } from "@/components/appointments/AppointmentModal"
import { SITE_CONFIG } from "@/utils/constants"
import "@/styles/globals.css"

interface LayoutProps {
    children: React.ReactNode
    title?: string
    description?: string
    noFooter?: boolean
}

import { authService } from "@/services/auth"

export const Layout: React.FC<LayoutProps> = ({
    children,
    title,
    description,
    noFooter = false,
}) => {
    const [showOverlay, setShowOverlay] = useState(false)

    React.useEffect(() => {
        const isHome = window.location.pathname === "/"
        if (isHome) {
            setShowOverlay(true)
        }

        // Verify session on mount
        authService.verifyToken()
    }, [])

    const pageTitle = title
        ? `${title} | ${SITE_CONFIG.name}`
        : `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`

    const pageDescription = description || SITE_CONFIG.description

    return (
        <div className="relative overflow-hidden">
            <Helmet>
                <html lang="en" />
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="utf-8" />

                {/* Open Graph */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
            </Helmet>

            {showOverlay && <TNLogoOverlay onComplete={() => setShowOverlay(false)} />}

            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">{children}</main>
                {!noFooter && <Footer />}
            </div>

            <AppointmentModal />
        </div>
    )
}