"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    delay: number;
}

const AnimatedLine = ({ x1, y1, x2, y2, delay }: LineProps) => (
    <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#051e84ff"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{ delay, duration: 0.3, ease: "easeInOut" }}
    />
);

interface PathProps {
    d: string;
    delay: number;
    fill?: string;
}

const AnimatedPath = ({ d, delay, fill = "none" }: PathProps) => (
    <motion.path
        d={d}
        stroke="#051e84ff"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill={fill}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{ delay, duration: 0.3, ease: "easeInOut" }}
    />
);

export default function TNLogoOverlay({ onComplete }: { onComplete: () => void }) {
    const [show, setShow] = useState(true);

    // Hide overlay after fixed time regardless of animations
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onComplete();
        }, 3500); // overlay visible for 3.5s to allow all animations to complete

        return () => clearTimeout(timer);
    }, [onComplete]);

    // Letter T lines
    const TLines = [
        { x1: 60, y1: 20, x2: 80, y2: 20 }, // Top horizontal
        { x1: 70, y1: 20, x2: 70, y2: 55 }, // Vertical stem
    ];

    // Letter N lines
    const NLines = [
        { x1: 90, y1: 55, x2: 90, y2: 20 }, // Left vertical
        { x1: 90, y1: 20, x2: 110, y2: 55 }, // Diagonal
        { x1: 110, y1: 55, x2: 110, y2: 20 }, // Right vertical
    ];

    // Stethoscope components
    // Ear pieces (small dots at the top)
    const leftEarX = 88;
    const leftEarY = 62;
    const rightEarX = 112;
    const rightEarY = 62;

    // Ear tubes - lines from ear pieces going down and converging
    const earTubes = [
        { x1: leftEarX, y1: leftEarY, x2: 94, y2: 72 }, // Left ear tube
        { x1: rightEarX, y1: rightEarY, x2: 106, y2: 72 }, // Right ear tube
    ];

    // Y-junction where ear tubes meet and connect to main tube
    const yJunctionPath = "M 94 72 Q 100 74 106 72"; // Curved connection between ear tubes

    // Main tubing that starts from Y-junction center and circles almost completely around
    // The tube starts from the Y-junction, goes down a bit, then circles clockwise
    // around the content: down -> bottom-right -> right -> top-right -> top -> top-left -> left -> bottom-left -> bottom
    // and stops just before completing the full circle (leaving a gap on the right side)
    // Using a large arc that goes almost 360 degrees
    const mainTubingPath = `
    M 100 74
    L 100 78
    A 40 40 0 1 1 108 76
  `.trim();

    // Diaphragm position at the end of the tubing (right side, where it stops)
    const diaphragmCx = 108;
    const diaphragmCy = 76;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Overlay slides immediately from right to left */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-gray-200/20 backdrop-blur-md"
                        initial={{ x: "0%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    {/* Logo */}
                    <motion.svg
                        viewBox="0 0 200 100"
                        className="w-80 h-80"
                        style={{ transformStyle: "preserve-3d", perspective: 800 }}
                        initial={{ rotateY: -20 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 20 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        {/* Letter T */}
                        {TLines.map((line, index) => (
                            <AnimatedLine
                                key={`t-${index}`}
                                {...line}
                                delay={0.0 + index * 0.2}
                            />
                        ))}

                        {/* Letter N */}
                        {NLines.map((line, index) => (
                            <AnimatedLine
                                key={`n-${index}`}
                                {...line}
                                delay={0.4 + index * 0.2}
                            />
                        ))}

                        {/* Stethoscope ear pieces (small dots) */}
                        <motion.circle
                            cx={leftEarX}
                            cy={leftEarY}
                            r={2}
                            fill="#051e84ff"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ delay: 1.0, duration: 0.2, ease: "easeInOut" }}
                        />
                        <motion.circle
                            cx={rightEarX}
                            cy={rightEarY}
                            r={2}
                            fill="#051e84ff"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ delay: 1.0, duration: 0.2, ease: "easeInOut" }}
                        />

                        {/* Ear tubes */}
                        {earTubes.map((line, index) => (
                            <AnimatedLine
                                key={`ear-${index}`}
                                {...line}
                                delay={1.2 + index * 0.15}
                            />
                        ))}

                        {/* Y-junction connecting ear tubes */}
                        <AnimatedPath
                            d={yJunctionPath}
                            delay={1.5}
                        />

                        {/* Main tubing wire circling almost completely around content */}
                        <AnimatedPath
                            d={mainTubingPath}
                            delay={1.7}
                        />

                        {/* Diaphragm - filled violet circle at the end */}
                        <motion.circle
                            cx={diaphragmCx}
                            cy={diaphragmCy}
                            r={5}
                            fill="#051e84ff"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ delay: 2.5, duration: 0.3, ease: "easeInOut" }}
                        />
                    </motion.svg>
                </motion.div>
            )}
        </AnimatePresence>
    );
}