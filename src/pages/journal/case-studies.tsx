import React, { useState } from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import {
    Stethoscope,
    TrendingUp,
    CheckCircle,
    Clock,
    Users,
    Filter,
    ArrowRight,
} from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { JournalSidebar } from "@/components/journal/Sidebar"
import { Card } from "@/components/ui/Card"
import { ANIMATION_VARIANTS } from "@/utils/constants"

// Dummy case studies
const caseStudies = [
    {
        id: 1,
        title: "Overcoming Social Anxiety: From Isolation to Confidence",
        category: "Anxiety Disorders",
        patientProfile: "28-year-old professional, Female",
        duration: "6 months",
        sessions: 24,
        excerpt:
            "A detailed case study of how CBT and exposure therapy helped a young professional overcome debilitating social anxiety.",
        challenge:
            "Severe social anxiety preventing professional advancement and social interactions",
        approach: [
            "Cognitive Behavioral Therapy (CBT)",
            "Gradual exposure therapy",
            "Social skills training",
            "Mindfulness practices",
        ],
        outcomes: [
            "Successful presentation at work conference",
            "Rebuilt social network with 10+ close friends",
            "Promoted to team leader position",
            "95% reduction in anxiety symptoms (GAD-7 scale)",
        ],
        techniques: ["Cognitive restructuring", "Exposure hierarchy", "Role-playing"],
        successRate: 95,
        featured: true,
    },
    {
        id: 2,
        title: "Breaking Free from Depression: A Journey of Recovery",
        category: "Mood Disorders",
        patientProfile: "35-year-old teacher, Male",
        duration: "8 months",
        sessions: 32,
        excerpt:
            "How a combination of therapy and lifestyle changes helped overcome a two-year battle with major depression.",
        challenge:
            "Major depressive disorder affecting work performance and family relationships",
        approach: [
            "Psychodynamic therapy",
            "Behavioral activation",
            "Sleep hygiene improvements",
            "Exercise integration",
        ],
        outcomes: [
            "Returned to full-time teaching",
            "Improved family relationships",
            "Established healthy daily routine",
            "Symptom remission (PHQ-9 score < 5)",
        ],
        techniques: ["Behavioral activation", "Cognitive restructuring", "Relapse prevention"],
        successRate: 90,
        featured: true,
    },
    {
        id: 3,
        title: "Healing from Trauma: A Path to Post-Traumatic Growth",
        category: "Trauma & PTSD",
        patientProfile: "42-year-old veteran, Male",
        duration: "12 months",
        sessions: 48,
        excerpt:
            "A comprehensive approach to treating complex PTSD through trauma-focused therapy.",
        challenge:
            "Combat-related PTSD with nightmares, flashbacks, and hypervigilance",
        approach: [
            "EMDR therapy",
            "Trauma-focused CBT",
            "Group therapy with veterans",
            "Medication management",
        ],
        outcomes: [
            "Significant reduction in PTSD symptoms",
            "Improved sleep quality",
            "Successful return to civilian employment",
            "Active in veteran support groups",
        ],
        techniques: ["EMDR", "Somatic experiencing", "Grounding techniques"],
        successRate: 85,
        featured: false,
    },
    {
        id: 4,
        title: "Rebuilding After Panic: Managing Panic Disorder",
        category: "Anxiety Disorders",
        patientProfile: "31-year-old nurse, Female",
        duration: "5 months",
        sessions: 20,
        excerpt:
            "How exposure therapy and CBT helped eliminate panic attacks and restore confidence.",
        challenge:
            "Frequent panic attacks limiting professional and personal activities",
        approach: [
            "Panic-focused CBT",
            "Interoceptive exposure",
            "Breathing techniques",
            "Gradual exposure to triggers",
        ],
        outcomes: [
            "Zero panic attacks for 3+ months",
            "Resumed full nursing duties",
            "Able to use public transportation",
            "Developed effective coping strategies",
        ],
        techniques: ["Interoceptive exposure", "Cognitive challenging", "Breathing retraining"],
        successRate: 92,
        featured: false,
    },
    {
        id: 5,
        title: "Saving a Marriage: Couples Therapy Success Story",
        category: "Relationship Issues",
        patientProfile: "Couple in their 40s",
        duration: "4 months",
        sessions: 16,
        excerpt:
            "How emotionally-focused therapy helped a couple reconnect and strengthen their bond.",
        challenge:
            "Communication breakdown and emotional distance after 15 years of marriage",
        approach: [
            "Emotionally Focused Therapy",
            "Communication skills training",
            "Attachment-based interventions",
            "Individual and couples sessions",
        ],
        outcomes: [
            "Improved emotional intimacy",
            "Effective conflict resolution",
            "Renewed commitment to relationship",
            "Weekly quality time established",
        ],
        techniques: ["EFT", "Active listening", "Emotion regulation"],
        successRate: 88,
        featured: false,
    },
]

const CaseStudiesPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All")

    const categories = [
        "All",
        "Anxiety Disorders",
        "Mood Disorders",
        "Trauma & PTSD",
        "Relationship Issues",
    ]

    const filteredStudies =
        selectedCategory === "All"
            ? caseStudies
            : caseStudies.filter((study) => study.category === selectedCategory)

    const featuredStudies = filteredStudies.filter((study) => study.featured)
    const regularStudies = filteredStudies.filter((study) => !study.featured)

    return (
        <Layout title="Case Studies">
            <JournalSidebar currentPath="/journal/case-studies" defaultOpen={true} />

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
                                    Real Success Stories
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="font-display text-5xl md:text-6xl font-semibold text-neutral-text mb-6"
                            >
                                Clinical <span className="text-gradient">Case Studies</span>
                            </motion.h1>

                            <motion.p
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="text-xl text-neutral-muted leading-relaxed"
                            >
                                Real-world examples of therapeutic approaches, challenges
                                overcome, and successful outcomes
                            </motion.p>

                            <motion.p
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="text-sm text-neutral-muted mt-4 italic"
                            >
                                *All case studies are anonymized and presented with patient
                                consent to protect confidentiality
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Stats */}
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
                                { icon: Stethoscope, value: "15", label: "Case Studies" },
                                { icon: TrendingUp, value: "90%", label: "Success Rate" },
                                { icon: Clock, value: "6 mo", label: "Avg. Duration" },
                                { icon: Users, value: "100+", label: "Patients Helped" },
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

                {/* Category Filter */}
                <section className="py-8 bg-neutral-offWhite sticky top-20 z-30 shadow-soft">
                    <div className="container-custom">
                        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                            <Filter className="w-5 h-5 text-neutral-muted flex-shrink-0" />
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                        ? "bg-primary-deep text-white"
                                        : "bg-white text-neutral-text hover:bg-primary-light"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Case Studies */}
                {featuredStudies.length > 0 && selectedCategory === "All" && (
                    <section className="section-spacing">
                        <div className="container-custom">
                            <div className="flex items-center space-x-2 mb-8">
                                <TrendingUp className="w-6 h-6 text-primary-deep" />
                                <h2 className="font-display text-3xl font-semibold text-neutral-text">
                                    Featured Success Stories
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {featuredStudies.map((study, index) => (
                                    <motion.div
                                        key={study.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link to={`/journal/case-studies/${study.id}`}>
                                            <Card hover className="h-full">
                                                <div className="p-6">
                                                    <div className="flex items-center space-x-3 mb-4">
                                                        <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                                                            FEATURED
                                                        </span>
                                                        <span className="px-3 py-1 bg-primary-light text-primary-deep text-xs font-semibold rounded-full">
                                                            {study.category}
                                                        </span>
                                                    </div>

                                                    <h3 className="font-display text-2xl font-semibold text-neutral-text mb-3 group-hover:text-primary-deep transition-colors">
                                                        {study.title}
                                                    </h3>

                                                    <div className="flex items-center space-x-4 text-sm text-neutral-muted mb-4">
                                                        <div className="flex items-center space-x-1">
                                                            <Users className="w-4 h-4" />
                                                            <span>{study.patientProfile}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{study.duration}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-neutral-muted leading-relaxed mb-6">
                                                        {study.excerpt}
                                                    </p>

                                                    {/* Success Rate */}
                                                    <div className="mb-4">
                                                        <div className="flex items-center justify-between text-sm mb-2">
                                                            <span className="text-neutral-text font-medium">
                                                                Success Rate
                                                            </span>
                                                            <span className="text-primary-deep font-bold">
                                                                {study.successRate}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-neutral-border rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-primary-deep to-green-500 h-2 rounded-full transition-all duration-1000"
                                                                style={{ width: `${study.successRate}%` }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Key Outcomes */}
                                                    <div className="space-y-2 mb-4">
                                                        <p className="text-sm font-semibold text-neutral-text">
                                                            Key Outcomes:
                                                        </p>
                                                        {study.outcomes.slice(0, 2).map((outcome, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-start space-x-2 text-sm text-neutral-muted"
                                                            >
                                                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                                <span>{outcome}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="flex items-center text-primary-deep font-medium text-sm pt-4 border-t border-neutral-border">
                                                        Read full case study
                                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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

                {/* Regular Case Studies */}
                <section className="section-spacing bg-neutral-offWhite">
                    <div className="container-custom">
                        <h2 className="font-display text-3xl font-semibold text-neutral-text mb-8">
                            {selectedCategory === "All" ? "All Case Studies" : selectedCategory}
                        </h2>

                        <div className="space-y-6">
                            {regularStudies.map((study, index) => (
                                <motion.div
                                    key={study.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link to={`/journal/case-studies/${study.id}`}>
                                        <Card hover>
                                            <div className="p-6">
                                                <div className="flex flex-col lg:flex-row gap-6">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-3">
                                                            <span className="px-3 py-1 bg-primary-light text-primary-deep text-xs font-semibold rounded-full">
                                                                {study.category}
                                                            </span>
                                                            <span className="text-sm text-neutral-muted">
                                                                {study.sessions} sessions
                                                            </span>
                                                        </div>

                                                        <h3 className="font-display text-2xl font-semibold text-neutral-text mb-3 group-hover:text-primary-deep transition-colors">
                                                            {study.title}
                                                        </h3>

                                                        <div className="flex items-center space-x-4 text-sm text-neutral-muted mb-4">
                                                            <div className="flex items-center space-x-1">
                                                                <Users className="w-4 h-4" />
                                                                <span>{study.patientProfile}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Clock className="w-4 h-4" />
                                                                <span>{study.duration}</span>
                                                            </div>
                                                        </div>

                                                        <p className="text-neutral-muted leading-relaxed">
                                                            {study.excerpt}
                                                        </p>
                                                    </div>

                                                    <div className="lg:w-64 space-y-4">
                                                        {/* Success Rate */}
                                                        <div>
                                                            <div className="flex items-center justify-between text-sm mb-2">
                                                                <span className="text-neutral-text font-medium">
                                                                    Success Rate
                                                                </span>
                                                                <span className="text-primary-deep font-bold">
                                                                    {study.successRate}%
                                                                </span>
                                                            </div>
                                                            <div className="w-full bg-neutral-border rounded-full h-2">
                                                                <div
                                                                    className="bg-gradient-to-r from-primary-deep to-green-500 h-2 rounded-full"
                                                                    style={{ width: `${study.successRate}%` }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Techniques Used */}
                                                        <div>
                                                            <p className="text-sm font-semibold text-neutral-text mb-2">
                                                                Techniques:
                                                            </p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {study.techniques.map((technique) => (
                                                                    <span
                                                                        key={technique}
                                                                        className="px-2 py-1 bg-primary-light text-primary-deep text-xs rounded-full"
                                                                    >
                                                                        {technique}
                                                                    </span>
                                                                ))}
                                                            </div>
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

                {/* CTA Section */}
                <section className="section-spacing bg-gradient-to-br from-primary-deep to-secondary-deep text-white">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <Stethoscope className="w-16 h-16 mx-auto mb-6" />
                            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                                Your Success Story Awaits
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Every journey is unique. Let's work together to write yours.
                            </p>
                            <Button variant="secondary" size="lg" href="/contact">
                                Start Your Journey
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default CaseStudiesPage

export const Head = () => <title>Case Studies - Virtual Chamber</title>