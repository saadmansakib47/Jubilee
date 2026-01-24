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

    const baseDelay = 3.5
    const subtitleDelay = baseDelay + 2.0
    const ctaDelay = baseDelay + 2.5
    const statsDelay = baseDelay + 3.0
    const individualStatDelay = baseDelay + 3.5

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Desktop Background */}
                <div className="hidden lg:block absolute inset-0">
                    <StaticImage
                        src="../../../images/Hero-background.jpg"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                        imgStyle={{ transform: 'scale(1.1)' }}
                        placeholder="blurred"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-none" />
                </div>

                {/* Mobile Background */}
                <div className="lg:hidden absolute inset-0">
                    <StaticImage
                        src="../../../images/Hero-background.jpg"
                        alt="Mobile Hero Background"
                        className="w-full h-full object-cover"
                        imgStyle={{ transform: 'scale(1.25)' }}
                        placeholder="blurred"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-none" />
                </div>
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
                        {/* Main Heading with Typing Effect */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                        >
                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-neutral-text">
                                {SITE_CONFIG.tagline.split(" ").map((word, wordIndex, words) => {
                                    // Calculate starting index for this word to maintain global stagger
                                    const previousWords = words.slice(0, wordIndex)
                                    const startIndex = previousWords.join(" ").length + (wordIndex > 0 ? 1 : 0)

                                    return (
                                        <span key={wordIndex} className="inline-block whitespace-nowrap">
                                            {Array.from(word).map((char, charIndex) => (
                                                <motion.span
                                                    key={charIndex}
                                                    variants={{
                                                        hidden: { opacity: 0, y: 10 },
                                                        visible: { opacity: 1, y: 0 },
                                                    }}
                                                    transition={{
                                                        duration: 0.1,
                                                        delay: baseDelay + (startIndex + charIndex) * 0.04
                                                    }}
                                                    className="inline-block"
                                                >
                                                    {char}
                                                </motion.span>
                                            ))}
                                            {/* Add space after word if not the last word */}
                                            {wordIndex < words.length - 1 && (
                                                <motion.span
                                                    variants={{
                                                        hidden: { opacity: 0, y: 10 },
                                                        visible: { opacity: 1, y: 0 },
                                                    }}
                                                    transition={{
                                                        duration: 0.1,
                                                        delay: baseDelay + (startIndex + word.length) * 0.04
                                                    }}
                                                    className="inline-block"
                                                >
                                                    {"\u00A0"}
                                                </motion.span>
                                            )}
                                        </span>
                                    )
                                })}
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: subtitleDelay, duration: 0.8 }}
                            className="text-xl md:text-2xl text-neutral-muted font-medium leading-relaxed max-w-2xl"
                        >
                            This is Dr. Tasmiah — Committed to evidence-based medicine, cardiovascular health,
                            and patient-centered care.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: ctaDelay, duration: 0.8 }}
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: statsDelay, duration: 0.8 }}
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
                                    transition={{ delay: individualStatDelay + index * 0.1 }}
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