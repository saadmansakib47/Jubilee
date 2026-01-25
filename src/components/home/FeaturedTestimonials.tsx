import React from "react"
import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ANIMATION_VARIANTS } from "@/utils/constants"

// Import shared data
import { testimonials } from "@/data/testimonials"

const featuredTestimonials = testimonials.filter((t) => t.featured).slice(0, 3)

export const FeaturedTestimonials: React.FC = () => {
    return (
        <section className="section-spacing bg-gradient-to-br from-primary-light/30 to-secondary-light/30 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-deep/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-deep/5 rounded-full blur-3xl" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={ANIMATION_VARIANTS.staggerContainer}
                    className="text-center mb-16"
                >
                    <motion.div
                        variants={ANIMATION_VARIANTS.fadeIn}
                        className="inline-block px-4 py-2 bg-white rounded-full mb-4 shadow-soft"
                    >
                        <span className="text-sm font-medium text-primary-deep">
                            Client Voices
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={ANIMATION_VARIANTS.fadeUp}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-text mb-6"
                    >
                        What People Say About
                        <br />
                        <span className="text-gradient">Their Experience</span>
                    </motion.h2>

                    <motion.p
                        variants={ANIMATION_VARIANTS.fadeUp}
                        className="text-xl text-neutral-muted max-w-2xl mx-auto"
                    >
                        Real stories from patients who received specialized medical guidance
                    </motion.p>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={ANIMATION_VARIANTS.staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                >
                    {featuredTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            variants={ANIMATION_VARIANTS.staggerItem}
                            custom={index}
                        >
                            <Card hover glass className="h-full relative">
                                {/* Quote Icon */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-deep rounded-full flex items-center justify-center shadow-medium">
                                    <Quote className="w-6 h-6 text-white" fill="currentColor" />
                                </div>

                                <div className="pt-4 space-y-4">
                                    {/* Rating */}
                                    <div className="flex space-x-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-5 h-5 text-yellow-400 fill-current"
                                            />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-neutral-text leading-relaxed italic">
                                        "{testimonial.quote}"
                                    </p>

                                    {/* Author Info */}
                                    <div className="pt-4 border-t border-neutral-border">
                                        <div className="flex items-start space-x-3">
                                            {testimonial.image && (
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.author}
                                                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <p className="font-semibold text-neutral-text">
                                                    {testimonial.author}
                                                </p>
                                                <div className="mt-1">
                                                    <p className="text-sm font-medium text-primary-deep">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-neutral-muted mt-1">
                                                    {testimonial.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Corner */}
                                <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-primary-deep/10 rounded-tl-3xl" />
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <Button variant="primary" size="lg" href="/testimonials">
                        View All Testimonials
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}