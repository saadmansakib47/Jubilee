import React, { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map"
import { ANIMATION_VARIANTS, SITE_CONFIG } from "@/utils/constants"

// Form validation schema
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(20, "Message must be at least 20 characters"),
    preferredContact: z.enum(["email", "phone"]),
    urgency: z.enum(["low", "medium", "high"]),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactPage: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            preferredContact: "email",
            urgency: "medium",
        },
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)

        // Simulate API call (replace with actual backend call)
        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log("Form data:", data)

        setIsSubmitting(false)
        setIsSubmitted(true)
        reset()

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
    }

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: SITE_CONFIG.email,
            href: `mailto:${SITE_CONFIG.email}`,
            color: "from-primary-deep to-secondary-deep",
        },
        {
            icon: Phone,
            label: "Phone",
            value: SITE_CONFIG.phone,
            href: `tel:${SITE_CONFIG.phone}`,
            color: "from-primary-deep to-secondary-deep",
        },
        {
            icon: MapPin,
            label: "Address",
            value: SITE_CONFIG.address,
            href: "#map",
            color: "from-primary-deep to-secondary-deep",
        },
        {
            icon: Clock,
            label: "Office Hours",
            value: "Mon-Fri: 9AM-5PM, Sat: 10AM-2PM",
            href: "#hours",
            color: "from-primary-deep to-secondary-deep",
        },
    ]

    return (
        <Layout title="Contact Us">
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-primary-deep/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary-deep/10 rounded-full blur-3xl" />

                <div className="container-custom relative z-10">
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
                                Get In Touch
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-text mb-6"
                        >
                            Let's Start Your
                            <br />
                            <span className="text-gradient">Healing Journey</span>
                        </motion.h1>

                        <motion.p
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="text-xl md:text-2xl text-neutral-muted leading-relaxed"
                        >
                            Reach out today for a consultation. I'm here to listen and support
                            you every step of the way.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="section-spacing">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={ANIMATION_VARIANTS.staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 relative z-10"
                    >
                        {contactInfo.map((info, index) => (
                            <motion.a
                                key={info.label}
                                href={info.href}
                                variants={ANIMATION_VARIANTS.staggerItem}
                                custom={index}
                                whileHover={{ y: -8 }}
                                className="block"
                            >
                                <Card glass className="h-full text-center hover:shadow-strong transition-shadow">
                                    <div className="space-y-4">
                                        <div
                                            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} shadow-medium`}
                                        >
                                            <info.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-neutral-text mb-2">
                                                {info.label}
                                            </h3>
                                            <p className="text-sm text-neutral-muted leading-relaxed">
                                                {info.value}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section className="section-spacing bg-neutral-offWhite">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Side - Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="mb-8">
                                <h2 className="font-display text-4xl font-semibold text-neutral-text mb-4">
                                    Send a Message
                                </h2>
                                <p className="text-lg text-neutral-muted">
                                    Fill out the form below and I'll get back to you within 24 hours.
                                </p>
                            </div>

                            <Card className="p-8">
                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
                                        <h3 className="font-display text-2xl font-semibold text-neutral-text mb-2">
                                            Message Sent Successfully!
                                        </h3>
                                        <p className="text-neutral-muted">
                                            Thank you for reaching out. I'll respond shortly.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-text mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                {...register("name")}
                                                type="text"
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep focus:ring-2 focus:ring-primary-light outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email & Phone */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-text mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    {...register("email")}
                                                    type="email"
                                                    className="w-full px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep focus:ring-2 focus:ring-primary-light outline-none transition-all"
                                                    placeholder="john@example.com"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.email.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-neutral-text mb-2">
                                                    Phone *
                                                </label>
                                                <input
                                                    {...register("phone")}
                                                    type="tel"
                                                    className="w-full px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep focus:ring-2 focus:ring-primary-light outline-none transition-all"
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.phone.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-text mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                {...register("subject")}
                                                type="text"
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep focus:ring-2 focus:ring-primary-light outline-none transition-all"
                                                placeholder="How can I help you?"
                                            />
                                            {errors.subject && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.subject.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Preferred Contact & Urgency */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-text mb-2">
                                                    Preferred Contact
                                                </label>
                                                <select
                                                    {...register("preferredContact")}
                                                    className="w-full px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep focus:ring-2 focus:ring-primary-light outline-none transition-all"
                                                >
                                                    <option value="email">Email</option>
                                                    <option value="phone">Phone</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-neutral-text mb-2">
                                                    Urgency Level
                                                </label>
                                                <select
                                                    {...register("urgency")}
                                                    className="w-full px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep focus:ring-2 focus:ring-primary-light outline-none transition-all"
                                                >
                                                    <option value="low">Low - General Inquiry</option>
                                                    <option value="medium">Medium - Schedule Soon</option>
                                                    <option value="high">High - Urgent</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-text mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                {...register("message")}
                                                rows={6}
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-border focus:border-primary-deep focus:ring-2 focus:ring-primary-light outline-none transition-all resize-none"
                                                placeholder="Tell me about what brings you here..."
                                            />
                                            {errors.message && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.message.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="w-full"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center">
                                                    <svg
                                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>

                                        <p className="text-sm text-neutral-muted text-center">
                                            Your information is confidential and will never be shared.
                                        </p>
                                    </form>
                                )}
                            </Card>
                        </motion.div>

                        {/* Right Side - Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            {/* Office Hours */}
                            <Card>
                                <h3 className="font-display text-2xl font-semibold text-neutral-text mb-4">
                                    Office Hours
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { day: "Monday - Friday", hours: "9:00 AM - 5:00 PM" },
                                        { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
                                        { day: "Sunday", hours: "Closed" },
                                    ].map((schedule) => (
                                        <div
                                            key={schedule.day}
                                            className="flex justify-between items-center py-2 border-b border-neutral-border last:border-0"
                                        >
                                            <span className="font-medium text-neutral-text">
                                                {schedule.day}
                                            </span>
                                            <span className="text-neutral-muted">{schedule.hours}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 p-4 bg-primary-light/30 rounded-lg">
                                    <p className="text-sm text-primary-deep font-medium">
                                        🚨 Emergency Support: 24/7 Crisis Line Available
                                    </p>
                                </div>
                            </Card>

                            {/* FAQ */}
                            <Card>
                                <h3 className="font-display text-2xl font-semibold text-neutral-text mb-4">
                                    Quick Answers
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        {
                                            q: "How quickly will you respond?",
                                            a: "I typically respond within 24 hours on business days.",
                                        },
                                        {
                                            q: "Do you offer teletherapy?",
                                            a: "Yes! Virtual sessions are available for your convenience.",
                                        },
                                        {
                                            q: "What should I expect in the first session?",
                                            a: "We'll discuss your concerns, goals, and create a personalized treatment plan.",
                                        },
                                    ].map((faq, index) => (
                                        <div key={index} className="pb-4 border-b border-neutral-border last:border-0">
                                            <h4 className="font-semibold text-neutral-text mb-2">
                                                {faq.q}
                                            </h4>
                                            <p className="text-sm text-neutral-muted">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Emergency Notice */}
                            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-neutral-text mb-2">
                                            Crisis Support
                                        </h4>
                                        <p className="text-sm text-neutral-muted mb-3">
                                            If you're experiencing a mental health emergency, please call:
                                        </p>
                                        <a
                                            href="tel:988"
                                            className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                                        >
                                            988 - Suicide & Crisis Lifeline
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section id="map" className="section-spacing">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-display text-4xl font-semibold text-neutral-text mb-4">
                            Visit My Office
                        </h2>
                        <p className="text-lg text-neutral-muted">
                            Located in the heart of the city, easily accessible by public transport
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="rounded-2xl overflow-hidden shadow-strong aspect-video relative"
                    >
                        <Map
                            center={[90.401426, 23.8647565]}
                            zoom={16}
                        >
                            <MapControls />
                            <MapMarker longitude={90.401426} latitude={23.8647565}>
                                <MarkerContent>
                                    <div className="w-10 h-10 bg-primary-deep rounded-full flex items-center justify-center text-white shadow-glow border-2 border-white ring-4 ring-primary-light/30">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                </MarkerContent>
                                <MarkerPopup>
                                    <div className="p-3 min-w-[200px]">
                                        <h4 className="font-bold text-neutral-text mb-1">My Office</h4>
                                        <p className="text-xs text-neutral-muted leading-relaxed">
                                            Medical College for Women & Hospital<br />
                                            Plot 4, Road 9, Sector 1, Uttara<br />
                                            Dhaka, Bangladesh
                                        </p>
                                    </div>
                                </MarkerPopup>
                            </MapMarker>
                        </Map>
                    </motion.div>
                </div>
            </section>
        </Layout>
    )
}

export default ContactPage

export const Head = () => <title>Contact - Virtual Chamber</title>