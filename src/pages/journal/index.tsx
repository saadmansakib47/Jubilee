import React from "react"
import { Link } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import {
    BookOpen,
    FileText,
    Stethoscope,
    GraduationCap,
    Calendar,
    TrendingUp,
    ArrowRight,
} from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { JournalSidebar } from "@/components/journal/Sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ANIMATION_VARIANTS } from "@/utils/constants"

// Dummy recent entries
const recentEntries = [
    {
        id: 1,
        type: "blog",
        title: "Understanding Cognitive Behavioral Therapy: A Practical Guide",
        excerpt:
            "Explore how CBT can help manage anxiety and depression through evidence-based techniques...",
        date: "2024-01-15",
        readTime: "8 min read",
        category: "Mental Health",
    },
    {
        id: 2,
        type: "research",
        title: "The Impact of Mindfulness on Stress Reduction: A Meta-Analysis",
        excerpt:
            "A comprehensive review of 50+ studies examining mindfulness-based interventions...",
        date: "2024-01-10",
        readTime: "15 min read",
        category: "Research",
    },
    {
        id: 3,
        type: "case-study",
        title: "Overcoming Social Anxiety: A Success Story",
        excerpt:
            "A detailed case study of a 28-year-old patient's journey from isolation to confidence...",
        date: "2024-01-08",
        readTime: "12 min read",
        category: "Case Studies",
    },
    {
        id: 4,
        type: "internship",
        title: "Clinical Observations: Week 12 at City General Hospital",
        excerpt:
            "Reflections on patient care, treatment planning, and interdisciplinary collaboration...",
        date: "2024-01-05",
        readTime: "6 min read",
        category: "Internship",
    },
]

const categoryCards = [
    {
        id: "blog",
        title: "Blogs",
        description: "Insights on mental health, therapy techniques, and wellness",
        icon: BookOpen,
        count: 12,
        color: "from-blue-500 to-blue-600",
        href: "/journal/blog",
    },
    {
        id: "research",
        title: "Research & Publications",
        description: "Academic papers, studies, and published research",
        icon: FileText,
        count: 8,
        color: "from-purple-500 to-purple-600",
        href: "/journal/research",
    },
    {
        id: "case-studies",
        title: "Case Studies",
        description: "Real-world examples of treatment approaches and outcomes",
        icon: Stethoscope,
        count: 15,
        color: "from-green-500 to-green-600",
        href: "/journal/case-studies",
    },
    {
        id: "internship",
        title: "Internship Notes",
        description: "Clinical observations and learning experiences",
        icon: GraduationCap,
        count: 20,
        color: "from-orange-500 to-orange-600",
        href: "/journal/internship-notes",
    },
]

const CARDIOLOGY_NEWS = [
    "NEW STUDY REVEALS BENEFITS OF MEDITERRANEAN DIET ON HEART HEALTH",
    "AI-DRIVEN DIAGNOSTIC TOOLS IMPROVE EARLY DETECTION OF AFIB",
    "BREAKTHROUGH IN GENE THERAPY FOR CONGESTIVE HEART FAILURE",
    "RECENT DATA SUGGESTS HYPERTENSION MANAGEMENT REDUCES STROKE RISK BY 25%",
    "ADVANCED IMAGING TECHNIQUES PROVIDE CLEARER INSIGHTS INTO CORONARY ARTERY DISEASE",
]

