import React from "react"
import { motion } from "framer-motion"
import { Award, Heart, Users, TrendingUp } from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { EducationTimeline } from "@/components/ui/Timeline"
import { Card } from "@/components/ui/Card"
import { ANIMATION_VARIANTS, SITE_CONFIG } from "@/utils/constants"

const AboutPage: React.FC = () => {
    const values = [
        {
            icon: Heart,
            title: "Compassion First",
            description:
                "Every client deserves to be heard, understood, and treated with dignity and respect.",
        },
        {
            icon: Award,
            title: "Evidence-Based",
            description:
                "Utilizing proven therapeutic approaches backed by scientific research and clinical trials.",
        },
        {
            icon: Users,
            title: "Collaborative Care",
            description:
                "Working together with clients as partners in their journey towards mental wellness.",
        },
        {
            icon: TrendingUp,
            title: "Continuous Growth",
            description:
                "Committed to ongoing professional development and staying current with best practices.",
        },
    ]

    return (
        <Layout title="About Me">
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
                <div className="container-custom">
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
                                Get To Know Me
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-text mb-6"
                        >
                            About <span className="text-gradient">{SITE_CONFIG.name}</span>
                        </motion.h1>

                        <motion.p
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="text-xl md:text-2xl text-neutral-muted leading-relaxed"
                        >
                            Dedicated to providing compassionate, evidence-based mental health
                            care that empowers individuals to thrive.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Bio Section */}
            <section className="section-spacing">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-strong bg-gradient-to-br from-primary-light to-secondary-light">
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

                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-deep/10 rounded-full blur-2xl -z-10" />
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h2 className="font-display text-4xl font-semibold text-neutral-text">
                                My Journey in Medicine
                            </h2>

                            <div className="space-y-4 text-lg text-neutral-muted leading-relaxed">
                                <p>
                                    My journey in medicine began with a strong academic foundation at
                                    Viqarunnisa Noon School & College, followed by formal medical training
                                    at the Medical College for Women (MCW), Uttara. During my MBBS studies,
                                    I developed a deep appreciation for patient-centered care and
                                    evidence-based clinical practice.
                                </p>

                                <p>
                                    Throughout my undergraduate medical education, clinical rotations
                                    across major disciplines provided early exposure to cardiovascular
                                    medicine. The complexity, precision, and life-saving impact of
                                    cardiology gradually shaped my professional interest and long-term
                                    career goals.
                                </p>

                                <p>
                                    After completing the MBBS program, I plan to pursue postgraduate
                                    specialization through the FCPS program in Cardiology at Dhaka Medical
                                    College. This training path reflects my commitment to developing
                                    advanced clinical expertise in the diagnosis and management of
                                    cardiovascular diseases.
                                </p>

                                <p>
                                    My professional focus is centered on continuous learning, ethical
                                    medical practice, and delivering compassionate, high-quality care.
                                    Through structured training and clinical experience, I aim to
                                    contribute meaningfully to cardiovascular health and patient outcomes.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-spacing bg-neutral-offWhite">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={ANIMATION_VARIANTS.fadeUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-4 py-2 bg-white rounded-full mb-4 shadow-soft">
                            <span className="text-sm font-medium text-primary-deep">
                                Core Principles
                            </span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl font-semibold text-neutral-text mb-4">
                            My Therapeutic <span className="text-gradient">Values</span>
                        </h2>
                        <p className="text-xl text-neutral-muted max-w-2xl mx-auto">
                            The principles that guide every session and interaction
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={ANIMATION_VARIANTS.staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                variants={ANIMATION_VARIANTS.staggerItem}
                                custom={index}
                            >
                                <Card hover className="h-full text-center">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-deep to-secondary-deep">
                                            <value.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="font-display text-xl font-semibold text-neutral-text">
                                            {value.title}
                                        </h3>
                                        <p className="text-neutral-muted leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Timeline Section */}
            <EducationTimeline />

            {/* Certifications Section */}
            <section className="section-spacing bg-gradient-to-br from-primary-deep to-secondary-deep text-white">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={ANIMATION_VARIANTS.fadeUp}
                        className="text-center mb-12"
                    >
                        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
                            Professional Memberships & Certifications
                        </h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto">
                            Committed to maintaining the highest standards of professional
                            practice
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={ANIMATION_VARIANTS.staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            "Bangladesh Medical & Dental Council (BMDC) Registration – 2027",
                            "National Biology Olympiad (School Level) – Participation Certificate – 2018",
                            "National Chemistry Olympiad (School Level) – Participation Certificate – 2019",
                            "Voluntary Medical Service Certificate – Community Health Camps (MBBS) – 2024",
                            "Basic Life Support (BLS) Certification – 2025",
                            "Advanced Cardiovascular Life Support (ACLS) – Introductory Training – 2026",
                            "ECG Interpretation & Basic Cardiology Workshop – 2026",
                            "Clinical Skills in General Medicine Workshop – 2025",
                        ].map((cert, index) => (
                            <motion.div
                                key={cert}
                                variants={ANIMATION_VARIANTS.staggerItem}
                                custom={index}
                                className="flex items-center space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg"
                            >
                                <Award className="w-6 h-6 flex-shrink-0" />
                                <span className="text-white/90">{cert}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </Layout>
    )
}

export default AboutPage

export const Head = () => <title>About Me - Dr. Tasmiah Nawal</title>