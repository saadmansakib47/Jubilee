# 🎨 Component Usage Guide

Quick reference for using the components built in Virtual Chamber.

---

## 🧩 UI Components

### Button Component

**Location:** `src/components/ui/Button.tsx`

**Basic Usage:**
```typescript
import { Button } from "@/components/ui/Button"

// Primary button
<Button variant="primary" size="md">
  Click Me
</Button>

// Secondary button
<Button variant="secondary" size="lg">
  Learn More
</Button>

// Outline button
<Button variant="outline" size="sm">
  Cancel
</Button>

// Ghost button (transparent)
<Button variant="ghost">
  Back
</Button>

// Button as link
<Button href="/contact" variant="primary">
  Contact Us
</Button>

// With icon
import { Calendar } from "lucide-react"

<Button variant="primary">
  <Calendar className="w-5 h-5 mr-2" />
  Book Now
</Button>
```

**Props:**
- `variant`: "primary" | "secondary" | "outline" | "ghost"
- `size`: "sm" | "md" | "lg"
- `href`: string (makes it a link)
- `className`: string (additional classes)
- All standard button props

---

### Card Component

**Location:** `src/components/ui/Card.tsx`

**Basic Usage:**
```typescript
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"

// Simple card
<Card>
  <p>Card content</p>
</Card>

// Card with hover effect
<Card hover>
  <p>Hover over me!</p>
</Card>

// Glass morphism card
<Card glass>
  <p>Translucent background</p>
</Card>

// Gradient card
<Card gradient>
  <p>Animated gradient background</p>
</Card>

// Full card with header and content
<Card hover className="max-w-md">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Your content goes here</p>
  </CardContent>
</Card>
```

**Props:**
- `hover`: boolean (adds lift animation)
- `glass`: boolean (glass morphism effect)
- `gradient`: boolean (animated gradient)
- `className`: string (additional classes)

---

### Timeline Component

**Location:** `src/components/ui/Timeline.tsx`

**Usage:**
```typescript
import { Timeline } from "@/components/ui/Timeline"

const items = [
  {
    id: "1",
    year: "2020-2024",
    title: "Doctor of Psychology",
    institution: "University Name",
    description: "Specialized in clinical psychology...",
    icon: "GraduationCap",
    achievements: [
      "First Class Honors",
      "Research Award",
    ]
  },
  // ... more items
]

<Timeline items={items} />
```

**Available Icons:**
- GraduationCap
- Award
- BookOpen
- Briefcase

---

## 📄 Layout Components

### Layout Component

**Location:** `src/components/layout/Layout.tsx`

**Usage:**
```typescript
import { Layout } from "@/components/layout/Layout"

const YourPage = () => {
  return (
    <Layout 
      title="Page Title"
      description="Page description for SEO"
      noFooter={false} // optional, removes footer
    >
      {/* Your page content */}
    </Layout>
  )
}
```

**Features:**
- Automatic Navbar and Footer inclusion
- SEO meta tags
- Responsive layout
- Optional footer removal

---

### Navbar

**Location:** `src/components/layout/Navbar.tsx`

Automatically included in Layout. 

**Customization:**
Edit `src/utils/constants.ts` → `NAV_LINKS` array:
```typescript
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  // Add more links here
]
```

---

### Footer

**Location:** `src/components/layout/Footer.tsx`

Automatically included in Layout.

**Customization:**
Edit `src/utils/constants.ts` → `SITE_CONFIG`:
```typescript
export const SITE_CONFIG = {
  name: "Dr. Your Name",
  email: "your@email.com",
  phone: "+1234567890",
  address: "Your address",
  social: {
    facebook: "url",
    twitter: "url",
    linkedin: "url",
    instagram: "url",
  },
}
```

---

## 🏠 Home Page Components

### Hero Component

**Location:** `src/components/home/Hero.tsx`

**Usage:**
```typescript
import { Hero } from "@/components/home/Hero"

<Hero />
```

**Customization:**
Edit component directly or update `SITE_CONFIG.tagline` in constants.

