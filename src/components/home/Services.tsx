import React from "react"
import { motion } from "framer-motion"
import {
    Video,
    Calendar,
    Phone,
    Stethoscope,
    ClipboardCheck,
    FileSearch,
    HelpCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { SERVICES, ANIMATION_VARIANTS } from "@/utils/constants"

const iconMap: Record<string, React.ElementType> = {
    Video,
    Calendar,
    Phone,
    Stethoscope,
    ClipboardCheck,
    FileSearch,
}

export const Services: React.FC = () => {
    return (
        <section className="section-spacing relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 gradient-overlay-radial" />

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
                        className="inline-block px-4 py-2 bg-primary-light rounded-full mb-4"
                    >
                        <span className="text-sm font-medium text-primary-deep">
                            What I Offer
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={ANIMATION_VARIANTS.fadeUp}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-text mb-6"
                    >
                        Clinical Services
                        <br />
                        <span className="text-gradient">and Patient Care</span>
                    </motion.h2>

                    <motion.p
                        variants={ANIMATION_VARIANTS.fadeUp}
                        className="text-xl text-neutral-muted max-w-2xl mx-auto"
                    >
                        Professional medical services and clinical care tailored to your health
                    </motion.p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={ANIMATION_VARIANTS.staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {SERVICES.map((service, index) => {
                        const Icon = iconMap[service.icon] || HelpCircle

                        return (
                            <motion.div
                                key={service.id}
                                variants={ANIMATION_VARIANTS.staggerItem}
                                custom={index}
                            >
                                <Card hover className="h-full group">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        {/* Icon Container */}
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="relative"
                                        >
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-deep to-secondary-deep flex items-center justify-center shadow-medium group-hover:shadow-glow transition-shadow duration-300">
                                                <Icon className="w-10 h-10 text-white" />
                                            </div>

                                            {/* Decorative Ring */}
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                                className="absolute inset-0 border-2 border-primary-deep/20 rounded-2xl"
                                                style={{ padding: "4px" }}
                                            />
                                        </motion.div>

                                        {/* Content */}
                                        <div>
                                            <h3 className="font-display text-2xl font-semibold text-neutral-text mb-2 group-hover:text-primary-deep transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-neutral-muted leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Learn More Link */}
                                        <motion.a
                                            href="#"
                                            className="text-primary-deep font-medium text-sm hover:underline flex items-center space-x-1"
                                            whileHover={{ x: 5 }}
                                        >
                                            <span>Find Service</span>
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                }}
                                            >
                                                →
                                            </motion.span>
                                        </motion.a>
                                    </div>
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <p className="text-neutral-muted mb-4">
                        Don't see what you're looking for?
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 bg-white border-2 border-primary-deep text-primary-deep rounded-full hover:bg-primary-deep hover:text-white transition-all duration-300 font-medium"
                    >
                        Contact Us for Custom Services
                    </a>
                </motion.div>
            </div>

            {/* Background Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-offWhite to-transparent pointer-events-none" />
        </section>
    )
}