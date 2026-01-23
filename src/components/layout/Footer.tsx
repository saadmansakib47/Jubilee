import React from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import { Facebook, Twitter, Linkedin, Instagram, Heart } from "lucide-react"
import { SITE_CONFIG, NAV_LINKS } from "@/utils/constants"

export const Footer: React.FC = () => {
    const socialLinks = [
        { icon: Facebook, href: SITE_CONFIG.social.facebook, label: "Facebook" },
        { icon: Twitter, href: SITE_CONFIG.social.twitter, label: "Twitter" },
        { icon: Linkedin, href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
        { icon: Instagram, href: SITE_CONFIG.social.instagram, label: "Instagram" },
    ]

    return (
        <footer className="bg-gradient-to-br from-primary-deep to-secondary-deep text-white">
            <div className="container-custom">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-white font-display font-bold text-xl">
                                    TN
                                </span>
                            </div>
                            <span className="font-display text-xl font-semibold">
                                Dr. Tasmiah Nawal
                            </span>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed">
                            Evidence-based medical care with a focus on cardiovascular health,
                            clinical excellence, and compassionate patient treatment.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-display text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="text-white/80 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-display text-lg font-semibold mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li>
                                <a
                                    href={`mailto:${SITE_CONFIG.email}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {SITE_CONFIG.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${SITE_CONFIG.phone}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {SITE_CONFIG.phone}
                                </a>
                            </li>
                            <li className="leading-relaxed">{SITE_CONFIG.address}</li>
                        </ul>
                    </div>

                    {/* Office Hours */}
                    <div>
                        <h3 className="font-display text-lg font-semibold mb-4">
                            Office Hours
                        </h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li className="flex justify-between">
                                <span>Monday - Friday</span>
                                <span>9:00 - 17:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Saturday</span>
                                <span>10:00 - 14:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span>Closed</span>
                            </li>
                        </ul>
                        <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                            <p className="text-xs text-white/90">
                                Emergency support available 24/7
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <p className="text-sm text-white/60 text-center md:text-left">
                            © {new Date().getFullYear()} In Quiet Hours LLC. All rights
                            reserved.
                        </p>
                        <div className="flex items-center space-x-1 text-sm text-white/60">
                            <span>Developed by Saadman Sakib</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-sm text-white/60">
                                    SYSTEM STATUS : OPERATIONAL
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}