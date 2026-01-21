import React, { useState } from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import {
    Search,
    Calendar,
    Clock,
    Tag,
    ArrowRight,
    TrendingUp,
    Heart,
    MessageCircle,
} from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { JournalSidebar } from "@/components/journal/Sidebar"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ANIMATION_VARIANTS } from "@/utils/constants"

// Dummy blog posts
const blogPosts = [
    {
        id: 1,
        title: "Understanding Cognitive Behavioral Therapy: A Practical Guide",
        excerpt:
            "Explore how CBT can help manage anxiety and depression through evidence-based techniques that anyone can learn and apply.",
        content: "Full blog content would go here...",
        date: "2024-01-15",
        readTime: "8 min",
        author: "Dr. [Name]",
        tags: ["CBT", "Anxiety", "Depression", "Therapy"],
        featured: true,
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
        likes: 245,
        comments: 18,
    },
    {
        id: 2,
        title: "The Power of Mindfulness in Daily Life",
        excerpt:
            "Discover simple mindfulness practices that can reduce stress, improve focus, and enhance overall well-being.",
        content: "Full blog content...",
        date: "2024-01-12",
        readTime: "6 min",
        author: "Dr. [Name]",
        tags: ["Mindfulness", "Stress", "Self-Care"],
        featured: false,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
        likes: 189,
        comments: 12,
    },
    {
        id: 3,
        title: "Breaking the Stigma: Talking About Mental Health",
        excerpt:
            "Why open conversations about mental health are essential for healing and how we can all contribute to breaking the stigma.",
        content: "Full blog content...",
        date: "2024-01-10",
        readTime: "10 min",
        author: "Dr. [Name]",
        tags: ["Mental Health", "Stigma", "Awareness"],
        featured: true,
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800",
        likes: 312,
        comments: 24,
    },
    {
        id: 4,
        title: "Sleep Hygiene: The Foundation of Mental Wellness",
        excerpt:
            "Understanding the critical connection between quality sleep and mental health, plus practical tips for better rest.",
        content: "Full blog content...",
        date: "2024-01-08",
        readTime: "7 min",
        author: "Dr. [Name]",
        tags: ["Sleep", "Wellness", "Health"],
        featured: false,
        image: "https://images.unsplash.com/photo-1541480551145-2370a440d585?w=800",
        likes: 156,
        comments: 9,
    },
    {
        id: 5,
        title: "Managing Social Anxiety: Practical Strategies",
        excerpt:
            "Evidence-based techniques to help navigate social situations with confidence and reduce anxiety symptoms.",
        content: "Full blog content...",
        date: "2024-01-05",
        readTime: "9 min",
        author: "Dr. [Name]",
        tags: ["Anxiety", "Social", "Coping Strategies"],
        featured: false,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
        likes: 203,
        comments: 15,
    },
]

const BlogPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    // Get all unique tags
    const allTags = Array.from(
        new Set(blogPosts.flatMap((post) => post.tags))
    ).sort()

    // Filter posts
    const filteredPosts = blogPosts.filter((post) => {
        const matchesSearch =
            searchQuery === "" ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesTag = selectedTag === null || post.tags.includes(selectedTag)

        return matchesSearch && matchesTag
    })

    const featuredPosts = filteredPosts.filter((post) => post.featured)
    const regularPosts = filteredPosts.filter((post) => !post.featured)

    return (
        <Layout title="Blog">
            <JournalSidebar currentPath="/journal/blog" defaultOpen={true} />

            <div className="lg:ml-64 transition-all duration-300">
                {/* Hero Section */}
                <section className="pt-32 pb-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
                    <div className="container-custom">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={ANIMATION_VARIANTS.staggerContainer}
                            className="max-w-4xl"
                        >
                            <motion.div
                                variants={ANIMATION_VARIANTS.fadeIn}
                                className="inline-block px-4 py-2 bg-white rounded-full mb-6 shadow-soft"
                            >
                                <span className="text-sm font-medium text-primary-deep">
                                    Mental Health Insights
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="font-display text-5xl md:text-6xl font-semibold text-neutral-text mb-6"
                            >
                                Blog <span className="text-gradient">Articles</span>
                            </motion.h1>

                            <motion.p
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="text-xl text-neutral-muted leading-relaxed"
                            >
                                Evidence-based insights, practical advice, and perspectives on
                                mental health and wellness
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Search and Filter */}
                <section className="py-8 bg-white sticky top-20 z-30 shadow-soft">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep focus:ring-2 focus:ring-primary-light outline-none transition-all"
                                />
                            </div>

                            {/* Tag Filter */}
                            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                                <Tag className="w-5 h-5 text-neutral-muted flex-shrink-0" />
                                <button
                                    onClick={() => setSelectedTag(null)}
                                    className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${selectedTag === null
                                        ? "bg-primary-deep text-white"
                                        : "bg-neutral-offWhite text-neutral-text hover:bg-primary-light"
                                        }`}
                                >
                                    All
                                </button>
                                {allTags.slice(0, 5).map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${selectedTag === tag
                                            ? "bg-primary-deep text-white"
                                            : "bg-neutral-offWhite text-neutral-text hover:bg-primary-light"
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active filters */}
                        {(searchQuery || selectedTag) && (
                            <div className="mt-4 flex items-center space-x-2 text-sm">
                                <span className="text-neutral-muted">Active filters:</span>
                                {searchQuery && (
                                    <span className="px-3 py-1 bg-primary-light text-primary-deep rounded-full">
                                        Search: "{searchQuery}"
                                    </span>
                                )}
                                {selectedTag && (
                                    <span className="px-3 py-1 bg-primary-light text-primary-deep rounded-full">
                                        Tag: {selectedTag}
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        setSearchQuery("")
                                        setSelectedTag(null)
                                    }}
                                    className="text-primary-deep hover:underline"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Featured Posts */}
                {featuredPosts.length > 0 && !searchQuery && !selectedTag && (
                    <section className="section-spacing bg-neutral-offWhite">
                        <div className="container-custom">
                            <div className="flex items-center space-x-2 mb-8">
                                <TrendingUp className="w-6 h-6 text-primary-deep" />
                                <h2 className="font-display text-3xl font-semibold text-neutral-text">
                                    Featured Articles
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {featuredPosts.slice(0, 2).map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link to={`/journal/blog/${post.id}`}>
                                            <Card hover className="overflow-hidden h-full">
                                                <div className="aspect-video relative overflow-hidden">
                                                    <img
                                                        src={post.image}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                                                            FEATURED
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex items-center space-x-4 text-sm text-neutral-muted mb-3">
                                                        <div className="flex items-center space-x-1">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>
                                                                {new Date(post.date).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{post.readTime}</span>
                                                        </div>
                                                    </div>
                                                    <h3 className="font-display text-2xl font-semibold text-neutral-text mb-3 group-hover:text-primary-deep transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-neutral-muted leading-relaxed mb-4">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex flex-wrap gap-2">
                                                            {post.tags.slice(0, 2).map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="px-2 py-1 bg-primary-light text-primary-deep text-xs rounded-full"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-sm text-neutral-muted">
                                                            <div className="flex items-center space-x-1">
                                                                <Heart className="w-4 h-4" />
                                                                <span>{post.likes}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <MessageCircle className="w-4 h-4" />
                                                                <span>{post.comments}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Regular Posts */}
                <section className="section-spacing">
                    <div className="container-custom">
                        <h2 className="font-display text-3xl font-semibold text-neutral-text mb-8">
                            {searchQuery || selectedTag ? "Search Results" : "All Articles"}
                        </h2>

                        {regularPosts.length > 0 ? (
                            <div className="space-y-8">
                                {regularPosts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link to={`/journal/blog/${post.id}`}>
                                            <Card hover className="overflow-hidden">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="md:w-1/3 aspect-video md:aspect-auto relative overflow-hidden">
                                                        <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div className="flex-1 p-6">
                                                        <div className="flex items-center space-x-4 text-sm text-neutral-muted mb-3">
                                                            <div className="flex items-center space-x-1">
                                                                <Calendar className="w-4 h-4" />
                                                                <span>
                                                                    {new Date(post.date).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Clock className="w-4 h-4" />
                                                                <span>{post.readTime}</span>
                                                            </div>
                                                        </div>
                                                        <h3 className="font-display text-2xl font-semibold text-neutral-text mb-3 group-hover:text-primary-deep transition-colors">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-neutral-muted leading-relaxed mb-4">
                                                            {post.excerpt}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex flex-wrap gap-2">
                                                                {post.tags.map((tag) => (
                                                                    <span
                                                                        key={tag}
                                                                        className="px-2 py-1 bg-primary-light text-primary-deep text-xs rounded-full"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <div className="flex items-center space-x-4 text-sm text-neutral-muted">
                                                                <div className="flex items-center space-x-1">
                                                                    <Heart className="w-4 h-4" />
                                                                    <span>{post.likes}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-1">
                                                                    <MessageCircle className="w-4 h-4" />
                                                                    <span>{post.comments}</span>
                                                                </div>
                                                                <ArrowRight className="w-5 h-5 text-primary-deep group-hover:translate-x-1 transition-transform" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <Search className="w-16 h-16 text-neutral-muted mx-auto mb-4" />
                                <h3 className="font-display text-2xl font-semibold text-neutral-text mb-2">
                                    No articles found
                                </h3>
                                <p className="text-neutral-muted mb-6">
                                    Try adjusting your search or filters
                                </p>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setSearchQuery("")
                                        setSelectedTag(null)
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default BlogPage

export const Head = () => <title>Blog - Virtual Chamber</title>