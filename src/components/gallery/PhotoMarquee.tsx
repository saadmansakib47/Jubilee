import React, { useRef, useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    useAnimationFrame,
    useTransform,
} from "framer-motion";
import { Card } from "@/components/ui/Card";

// Helper function for wrapping
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// Import placeholder images
import groupStudyImg from "../../images/group-study.png";
import patientsImg from "../../images/patients.png";
import seminarImg from "../../images/seminar.png";
import classroomImg from "../../images/classroom setting.png";
import teamworkImg from "../../images/teamwork.png";
import doctorsImg from "../../images/discussion.png";

const marqueeItems = [
    { id: 1, url: groupStudyImg, caption: "first day at medical college" },
    { id: 2, url: patientsImg, caption: "first patient" },
    { id: 3, url: seminarImg, caption: "first surgery" },
    { id: 4, url: classroomImg, caption: "first wearing apron" },
    { id: 5, url: teamworkImg, caption: "first clinical discussion" },
    { id: 6, url: doctorsImg, caption: "first medical seminar" },
];

export const PhotoMarquee: React.FC = () => {
    const baseX = useMotionValue(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Speed setting
    const speed = -0.5; // Pixels per frame

    useEffect(() => {
        if (containerRef.current) {
            // Width of one set of items including gap
            const firstChild = containerRef.current.children[0] as HTMLElement;
            if (firstChild) {
                const itemWidth = firstChild.offsetWidth;
                const gap = 24; // space-x-6 (6 * 4px = 24px)
                setContainerWidth(marqueeItems.length * (itemWidth + gap));
            }
        }
    }, []);

    useAnimationFrame((t, delta) => {
        if (isDragging) return;

        let moveBy = speed * (delta / 16);
        baseX.set(baseX.get() + moveBy);
    });

    // Use wrap to create infinite loop effect
    const x = useTransform(baseX, (v) => {
        if (containerWidth === 0) return 0;
        return wrap(-containerWidth, 0, v);
    });

    return (
        <section className="py-12 bg-neutral-offWhite overflow-hidden relative border-y border-neutral-border/50">
            {/* News Style Header */}
            <div className="container-custom mb-8 flex items-center space-x-4">
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-primary-deep/20 to-primary-deep/40" />
                <span className="font-display font-bold text-primary-deep uppercase tracking-widest text-sm flex items-center">
                    <span className="relative flex h-3 w-3 mr-3 mt-[-4px]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-deep opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-deep"></span>
                    </span>
                    Breaking Memories
                </span>
                <div className="h-px flex-grow bg-gradient-to-l from-transparent via-primary-deep/20 to-primary-deep/40" />
            </div>

            <div className="relative">
                {/* Gradient Shadows for depth */}
                <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-neutral-offWhite to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-neutral-offWhite to-transparent z-10 pointer-events-none" />

                <motion.div
                    ref={containerRef}
                    className="flex space-x-6 cursor-grab active:cursor-grabbing px-6"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -10000, right: 10000 }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={(e, info) => {
                        setIsDragging(false);
                        const velocity = info.velocity.x;
                        const extraRoll = velocity * 0.1;
                        baseX.set(baseX.get() + extraRoll);
                    }}
                >
                    {/* Render triple for seamless wrap */}
                    {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex-shrink-0 w-64 md:w-80">
                            <Card
                                hover
                                glass
                                className="h-full relative border-2 border-primary-deep bg-[#ede6f0] overflow-hidden group shadow-soft transition-all duration-500"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={item.url}
                                        alt={item.caption}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-5 bg-white/70 backdrop-blur-md mt-auto border-t border-primary-deep/20 group-hover:bg-primary-deep/5 transition-colors">
                                    <p className="font-display text-lg font-bold text-neutral-text text-center capitalize leading-tight">
                                        {item.caption}
                                    </p>
                                </div>

                                <div className="absolute top-3 left-3 px-2 py-1 bg-primary-deep text-white text-[10px] uppercase font-black tracking-widest rounded-sm shadow-medium">
                                    Exclusive
                                </div>
                            </Card>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
