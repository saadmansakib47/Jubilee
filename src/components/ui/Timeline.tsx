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
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-deep via-secondary-deep to-primary-light" />

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
                                    className={`bg-white rounded-2xl shadow-soft p-6 hover:shadow-medium transition-shadow duration-300 ${isEven ? "ml-12 md:ml-0" : "ml-12 md:ml-0"
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
                                className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center"
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
            year: "2015-2020",
            title: "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
            institution: "Dhaka Medical College",
            description:
                "Completed comprehensive medical education with distinction, focusing on psychiatry and mental health during clinical rotations.",
            icon: "GraduationCap",
            achievements: [
                "First Class with Honors",
                "Best Research Paper Award in Psychiatry",
                "President of Medical Students Association",
            ],
        },
        {
            id: "2",
            year: "2021-2024",
            title: "FCPS (Fellowship of College of Physicians and Surgeons)",
            institution: "Bangladesh College of Physicians and Surgeons",
            description:
                "Specialized training in clinical psychology and psychiatry with emphasis on cognitive behavioral therapy and trauma-informed care.",
            icon: "Award",
            achievements: [
                "Completed 100+ supervised clinical hours",
                "Published 3 research papers in peer-reviewed journals",
                "Advanced training in CBT and DBT methodologies",
            ],
        },
        {
            id: "3",
            year: "2024",
            title: "Advanced Certification in Trauma Therapy",
            institution: "International Trauma Studies Program",
            description:
                "Intensive certification program focused on evidence-based trauma treatment modalities and crisis intervention techniques.",
            icon: "BookOpen",
            achievements: [
                "EMDR Therapy Certification",
                "Somatic Experiencing Practitioner",
                "Crisis Intervention Specialist",
            ],
        },
        {
            id: "4",
            year: "2024-Present",
            title: "Clinical Psychologist in Private Practice",
            institution: "Virtual Chamber - Private Practice",
            description:
                "Providing comprehensive mental health services including individual therapy, couples counseling, and telepsychology services.",
            icon: "Briefcase",
            achievements: [
                "500+ successful client sessions",
                "95% client satisfaction rate",
                "Developing innovative teletherapy programs",
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
                        A commitment to continuous learning and excellence in mental health
                        care
                    </p>
                </motion.div>

                <Timeline items={educationData} />
            </div>
        </section>
    )
}