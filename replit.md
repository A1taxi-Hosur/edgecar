# Unique Car Accessories Website

## Overview

A modern web application for Unique Car Accessories, a premium car accessories store in Pune, India. The application features a responsive design with a React frontend and Express backend, allowing customers to browse products, get quotes, and learn about the business.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom theme for automotive aesthetics
- **UI Components**: Radix UI components with shadcn/ui styling
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful APIs with proper error handling
- **Development**: Hot reload with Vite integration

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Quotes Table**: Customer quote requests with contact information, product requirements, and timestamps
- **Schema Management**: Drizzle ORM with type-safe queries and migrations

### Frontend Components
- **Navigation**: Fixed header with mobile-responsive menu
- **Hero Section**: Landing page with call-to-action buttons
- **Products Showcase**: Featured products with images and descriptions
- **Showroom Gallery**: Photo gallery of the physical store
- **Quote Form**: Customer inquiry form with validation
- **Testimonials**: Customer reviews and feedback
- **Location**: Store contact information and business hours
- **Footer**: Site links and business information

### API Endpoints
- `POST /api/quotes` - Submit customer quote requests
- `GET /api/quotes` - Retrieve all quotes (admin functionality)

## Data Flow

1. **Customer Journey**: Landing page → Browse products → Submit quote → Receive confirmation
2. **Quote Processing**: Form validation → API submission → Database storage → Success notification
3. **Admin Access**: Quote retrieval for business management
4. **Static Content**: Product information and business details served from components

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, Wouter, Radix UI components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Forms**: React Hook Form, Zod for validation
- **HTTP Client**: TanStack Query for API requests
- **Icons**: Lucide React for consistent iconography

### Backend Dependencies
- **Database**: Neon Database (PostgreSQL), Drizzle ORM
- **Server**: Express.js, connect-pg-simple for sessions
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across frontend and backend
- **Replit Integration**: Runtime error overlay and development tools

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with Express backend
- **Hot Reload**: Automatic refresh for both frontend and backend changes
- **Environment**: NODE_ENV=development with development-specific middleware

### Production
- **Build Process**: Vite builds frontend to dist/public, esbuild bundles backend
- **Serving**: Express serves static files from build directory
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Process**: NODE_ENV=production for optimized performance

### Configuration
- **Environment Variables**: DATABASE_URL for database connection
- **Static Assets**: Public assets served from dist/public
- **API Routes**: Backend routes prefixed with /api

## Changelog

```
Changelog:
- July 04, 2025. Initial setup - Basic car accessories website structure
- July 04, 2025. Major Update - Added complete admin system, Google reviews integration, updated business information:
  * Integrated custom logo (LL-removebg-preview_1751631586310.png) 
  * Updated business address: 24th main Kere, near Somasandra Palya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102
  * Updated contact number: +916366239811
  * Added 8 Google-style reviews with auto-slide functionality (5-second intervals)
  * Created admin login system (credentials: admin/admin123)
  * Built admin dashboard for product management (add/edit/delete products)
  * Dynamic product loading from database instead of static data
  * Added "Created by ZARA CREATIONS" attribution in footer
  * Products page now uses dynamic data from admin-managed database
  * Testimonials now auto-rotate with navigation controls and "View More Reviews" button linking to Google Business Profile
- July 04, 2025. UI Enhancement Update - Improved homepage with professional content:
  * Removed "Brands we deal in" section from About Us
  * Added auto-sliding Products section under Unique Xclusive section
  * Replaced generic About Us images with professional luxury car detailing image
  * Products slider features 4 categories with auto-rotation every 16 seconds
  * Individual product slides change every 4 seconds with manual navigation
  * Updated showroom gallery with 12 authentic professional business images
- July 05, 2025. Desktop Layout Update - Forced desktop view across all devices:
  * Implemented CSS scaling to maintain desktop layout on mobile devices
  * Disabled all responsive breakpoints - mobile shows full desktop layout
  * Added horizontal scrolling for small screens while preserving desktop structure
  * Updated business hours: Monday-Saturday 10:30 AM - 9:00 PM, Sunday 10:30 AM - 8:00 PM
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```