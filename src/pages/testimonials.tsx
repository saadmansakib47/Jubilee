import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, Star, Trash2, Edit, Plus, Filter } from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ANIMATION_VARIANTS } from "@/utils/constants"

// Testimonial type
interface Testimonial {
    id: number
    quote: string
    author: string
    role: "Patient" | "Student" | "Teacher" | "Colleague"
    location: string
    rating: number
    date: string
    featured: boolean
}

// Dummy testimonials data
const testimonials: Testimonial[] = [
    {
        id: 1,
        quote:
            "Dr. [Name] transformed my life. Her compassionate approach and deep understanding helped me navigate through my darkest times. I'm forever grateful for her guidance and support.",
        author: "Sarah Johnson",
        role: "Patient",
        location: "New York Medical Center",
        rating: 5,
        date: "2024-01-15",
        featured: true,
    },
    {
        id: 2,
        quote:
            "As a medical student, I learned invaluable lessons during my internship. Her mentorship and clinical expertise are unparalleled. She truly embodies what it means to be a compassionate healer.",
        author: "Michael Chen",
        role: "Student",
        location: "Boston Medical School",
        rating: 5,
        date: "2024-01-10",
        featured: true,
    },
    {
        id: 3,
        quote:
            "The telemedicine service made it so convenient to get help. Professional, caring, and truly effective therapy sessions that fit into my busy schedule.",
        author: "Emily Rodriguez",
        role: "Patient",
        location: "Los Angeles, CA",
        rating: 5,
        date: "2024-01-05",
        featured: true,
    },
    {
        id: 4,
        quote:
            "Working alongside Dr. [Name] has been an incredible experience. Her dedication to patient care and innovative treatment approaches inspire our entire team.",
        author: "Dr. James Wilson",
        role: "Colleague",
        location: "City General Hospital",
        rating: 5,
        date: "2023-12-20",
        featured: false,
    },
    {
        id: 5,
        quote:
            "The group therapy sessions created a safe space where I finally felt understood. The progress I've made in just a few months is remarkable.",
        author: "Amanda Foster",
        role: "Patient",
        location: "Seattle, WA",
        rating: 5,
        date: "2023-12-15",
        featured: false,
    },
    {
        id: 6,
        quote:
            "As an educator, I've had the privilege of observing her teaching methods. She has a unique ability to make complex psychological concepts accessible and engaging.",
        author: "Prof. David Martinez",
        role: "Teacher",
        location: "University of Psychology",
        rating: 5,
        date: "2023-12-10",
        featured: false,
    },
    {
        id: 7,
        quote:
            "My anxiety was overwhelming, but through her evidence-based approach and genuine care, I've learned to manage it effectively. Life-changing experience.",
        author: "Jennifer Lee",
        role: "Patient",
        location: "Chicago, IL",
        rating: 5,
        date: "2023-12-01",
        featured: false,
    },
    {
        id: 8,
        quote:
            "The couples counseling saved our marriage. Her ability to create a non-judgmental space helped us communicate better than we ever had.",
        author: "Robert & Maria Thompson",
        role: "Patient",
        location: "Miami, FL",
        rating: 5,
        date: "2023-11-25",
        featured: false,
    },
    {
        id: 9,
        quote:
            "Exceptional professional development workshops. Her insights into trauma-informed care have transformed my practice.",
        author: "Dr. Lisa Anderson",
        role: "Colleague",
        location: "Regional Therapy Center",
        rating: 5,
        date: "2023-11-20",
        featured: false,
    },
]

