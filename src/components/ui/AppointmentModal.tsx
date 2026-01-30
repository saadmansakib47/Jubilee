import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Clock, User, Mail, Phone, FileText, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { appointmentApi } from "@/services/api"

interface AppointmentModalProps {
    isOpen: boolean
    onClose: () => void
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        note: "",
        preferredDate: "",
        preferredTime: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

        try {
            const response = await appointmentApi.create(formData)
            if (response.success) {
                setIsSuccess(true)
                setTimeout(() => {
                    onClose()
                    setIsSuccess(false)
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        note: "",
                        preferredDate: "",
                        preferredTime: "",
                    })
                }, 2000)
            } else {
                setError(response.error || "Failed to submit appointment request")
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Get minimum date (today)
    const today = new Date().toISOString().split("T")[0]

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="sticky top-0 bg-white px-6 py-4 border-b border-neutral-border flex items-center justify-between rounded-t-3xl">
                                <div>
                                    <h2 className="font-display text-2xl font-semibold text-neutral-text">
                                        Schedule Consultation
                                    </h2>
                                    <p className="text-sm text-neutral-muted">
                                        Book your appointment with Dr. Tasmiah
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-neutral-offWhite rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-neutral-muted" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="font-display text-xl font-semibold text-neutral-text mb-2">
                                            Request Submitted!
                                        </h3>
                                        <p className="text-neutral-muted">
                                            We'll contact you soon to confirm your appointment.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {error && (
                                            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                                {error}
                                            </div>
                                        )}

                                        {/* Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-text mb-2">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your full name"
                                                    className="w-full pl-12 pr-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-deep focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-text mb-2">
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="your@email.com"
                                                    className="w-full pl-12 pr-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-deep focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-text mb-2">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="+880 1234-567890"
                                                    className="w-full pl-12 pr-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-deep focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Date and Time */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-text mb-2">
                                                    Preferred Date *
                                                </label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                                    <input
                                                        type="date"
                                                        name="preferredDate"
                                                        value={formData.preferredDate}
                                                        onChange={handleChange}
                                                        required
                                                        min={today}
                                                        className="w-full pl-12 pr-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-deep focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-text mb-2">
                                                    Preferred Time *
                                                </label>
                                                <div className="relative">
                                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                                    <input
                                                        type="time"
                                                        name="preferredTime"
                                                        value={formData.preferredTime}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full pl-12 pr-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-deep focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Note */}
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-text mb-2">
                                                Additional Notes (Optional)
                                            </label>
                                            <div className="relative">
                                                <FileText className="absolute left-4 top-4 w-5 h-5 text-neutral-muted" />
                                                <textarea
                                                    name="note"
                                                    value={formData.note}
                                                    onChange={handleChange}
                                                    placeholder="Any specific concerns or requests..."
                                                    rows={3}
                                                    className="w-full pl-12 pr-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-deep focus:border-transparent transition-all resize-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="w-full rounded-xl"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                "Request Appointment"
                                            )}
                                        </Button>

                                        <p className="text-xs text-neutral-muted text-center">
                                            We'll contact you to confirm the appointment time.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