**Features:**
- Animated text reveal
- Floating orbs
- Stats display
- CTA buttons
- Scroll indicator
- Parallax effects

---

### Services Component

**Location:** `src/components/home/Services.tsx`

**Usage:**
```typescript
import { Services } from "@/components/home/Services"

<Services />
```

**Customization:**
Edit `src/utils/constants.ts` → `SERVICES` array:
```typescript
export const SERVICES = [
  {
    id: "service-id",
    title: "Service Title",
    description: "Service description",
    icon: "Video", // Lucide icon name
  },
  // ... more services
]
```

**Available Icons:**
- Video, Calendar, Phone, User, Users, ClipboardCheck
- Add more by importing from `lucide-react`

---

### IntroCard Component

**Location:** `src/components/home/IntroCard.tsx`

**Usage:**
```typescript
import { IntroCard } from "@/components/home/IntroCard"

<IntroCard />
```

**Customization:**
- Update `SITE_CONFIG` in constants
- Replace placeholder image
- Edit expertise areas in component

---

### FeaturedTestimonials Component

**Location:** `src/components/home/FeaturedTestimonials.tsx`

**Usage:**
```typescript
import { FeaturedTestimonials } from "@/components/home/FeaturedTestimonials"

<FeaturedTestimonials />
```

**Customization:**
Edit testimonials array in component:
```typescript
const testimonials = [
  {
    id: 1,
    quote: "Testimonial text...",
    author: "Author Name",
    role: "Patient",
    location: "City, State",
    rating: 5,
  },
]
```

---

## 🎨 Styling Utilities

### Using Theme Colors

```typescript
// In JSX className
<div className="bg-primary-deep text-primary-light">
  Content
</div>

// Available colors:
// Primary: primary-deep, primary-light
// Secondary: secondary-deep, secondary-light
// Neutral: neutral-white, neutral-offWhite, neutral-text, neutral-muted, neutral-border
// Status: status-success, status-warning, status-danger
```

### Custom Animations

**Available classes:**
```typescript
// Fade animations
className="animate-fade-in"
className="animate-fade-up"
className="animate-slide-in"

// Other animations
className="animate-float"
className="animate-glow"

// Stagger children animations
className="stagger-fade-in"

// Hover effect
className="hover-lift"
```

### Background Effects

```typescript
// Gradient overlay
className="gradient-overlay-top"
className="gradient-overlay-radial"

// Glass morphism
className="glass"

// Noise texture
className="noise-texture"

// Animated gradient
className="animated-gradient"
```

### Text Utilities

```typescript
// Gradient text
className="text-gradient"

// Font families
className="font-display" // Cormorant Garamond
className="font-body"    // Spectral
className="font-sans"    // Inter
```

### Layout Utilities

```typescript
// Container with responsive padding
className="container-custom"

// Section spacing
className="section-spacing"
```

---

## 🎬 Animation Examples

### Framer Motion Variants

**Import from constants:**
```typescript
import { ANIMATION_VARIANTS } from "@/utils/constants"
```

**Available variants:**
```typescript
// Simple fade in
<motion.div
  initial="hidden"
  animate="visible"
  variants={ANIMATION_VARIANTS.fadeIn}
>
  Content
</motion.div>

// Fade up
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={ANIMATION_VARIANTS.fadeUp}
>
  Content
</motion.div>

// Slide in
<motion.div
  variants={ANIMATION_VARIANTS.slideIn}
>
  Content
</motion.div>

// Stagger children
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={ANIMATION_VARIANTS.staggerContainer}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={ANIMATION_VARIANTS.staggerItem}
      custom={i}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Scroll-Triggered Animations

```typescript
import { useScroll, useTransform } from "framer-motion"

const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 500], [0, 150])
const opacity = useTransform(scrollY, [0, 300], [1, 0])

<motion.div style={{ y, opacity }}>
  Parallax content
</motion.div>
```

### Hover Animations

```typescript
// Scale on hover
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Hover me
</motion.div>

// Rotate on hover
<motion.div
  whileHover={{ rotate: 360 }}
  transition={{ duration: 0.6 }}
>
  Hover to rotate