const NewsTicker: React.FC = () => {
    const [index, setIndex] = React.useState(0)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % CARDIOLOGY_NEWS.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="h-12 flex items-center mb-4 overflow-hidden">
            <div className="flex items-center space-x-3 bg-primary-deep/5 px-4 py-1.5 rounded-lg border border-primary-deep/10">
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-deep opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-deep" />
                </span>
                <span className="text-[10px] font-bold text-primary-deep uppercase tracking-widest whitespace-nowrap">
                    BREAKING
                </span>
                <div className="h-4 w-[1px] bg-primary-deep/20" />
                <div className="relative h-6 flex-1 min-w-[300px] md:min-w-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -15, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0 text-sm font-poppins font-bold text-primary-deep tracking-wide uppercase truncate"
                        >
                            {CARDIOLOGY_NEWS[index]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

const JournalIndexPage: React.FC = () => {
    return (
        <Layout title="Journal">
            <JournalSidebar currentPath="/journal" defaultOpen={true} />

            {/* Main Content - with left margin for sidebar */}
            <div className="lg:ml-64 transition-all duration-300">
                {/* Hero Section */}
                <section className="pt-32 pb-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 relative overflow-hidden">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-primary-deep/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary-deep/10 rounded-full blur-3xl" />

                    <div className="container-custom relative z-10">
                        <NewsTicker />
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
                                    Knowledge Hub
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-text mb-6"
                            >
                                Professional{" "}
                                <span className="text-gradient">Journal</span>
                            </motion.h1>

                            <motion.p
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="text-xl md:text-2xl text-neutral-muted leading-relaxed mb-8"
                            >
                                Exploring the science and practice of mental health through
                                research, case studies, and clinical insights
                            </motion.p>

                            <motion.div
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="flex flex-wrap gap-4"
                            >
                                <Button variant="primary" size="lg" href="#recent" className="rounded-[14px]">
                                    Latest Entries
                                </Button>
                                <Button variant="outline" size="lg" href="#categories" className="rounded-[14px]">
                                    Browse Categories
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="section-spacing bg-white">
                    <div className="container-custom">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={ANIMATION_VARIANTS.staggerContainer}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        >
                            {[
                                { icon: BookOpen, value: "55+", label: "Total Entries" },
                                { icon: FileText, value: "8", label: "Publications" },
                                { icon: TrendingUp, value: "10K+", label: "Readers" },
                                { icon: Calendar, value: "2024", label: "Active Since" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    variants={ANIMATION_VARIANTS.staggerItem}
                                    custom={index}
                                    className="text-center"
                                >
                                    <stat.icon className="w-12 h-12 text-primary-deep mx-auto mb-4" />
                                    <div className="font-display text-4xl font-semibold text-neutral-text mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-neutral-muted">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Category Cards */}
                <section id="categories" className="section-spacing bg-neutral-offWhite">
                    <div className="container-custom">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="text-center mb-12"
                        >
                            <h2 className="font-display text-4xl md:text-5xl font-semibold text-neutral-text mb-4">
                                Explore by <span className="text-gradient">Category</span>
                            </h2>
                            <p className="text-xl text-neutral-muted max-w-2xl mx-auto">
                                Dive into specific areas of interest
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={ANIMATION_VARIANTS.staggerContainer}
                            className="grid md:grid-cols-2 gap-6"
                        >
                            {categoryCards.map((category, index) => (
                                <motion.div
                                    key={category.id}
                                    variants={ANIMATION_VARIANTS.staggerItem}
                                    custom={index}
                                >
                                    <Link to={category.href}>
                                        <Card hover className="h-full group border border-primary-deep/40 bg-[#fcfaff] shadow-soft">
                                            <div className="flex items-start space-x-4">
                                                <div
                                                    className="w-16 h-16 rounded-2xl bg-primary-deep flex items-center justify-center flex-shrink-0 shadow-medium group-hover:scale-110 transition-transform"
                                                >
                                                    <category.icon className="w-8 h-8 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="font-display text-2xl font-semibold text-neutral-text group-hover:text-primary-deep transition-colors">
                                                            {category.title}
                                                        </h3>
                                                        <span className="text-sm font-semibold px-3 py-1 bg-primary-light text-primary-deep rounded-full">
                                                            {category.count}
                                                        </span>
                                                    </div>
                                                    <p className="text-neutral-muted leading-relaxed mb-3">
                                                        {category.description}
                                                    </p>
                                                    <div className="flex items-center text-primary-deep font-medium text-sm">
                                                        View all
                                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Recent Entries */}
                <section id="recent" className="section-spacing">
                    <div className="container-custom">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="flex items-center justify-between mb-12"
                        >
                            <div>
                                <h2 className="font-display text-4xl md:text-5xl font-semibold text-neutral-text mb-4">
                                    Recent <span className="text-gradient">Entries</span>
                                </h2>
                                <p className="text-xl text-neutral-muted">
                                    Latest insights and updates
                                </p>
                            </div>
                            <Button variant="outline" href="/journal/blog" className="rounded-[14px]">
                                View All
                            </Button>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={ANIMATION_VARIANTS.staggerContainer}
                            className="space-y-6"

                        >
                            {recentEntries.map((entry, index) => (
                                <motion.div
                                    key={entry.id}
                                    variants={ANIMATION_VARIANTS.staggerItem}
                                    custom={index}
                                >
                                    <Link
                                        to={`/journal/${entry.type}/${entry.id}`}
                                        className="block group"
                                    >
                                        <Card hover className="p-6 border border-primary-deep/40 bg-[#fcfaff] shadow-soft">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <span className="px-3 py-1 bg-primary-light text-primary-deep text-xs font-semibold rounded-full">
                                                            {entry.category}
                                                        </span>
                                                        <span className="text-sm text-neutral-muted">
                                                            {entry.readTime}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-display text-2xl font-semibold text-neutral-text group-hover:text-primary-deep transition-colors mb-2">
                                                        {entry.title}
                                                    </h3>
                                                    <p className="text-neutral-muted leading-relaxed">
                                                        {entry.excerpt}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-neutral-muted md:flex-col md:items-end md:space-x-0 md:space-y-2">
                                                    <span>
                                                        {new Date(entry.date).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                    <ArrowRight className="w-5 h-5 text-primary-deep group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section-spacing bg-gradient-to-br from-primary-deep to-secondary-deep text-white">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                                Stay Updated
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Get notified when new journal entries are published
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-3 text-neutral-text outline-none rounded-[14px]"
                                />
                                <Button variant="secondary" size="lg" className="rounded-[14px]">
                                    Subscribe
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default JournalIndexPage

export const Head = () => <title>Journal - Virtual Chamber</title>