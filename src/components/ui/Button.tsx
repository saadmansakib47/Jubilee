import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost"
    size?: "sm" | "md" | "lg"
    children: React.ReactNode
    asChild?: boolean
    href?: string
}

export const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    className,
    children,
    href,
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
        primary:
            "bg-primary-deep text-white hover:bg-secondary-deep hover:shadow-lg hover:-translate-y-0.5",
        secondary:
            "bg-primary-light text-primary-deep hover:bg-primary-deep hover:text-white hover:shadow-lg hover:-translate-y-0.5",
        outline:
            "bg-transparent border-2 border-primary-deep text-primary-deep hover:bg-primary-deep hover:text-white hover:-translate-y-0.5",
        ghost:
            "bg-transparent text-primary-deep hover:bg-primary-light hover:-translate-y-0.5",
    }

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-8 py-3 text-base",
        lg: "px-10 py-4 text-lg",
    }

    const MotionButton = motion.button

    if (href) {
        return (
            <motion.a
                href={href}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {children}
            </motion.a>
        )
    }

    return (
        <MotionButton
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </MotionButton>
    )
}