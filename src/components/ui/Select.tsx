import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/utils/cn"

interface Option {
    label: string
    value: string
}

interface SelectProps {
    options: Option[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
    error?: string
    className?: string
}

export const Select: React.FC<SelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    error,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find((opt) => opt.value === value)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className={cn("relative w-full", className)} ref={dropdownRef}>
            <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setIsOpen(!isOpen)
                    }
                    if (e.key === "Escape") {
                        setIsOpen(false)
                    }
                }}
                className={cn(
                    "w-full px-4 py-3 rounded-lg border flex items-center justify-between transition-all outline-none bg-white",
                    isOpen ? "border-primary-deep ring-2 ring-primary-light" : "border-neutral-border",
                    error ? "border-status-danger" : "hover:border-primary-deep/50"
                )}
            >
                <span className={cn(value ? "text-neutral-text" : "text-neutral-muted")}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <ChevronDown className="w-5 h-5 text-neutral-muted" />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95, originY: 0 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute z-50 w-full bg-white border border-neutral-border rounded-lg shadow-strong overflow-hidden"
                    >
                        <motion.ul
                            className="py-1 max-h-60 overflow-auto"
                            initial="closed"
                            animate="open"
                            variants={{
                                open: {
                                    transition: { staggerChildren: 0.05 }
                                },
                                closed: {}
                            }}
                        >
                            {options.map((option) => (
                                <motion.li
                                    key={option.value}
                                    variants={{
                                        open: { opacity: 1, x: 0 },
                                        closed: { opacity: 0, x: -5 }
                                    }}
                                    whileHover={{
                                        backgroundColor: "var(--primary-light)",
                                        color: "var(--primary-deep)",
                                        paddingLeft: "1.25rem"
                                    }}
                                    onClick={() => {
                                        onChange(option.value)
                                        setIsOpen(false)
                                    }}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            onChange(option.value)
                                            setIsOpen(false)
                                        }
                                    }}
                                    className={cn(
                                        "px-4 py-3 cursor-pointer transition-all text-sm outline-none focus:bg-primary-light focus:text-primary-deep",
                                        value === option.value ? "bg-primary-light/50 text-primary-deep font-semibold" : "text-neutral-text"
                                    )}
                                >
                                    {option.label}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
            {error && <p className="text-status-danger text-sm mt-1">{error}</p>}
        </div>
    )
}
