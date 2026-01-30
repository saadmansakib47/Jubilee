import React, { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Upload, Image as ImageIcon, X, Edit2, Trash2, Loader2, Check } from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/Button"
import { PhotoMarquee } from "@/components/gallery/PhotoMarquee"
import { authService } from "@/services/auth"
import { memoryApi } from "@/services/api"
import { ANIMATION_VARIANTS } from "@/utils/constants"

import groupStudyImg from "../images/group-study.png"
import conferenceImg from "../images/conference.jpg"
import seminarImg from "../images/seminar.png"
import discussionImg from "../images/discussion.png"
import patientsImg from "../images/patients.png"
import cardiologyImg from "../images/cardiology.png"
import classroomImg from "../images/classroom setting.png"
import teamworkImg from "../images/teamwork.png"
import eventImg from "../images/event.png"

const staticGalleryImages = [
    {
        id: "1",
        url: groupStudyImg,
        title: "Medical Students in Study Session",
        category: "College",
    },
    {
        id: "2",
        url: conferenceImg,
        title: "Medical Conference Discussion",
        category: "Conference",
    },
    {
        id: "3",
        url: seminarImg,
        title: "Seminar Presentation at Medical College",
        category: "Conference",
    },
    {
        id: "4",
        url: discussionImg,
        title: "Hands-on Clinical Discussion",
        category: "Clinical",
    },
    {
        id: "5",
        url: patientsImg,
        title: "Patient Consultation and Care",
        category: "Clinical",
    },
    {
        id: "6",
        url: cardiologyImg,
        title: "Cardiology Research & Focus",
        category: "Research",
    },
    {
        id: "7",
        url: classroomImg,
        title: "Classroom Education for Medical Students",
        category: "College",
    },
    {
        id: "8",
        url: teamworkImg,
        title: "Clinical Case Discussion",
        category: "Research",
    },
    {
        id: "9",
        url: eventImg,
        title: "Medical Event & Seminar",
        category: "Conference",
    },
];

interface GalleryImageType {
    id: string
    url: string
    title: string
    category: string
}

interface GalleryImageProps {
    image: GalleryImageType
    index: number
    isAdmin?: boolean
    onEdit?: (id: string, title: string) => void
    onDelete?: (id: string) => void
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, index, isAdmin, onEdit, onDelete }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return

            const rect = ref.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const elementCenter = rect.top + rect.height / 2

            const distanceFromCenter = Math.abs(windowHeight / 2 - elementCenter)
            const maxDistance = windowHeight / 2
            const opacityValue = 1 - (distanceFromCenter / maxDistance) * 0.2

            setOpacity(Math.max(0.8, Math.min(1, opacityValue)))
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()

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

                    {/* Admin Actions */}
                    {isAdmin && (
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onEdit?.(image.id, image.title)
                                }}
                                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                            >
                                <Edit2 className="w-4 h-4 text-white" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete?.(image.id)
                                }}
                                className="p-2 bg-red-500/80 backdrop-blur-sm rounded-full hover:bg-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

const GalleryPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [lightboxImage, setLightboxImage] = useState<GalleryImageType | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingImage, setEditingImage] = useState<{ id: string; title: string } | null>(null)
    const [galleryImages, setGalleryImages] = useState<GalleryImageType[]>(staticGalleryImages)

    // Upload form state
    const [uploadFile, setUploadFile] = useState<File | null>(null)
    const [uploadTitle, setUploadTitle] = useState("")
    const [uploadCategory, setUploadCategory] = useState("College")
    const [isUploading, setIsUploading] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const categories = ["All", "College", "Conference", "Clinical", "Research"]

    useEffect(() => {
        setIsAdmin(authService.isAdmin())
    }, [])

    const filteredImages =
        selectedCategory === "All"
            ? galleryImages
            : galleryImages.filter((img) => img.category === selectedCategory)

    const handleEdit = (id: string, title: string) => {
        setEditingImage({ id, title })
        setIsEditModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return

        try {
            // For static images, just remove from state
            setGalleryImages((prev) => prev.filter((img) => img.id !== id))
            // TODO: Call memoryApi.delete(id) for dynamic images
        } catch (error) {
            console.error("Failed to delete:", error)
        }
    }

    const handleUpload = async () => {
        if (!uploadFile || !uploadTitle) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append("image", uploadFile)
            formData.append("caption", uploadTitle)
            formData.append("category", uploadCategory)

            // For now, add to local state
            const newImage: GalleryImageType = {
                id: `upload-${Date.now()}`,
                url: URL.createObjectURL(uploadFile),
                title: uploadTitle,
                category: uploadCategory,
            }
            setGalleryImages((prev) => [newImage, ...prev])
            setUploadSuccess(true)

            setTimeout(() => {
                setIsUploadModalOpen(false)
                setUploadFile(null)
                setUploadTitle("")
                setUploadCategory("College")
                setUploadSuccess(false)
            }, 1500)
        } catch (error) {
            console.error("Upload failed:", error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleUpdateCaption = async () => {
        if (!editingImage) return

        setGalleryImages((prev) =>
            prev.map((img) =>
                img.id === editingImage.id ? { ...img, title: editingImage.title } : img
            )
        )
        setIsEditModalOpen(false)
        setEditingImage(null)
    }

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
                            My <span className="text-gradient">Memories</span>
                        </motion.h1>

                        <motion.p
                            variants={ANIMATION_VARIANTS.fadeUp}
                            className="text-xl md:text-2xl text-neutral-muted leading-relaxed"
                        >
                            Moments from my medical journey — from academic life and clinical learning
                            to conferences, seminars, and patient care experiences.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Stories Marquee */}
            <PhotoMarquee />

            {/* Category Filter */}
            <section className="py-8 bg-white sticky top-20 z-20 shadow-soft">
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
                                <GalleryImage
                                    image={image}
                                    index={index}
                                    isAdmin={isAdmin}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
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

            {/* Admin Upload Section - Only visible to admin */}
            {isAdmin && (
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
                                Upload New Memory
                            </h2>
                            <p className="text-white/80 mb-8">
                                Add new images to your gallery collection
                            </p>
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => setIsUploadModalOpen(true)}
                            >
                                <Upload className="w-5 h-5 mr-2" />
                                Upload New Images
                            </Button>
                            <p className="text-sm text-white/60 mt-4">
                                Supported formats: JPG, PNG, WebP (max 5MB)
                            </p>
                        </motion.div>
                    </div>
                </section>
            )}

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
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
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
                            { value: "50+", label: "Happy Moments" },
                            { value: "20+", label: "Conference Attended" },
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

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsUploadModalOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-display text-2xl font-semibold text-neutral-text">
                                        Upload New Memory
                                    </h2>
                                    <button
                                        onClick={() => setIsUploadModalOpen(false)}
                                        className="p-2 hover:bg-neutral-offWhite rounded-full"
                                    >
                                        <X className="w-5 h-5 text-neutral-muted" />
                                    </button>
                                </div>

                                {uploadSuccess ? (
                                    <div className="text-center py-8">
                                        <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-neutral-text">
                                            Upload Successful!
                                        </h3>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* File Input */}
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-text mb-2">
                                                Image
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                                                className="w-full p-3 border border-neutral-border rounded-xl"
                                            />
                                            {uploadFile && (
                                                <img
                                                    src={URL.createObjectURL(uploadFile)}
                                                    alt="Preview"
                                                    className="mt-2 w-full h-32 object-cover rounded-xl"
                                                />
                                            )}
                                        </div>

                                        {/* Title */}
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-text mb-2">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={uploadTitle}
                                                onChange={(e) => setUploadTitle(e.target.value)}
                                                placeholder="Enter image title"
                                                className="w-full p-3 border border-neutral-border rounded-xl focus:border-primary-deep outline-none"
                                            />
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-text mb-2">
                                                Category
                                            </label>
                                            <select
                                                value={uploadCategory}
                                                onChange={(e) => setUploadCategory(e.target.value)}
                                                className="w-full p-3 border border-neutral-border rounded-xl focus:border-primary-deep outline-none"
                                            >
                                                <option value="College">College</option>
                                                <option value="Conference">Conference</option>
                                                <option value="Clinical">Clinical</option>
                                                <option value="Research">Research</option>
                                            </select>
                                        </div>

                                        <Button
                                            variant="primary"
                                            className="w-full"
                                            onClick={handleUpload}
                                            disabled={isUploading || !uploadFile || !uploadTitle}
                                        >
                                            {isUploading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                    Uploading...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-5 h-5 mr-2" />
                                                    Upload Image
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditModalOpen && editingImage && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-display text-2xl font-semibold text-neutral-text">
                                        Edit Caption
                                    </h2>
                                    <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="p-2 hover:bg-neutral-offWhite rounded-full"
                                    >
                                        <X className="w-5 h-5 text-neutral-muted" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-text mb-2">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={editingImage.title}
                                            onChange={(e) =>
                                                setEditingImage({ ...editingImage, title: e.target.value })
                                            }
                                            className="w-full p-3 border border-neutral-border rounded-xl focus:border-primary-deep outline-none"
                                        />
                                    </div>

                                    <div className="flex space-x-3">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => setIsEditModalOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="primary"
                                            className="flex-1"
                                            onClick={handleUpdateCaption}
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </Layout>
    )
}

export default GalleryPage

export const Head = () => <title>Gallery - Dr.Tasmiah Nawal</title>