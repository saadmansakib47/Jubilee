import React from "react"
import { Layout } from "@/components/layout/Layout"

const NotFoundPage: React.FC = () => {
    return (
        <Layout title="404: Not Found">
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-neutral-900 mb-4">404: Not Found</h1>
                <p className="text-lg text-neutral-600">
                    You just hit a route that doesn't exist... the sadness.
                </p>
                <div className="mt-8">
                    <a
                        href="/"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Go back home
                    </a>
                </div>
            </div>
        </Layout>
    )
}

export default NotFoundPage

export const Head = () => <title>404: Not Found - Virtual Chamber</title>
