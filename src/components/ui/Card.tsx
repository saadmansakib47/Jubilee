import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

interface CardProps {
    children: React.ReactNode
    className?: string
    hover?: boolean
    glass?: boolean
    gradient?: boolean
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    hover = false,
    glass = false,
    gradient = false,
}) => {
    const baseStyles = "rounded-xl p-6 transition-all duration-300"

    const conditionalStyles = cn(
        baseStyles,
        {
            "glass": glass,
            "bg-white shadow-soft": !glass && !gradient,
            "animated-gradient shadow-soft": gradient,
            "hover-lift cursor-pointer": hover,
        },
        className
    )

    if (hover) {
        return (
            <motion.div
                className={conditionalStyles}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        )
    }

    return <div className={conditionalStyles}>{children}</div>
}

interface CardHeaderProps {
    children: React.ReactNode
    className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    children,
    className,
}) => {
    return (
        <div className={cn("mb-4", className)}>
            {children}
        </div>
    )
}

interface CardTitleProps {
    children: React.ReactNode
    className?: string
}

export const CardTitle: React.FC<CardTitleProps> = ({
    children,
    className,
}) => {
    return (
        <h3 className={cn("text-2xl font-semibold text-neutral-text", className)}>
            {children}
        </h3>
    )
}

interface CardContentProps {
    children: React.ReactNode
    className?: string
}

export const CardContent: React.FC<CardContentProps> = ({
    children,
    className,
}) => {
    return (
        <div className={cn("text-neutral-muted", className)}>
            {children}
        </div>
    )
}