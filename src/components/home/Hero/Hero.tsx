import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SITE_CONFIG, ANIMATION_VARIANTS } from "@/utils/constants"

export const Hero: React.FC = () => {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 animated-gradient noise-texture" />

            {/* Decorative Elements */}
            <motion.div
                style={{ y }}
                className="absolute top-20 right-10 w-72 h-72 bg-primary-light rounded-full blur-3xl opacity-20"
            />
            <motion.div
                style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
                className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-light rounded-full blur-3xl opacity-20"
            />

            {/* Floating Orbs */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary-deep rounded-full opacity-30"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -180, -360],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-secondary-deep rounded-full opacity-20"
            />

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="container-custom relative z-10"
            >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        variants={ANIMATION_VARIANTS.staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={ANIMATION_VARIANTS.fadeIn}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft"
                        >
                            <Sparkles className="w-4 h-4 text-primary-deep" />
                            <span className="text-sm font-medium text-primary-deep">
                                Professional Psychology Services
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div variants={ANIMATION_VARIANTS.fadeUp}>
                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-neutral-text">
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
                            className="text-xl md:text-2xl text-neutral-muted font-light leading-relaxed max-w-xl"
                        >
                            Compassionate, evidence-based mental health care tailored to your
                            unique journey towards wellness and growth.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="flex flex-wrap gap-4"
                        >
                            <Button variant="primary" size="lg">
                                <Calendar className="w-5 h-5 mr-2" />
                                Book Appointment
                            </Button>
                            <Button variant="outline" size="lg">
                                Learn More
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="grid grid-cols-3 gap-6 pt-8"
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
                                    className="text-center lg:text-left"
                                >
                                    <div className="font-display text-4xl font-semibold text-primary-deep">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-neutral-muted mt-1">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Image/Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main Image Container */}
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative z-10"
                            >
                                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-light to-secondary-light shadow-strong overflow-hidden">
                                    {/* Placeholder for hero image */}
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-center p-12">
                                            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                                                <Sparkles className="w-16 h-16 text-primary-deep" />
                                            </div>
                                            <p className="text-primary-deep font-display text-2xl">
                                                Your Journey<br />Starts Here
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative Elements */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-6 -right-6 w-32 h-32 border-2 border-primary-deep/20 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-secondary-deep/20 rounded-full"
                            />
                        </div>
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
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-primary-deep rounded-full p-1"
                >
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-3 bg-primary-deep rounded-full mx-auto"
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}