import React, { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Upload, Image as ImageIcon, X } from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/Button"
import { ANIMATION_VARIANTS } from "@/utils/constants"

// Dummy gallery images - replace with actual data
const galleryImages = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
        title: "Peaceful Consultation Room",
        category: "Office",
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800",
        title: "Comfortable Waiting Area",
        category: "Office",
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800",
        title: "Therapy Session",
        category: "Sessions",
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
        title: "Professional Team",
        category: "Team",
    },
    {
        id: 5,
        url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800",
        title: "Client Success Story",
        category: "Testimonials",
    },
    {
        id: 6,
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        title: "Wellness Workshop",
        category: "Events",
    },
    {
        id: 7,
        url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
        title: "Mindfulness Session",
        category: "Sessions",
    },
    {
        id: 8,
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
        title: "Group Therapy",
        category: "Sessions",
    },
    {
        id: 9,
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
        title: "Individual Counseling",
        category: "Sessions",
    },
]

interface GalleryImageProps {
    image: typeof galleryImages[0]
    index: number
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, index }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return

            const rect = ref.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const elementCenter = rect.top + rect.height / 2

            // Calculate opacity based on distance from center
            // Center of viewport = 100% opacity
            // Top/bottom edges = 80% opacity
            const distanceFromCenter = Math.abs(windowHeight / 2 - elementCenter)
            const maxDistance = windowHeight / 2
            const opacityValue = 1 - (distanceFromCenter / maxDistance) * 0.2

            setOpacity(Math.max(0.8, Math.min(1, opacityValue)))
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // Initial calculation

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            style={{ opacity }}
            className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300"
        >
            <div className="aspect-[4/3] relative">
                <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="inline-block px-3 py-1 bg-primary-deep text-white text-xs rounded-full mb-2">
                            {image.category}
                        </span>
                        <h3 className="text-white font-display text-xl font-semibold">
                            {image.title}
                        </h3>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const GalleryPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null)

    const categories = ["All", "Office", "Sessions", "Events", "Team", "Testimonials"]

    const filteredImages =
        selectedCategory === "All"
            ? galleryImages
            : galleryImages.filter((img) => img.category === selectedCategory)

    return (
        <Layout title="Gallery">
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 relative overflow-hidden">
                <div className="absolute top-20 right-10 w-72 h-72 bg-primary-deep/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary-deep/10 rounded-full blur-3xl" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={ANIMATION_VARIANTS.staggerContainer}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            variants={ANIMATION_VARIANTS.fadeIn}
                            className="inline-block px-4 py-2 bg-white rounded-full mb-6 shadow-soft"
                        >
                            <span className="text-sm font-medium text-primary-deep">
                                Visual Stories
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-text mb-6"
                        >
                            Our <span className="text-gradient">Gallery</span>
                        </motion.h1>

                        <motion.p
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="text-xl md:text-2xl text-neutral-muted leading-relaxed"
                        >
                            A glimpse into our welcoming space and the supportive community
                            we've built together
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 bg-white sticky top-20 z-40 shadow-soft">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                    ? "bg-primary-deep text-white shadow-medium"
                                    : "bg-neutral-offWhite text-neutral-text hover:bg-primary-light"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="section-spacing">
                <div className="container-custom">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                layout
                                onClick={() => setLightboxImage(image)}
                                className="cursor-pointer"
                            >
                                <GalleryImage image={image} index={index} />
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredImages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <ImageIcon className="w-16 h-16 text-neutral-muted mx-auto mb-4" />
                            <h3 className="font-display text-2xl font-semibold text-neutral-text mb-2">
                                No images in this category
                            </h3>
                            <p className="text-neutral-muted">
                                Try selecting a different category
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Admin Upload Section - Only visible in admin mode */}
            <section className="section-spacing bg-gradient-to-br from-primary-deep to-secondary-deep text-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <Upload className="w-16 h-16 mx-auto mb-6" />
                        <h2 className="font-display text-4xl font-semibold mb-4">
                            Admin: Upload Images
                        </h2>
                        <p className="text-white/80 mb-8">
                            This section is only visible to administrators. Upload and manage
                            gallery images here.
                        </p>
                        <Button variant="secondary" size="lg">
                            <Upload className="w-5 h-5 mr-2" />
                            Upload New Images
                        </Button>
                        <p className="text-sm text-white/60 mt-4">
                            Supported formats: JPG, PNG, WebP (max 5MB)
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setLightboxImage(null)}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                >
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-5xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={lightboxImage.url}
                            alt={lightboxImage.title}
                            className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                        <div className="mt-6 text-center">
                            <span className="inline-block px-4 py-2 bg-primary-deep text-white text-sm rounded-full mb-3">
                                {lightboxImage.category}
                            </span>
                            <h3 className="text-white font-display text-3xl font-semibold">
                                {lightboxImage.title}
                            </h3>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Stats Section */}
            <section className="section-spacing bg-neutral-offWhite">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={ANIMATION_VARIANTS.staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {[
                            { value: "500+", label: "Happy Moments" },
                            { value: "50+", label: "Events Hosted" },
                            { value: "10+", label: "Years of Service" },
                            { value: "100%", label: "Client Satisfaction" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={ANIMATION_VARIANTS.staggerItem}
                                custom={index}
                                className="text-center"
                            >
                                <div className="font-display text-4xl md:text-5xl font-semibold text-primary-deep mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-neutral-muted">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </Layout>
    )
}

export default GalleryPage

export const Head = () => <title>Gallery - Virtual Chamber</title>