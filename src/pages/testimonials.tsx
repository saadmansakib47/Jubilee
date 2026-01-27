import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, Star, Trash2, Edit, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ShowcaseOverlay } from "@/components/ui/ShowcaseOverlay"
import { ANIMATION_VARIANTS } from "@/utils/constants"
import { testimonials, Testimonial } from "@/data/testimonials"
import ahaImg from "../images/American Heart Association.png"
import bcaImg from "../images/BCA.png"
import excellenceImg from "../images/Excellence Award.png"
import ministryImg from "../images/Health Ministry.png"
import ssbImg from "../images/SSB.png"






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
        <Card hover glass className="h-full relative group border-2 border-primary-deep bg-[#ede6f0]">
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

            {/* Top Bar: Quote Icon & Significant Words */}
            <div className="absolute -top-4 left-0 right-0 px-8 flex items-center justify-between pointer-events-none">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-deep rounded-full flex items-center justify-center shadow-medium flex-shrink-0">
                        <Quote className="w-6 h-6 text-white" fill="currentColor" />
                    </div>

                    <div className="flex flex-col pt-1">
                        {testimonial.featured && (
                            <div className="self-start mb-1">
                                <span className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-sm uppercase tracking-wide">
                                    Featured
                                </span>
                            </div>
                        )}
                        {!testimonial.featured && testimonial.significantWords && (
                            <div className="mb-6" />
                        )}
                        {testimonial.significantWords && (
                            <h3 className="text-xl md:text-2xl font-display font-bold text-neural-text opacity-90 leading-none">
                                {testimonial.significantWords}
                            </h3>
                        )}
                        <div className="flex space-x-1 mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-14 px-12 md:px-16 space-y-4">
                {/* Quote */}
                <p className="text-neutral-text leading-relaxed italic">
                    "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-neutral-border flex items-center space-x-4">
                    {/* Profile Image */}
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary-deep/10 bg-neutral-offWhite flex-shrink-0">
                        {testimonial.image ? (
                            <img
                                src={testimonial.image}
                                alt={testimonial.author}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-primary-deep/5 flex items-center justify-center text-primary-deep font-bold">
                                {testimonial.author.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold text-neutral-text">{testimonial.author}</p>
                        <div className="mt-1 flex flex-wrap gap-2 items-center">
                            <span
                                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${testimonial.role === "Patient"
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
                            <span className="text-xs text-neutral-muted">{testimonial.location}</span>
                        </div>
                    </div>
                </div>
            </div>
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

    const [currentIndex, setCurrentIndex] = useState(0)

    // Reset index when filter changes
    useEffect(() => {
        setCurrentIndex(0)
    }, [selectedRole])

    // Auto-advance slideshow
    useEffect(() => {
        if (filteredTestimonials.length <= 1) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
        }, 6000) // Slightly longer for the showcase

        return () => clearInterval(interval)
    }, [filteredTestimonials.length, currentIndex]) // Reset on manual navigation if needed, or just length

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length)
    }

    const handleEdit = (id: number) => {
        console.log("Edit testimonial:", id)
        // Implement edit logic
    }

    const handleDelete = (id: number) => {
        console.log("Delete testimonial:", id)
        // Implement delete logic
    }

    return (
        <Layout title="Showcase">
            <ShowcaseOverlay>
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
                                    Professional Showcase
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-text mb-6"
                            >
                                Clinical{" "}
                                <span className="text-gradient">Showcase</span>
                            </motion.h1>

                            <motion.p
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className="text-xl md:text-2xl text-neutral-muted leading-relaxed"
                            >
                                A collection of experiences and recognitions highlighting commitment to
                                cardiovascular health and patient care
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
                <section className="py-8 bg-neutral-offWhite sticky top-20 z-20 shadow-soft">
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
                                    Add to Showcase
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
                                            Add New Entry to Showcase
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
                                                placeholder="Write something for the showcase..."
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
                                                    Save Entry
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
                        <div className="max-w-4xl mx-auto min-h-[400px] flex items-center justify-center relative group px-4 md:px-0">
                            {/* Navigation Arrows */}
                            <div className="absolute inset-y-0 left-0 md:-left-20 flex items-center z-50">
                                <button
                                    onClick={handlePrev}
                                    className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-lg border-2 border-primary-deep/30 flex items-center justify-center text-primary-deep shadow-lg hover:bg-white/60 hover:scale-110 active:scale-95 transition-all duration-300 transform"
                                    aria-label="Previous showcase"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                            </div>

                            <AnimatePresence mode="popLayout">
                                {filteredTestimonials.length > 0 && (
                                    <motion.div
                                        key={filteredTestimonials[currentIndex].id}
                                        initial={{ x: "100%", opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: "-100%", opacity: 0 }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        className="w-full"
                                    >
                                        <TestimonialCard
                                            testimonial={filteredTestimonials[currentIndex]}
                                            isAdmin={isAdmin}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="absolute inset-y-0 right-0 md:-right-20 flex items-center z-50">
                                <button
                                    onClick={handleNext}
                                    className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-lg border-2 border-primary-deep/30 flex items-center justify-center text-primary-deep shadow-lg hover:bg-white/60 hover:scale-110 active:scale-95 transition-all duration-300 transform"
                                    aria-label="Next showcase"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </div>
                        </div>

                        {filteredTestimonials.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <Quote className="w-16 h-16 text-neutral-muted mx-auto mb-4" />
                                <h3 className="font-display text-2xl font-semibold text-neutral-text mb-2">
                                    No showcase entries found
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
                <section className="section-spacing bg-neutral-offWhite overflow-hidden">
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
                                Recognized for excellence in cardiac healthcare
                            </p>
                        </motion.div>

                        {/* Marquee Slider */}
                        <div className="w-full py-10 mb-20 relative">
                            <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-neutral-offWhite to-transparent z-10" />
                            <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-neutral-offWhite to-transparent z-10" />

                            <div className="flex overflow-hidden">
                                <motion.div
                                    className="flex items-center space-x-12 md:space-x-24 whitespace-nowrap"
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 20,
                                        ease: "linear"
                                    }}
                                >
                                    {[...Array(3)].map((_, i) => (
                                        <React.Fragment key={i}>
                                            <img src={ahaImg} alt="American Heart Association" className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                                            <img src={bcaImg} alt="Bangladesh Cardiac Association" className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                                            <img src={excellenceImg} alt="Excellence Award" className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                                            <img src={ministryImg} alt="Health Ministry" className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                                            <img src={ssbImg} alt="SSB" className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                                        </React.Fragment>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={ANIMATION_VARIANTS.staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {[
                                { name: "American Heart Association", img: ahaImg },
                                { name: "Bangladesh Cardiac Association", img: bcaImg },
                                { name: "Health Ministry of Bangladesh", img: ministryImg },
                                { name: "MENA Excellence Award", img: excellenceImg },
                            ].map((org, index) => (
                                <motion.div
                                    key={org.name}
                                    variants={ANIMATION_VARIANTS.staggerItem}
                                    custom={index}
                                    className="flex flex-col items-center p-6 bg-white rounded-xl shadow-soft hover:shadow-medium transition-all group h-full"
                                >
                                    <div className="h-32 w-full flex items-center justify-center mb-4 p-2 bg-neutral-offWhite/50 rounded-lg">
                                        <img src={org.img} alt={org.name} className="h-full w-auto object-contain max-w-full" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-neutral-text text-center mb-6 min-h-[3rem] flex items-center justify-center">
                                        {org.name}
                                    </h3>
                                    <div className="mt-auto w-full">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-center group-hover:bg-primary-deep group-hover:text-white group-hover:border-primary-deep transition-all duration-300"
                                        >
                                            View Certificate
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </ShowcaseOverlay>
        </Layout>
    )
}

export default TestimonialsPage

export const Head = () => <title>Showcase - Dr.Tasmiah Nawal</title>