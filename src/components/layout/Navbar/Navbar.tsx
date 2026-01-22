import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X, Download } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { NAV_LINKS, SITE_CONFIG } from "@/utils/constants"
import { cn } from "@/utils/cn"

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { scrollY } = useScroll()

    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
    )

    const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <motion.nav
                style={{
                    backgroundColor,
                    backdropFilter: backdropBlur,
                    WebkitBackdropFilter: backdropBlur,
                }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled && "shadow-soft"
                )}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 group">
                            <motion.div
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-deep to-secondary-deep flex items-center justify-center overflow-hidden"
                            >
                                <StaticImage
                                    src="../../../images/avatar.png"
                                    alt="Logo"
                                    placeholder="blurred"
                                    className="w-full h-full"
                                />
                            </motion.div>
                            <span className="font-display text-xl font-semibold text-primary-deep hidden sm:block">
                                {SITE_CONFIG.name}
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {NAV_LINKS.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={link.href}
                                        className="px-4 py-2 text-neutral-text hover:text-primary-deep font-medium transition-colors duration-200 relative group"
                                        activeClassName="text-primary-deep"
                                    >
                                        {link.label}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-deep transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="hidden lg:flex items-center space-x-4">
                            <Button variant="outline" size="md" className="rounded-[16px]">
                                <Download className="w-3 h-3 mr-2" />
                                Download CV
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 text-primary-deep hover:bg-primary-light rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: "100%" },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-2xl z-40 lg:hidden"
            >
                <div className="flex flex-col h-full pt-24 px-6 pb-6">
                    <div className="flex-1 space-y-2">
                        {NAV_LINKS.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={link.href}
                                    className="block px-4 py-3 text-lg font-medium text-neutral-text hover:text-primary-deep hover:bg-primary-light rounded-lg transition-all"
                                    activeClassName="text-primary-deep bg-primary-light"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="space-y-3 pt-6 border-t border-neutral-border">
                        <Button variant="primary" size="md" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download CV
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                />
            )}
        </>
    )
}