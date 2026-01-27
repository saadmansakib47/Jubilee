import React from "react"
import { motion } from "framer-motion"

interface ShowcaseOverlayProps {
    children: React.ReactNode
    trigger?: "mount" | "scroll"
}

export const ShowcaseOverlay: React.FC<ShowcaseOverlayProps> = ({ children, trigger = "mount" }) => {
    return (
        <div className="relative overflow-hidden group">
            {/* Left Curtain */}
            <motion.div
                initial={{ x: 0 }}
                {...(trigger === "mount"
                    ? { animate: { x: "-100%" } }
                    : { whileInView: { x: "-100%" }, viewport: { once: true, margin: "-100px" } })}
                transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1], delay: 0.2 }}
                className="absolute inset-y-0 left-0 w-1/2 bg-white/40 backdrop-blur-md z-40 border-r border-white/20"
            />
            {/* Right Curtain */}
            <motion.div
                initial={{ x: 0 }}
                {...(trigger === "mount"
                    ? { animate: { x: "100%" } }
                    : { whileInView: { x: "100%" }, viewport: { once: true, margin: "-100px" } })}
                transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1], delay: 0.2 }}
                className="absolute inset-y-0 right-0 w-1/2 bg-white/40 backdrop-blur-md z-40 border-l border-white/20"
            />

            {/* Content */}
            {children}
        </div>
    )
}
