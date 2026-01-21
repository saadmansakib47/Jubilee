import React, { useState } from "react"
import { motion } from "framer-motion"
import {
    FileText,
    Download,
    ExternalLink,
    Calendar,
    Award,
    Users,
    BookOpen,
    Filter,
} from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { JournalSidebar } from "@/components/journal/Sidebar"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ANIMATION_VARIANTS } from "@/utils/constants"

// Dummy research papers
const researchPapers = [
    {
        id: 1,
        title:
            "The Impact of Mindfulness-Based Interventions on Anxiety Disorders: A Meta-Analysis",
        authors: ["Dr. [Name]", "Dr. Jane Smith", "Dr. Robert Johnson"],
        journal: "Journal of Clinical Psychology",
        year: 2024,
        type: "Meta-Analysis",
        abstract:
            "This comprehensive meta-analysis examines 50+ randomized controlled trials investigating the efficacy of mindfulness-based interventions in treating various anxiety disorders...",
        keywords: ["Mindfulness", "Anxiety", "Meta-Analysis", "Treatment Efficacy"],
        citations: 45,
        doi: "10.1234/jcp.2024.001",
        pdfUrl: "#",
        featured: true,
    },
    {
        id: 2,
        title:
            "Cognitive Behavioral Therapy vs. Traditional Talk Therapy: A Comparative Study",
        authors: ["Dr. [Name]", "Dr. Michael Brown"],
        journal: "American Journal of Psychiatry",
        year: 2023,
        type: "Comparative Study",
        abstract:
            "A randomized controlled trial comparing the effectiveness of CBT and traditional psychodynamic therapy in treating major depressive disorder...",
        keywords: ["CBT", "Depression", "Comparative Study", "Treatment Outcomes"],
        citations: 78,
        doi: "10.1234/ajp.2023.045",
        pdfUrl: "#",
        featured: true,
    },
    {
        id: 3,
        title: "Telepsychology During the Pandemic: Efficacy and Patient Satisfaction",
        authors: ["Dr. [Name]", "Dr. Sarah Williams", "Dr. David Lee"],
        journal: "Psychology Today Research",
        year: 2023,
        type: "Research Article",
        abstract:
            "This study evaluates the effectiveness of telepsychology services during the COVID-19 pandemic, examining both clinical outcomes and patient satisfaction...",
        keywords: ["Telepsychology", "COVID-19", "Patient Satisfaction", "Digital Health"],
        citations: 92,
        doi: "10.1234/ptr.2023.067",
        pdfUrl: "#",
        featured: false,
    },
    {
        id: 4,
        title: "Trauma-Informed Care: Best Practices in Clinical Settings",
        authors: ["Dr. [Name]"],
        journal: "Trauma Psychology Quarterly",
        year: 2023,
        type: "Review Article",
        abstract:
            "A comprehensive review of trauma-informed care principles and their application in various clinical settings, with practical guidelines for implementation...",
        keywords: ["Trauma", "Best Practices", "Clinical Guidelines", "Patient Care"],
        citations: 34,
        doi: "10.1234/tpq.2023.023",
        pdfUrl: "#",
        featured: false,
    },
    {
        id: 5,
        title: "Sleep Disorders and Mental Health: A Longitudinal Study",
        authors: ["Dr. [Name]", "Dr. Emily Chen", "Dr. Thomas Anderson"],
        journal: "Sleep Medicine Reviews",
        year: 2022,
        type: "Longitudinal Study",
        abstract:
            "A five-year longitudinal study examining the bidirectional relationship between sleep disorders and mental health outcomes in adults...",
        keywords: ["Sleep Disorders", "Mental Health", "Longitudinal Study", "Comorbidity"],
        citations: 156,
        doi: "10.1234/smr.2022.112",
        pdfUrl: "#",
        featured: false,
    },
]