interface TestimonialCardProps {
    testimonial: Testimonial
    isAdmin?: boolean
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    testimonial,
    isAdmin = false,
    onEdit,
    onDelete,
}) => {
    return (
        <Card hover glass className="h-full relative group">
            {/* Admin Controls */}
            {isAdmin && (
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit?.(testimonial.id)}
                        className="w-8 h-8 rounded-full bg-primary-deep text-white flex items-center justify-center hover:bg-secondary-deep transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete?.(testimonial.id)}
                        className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Featured Badge */}
            {testimonial.featured && (
                <div className="absolute -top-3 -left-3">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-medium">
                        Featured
                    </div>
                </div>
            )}

            {/* Quote Icon */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-deep rounded-full flex items-center justify-center shadow-medium">
                <Quote className="w-6 h-6 text-white" fill="currentColor" />
            </div>

            <div className="pt-4 space-y-4">
                {/* Rating */}
                <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-text leading-relaxed italic">
                    "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-neutral-border">
                    <p className="font-semibold text-neutral-text">{testimonial.author}</p>
                    <div className="flex items-center justify-between mt-2">
                        <div>
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${testimonial.role === "Patient"
                                    ? "bg-blue-100 text-blue-700"
                                    : testimonial.role === "Student"
                                        ? "bg-green-100 text-green-700"
                                        : testimonial.role === "Teacher"
                                            ? "bg-purple-100 text-purple-700"
                                            : "bg-orange-100 text-orange-700"
                                    }`}
                            >
                                {testimonial.role}
                            </span>
                        </div>
                        <p className="text-xs text-neutral-muted">{testimonial.location}</p>
                    </div>
                    <p className="text-xs text-neutral-muted mt-2">
                        {new Date(testimonial.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-primary-deep/10 rounded-tl-3xl" />
        </Card>
    )
}

const TestimonialsPage: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState<string>("All")
    const [isAdmin] = useState(false) // Toggle this for admin view
    const [showAddForm, setShowAddForm] = useState(false)

    const roles = ["All", "Patient", "Student", "Teacher", "Colleague"]

    const filteredTestimonials =
        selectedRole === "All"
            ? testimonials
            : testimonials.filter((t) => t.role === selectedRole)

    const handleEdit = (id: number) => {
        console.log("Edit testimonial:", id)
        // Implement edit logic
    }

    const handleDelete = (id: number) => {
        console.log("Delete testimonial:", id)
        // Implement delete logic
    }

    return (
        <Layout title="Testimonials">
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 relative overflow-hidden">
                <div className="absolute top-20 right-10 w-72 h-72 bg-primary-deep/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary-deep/10 rounded-full blur-3xl" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={ANIMATION_VARIANTS.staggerContainer}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            variants={ANIMATION_VARIANTS.fadeIn}
                            className="inline-block px-4 py-2 bg-white rounded-full mb-6 shadow-soft"
                        >
                            <span className="text-sm font-medium text-primary-deep">
                                Client Voices
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-text mb-6"
                        >
                            Stories of{" "}
                            <span className="text-gradient">Transformation</span>
                        </motion.h1>

                        <motion.p
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="text-xl md:text-2xl text-neutral-muted leading-relaxed"
                        >
                            Real experiences from real people who found healing, growth, and
                            hope through compassionate care
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
                            { value: "500+", label: "Happy Clients" },
                            { value: "95%", label: "Success Rate" },
                            { value: "4.9/5", label: "Average Rating" },
                            { value: "10+", label: "Years Experience" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={ANIMATION_VARIANTS.staggerItem}
                                custom={index}
                                className="text-center"
                            >
                                <div className="font-display text-4xl md:text-5xl font-semibold text-primary-deep mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-neutral-muted">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Filter & Admin Controls */}
            <section className="py-8 bg-neutral-offWhite sticky top-20 z-40 shadow-soft">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Role Filter */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <Filter className="w-5 h-5 text-neutral-muted self-center" />
                            {roles.map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setSelectedRole(role)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedRole === role
                                        ? "bg-primary-deep text-white shadow-medium"
                                        : "bg-white text-neutral-text hover:bg-primary-light"
                                        }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>

                        {/* Admin Add Button */}
                        {isAdmin && (
                            <Button
                                variant="primary"
                                onClick={() => setShowAddForm(!showAddForm)}
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add Testimonial
                            </Button>
                        )}
                    </div>

                    {/* Add Form (Admin Only) */}
                    <AnimatePresence>
                        {isAdmin && showAddForm && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6"
                            >
                                <Card className="p-6">
                                    <h3 className="font-display text-2xl font-semibold text-neutral-text mb-4">
                                        Add New Testimonial
                                    </h3>
                                    <form className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Author Name"
                                                className="px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep outline-none"
                                            />
                                            <select className="px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep outline-none">
                                                <option value="">Select Role</option>
                                                <option value="Patient">Patient</option>
                                                <option value="Student">Student</option>
                                                <option value="Teacher">Teacher</option>
                                                <option value="Colleague">Colleague</option>
                                            </select>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Location (e.g., City Hospital)"
                                            className="w-full px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep outline-none"
                                        />
                                        <textarea
                                            placeholder="Testimonial quote..."
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep outline-none resize-none"
                                        />
                                        <div className="flex items-center space-x-4">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded" />
                                                <span className="text-sm text-neutral-text">
                                                    Featured
                                                </span>
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-neutral-text">
                                                    Rating:
                                                </span>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className="w-5 h-5 text-yellow-400 cursor-pointer hover:fill-current"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <Button type="submit" variant="primary">
                                                Save Testimonial
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setShowAddForm(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="section-spacing">
                <div className="container-custom">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredTestimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <TestimonialCard
                                        testimonial={testimonial}
                                        isAdmin={isAdmin}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredTestimonials.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Quote className="w-16 h-16 text-neutral-muted mx-auto mb-4" />
                            <h3 className="font-display text-2xl font-semibold text-neutral-text mb-2">
                                No testimonials found
                            </h3>
                            <p className="text-neutral-muted">
                                Try selecting a different category
                            </p>
                        </motion.div>
                    )}
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
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join hundreds of satisfied clients who have transformed their lives
                            through compassionate, evidence-based care.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button variant="secondary" size="lg" href="/contact">
                                Book Consultation
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                href="/about"
                                className="border-white text-white hover:bg-white hover:text-primary-deep"
                            >
                                Learn More
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="section-spacing bg-neutral-offWhite">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={ANIMATION_VARIANTS.fadeUp}
                        className="text-center mb-12"
                    >
                        <h2 className="font-display text-4xl font-semibold text-neutral-text mb-4">
                            Trusted By Leading Institutions
                        </h2>
                        <p className="text-lg text-neutral-muted">
                            Recognized for excellence in mental health care
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={ANIMATION_VARIANTS.staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {[
                            "American Psychological Association",
                            "National Board of Health",
                            "Mental Health Alliance",
                            "Clinical Excellence Award",
                        ].map((org, index) => (
                            <motion.div
                                key={org}
                                variants={ANIMATION_VARIANTS.staggerItem}
                                custom={index}
                                className="flex items-center justify-center p-6 bg-white rounded-xl shadow-soft"
                            >
                                <p className="text-sm font-medium text-neutral-muted text-center">
                                    {org}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </Layout>
    )
}

export default TestimonialsPage

export const Head = () => <title>Testimonials - Virtual Chamber</title>