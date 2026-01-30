import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { motion } from "framer-motion"
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Tag,
    Share2,
    BookOpen,
    Loader2,
} from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { JournalSidebar } from "@/components/journal/Sidebar"
import { Button } from "@/components/ui/Button"
import { journalApi } from "@/services/api"
import { ANIMATION_VARIANTS } from "@/utils/constants"

interface JournalEntry {
    _id: string
    title: string
    content: string
    excerpt: string
    type: string
    author: string
    coverImage?: string
    readTime?: string
    tags?: string[]
    createdAt: string
    updatedAt: string
}

// Type label mapping
const typeLabels: Record<string, string> = {
    blog: "Blog",
    research: "Research",
    "case-study": "Case Study",
    "internship-note": "Internship Note",
}

const JournalDetailPage: React.FC = () => {
    const [journal, setJournal] = useState<JournalEntry | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Get type and id from URL params (client-side)
    const [type, setType] = useState<string>("")
    const [id, setId] = useState<string>("")

    useEffect(() => {
        // Parse URL on client side
        if (typeof window !== "undefined") {
            const pathParts = window.location.pathname.split("/").filter(Boolean)
            // Expected: /journal/[type]/[id]
            if (pathParts.length >= 3 && pathParts[0] === "journal") {
                setType(pathParts[1])
                setId(pathParts[2])
            }
        }
    }, [])

    useEffect(() => {
        if (!id) return

        const fetchJournal = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const response = await journalApi.getById(id) as any
                if (response.success && response.data) {
                    setJournal(response.data)
                } else {
                    setError(response.error || "Journal entry not found")
                }
            } catch (err: any) {
                setError(err.message || "Failed to load journal entry")
            } finally {
                setIsLoading(false)
            }
        }

        fetchJournal()
    }, [id])

    const handleShare = async () => {
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({
                    title: journal?.title,
                    text: journal?.excerpt,
                    url: window.location.href,
                })
            } catch (err) {
                // User cancelled or share failed
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <Layout title={journal?.title || "Journal"}>
            <JournalSidebar currentPath={`/journal/${type}`} defaultOpen={true} />

            <div className="lg:ml-64 transition-all duration-300">
                {/* Loading State */}
                {isLoading && (
                    <div className="min-h-screen flex items-center justify-center pt-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center"
                        >
                            <Loader2 className="w-12 h-12 text-primary-deep animate-spin mx-auto mb-4" />
                            <p className="text-neutral-muted">Loading article...</p>
                        </motion.div>
                    </div>
                )}

                {/* Error State */}
                {!isLoading && error && (
                    <div className="min-h-screen flex items-center justify-center pt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center max-w-md"
                        >
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="w-10 h-10 text-red-500" />
                            </div>
                            <h2 className="font-display text-2xl font-semibold text-neutral-text mb-3">
                                Article Not Found
                            </h2>
                            <p className="text-neutral-muted mb-6">{error}</p>
                            <Button variant="primary" onClick={() => navigate("/journal")}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Journal
                            </Button>
                        </motion.div>
                    </div>
                )}

                {/* Content */}
                {!isLoading && journal && (
                    <>
                        {/* Hero / Header */}
                        <section className="pt-32 pb-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
                            <div className="container-custom">
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={ANIMATION_VARIANTS.staggerContainer}
                                    className="max-w-4xl"
                                >
                                    {/* Back Button */}
                                    <motion.div variants={ANIMATION_VARIANTS.fadeIn}>
                                        <Link
                                            to={`/journal/${type}`}
                                            className="inline-flex items-center text-primary-deep hover:text-primary-deep/80 transition-colors mb-6"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back to {typeLabels[type] || "Journal"}
                                        </Link>
                                    </motion.div>

                                    {/* Type Badge */}
                                    <motion.div
                                        variants={ANIMATION_VARIANTS.fadeIn}
                                        className="inline-block px-4 py-2 bg-white rounded-full mb-6 shadow-soft"
                                    >
                                        <span className="text-sm font-medium text-primary-deep">
                                            {typeLabels[journal.type] || journal.type}
                                        </span>
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h1
                                        variants={ANIMATION_VARIANTS.fadeUp}
                                        className="font-display text-4xl md:text-5xl font-semibold text-neutral-text mb-6 leading-tight"
                                    >
                                        {journal.title}
                                    </motion.h1>

                                    {/* Meta Info */}
                                    <motion.div
                                        variants={ANIMATION_VARIANTS.fadeUp}
                                        className="flex flex-wrap items-center gap-6 text-neutral-muted"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <User className="w-5 h-5" />
                                            <span>{journal.author || "Dr. Tasmiah Nawal"}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-5 h-5" />
                                            <span>{formatDate(journal.createdAt)}</span>
                                        </div>
                                        {journal.readTime && (
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-5 h-5" />
                                                <span>{journal.readTime}</span>
                                            </div>
                                        )}
                                        <button
                                            onClick={handleShare}
                                            className="flex items-center space-x-2 hover:text-primary-deep transition-colors"
                                        >
                                            <Share2 className="w-5 h-5" />
                                            <span>Share</span>
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </section>

                        {/* Cover Image */}
                        {journal.coverImage && (
                            <section className="bg-neutral-offWhite">
                                <div className="container-custom py-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-medium"
                                    >
                                        <img
                                            src={journal.coverImage}
                                            alt={journal.title}
                                            className="w-full h-auto object-cover"
                                        />
                                    </motion.div>
                                </div>
                            </section>
                        )}

                        {/* Article Content */}
                        <section className="section-spacing">
                            <div className="container-custom">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="max-w-3xl mx-auto"
                                >
                                    {/* Content */}
                                    <article
                                        className="prose prose-lg prose-neutral max-w-none
                                            prose-headings:font-display prose-headings:text-neutral-text
                                            prose-p:text-neutral-muted prose-p:leading-relaxed
                                            prose-a:text-primary-deep prose-a:no-underline hover:prose-a:underline
                                            prose-strong:text-neutral-text
                                            prose-ul:text-neutral-muted prose-ol:text-neutral-muted
                                            prose-blockquote:border-primary-deep prose-blockquote:text-neutral-muted
                                            prose-code:bg-primary-light prose-code:text-primary-deep prose-code:px-1 prose-code:rounded"
                                        dangerouslySetInnerHTML={{ __html: journal.content }}
                                    />

                                    {/* Tags */}
                                    {journal.tags && journal.tags.length > 0 && (
                                        <div className="mt-12 pt-8 border-t border-neutral-border">
                                            <div className="flex items-center flex-wrap gap-3">
                                                <Tag className="w-5 h-5 text-neutral-muted" />
                                                {journal.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 bg-primary-light text-primary-deep text-sm rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation */}
                                    <div className="mt-12 pt-8 border-t border-neutral-border">
                                        <Link
                                            to={`/journal/${type}`}
                                            className="inline-flex items-center text-primary-deep hover:text-primary-deep/80 transition-colors font-medium"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back to all {typeLabels[type] || "articles"}
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </Layout>
    )
}

export default JournalDetailPage

export const Head = () => <title>Journal - Virtual Chamber</title>