const ResearchPage: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string>("All")
    const [sortBy, setSortBy] = useState<"recent" | "citations">("recent")

    const types = ["All", "Meta-Analysis", "Comparative Study", "Research Article", "Review Article", "Longitudinal Study"]

    // Filter and sort papers
    let filteredPapers =
        selectedType === "All"
            ? researchPapers
            : researchPapers.filter((paper) => paper.type === selectedType)

    filteredPapers = [...filteredPapers].sort((a, b) => {
        if (sortBy === "recent") {
            return b.year - a.year
        } else {
            return b.citations - a.citations
        }
    })

    const featuredPapers = filteredPapers.filter((paper) => paper.featured)
    const regularPapers = filteredPapers.filter((paper) => !paper.featured)

    return (
        <Layout title="Research & Publications">
            <JournalSidebar currentPath="/journal/research" defaultOpen={true} />

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
                                    Academic Contributions
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="font-display text-5xl md:text-6xl font-semibold text-neutral-text mb-6"
                            >
                                Research &{" "}
                                <span className="text-gradient">Publications</span>
                            </motion.h1>

                            <motion.p
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="text-xl text-neutral-muted leading-relaxed"
                            >
                                Peer-reviewed research, academic papers, and contributions to
                                the field of clinical psychology
                            </motion.p>
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
                                { icon: FileText, value: "8", label: "Publications" },
                                { icon: Award, value: "405", label: "Total Citations" },
                                { icon: Users, value: "12", label: "Collaborators" },
                                { icon: BookOpen, value: "5", label: "Journals" },
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

                {/* Filter and Sort */}
                <section className="py-8 bg-neutral-offWhite sticky top-20 z-30 shadow-soft">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            {/* Type Filter */}
                            <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
                                <Filter className="w-5 h-5 text-neutral-muted flex-shrink-0" />
                                {types.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${selectedType === type
                                            ? "bg-primary-deep text-white"
                                            : "bg-white text-neutral-text hover:bg-primary-light"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            {/* Sort */}
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-neutral-muted whitespace-nowrap">
                                    Sort by:
                                </span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as "recent" | "citations")}
                                    className="px-4 py-2 rounded-lg border border-neutral-border bg-white focus:border-primary-deep outline-none"
                                >
                                    <option value="recent">Most Recent</option>
                                    <option value="citations">Most Cited</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Papers */}
                {featuredPapers.length > 0 && selectedType === "All" && (
                    <section className="section-spacing">
                        <div className="container-custom">
                            <div className="flex items-center space-x-2 mb-8">
                                <Award className="w-6 h-6 text-primary-deep" />
                                <h2 className="font-display text-3xl font-semibold text-neutral-text">
                                    Featured Publications
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {featuredPapers.map((paper, index) => (
                                    <motion.div
                                        key={paper.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card hover className="p-8">
                                            <div className="flex flex-col lg:flex-row gap-6">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-4">
                                                        <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                                                            FEATURED
                                                        </span>
                                                        <span className="px-3 py-1 bg-primary-light text-primary-deep text-xs font-semibold rounded-full">
                                                            {paper.type}
                                                        </span>
                                                    </div>

                                                    <h3 className="font-display text-2xl font-semibold text-neutral-text mb-3 group-hover:text-primary-deep transition-colors">
                                                        {paper.title}
                                                    </h3>

                                                    <p className="text-sm text-neutral-muted mb-3">
                                                        {paper.authors.join(", ")}
                                                    </p>

                                                    <p className="text-neutral-text mb-4">
                                                        <span className="font-semibold">{paper.journal}</span> •{" "}
                                                        {paper.year}
                                                    </p>

                                                    <p className="text-neutral-muted leading-relaxed mb-4">
                                                        {paper.abstract}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {paper.keywords.map((keyword) => (
                                                            <span
                                                                key={keyword}
                                                                className="px-2 py-1 bg-neutral-border text-neutral-text text-xs rounded-full"
                                                            >
                                                                {keyword}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div className="flex items-center space-x-6 text-sm text-neutral-muted">
                                                        <div className="flex items-center space-x-1">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{paper.year}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <BookOpen className="w-4 h-4" />
                                                            <span>{paper.citations} citations</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="lg:w-48 flex lg:flex-col gap-3">
                                                    <Button variant="primary" className="flex-1" href={paper.pdfUrl}>
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Download PDF
                                                    </Button>
                                                    <Button variant="outline" className="flex-1" href={`https://doi.org/${paper.doi}`}>
                                                        <ExternalLink className="w-4 h-4 mr-2" />
                                                        View DOI
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Regular Papers */}
                <section className="section-spacing bg-neutral-offWhite">
                    <div className="container-custom">
                        <h2 className="font-display text-3xl font-semibold text-neutral-text mb-8">
                            {selectedType === "All" ? "All Publications" : selectedType}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {regularPapers.map((paper, index) => (
                                <motion.div
                                    key={paper.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card hover className="h-full p-6">
                                        <div className="mb-3">
                                            <span className="px-3 py-1 bg-primary-light text-primary-deep text-xs font-semibold rounded-full">
                                                {paper.type}
                                            </span>
                                        </div>

                                        <h3 className="font-display text-xl font-semibold text-neutral-text mb-3 group-hover:text-primary-deep transition-colors">
                                            {paper.title}
                                        </h3>

                                        <p className="text-sm text-neutral-muted mb-2">
                                            {paper.authors.join(", ")}
                                        </p>

                                        <p className="text-sm text-neutral-text mb-3">
                                            <span className="font-semibold">{paper.journal}</span> •{" "}
                                            {paper.year}
                                        </p>

                                        <p className="text-sm text-neutral-muted leading-relaxed mb-4 line-clamp-3">
                                            {paper.abstract}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-neutral-border">
                                            <div className="flex items-center space-x-1 text-sm text-neutral-muted">
                                                <BookOpen className="w-4 h-4" />
                                                <span>{paper.citations} citations</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="p-2 hover:bg-primary-light rounded-lg transition-colors">
                                                    <Download className="w-4 h-4 text-primary-deep" />
                                                </button>
                                                <button className="p-2 hover:bg-primary-light rounded-lg transition-colors">
                                                    <ExternalLink className="w-4 h-4 text-primary-deep" />
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Admin Upload Section */}
                <section className="section-spacing bg-gradient-to-br from-primary-deep to-secondary-deep text-white">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-2xl mx-auto"
                        >
                            <FileText className="w-16 h-16 mx-auto mb-6" />
                            <h2 className="font-display text-4xl font-semibold mb-4">
                                Admin: Upload Research
                            </h2>
                            <p className="text-white/80 mb-8">
                                Upload new research papers and publications. PDFs will be
                                processed and made available for download.
                            </p>
                            <Button variant="secondary" size="lg">
                                <FileText className="w-5 h-5 mr-2" />
                                Upload New Paper
                            </Button>
                            <p className="text-sm text-white/60 mt-4">
                                Supported format: PDF (max 10MB)
                            </p>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default ResearchPage

export const Head = () => <title>Research & Publications - Virtual Chamber</title>