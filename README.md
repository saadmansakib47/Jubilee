# 🌟 Virtual Chamber - Professional Psychology Practice Website

A modern, elegant web application for a professional psychology practice built with Gatsby, TypeScript, and Framer Motion. Features a beautiful purple-violet theme with sophisticated animations and mobile-first design.

## ✨ Features

### 🎨 Design
- **Purple-Violet Theme**: Elegant color scheme with deep and light tones
- **Mobile-First**: Optimized for mobile browsing and appointment booking
- **Smooth Animations**: Framer Motion powered interactions and transitions
- **Glass Morphism**: Modern UI effects with backdrop blur
- **Responsive**: Seamless experience across all device sizes

### 📱 User Interface
- **Transparent Navbar**: Blends elegantly with hero section
- **Hero Section**: Compelling landing with CTA buttons
- **Services Showcase**: Animated service cards with icons
- **Testimonials**: Featured client testimonials with ratings
- **Professional Timeline**: Educational milestones and achievements
- **Gallery**: Collage-style image display with opacity gradients
- **Contact Form**: Integrated contact functionality

### 🔧 Technical Features
- **TypeScript**: Type-safe development
- **Gatsby**: Fast, static site generation
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Professional animations
- **React Hook Form + Zod**: Form validation
- **React Calendar**: Appointment scheduling
- **React Quill**: Rich text editing (admin)
- **Lucide React**: Beautiful icon library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd virtual-chamber
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run develop
   # or
   yarn develop
   ```

4. **Open your browser**
   Navigate to `http://localhost:8000`

### Build for Production

```bash
npm run build
# or
yarn build
```

Then serve the production build:
```bash
npm run serve
# or
yarn serve
```

## 📁 Project Structure

```
src/
├── pages/                  # Page components
│   ├── index.tsx          # Home page
│   ├── about.tsx          # About page
│   ├── contact.tsx        # Contact page
│   ├── gallery.tsx        # Gallery page
│   ├── testimonials.tsx   # Testimonials page
│   ├── journal/           # Journal section
│   └── admin/             # Admin pages
│
├── components/
│   ├── layout/            # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── home/              # Home page components
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── IntroCard.tsx
│   │   └── FeaturedTestimonials.tsx
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Timeline.tsx
│   └── journal/           # Journal components
│
├── styles/
│   ├── globals.css        # Global styles
│   ├── theme.ts           # Theme configuration
│   └── typography.ts      # Typography settings
│
├── utils/
│   ├── constants.ts       # App constants
│   ├── date.ts            # Date utilities
│   └── cn.ts              # ClassNames utility
│
└── services/              # API services
    ├── api.ts             # Rust backend API calls
    └── auth.ts            # Authentication service
```

## 🎨 Color Palette

```typescript
Primary Deep:    #5B2D8B  // Rich violet
Primary Light:   #E6D9F5  // Soft lavender
Secondary Deep:  #3F1D5C  // Dark violet
Secondary Light: #F2ECFA  // Light purple
```

## 🔧 Configuration

### Theme Customization
Edit `src/styles/theme.ts` to customize colors, typography, and spacing.

### Site Metadata
Edit `gatsby-config.js` to update site information:
```javascript
siteMetadata: {
  title: `Your Site Title`,
  description: `Your site description`,
  author: `@yourhandle`,
  siteUrl: `https://yoursite.com`,
}
```

### Backend Integration
Update `src/services/api.ts` with your Rust backend endpoints when ready.

## 📝 Available Scripts

- `npm run develop` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build
- `npm run clean` - Clean Gatsby cache
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## 🎯 Next Steps

### To Complete:
1. **Images**: Add professional images to replace placeholders
2. **Content**: Update all content with actual practice information
3. **Journal Section**: Implement blog, research, case studies pages
4. **Gallery**: Add image upload and display functionality
5. **Contact Form**: Connect to email service or backend
6. **Admin Panel**: Implement admin authentication and CRUD operations
7. **Calendar**: Integrate appointment booking system
8. **Backend**: Connect Rust backend API endpoints
9. **Testing**: Add unit and integration tests
10. **SEO**: Optimize meta tags and add structured data

### Recommended Additions:
- Google Analytics integration
- Cookie consent banner
- FAQ section
- Privacy policy and terms of service pages
- Newsletter signup
- Social media feed integration
- Chat widget for instant support

## 🚀 Deployment

### Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `gatsby build`
4. Set publish directory: `public`

### Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Gatsby configuration

### Traditional Hosting
```bash
npm run build
# Upload contents of 'public' folder to your web host
```

## 🤝 Contributing

This is a private project for a professional practice. For any issues or suggestions, please contact the development team.

## 📄 License

© 2024 Virtual Chamber. All rights reserved.

## 💬 Support

For technical support or questions:
- Email: dev@virtualchamber.com
- Documentation: See `/docs` folder (to be created)

---

**Built with** ❤️ **for better mental health care accessibility**