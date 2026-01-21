import React, { useState, useMemo, useEffect, Suspense, lazy } from "react"
import "react-quill/dist/quill.snow.css"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Save, Eye, Code } from "lucide-react"

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = lazy(() => import("react-quill"))

interface EditorProps {
    initialContent?: string
    onSave?: (content: string) => void
    placeholder?: string
    readOnly?: boolean
}

export const Editor: React.FC<EditorProps> = ({
    initialContent = "",
    onSave,
    placeholder = "Start writing...",
    readOnly = false,
}) => {
    const [content, setContent] = useState(initialContent)
    const [isPreview, setIsPreview] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // Quill modules configuration
    const modules = useMemo(
        () => ({
            toolbar: [
                // Text formatting
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                [{ size: ["small", false, "large", "huge"] }],

                // Formatting options
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],

                // Lists
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],

                // Alignment
                [{ align: [] }],

                // Links and media
                ["link", "image", "video"],

                // Block formatting
                ["blockquote", "code-block"],

                // Clear formatting
                ["clean"],
            ],
            clipboard: {
                matchVisual: false,
            },
        }),
        []
    )

    // Quill formats
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "blockquote",
        "code-block",
        "align",
    ]

    const handleSave = async () => {
        if (onSave) {
            setIsSaving(true)
            try {
                await onSave(content)
                // Show success message or notification
            } catch (error) {
                console.error("Save failed:", error)
                // Show error message
            } finally {
                setIsSaving(false)
            }
        }
    }

    const getWordCount = (html: string) => {
        const text = html.replace(/<[^>]*>/g, " ")
        const words = text.trim().split(/\s+/)
        return words.filter((word) => word.length > 0).length
    }

    const wordCount = getWordCount(content)

    return (
        <Card className="overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-border bg-neutral-offWhite">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setIsPreview(false)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${!isPreview
                            ? "bg-primary-deep text-white"
                            : "text-neutral-text hover:bg-primary-light"
                            }`}
                    >
                        <Code className="w-4 h-4 inline mr-2" />
                        Edit
                    </button>
                    <button
                        onClick={() => setIsPreview(true)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${isPreview
                            ? "bg-primary-deep text-white"
                            : "text-neutral-text hover:bg-primary-light"
                            }`}
                    >
                        <Eye className="w-4 h-4 inline mr-2" />
                        Preview
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="text-sm text-neutral-muted">
                        {wordCount} words
                    </span>
                    {!readOnly && (
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                    )}
                </div>
            </div>

            {/* Editor / Preview */}
            <div className="min-h-[500px]">
                {!isPreview ? (
                    isClient ? (
                        <Suspense fallback={<div className="p-8 text-neutral-muted">Loading editor...</div>}>
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                formats={formats}
                                placeholder={placeholder}
                                readOnly={readOnly}
                                className="h-full"
                            />
                        </Suspense>
                    ) : (
                        <div className="p-8 text-neutral-muted">Loading editor...</div>
                    )
                ) : (
                    <div
                        className="prose prose-purple max-w-none p-8"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                )}
            </div>

            {/* Footer */}
            {!readOnly && (
                <div className="p-4 border-t border-neutral-border bg-neutral-offWhite">
                    <p className="text-xs text-neutral-muted">
                        💡 Tip: Use the toolbar to format your content. Images and videos can
                        be embedded directly.
                    </p>
                </div>
            )}
        </Card>
    )
}

// Simplified editor for quick notes
export const SimpleEditor: React.FC<EditorProps> = ({
    initialContent = "",
    onSave,
    placeholder = "Write a note...",
}) => {
    const [content, setContent] = useState(initialContent)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const modules = useMemo(
        () => ({
            toolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
            ],
        }),
        []
    )

    const formats = ["bold", "italic", "underline", "list", "bullet", "link"]

    return (
        <div className="border border-neutral-border rounded-lg overflow-hidden">
            {isClient ? (
                <Suspense fallback={<div className="p-3 min-h-[200px] text-neutral-muted">Loading...</div>}>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                        placeholder={placeholder}
                        className="min-h-[200px]"
                    />
                </Suspense>
            ) : (
                <div className="p-3 min-h-[200px] text-neutral-muted">Loading...</div>
            )}
            {onSave && (
                <div className="p-3 bg-neutral-offWhite border-t border-neutral-border flex justify-end">
                    <Button variant="primary" size="sm" onClick={() => onSave(content)}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Note
                    </Button>
                </div>
            )}
        </div>
    )
}