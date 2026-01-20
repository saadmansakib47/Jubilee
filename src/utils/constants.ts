export const SITE_CONFIG = {
    name: "Dr. [Name]",
    title: "Clinical Psychologist",
    tagline: "Dreams of life remains till the heart beats",
    description: "Professional psychology and mental health services with compassionate care",
    email: "contact@virtualchamber.com",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Center, Suite 456, City, State 12345",
    social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
    },
}

export const SERVICES = [
    {
        id: "telemedicine",
        title: "Telemedicine",
        description: "Virtual consultations from the comfort of your home",
        icon: "Video",
    },
    {
        id: "online-booking",
        title: "Online Appointment Booking",
        description: "Easy scheduling at your convenience",
        icon: "Calendar",
    },
    {
        id: "emergency",
        title: "Emergency Support",
        description: "24/7 crisis intervention available",
        icon: "Phone",
    },
    {
        id: "therapy",
        title: "Individual Therapy",
        description: "Personalized one-on-one sessions",
        icon: "User",
    },
    {
        id: "group",
        title: "Group Sessions",
        description: "Collaborative healing experiences",
        icon: "Users",
    },
    {
        id: "assessment",
        title: "Psychological Assessment",
        description: "Comprehensive evaluations and diagnostics",
        icon: "ClipboardCheck",
    },
]

export const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/journal", label: "Journal" },
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonials", label: "Testimonials" },
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