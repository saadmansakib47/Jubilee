export const SITE_CONFIG = {
    name: "Dr. Tasmiah Nawal",
    title: "MBBS Student | Aspiring Cardiologist",
    tagline: "Dreams of life remains till the heart beats",
    description: "Medical graduate-in-training with a strong foundation in clinical medicine and a focused interest in cardiology, dedicated to evidence-based and compassionate patient care.",
    email: "tasmiahnawal7@gmail.com",
    phone: "+8801711111111",
    address: "Medical College for Women & Hospital (MCW), Plot No. 4, Road No. 9, Sector 1, Uttara, Dhaka, Bangladesh",
    social: {
        facebook: "https://www.facebook.com/tasmiah.nawal.7",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
    },
}

export const SERVICES = [

    {
        id: "telemedicine",
        title: "Telemedicine Consultation",
        description:
            "Secure online medical consultations for general health concerns and follow-up care.",
        icon: "Video",
    },
    {
        id: "online-booking",
        title: "Online Appointment Booking",
        description:
            "Simple and convenient appointment scheduling for in-person or virtual consultations.",
        icon: "Calendar",
    },
    {
        id: "emergency",
        title: "Emergency Medical Guidance",
        description:
            "Immediate guidance for urgent symptoms with appropriate referral to emergency services when needed.",
        icon: "Phone",
    },
    {
        id: "general-medicine",
        title: "General Medical Consultation",
        description:
            "Assessment and guidance for common medical conditions with a focus on holistic patient care.",
        icon: "Stethoscope",
    },
    {
        id: "report-review",
        title: "Medical Report Review",
        description:
            "Explanation and interpretation of laboratory reports, imaging results, and medical records.",
        icon: "ClipboardCheck",
    },
    {
        id: "test-recommendation",
        title: "Diagnostic Test Recommendations",
        description:
            "Evidence-based recommendations for appropriate investigations and follow-up testing.",
        icon: "FileSearch",
    },

]

export const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/journal", label: "Journal" },
    { href: "/gallery", label: "Memories" },
    { href: "/testimonials", label: "Showcase" },
    { href: "/contact", label: "Contact" },
]

export const JOURNAL_CATEGORIES = [
    { id: "blogs", label: "Blogs", href: "/journal/blog" },
    { id: "research", label: "Research & Publications", href: "/journal/research" },
    { id: "case-studies", label: "Case Studies", href: "/journal/case-studies" },
    { id: "internship", label: "Internship Notes", href: "/journal/internship-notes" },
]

export const ANIMATION_VARIANTS = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } },
    },
    fadeUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    },
    slideIn: {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    },
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    },
    staggerItem: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    },
}