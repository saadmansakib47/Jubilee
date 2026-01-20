import React from "react"
import { Helmet } from "react-helmet"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { SITE_CONFIG } from "@/utils/constants"
import "@/styles/globals.css"

interface LayoutProps {
    children: React.ReactNode
    title?: string
    description?: string
    noFooter?: boolean
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    title,
    description,
    noFooter = false,
}) => {
    const pageTitle = title
        ? `${title} | ${SITE_CONFIG.name}`
        : `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`

    const pageDescription = description || SITE_CONFIG.description

    return (
        <>
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

            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">{children}</main>
                {!noFooter && <Footer />}
            </div>
        </>
    )
}