import React from "react"
import { motion } from "framer-motion"
import { GraduationCap, Award, BookOpen, Briefcase } from "lucide-react"
import { ANIMATION_VARIANTS } from "@/utils/constants"

const iconMap: Record<string, React.ElementType> = {
    GraduationCap,
    Award,
    BookOpen,
    Briefcase,
}

interface TimelineItem {
    id: string
    year: string
    title: string
    institution: string
    description: string
    icon: string
    achievements?: string[]
}

interface TimelineProps {
    items: TimelineItem[]
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
    return (
        <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-primary-deep/0 via-primary-deep to-primary-deep/0 opacity-30" />

            {/* Timeline Items */}
            <div className="space-y-12">
                {items.map((item, index) => {
                    const Icon = iconMap[item.icon] || GraduationCap
                    const isEven = index % 2 === 0

                    return (
                        <motion.div
                            key={item.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={ANIMATION_VARIANTS.staggerContainer}
                            className={`relative flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                } flex-col md:gap-8`}
                        >
                            {/* Content Card */}
                            <motion.div
                                variants={ANIMATION_VARIANTS.fadeUp}
                                className={`w-full md:w-[calc(50%-2rem)] ${isEven ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                                    }`}
                            >
                                <div
                                    className={`bg-white rounded-2xl shadow-soft p-6 hover:shadow-medium transition-shadow duration-300 ${isEven ? "ml-16 md:ml-0" : "ml-16 md:ml-0"
                                        }`}
                                >
                                    {/* Year Badge */}
                                    <div
                                        className={`inline-block px-4 py-1 bg-primary-light rounded-full mb-3 ${isEven ? "md:float-right md:ml-4" : "md:float-left md:mr-4"
                                            }`}
                                    >
                                        <span className="text-sm font-semibold text-primary-deep">
                                            {item.year}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-display text-2xl font-semibold text-neutral-text mb-2 clear-both">
                                        {item.title}
                                    </h3>

                                    {/* Institution */}
                                    <p className="text-primary-deep font-medium mb-3">
                                        {item.institution}
                                    </p>

                                    {/* Description */}
                                    <p className="text-neutral-muted leading-relaxed mb-4">
                                        {item.description}
                                    </p>

                                    {/* Achievements */}
                                    {item.achievements && item.achievements.length > 0 && (
                                        <div className={`space-y-2 ${isEven ? "md:text-right" : ""}`}>
                                            <p className="text-sm font-semibold text-neutral-text">
                                                Key Achievements:
                                            </p>
                                            <ul className="space-y-1">
                                                {item.achievements.map((achievement, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-sm text-neutral-muted flex items-start gap-2"
                                                    >
                                                        <span className="text-primary-deep mt-1">•</span>
                                                        <span>{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Center Icon */}
                            <motion.div
                                variants={ANIMATION_VARIANTS.fadeIn}
                                className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center pt-8 md:pt-0"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative z-10"
                                >
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-deep to-secondary-deep flex items-center justify-center shadow-strong">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Pulse Ring */}
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 0, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="absolute inset-0 rounded-full border-2 border-primary-deep"
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Spacer for alignment */}
                            <div className="hidden md:block w-[calc(50%-2rem)]" />
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

// Example usage component with dummy data
export const EducationTimeline: React.FC = () => {
    const educationData: TimelineItem[] = [
        {
            id: "1",
            year: "2017-2019",
            title: "Secondary School Certificate (SSC)",
            institution: "Viqarunnisa Noon School & College",
            description:
                "Completed secondary education with a strong academic foundation in science subjects, demonstrating early interest in medical studies.",
            icon: "BookOpen",
            achievements: [
                "Science background",
                "Consistent academic performance",
            ],
        },
        {
            id: "2",
            year: "2019-2021",
            title: "Higher Secondary Certificate (HSC)",
            institution: "Viqarunnisa Noon School & College",
            description:
                "Completed higher secondary education in the science stream, preparing for competitive medical admission examinations.",
            icon: "GraduationCap",
            achievements: [
                "Science stream (Biology focus)",
                "Medical admission preparation",
            ],
        },
        {
            id: "3",
            year: "2023-2027",
            title: "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
            institution: "Medical College for Women (MCW), Uttara",
            description:
                "Undergoing comprehensive medical training covering foundational sciences, clinical rotations, and patient-centered care across major medical disciplines.",
            icon: "GraduationCap",
            achievements: [
                "Core clinical rotations completed",
                "Hands-on hospital training",
                "Focused interest in cardiology",
            ],
        },
        {
            id: "4",
            year: "2029-Present",
            title: "FCPS (Cardiology)",
            institution: "Dhaka Medical College",
            description:
                "Pursuing advanced postgraduate training in cardiology with emphasis on clinical cardiology, diagnostics, and evidence-based cardiovascular care.",
            icon: "Award",
            achievements: [
                "Postgraduate residency training",
                "Advanced cardiac diagnostics exposure",
                "Clinical research involvement (ongoing)",
            ],
        },
    ]


    return (
        <section className="section-spacing">
            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={ANIMATION_VARIANTS.fadeUp}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-2 bg-primary-light rounded-full mb-4">
                        <span className="text-sm font-medium text-primary-deep">
                            Professional Journey
                        </span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold text-neutral-text mb-4">
                        Education & <span className="text-gradient">Experience</span>
                    </h2>
                    <p className="text-xl text-neutral-muted max-w-2xl mx-auto">
                        A commitment to clinical excellence and continuous learning in
                        medicine and cardiovascular health
                    </p>
                </motion.div>

                <Timeline items={educationData} />
            </div>
        </section>
    )
}