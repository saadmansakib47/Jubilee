import anusurImg from "../images/Anisur.png"
import nusratImg from "../images/Nusrat.png"
import shahriarImg from "../images/Shahriar.png"
import farhanaImg from "../images/Farhana.png"
import mahmudulImg from "../images/Mahmudul.png"
import samiraImg from "../images/Samira.png"
import rezaulImg from "../images/Rezaul.png"

export interface Testimonial {
    id: number
    quote: string
    author: string
    role: "Patient" | "Student" | "Teacher" | "Colleague" | "Classmate"
    location: string
    rating: number
    date: string
    featured: boolean
    image?: string
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        quote:
            "Dr. Tasmiah listened carefully to my symptoms and explained the condition clearly. Her diagnosis and medicine recommendations were precise, and my health improved steadily under her guidance.",
        author: "Md. Anisur Rahman",
        role: "Patient",
        location: "Dhaka",
        rating: 5,
        date: "2024-02-10",
        featured: true,
        image: anusurImg,
    },
    {
        id: 2,
        quote:
            "She is one of the most supportive classmates I have worked with. Always willing to help during ward rounds and study sessions, with a calm and practical approach to problem-solving.",
        author: "Nusrat Jahan",
        role: "Classmate",
        location: "Medical College for Women, Uttara",
        rating: 5,
        date: "2024-01-28",
        featured: true,
        image: nusratImg,
    },
    {
        id: 3,
        quote:
            "The online consultation was very convenient. She reviewed my reports thoroughly and guided me on the next steps in a clear and reassuring manner.",
        author: "Shahriar Kabir",
        role: "Patient",
        location: "Chattogram",
        rating: 5,
        date: "2024-01-18",
        featured: true,
        image: shahriarImg,
    },
    {
        id: 4,
        quote:
            "Tasmiah demonstrates strong clinical curiosity and attentiveness during her training. She is disciplined, respectful, and consistently eager to learn from clinical cases.",
        author: "Prof. Dr. Farhana Islam",
        role: "Teacher",
        location: "Medical College for Women, Uttara",
        rating: 5,
        date: "2024-12-22",
        featured: false,
        image: farhanaImg,
    },
    {
        id: 5,
        quote:
            "Her ability to interpret investigation reports and correlate them clinically is commendable at this stage of training. She approaches patients with empathy and professionalism.",
        author: "Dr. Mahmudul Hasan",
        role: "Teacher",
        location: "MCW Hospital, Dhaka",
        rating: 5,
        date: "2024-12-12",
        featured: false,
        image: mahmudulImg,
    },
    {
        id: 6,
        quote:
            "Working with her during community medical camps was a positive experience. She communicates well with patients and collaborates effectively with the healthcare team.",
        author: "Dr. Samira Rahman",
        role: "Colleague",
        location: "Community Health Program, Dhaka",
        rating: 5,
        date: "2025-11-30",
        featured: false,
        image: samiraImg,
    },
    {
        id: 7,
        quote:
            "She has a sincere attitude toward patient care and pays close attention to clinical details. Her interest in cardiology is evident in her discussions and case analysis.",
        author: "Dr. Md. Rezaul Karim",
        role: "Teacher",
        location: "Dhaka",
        rating: 5,
        date: "2024-11-18",
        featured: false,
        image: rezaulImg,
    },
]