</motion.div>
```

---

## 🔧 Utility Functions

### Date Utilities

**Location:** `src/utils/date.ts`

```typescript
import { formatDate, formatTime, formatDateTime } from "@/utils/date"

// Format date: "January 20, 2026"
const formatted = formatDate(new Date())

// Format time: "2:30 PM"
const time = formatTime(new Date())

// Format date and time
const dateTime = formatDateTime(new Date())

// Check if date is today
const today = isToday(new Date())

// Check if date is in future
const future = isFuture(new Date())

// Get time until a date
const timeUntil = getTimeUntil(futureDate) // "2 hours"

// Add hours to a date
const newDate = addHours(new Date(), 6)
```

### ClassName Merger

**Location:** `src/utils/cn.ts`

```typescript
import { cn } from "@/utils/cn"

// Merge classNames intelligently
const className = cn(
  "base-classes",
  condition && "conditional-classes",
  {
    "class-if-true": someCondition,
    "another-class": anotherCondition,
  }
)
```

---

## 🎯 Common Patterns

### Creating a New Page

```typescript
// src/pages/your-page.tsx
import React from "react"
import { Layout } from "@/components/layout/Layout"
import { motion } from "framer-motion"
import { ANIMATION_VARIANTS } from "@/utils/constants"

const YourPage: React.FC = () => {
  return (
    <Layout title="Your Page Title">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.fadeUp}
            className="text-center"
          >
            <h1 className="font-display text-5xl font-semibold text-neutral-text mb-6">
              Page Heading
            </h1>
            <p className="text-xl text-neutral-muted">
              Page description
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-spacing">
        <div className="container-custom">
          {/* Your content */}
        </div>
      </section>
    </Layout>
  )
}

export default YourPage

export const Head = () => <title>Your Page - Virtual Chamber</title>
```

### Creating an Animated Section

```typescript
<section className="section-spacing">
  <div className="container-custom">
    {/* Section Header */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={ANIMATION_VARIANTS.fadeUp}
      className="text-center mb-16"
    >
      <div className="inline-block px-4 py-2 bg-primary-light rounded-full mb-4">
        <span className="text-sm font-medium text-primary-deep">
          Section Label
        </span>
      </div>
      <h2 className="font-display text-4xl font-semibold text-neutral-text mb-4">
        Section Heading
      </h2>
      <p className="text-xl text-neutral-muted max-w-2xl mx-auto">
        Section description
      </p>
    </motion.div>

    {/* Content Grid */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={ANIMATION_VARIANTS.staggerContainer}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          variants={ANIMATION_VARIANTS.staggerItem}
          custom={index}
        >
          <Card hover>
            {/* Card content */}
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
```

---

## 📚 Icon Usage

Import icons from Lucide React:

```typescript
import {
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  Award,
  // ... any other icons you need
} from "lucide-react"

// Use in JSX
<Calendar className="w-6 h-6 text-primary-deep" />
<Mail size={20} className="text-neutral-muted" />
```

Browse all available icons: https://lucide.dev/icons/

---

## 🎨 Responsive Design Patterns

### Mobile-First Breakpoints

```typescript
// Tailwind breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

// Example usage:
className="text-base md:text-lg lg:text-xl"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="p-4 md:p-6 lg:p-8"
```

### Container Pattern

```typescript
<div className="container-custom">
  {/* Responsive padding and max-width */}
</div>
```

### Section Pattern

```typescript
<section className="section-spacing">
  {/* Responsive vertical spacing */}
</section>
```

---

## 💡 Tips & Best Practices

1. **Always use TypeScript interfaces** for component props
2. **Import animations from constants** for consistency
3. **Use `viewport={{ once: true }}`** to prevent re-animation on scroll
4. **Prefer Tailwind classes** over custom CSS
5. **Use motion components** for all animations
6. **Add `key` prop** when mapping arrays
7. **Use semantic HTML** (header, main, section, article, etc.)
8. **Test on mobile** first, then scale up
9. **Keep components small** and focused
10. **Reuse existing components** when possible

---

**Need more help?** Check the actual component files for implementation details!