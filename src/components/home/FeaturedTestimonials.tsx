import React from "react"
import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ShowcaseOverlay } from "@/components/ui/ShowcaseOverlay"
import { ANIMATION_VARIANTS } from "@/utils/constants"
import ahaImg from "../../images/American Heart Association.png"
import bcaImg from "../../images/BCA.png"
import excellenceImg from "../../images/Excellence Award.png"
import ministryImg from "../../images/Health Ministry.png"
import ssbImg from "../../images/SSB.png"

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
                            Showcase
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={ANIMATION_VARIANTS.fadeUp}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-text mb-6"
                    >
                        Medical Excellence
                        <br />
                        <span className="text-gradient">Professional Showcase</span>
                    </motion.h2>

                    <motion.p
                        variants={ANIMATION_VARIANTS.fadeUp}
                        className="text-xl text-neutral-muted max-w-2xl mx-auto"
                    >
                        Real stories from patients who received specialized medical guidance
                    </motion.p>
                </motion.div>

                {/* Testimonials Grid */}
                <ShowcaseOverlay trigger="scroll">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={ANIMATION_VARIANTS.staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 p-4"
                    >
                        {featuredTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                variants={ANIMATION_VARIANTS.staggerItem}
                                custom={index}
                            >
                                <Card hover glass className="h-full relative border-2 border-primary-deep bg-[#ede6f0]">
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
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        {/* Rating */}
                                        <div className="flex space-x-1 pl-16">
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
                            </motion.div>
                        ))}
                    </motion.div>
                </ShowcaseOverlay>

                {/* Marquee Slider - Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full py-10 mb-12 relative"
                >
                    <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-primary-light/30 to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-secondary-light/30 to-transparent z-10" />

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
                        View Entire Showcase
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}