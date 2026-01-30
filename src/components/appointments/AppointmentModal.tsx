import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar as CalendarIcon, Clock, Phone, Mail, User, Check, Loader2, AlignLeft } from "lucide-react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { Button } from "@/components/ui/Button"
import { appointmentApi } from "@/services/api"

const TIME_SLOTS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
]

export const AppointmentModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        note: "",
        preferredDate: new Date(),
        preferredTime: "",
    })

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true)
            setStep(1)
            setIsSuccess(false)
        }
        window.addEventListener("open-appointment-modal", handleOpen)
        return () => window.removeEventListener("open-appointment-modal", handleOpen)
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        // Reset form after animation
        setTimeout(() => {
            setStep(1)
            setFormData({
                name: "",
                email: "",
                phone: "",
                note: "",
                preferredDate: new Date(),
                preferredTime: "",
            })
            setIsSuccess(false)
        }, 300)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const data = {
                ...formData,
                preferredDate: formData.preferredDate.toISOString().split("T")[0],
            }
            const response = await appointmentApi.create(data)
            if (response.success) {
                setIsSuccess(true)
            } else {
                alert(response.error || "Failed to schedule appointment. Please try again.")
            }
        } catch (error) {
            console.error("Error scheduling appointment:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const nextStep = () => setStep(step + 1)
    const prevStep = () => setStep(step - 1)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row max-h-[90vh]">
                            {/* Sidebar - Info */}
                            <div className="bg-primary-deep p-8 text-white w-full md:w-72 flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                                        <CalendarIcon className="w-6 h-6" />
                                    </div>
                                    <h2 className="font-display text-2xl font-semibold mb-4 leading-tight">
                                        Book an Appointment
                                    </h2>
                                    <p className="text-white/70 text-sm leading-relaxed mb-8">
                                        Schedule a consultation with Dr. Tasmiah Nawal. Please provide your details and preferred timing.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center text-sm text-white/80">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        Easy Scheduling
                                    </div>
                                    <div className="flex items-center text-sm text-white/80">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        Fast Confirmation
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-8 overflow-y-auto relative">
                                <button
                                    onClick={handleClose}
                                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-offWhite transition-colors"
                                >
                                    <X className="w-5 h-5 text-neutral-muted" />
                                </button>

                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                            <Check className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-display font-semibold text-neutral-text mb-2">
                                            Request Sent!
                                        </h3>
                                        <p className="text-neutral-muted mb-8">
                                            Thank you for your request. We will contact you shortly to confirm your appointment.
                                        </p>
                                        <Button variant="primary" onClick={handleClose}>
                                            Close Window
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Progress Bar */}
                                        <div className="flex items-center space-x-2 mb-8">
                                            {[1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? "w-8 bg-primary-deep" : "w-4 bg-neutral-border"
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        {step === 1 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="space-y-4"
                                            >
                                                <h3 className="text-xl font-semibold text-neutral-text mb-4">
                                                    Your Information
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                                        <input
                                                            type="text"
                                                            placeholder="Full Name"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            className="w-full pl-12 pr-4 py-3 bg-neutral-offWhite border-none rounded-2xl focus:ring-2 ring-primary-light outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                                        <input
                                                            type="email"
                                                            placeholder="Email Address"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            className="w-full pl-12 pr-4 py-3 bg-neutral-offWhite border-none rounded-2xl focus:ring-2 ring-primary-light outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
                                                        <input
                                                            type="tel"
                                                            placeholder="Phone Number"
                                                            value={formData.phone}
                                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                            className="w-full pl-12 pr-4 py-3 bg-neutral-offWhite border-none rounded-2xl focus:ring-2 ring-primary-light outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="pt-4">
                                                    <Button
                                                        variant="primary"
                                                        className="w-full"
                                                        onClick={nextStep}
                                                        disabled={!formData.name || !formData.email || !formData.phone}
                                                    >
                                                        Continue
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="space-y-4"
                                            >
                                                <h3 className="text-xl font-semibold text-neutral-text mb-4">
                                                    Pick a Date
                                                </h3>
                                                <div className="appointment-calendar shadow-soft p-4 rounded-3xl bg-neutral-offWhite">
                                                    <Calendar
                                                        onChange={(date) => setFormData({ ...formData, preferredDate: date as Date })}
                                                        value={formData.preferredDate}
                                                        minDate={new Date()}
                                                        className="border-none w-full bg-transparent"
                                                    />
                                                </div>
                                                <div className="flex space-x-3 pt-4">
                                                    <Button variant="outline" className="flex-1" onClick={prevStep}>
                                                        Back
                                                    </Button>
                                                    <Button variant="primary" className="flex-1" onClick={nextStep}>
                                                        Select Time
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="space-y-4"
                                            >
                                                <h3 className="text-xl font-semibold text-neutral-text mb-4">
                                                    Final Details
                                                </h3>

                                                <div className="grid grid-cols-3 gap-2 mb-6">
                                                    {TIME_SLOTS.map((time) => (
                                                        <button
                                                            key={time}
                                                            onClick={() => setFormData({ ...formData, preferredTime: time })}
                                                            className={`py-2 px-1 rounded-xl text-xs font-medium transition-all ${formData.preferredTime === time
                                                                ? "bg-primary-deep text-white shadow-medium"
                                                                : "bg-neutral-offWhite text-neutral-muted hover:bg-primary-light"
                                                                }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="relative">
                                                    <textarea
                                                        placeholder="Additional Notes (Optional)"
                                                        value={formData.note}
                                                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                                        rows={3}
                                                        className="w-full p-4 bg-neutral-offWhite border-none rounded-2xl focus:ring-2 ring-primary-light outline-none transition-all resize-none"
                                                    />
                                                </div>

                                                <div className="flex space-x-3 pt-4">
                                                    <Button variant="outline" className="flex-1" onClick={prevStep}>
                                                        Back
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        className="flex-1"
                                                        onClick={handleSubmit}
                                                        disabled={isLoading || !formData.preferredTime}
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                Scheduling...
                                                            </>
                                                        ) : (
                                                            "Confirm Booking"
                                                        )}
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .appointment-calendar .react-calendar {
                    border: none;
                    font-family: inherit;
                }
                .appointment-calendar .react-calendar__navigation button {
                    color: #5D5DFF;
                    font-weight: 600;
                    border-radius: 8px;
                }
                .appointment-calendar .react-calendar__tile--active {
                    background: #5D5DFF !important;
                    color: white;
                    border-radius: 12px;
                }
                .appointment-calendar .react-calendar__tile--now {
                    background: #E8E8FF;
                    border-radius: 12px;
                }
                .appointment-calendar .react-calendar__tile:hover {
                    background: #F0F0FF;
                    border-radius: 12px;
                }
            `}} />
        </AnimatePresence>
    )
}
