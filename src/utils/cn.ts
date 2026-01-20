import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges multiple class names using clsx and tailwind-merge.
 * This ensures that Tailwind utility classes are correctly merged without duplication
 * and conditional classes are handled properly.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
