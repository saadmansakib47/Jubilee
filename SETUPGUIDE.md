# 🚀 Virtual Chamber - Complete Setup Guide

This guide will walk you through setting up the Virtual Chamber frontend application from scratch.

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- [ ] Node.js 18 or higher installed
- [ ] npm or yarn package manager
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Basic knowledge of React and TypeScript

## 🛠️ Step-by-Step Setup

### 1. Initial Project Setup

```bash
# Create project directory
mkdir virtual-chamber-frontend
cd virtual-chamber-frontend

# Initialize as git repository
git init

# Copy all provided files into the project root
# Make sure the folder structure matches the README
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# This will install:
# - Gatsby and plugins
# - React and React DOM
# - TypeScript
# - Tailwind CSS
# - Framer Motion
# - React Hook Form + Zod
# - React Calendar
# - React Quill
# - Lucide React
# - All other dependencies
```

### 3. Create Required Directories

```bash
# Create image directory
mkdir -p src/images

# Create content directory for blog posts
mkdir -p src/content

# Create uploads directory structure  
mkdir -p static/uploads
```

### 4. Add Placeholder Icon

Create a simple icon file at `src/images/icon.png` (512x512px recommended) with your logo or use a placeholder.

### 5. Environment Configuration

Create `.env.development` file in root:

```env
# Development Environment Variables
GATSBY_API_URL=http://localhost:8080
GATSBY_SITE_URL=http://localhost:8000
```

Create `.env.production` file in root:

```env
# Production Environment Variables
GATSBY_API_URL=https://your-backend-url.render.com
GATSBY_SITE_URL=https://your-domain.com
```

### 6. Git Configuration

Create `.gitignore` file:

```
# Dependencies
node_modules/
.pnp/
.pnp.js

# Testing
coverage/

# Production
build/
public/
.cache/

# Misc
.DS_Store
.env
.env.local
.env.development
.env.production
.env.test

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Gatsby
.cache/
public/
```

### 7. Start Development Server

```bash
# Start Gatsby development server
npm run develop

# Or with yarn
yarn develop
```

The site will be available at:
- **Site**: http://localhost:8000
- **GraphQL Explorer**: http://localhost:8000/___graphql

## 🎨 Customization Guide

### Update Site Information

1. **Edit `gatsby-config.js`**:
```javascript
siteMetadata: {
  title: `Dr. Your Name`,
  description: `Your practice description`,
  // ... other fields
}
```

2. **Edit `src/utils/constants.ts`**:
```typescript
export const SITE_CONFIG = {
  name: "Dr. Your Name",
  title: "Your Title",
  // ... update all fields
}
```

### Customize Colors

Edit `src/styles/theme.ts`:
```typescript
export const colors = {
  primary: {
    deep: "#YOUR_COLOR",
    light: "#YOUR_COLOR",
  },
  // ... other colors
}
```

Also update `tailwind.config.js` to match.

### Add Your Images

Replace placeholder images in components:
- Hero section image
- About page portrait
- Service icons
- Gallery images

### Update Content

1. **Home page**: Edit `src/pages/index.tsx`
2. **About page**: Edit `src/pages/about.tsx`
3. **Services**: Edit `src/utils/constants.ts` → `SERVICES` array
4. **Testimonials**: Update dummy data in `src/components/home/FeaturedTestimonials.tsx`

## 🔧 Development Workflow

### File Organization

```
Working on a new feature?
1. Create component in appropriate directory
2. Import and use in page
3. Add types in component file or separate .types.ts file
4. Test in browser
5. Commit changes
```

### Adding New Pages

```bash
# Create new page file
touch src/pages/your-new-page.tsx
```

```typescript
// src/pages/your-new-page.tsx
import React from "react"
import { Layout } from "@/components/layout/Layout"

const YourNewPage: React.FC = () => {
  return (
    <Layout title="Your Page Title">
      <div className="container-custom section-spacing">
        <h1>Your Content</h1>
      </div>
    </Layout>
  )
}

export default YourNewPage
```

### Creating New Components

```typescript
// src/components/your-component/YourComponent.tsx
import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

interface YourComponentProps {
  // Define props
}

export const YourComponent: React.FC<YourComponentProps> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("your-classes")}
    >
      {/* Your component JSX */}
    </motion.div>
  )
}
```

## 🐛 Troubleshooting

### Common Issues

**1. Module not found errors**
```bash
# Clear cache and reinstall
npm run clean
rm -rf node_modules package-lock.json
npm install
```

**2. TypeScript errors**
```bash
# Run type check
npm run type-check

# Check your imports and types
```

**3. Styles not applying**
```bash
# Restart development server
# Make sure Tailwind is configured correctly
# Check PostCSS configuration
```

**4. Framer Motion animations not working**
```bash
# Make sure you're using motion components
# Check initial/animate props
# Verify viewport settings for scroll animations
```

### Build Issues

If production build fails:
```bash
# Clean everything
npm run clean
rm -rf .cache public node_modules

# Reinstall and rebuild
npm install
npm run build
```

## 📦 Production Build

### Before Building

- [ ] Remove console.logs
- [ ] Optimize images
- [ ] Update environment variables
- [ ] Test all pages
- [ ] Check responsive design
- [ ] Verify all links work
- [ ] Test forms
- [ ] Check SEO meta tags

### Build Commands

```bash
# Production build
npm run build

# Serve locally to test
npm run serve
```

### Deployment Checklist

- [ ] Build completes without errors
- [ ] Site works on localhost:9000
- [ ] All images load correctly
- [ ] Forms submit properly
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Performance is good (use Lighthouse)

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)

1. Push code to GitHub
2. Sign up at netlify.com
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `gatsby build`
   - Publish directory: `public`
6. Add environment variables
7. Deploy!

### Option 2: Vercel

1. Push code to GitHub
2. Sign up at vercel.com
3. Import your project
4. Vercel auto-detects Gatsby
5. Add environment variables
6. Deploy!

### Option 3: Traditional Hosting

```bash
# Build the site
npm run build

# Upload contents of 'public' folder to your web host
# Via FTP, SFTP, or your host's file manager
```

## 📊 Performance Optimization

### Image Optimization

```bash
# Use gatsby-plugin-image for automatic optimization
# Replace <img> tags with <StaticImage> or <GatsbyImage>
```

### Code Splitting

Gatsby automatically code-splits. For manual splitting:

```typescript
// Use dynamic imports
const HeavyComponent = React.lazy(() => import('./HeavyComponent'))
```

### Lighthouse Score Goals

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## 🎓 Learning Resources

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)

## 💡 Tips & Best Practices

1. **Use TypeScript**: Define proper types for props and state
2. **Component Reusability**: Create small, reusable components
3. **Consistent Styling**: Use Tailwind utility classes consistently
4. **Animation Performance**: Use transform and opacity for animations
5. **Mobile First**: Design for mobile, enhance for desktop
6. **Accessibility**: Use semantic HTML and ARIA labels
7. **Git Commits**: Make small, frequent commits with clear messages

## 🤝 Getting Help

- Check the README.md for feature documentation
- Review component files for usage examples
- Use browser DevTools for debugging
- Check Gatsby documentation for build issues
- Contact the development team for support

---

**Happy coding! 🎉**