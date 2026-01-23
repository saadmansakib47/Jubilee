import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar } from "lucide-react"
import { StaticImage } from "gatsby-plugin-image"
import { Button } from "@/components/ui/Button"
import { SITE_CONFIG, ANIMATION_VARIANTS } from "@/utils/constants"

export const Hero: React.FC = () => {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <StaticImage
                    src="../../../images/Hero-background.jpg"
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                    placeholder="blurred"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
            </div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="container-custom relative z-10 w-full"
            >
                <div className="max-w-4xl">
                    <motion.div
                        variants={ANIMATION_VARIANTS.staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        {/* Main Heading */}
                        <motion.div variants={ANIMATION_VARIANTS.fadeUp}>
                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-neutral-text">
                                {SITE_CONFIG.tagline.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 + 0.2 }}
                                        className="inline-block mr-3"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="text-xl md:text-2xl text-neutral-muted font-medium leading-relaxed max-w-2xl"
                        >
                            Compassionate, evidence-based mental health care tailored to your
                            unique journey towards wellness and growth.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="flex flex-wrap gap-4"
                        >
                            <Button variant="primary" size="lg" className="rounded-full shadow-lg">
                                <Calendar className="w-5 h-5 mr-2" />
                                Book Appointment
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full shadow-lg">
                                Learn More
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8"
                        >
                            {[
                                { value: "10+", label: "Years Experience" },
                                { value: "500+", label: "Happy Patients" },
                                { value: "95%", label: "Success Rate" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    className="text-left"
                                >
                                    <div className="font-display text-4xl font-bold text-primary-deep">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-medium text-neutral-muted mt-1 uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="w-6 h-10 border-2 border-primary-deep/50 rounded-full p-1">
                    <motion.div
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-primary-deep rounded-full mx-auto"
                    />
                </div>
            </motion.div>
        </section>
    )
}