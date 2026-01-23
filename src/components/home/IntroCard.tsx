import React from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Award } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { SITE_CONFIG, ANIMATION_VARIANTS } from "@/utils/constants"

export const IntroCard: React.FC = () => {
    return (
        <section className="section-spacing relative">
            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={ANIMATION_VARIANTS.staggerContainer}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Left Side - Image */}
                    <motion.div
                        variants={ANIMATION_VARIANTS.fadeIn}
                        className="relative"
                    >
                        <div className="relative z-10">
                            {/* Main Image Container */}
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-strong bg-gradient-to-br from-primary-light to-secondary-light">
                                {/* Placeholder for doctor's image */}
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                                            <Award className="w-16 h-16 text-primary-deep" />
                                        </div>
                                        <p className="text-primary-deep font-display text-xl">
                                            Professional Portrait
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-strong p-6 max-w-xs"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-primary-deep flex items-center justify-center">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-neutral-text">
                                            Clinical
                                        </p>
                                        <p className="text-sm text-neutral-muted">
                                            Focused Excellence
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary-light rounded-full blur-3xl opacity-30 -z-10" />
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        variants={ANIMATION_VARIANTS.fadeUp}
                        className="space-y-6"
                    >
                        {/* Badge */}
                        <div className="inline-block px-4 py-2 bg-primary-light rounded-full">
                            <span className="text-sm font-medium text-primary-deep">
                                About The Doctor
                            </span>
                        </div>

                        {/* Heading */}
                        <div>
                            <h2 className="font-display text-4xl md:text-5xl font-semibold text-neutral-text mb-3">
                                {SITE_CONFIG.name}
                            </h2>
                            <p className="text-xl text-primary-deep font-medium">
                                {SITE_CONFIG.title}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-neutral-muted leading-relaxed">
                            With a strong clinical foundation from Medical College for Women (MCW),
                            I am dedicated to providing evidence-based medical care. My
                            journey is driven by a passion for cardiology and a commitment to
                            compassionate, patient-centered practice. I aim to deliver
                            high-quality healthcare through continuous learning and clinical excellence.
                        </p>

                        {/* Specializations */}
                        <div className="space-y-3">
                            <h3 className="font-display text-xl font-semibold text-neutral-text">
                                Clinical Interests
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    "General Medicine",
                                    "Cardiovascular Health",
                                    "Evidence-Based Practice",
                                    "Clinical Diagnostics",
                                ].map((item, index) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center space-x-2"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary-deep" />
                                        <span className="text-neutral-text text-sm">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <Card className="bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
                            <div className="space-y-3">
                                <h3 className="font-display text-lg font-semibold text-neutral-text mb-4">
                                    Get In Touch
                                </h3>
                                <div className="space-y-2">
                                    <a
                                        href={`mailto:${SITE_CONFIG.email}`}
                                        className="flex items-center space-x-3 text-neutral-muted hover:text-primary-deep transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:bg-primary-deep transition-colors">
                                            <Mail className="w-5 h-5 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-sm">{SITE_CONFIG.email}</span>
                                    </a>
                                    <a
                                        href={`tel:${SITE_CONFIG.phone}`}
                                        className="flex items-center space-x-3 text-neutral-muted hover:text-primary-deep transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:bg-primary-deep transition-colors">
                                            <Phone className="w-5 h-5 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-sm">{SITE_CONFIG.phone}</span>
                                    </a>
                                    <div className="flex items-start space-x-3 text-neutral-muted">
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm pt-2">{SITE_CONFIG.address}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* CTA Button */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button variant="primary" size="lg" href="/about">
                                Read Full Bio
                            </Button>
                            <Button variant="outline" size="lg" href="/contact">
                                Schedule Consultation
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}