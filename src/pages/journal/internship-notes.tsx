import React, { useState } from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import {
    GraduationCap,
    Calendar,
    MapPin,
    BookOpen,
    Award,
    Filter,
    ChevronRight,
} from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { JournalSidebar } from "@/components/journal/Sidebar"
import { Card } from "@/components/ui/Card"
import { ANIMATION_VARIANTS } from "@/utils/constants"

// Dummy internship notes
const internshipNotes = [
    {
        id: 1,
        week: "Week 12",
        title: "Crisis Intervention and Emergency Response",
        location: "City General Hospital - Emergency Psychiatry Unit",
        date: "2024-01-15",
        category: "Clinical Skills",
        tags: ["Crisis Intervention", "Emergency Care", "Risk Assessment"],
        excerpt:
            "This week provided intense hands-on experience in crisis intervention, including suicide risk assessment and de-escalation techniques.",
        keyLearnings: [
            "Conducting rapid mental status examinations",
            "Suicide risk assessment protocols (SAFE-T)",
            "De-escalation techniques in high-stress situations",
            "Collaboration with emergency medical teams",
        ],
        observations:
            "The importance of remaining calm and empathetic during crisis situations cannot be overstated. Witnessed how a compassionate approach can transform a volatile situation.",
        clinicalHours: 40,
        featured: true,
    },
    {
        id: 2,
        week: "Week 10",
        title: "Group Therapy Dynamics and Facilitation",
        location: "Community Mental Health Center",
        date: "2024-01-01",
        category: "Therapy Techniques",
        tags: ["Group Therapy", "Facilitation", "Therapeutic Alliance"],
        excerpt:
            "Observations on group therapy facilitation, managing group dynamics, and creating a safe therapeutic environment.",
        keyLearnings: [
            "Establishing group norms and boundaries",
            "Managing challenging group members",
            "Encouraging participation from quiet members",
            "Processing emotional content in real-time",
        ],
        observations:
            "Group therapy offers unique opportunities for peer support and social learning that individual therapy cannot replicate.",
        clinicalHours: 35,
        featured: true,
    },
    {
        id: 3,
        week: "Week 8",
        title: "Assessment and Diagnostic Formulation",
        location: "University Counseling Center",
        date: "2023-12-15",
        category: "Assessment",
        tags: ["Psychological Assessment", "Diagnosis", "Testing"],
        excerpt:
            "Comprehensive training in psychological assessment, including structured interviews and psychometric testing.",
        keyLearnings: [
            "Administering clinical interviews (SCID-5)",
            "Interpreting psychological test results",
            "Differential diagnosis challenges",
            "Collaborative assessment with clients",
        ],
        observations:
            "Assessment is not just about diagnosis but understanding the whole person and their unique context.",
        clinicalHours: 30,
        featured: false,
    },
    {
        id: 4,
        week: "Week 6",
        title: "Trauma-Informed Care in Practice",
        location: "Veterans Affairs Medical Center",
        date: "2023-12-01",
        category: "Specialized Treatment",
        tags: ["Trauma", "PTSD", "Veterans", "EMDR"],
        excerpt:
            "Deep dive into trauma-informed care principles and EMDR therapy with veteran population.",
        keyLearnings: [
            "Trauma-informed assessment techniques",
            "EMDR protocol and implementation",
            "Understanding military culture and context",
            "Managing vicarious trauma",
        ],
        observations:
            "Working with trauma survivors requires patience, specialized training, and excellent self-care practices.",
        clinicalHours: 38,
        featured: false,
    },
    {
        id: 5,
        week: "Week 4",
        title: "Child and Adolescent Psychotherapy",
        location: "Children's Mental Health Services",
        date: "2023-11-15",
        category: "Specialized Populations",
        tags: ["Child Psychology", "Play Therapy", "Family Systems"],
        excerpt:
            "Introduction to developmentally appropriate therapy techniques for children and adolescents.",
        keyLearnings: [
            "Play therapy fundamentals",
            "Adapting CBT for younger clients",
            "Working with parents and families",
            "School consultation and collaboration",
        ],
        observations:
            "Children often express emotions through play and behavior rather than words, requiring creative therapeutic approaches.",
        clinicalHours: 32,
        featured: false,
    },
]

const InternshipNotesPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All")

    const categories = [
        "All",
        "Clinical Skills",
        "Therapy Techniques",
        "Assessment",
        "Specialized Treatment",
        "Specialized Populations",
    ]

    const filteredNotes =
        selectedCategory === "All"
            ? internshipNotes
            : internshipNotes.filter((note) => note.category === selectedCategory)

    const totalHours = internshipNotes.reduce(
        (sum, note) => sum + note.clinicalHours,
        0
    )
    const featuredNotes = filteredNotes.filter((note) => note.featured)
    const regularNotes = filteredNotes.filter((note) => !note.featured)

    return (
        <Layout title="Internship Notes">
            <JournalSidebar currentPath="/journal/internship-notes" defaultOpen={true} />

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
                                    Clinical Training Journey
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="font-display text-5xl md:text-6xl font-semibold text-neutral-text mb-6"
                            >
                                Internship <span className="text-gradient">Notes</span>
                            </motion.h1>

                            <motion.p
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="text-xl text-neutral-muted leading-relaxed"
                            >
                                Clinical observations, learning experiences, and reflections from
                                advanced training in various mental health settings
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
                                { icon: GraduationCap, value: "20", label: "Weekly Notes" },
                                { icon: Calendar, value: totalHours, label: "Clinical Hours" },
                                { icon: MapPin, value: "5", label: "Training Sites" },
                                { icon: Award, value: "15+", label: "Skills Mastered" },
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

                {/* Featured Notes */}
                {featuredNotes.length > 0 && selectedCategory === "All" && (
                    <section className="section-spacing">
                        <div className="container-custom">
                            <div className="flex items-center space-x-2 mb-8">
                                <BookOpen className="w-6 h-6 text-primary-deep" />
                                <h2 className="font-display text-3xl font-semibold text-neutral-text">
                                    Highlighted Experiences
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {featuredNotes.map((note, index) => (
                                    <motion.div
                                        key={note.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link to={`/journal/internship-notes/${note.id}`}>
                                            <Card hover className="overflow-hidden">
                                                <div className="p-8">
                                                    <div className="flex flex-col lg:flex-row gap-6">
                                                        {/* Left: Timeline indicator */}
                                                        <div className="lg:w-32 flex-shrink-0">
                                                            <div className="inline-block lg:block px-4 py-2 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-lg">
                                                                {note.week}
                                                            </div>
                                                            <div className="hidden lg:block mt-4 text-sm text-neutral-muted">
                                                                {note.clinicalHours} hours
                                                            </div>
                                                        </div>

                                                        {/* Main Content */}
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-3 mb-3">
                                                                <span className="px-3 py-1 bg-primary-light text-primary-deep text-xs font-semibold rounded-full">
                                                                    {note.category}
                                                                </span>
                                                                <span className="text-sm text-neutral-muted lg:hidden">
                                                                    {note.clinicalHours} hours
                                                                </span>
                                                            </div>

                                                            <h3 className="font-display text-2xl font-semibold text-neutral-text mb-3 group-hover:text-primary-deep transition-colors">
                                                                {note.title}
                                                            </h3>

                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-neutral-muted mb-4">
                                                                <div className="flex items-center space-x-1">
                                                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                                                    <span>{note.location}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-1">
                                                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                                                    <span>
                                                                        {new Date(note.date).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <p className="text-neutral-muted leading-relaxed mb-4">
                                                                {note.excerpt}
                                                            </p>

                                                            {/* Key Learnings Preview */}
                                                            <div className="mb-4">
                                                                <p className="text-sm font-semibold text-neutral-text mb-2">
                                                                    Key Learnings:
                                                                </p>
                                                                <ul className="space-y-1">
                                                                    {note.keyLearnings.slice(0, 2).map((learning, i) => (
                                                                        <li
                                                                            key={i}
                                                                            className="flex items-start space-x-2 text-sm text-neutral-muted"
                                                                        >
                                                                            <ChevronRight className="w-4 h-4 text-primary-deep flex-shrink-0 mt-0.5" />
                                                                            <span>{learning}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* Tags */}
                                                            <div className="flex flex-wrap gap-2">
                                                                {note.tags.map((tag) => (
                                                                    <span
                                                                        key={tag}
                                                                        className="px-2 py-1 bg-neutral-border text-neutral-text text-xs rounded-full"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
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

                {/* Regular Notes - Timeline View */}
                <section className="section-spacing bg-neutral-offWhite">
                    <div className="container-custom">
                        <h2 className="font-display text-3xl font-semibold text-neutral-text mb-8">
                            {selectedCategory === "All"
                                ? "Clinical Training Timeline"
                                : selectedCategory}
                        </h2>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary-light hidden lg:block" />

                            <div className="space-y-8">
                                {regularNotes.map((note, index) => (
                                    <motion.div
                                        key={note.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="relative"
                                    >
                                        {/* Timeline dot */}
                                        <div className="hidden lg:block absolute left-0 top-6 w-4 h-4 rounded-full bg-primary-deep -translate-x-[7px] border-4 border-white shadow-soft" />

                                        <Link
                                            to={`/journal/internship-notes/${note.id}`}
                                            className="block lg:ml-12"
                                        >
                                            <Card hover>
                                                <div className="p-6">
                                                    <div className="flex flex-col md:flex-row gap-4">
                                                        {/* Week badge */}
                                                        <div className="flex-shrink-0">
                                                            <div className="inline-block px-4 py-2 bg-primary-light text-primary-deep text-sm font-bold rounded-lg">
                                                                {note.week}
                                                            </div>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-3 mb-2">
                                                                <span className="px-3 py-1 bg-primary-light text-primary-deep text-xs font-semibold rounded-full">
                                                                    {note.category}
                                                                </span>
                                                                <span className="text-sm text-neutral-muted">
                                                                    {note.clinicalHours} hours
                                                                </span>
                                                            </div>

                                                            <h3 className="font-display text-xl font-semibold text-neutral-text mb-2 group-hover:text-primary-deep transition-colors">
                                                                {note.title}
                                                            </h3>

                                                            <div className="flex items-center space-x-1 text-sm text-neutral-muted mb-3">
                                                                <MapPin className="w-4 h-4" />
                                                                <span>{note.location}</span>
                                                            </div>

                                                            <p className="text-neutral-muted text-sm leading-relaxed mb-3">
                                                                {note.excerpt}
                                                            </p>

                                                            <div className="flex flex-wrap gap-2">
                                                                {note.tags.map((tag) => (
                                                                    <span
                                                                        key={tag}
                                                                        className="px-2 py-1 bg-neutral-border text-neutral-text text-xs rounded-full"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
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
                            <GraduationCap className="w-16 h-16 mx-auto mb-6" />
                            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                                Continuous Learning, Better Care
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Every clinical experience deepens my commitment to providing
                                evidence-based, compassionate mental health care.
                            </p>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default InternshipNotesPage

export const Head = () => <title>Internship Notes - Virtual Chamber</title>