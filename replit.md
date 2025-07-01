# SWAGY WORLD - Portfolio Website

## Overview

SWAGY WORLD is a creative portfolio website that recreates the Windows 98 aesthetic as a modern web application. Built with React, TypeScript, and Express.js, it features a nostalgic desktop environment with draggable windows, classic UI elements, and interactive applications showcasing the developer's work and personality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom Windows 98 theme
- **UI Components**: Shadcn/ui library with custom Windows 98 styling
- **State Management**: React hooks for local state management
- **Desktop Environment**: Custom window manager with drag-and-drop functionality

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: Hot module replacement via Vite middleware
- **Storage**: In-memory storage with interface for future database integration

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Current Storage**: In-memory storage implementation for development
- **Schema**: User management schema prepared for authentication features
- **Migration System**: Drizzle Kit for database schema management

## Key Components

### Desktop Environment
- **Desktop**: Windows 98-style desktop with teal background and desktop icons
- **Window Manager**: Custom windowing system with minimize, maximize, and close functionality
- **Taskbar**: Bottom taskbar with Start button, running applications, and system clock
- **Start Menu**: Classic Windows 98 start menu for navigation

### Window Applications
1. **Me Window**: Personal introduction with profile information
2. **Projects Window**: Portfolio showcase with categorized projects
3. **Music Window**: Audio player with playlist functionality
4. **Blog Window**: Text-based blog entries and thoughts
5. **Downloads Window**: File download center for CV and resources
6. **Contact Window**: Email contact form with EmailJS integration
7. **Terminal Window**: Interactive command-line interface with custom commands
8. **My Computer**: File explorer mimicking Windows 98 file system
9. **Recycle Bin**: Empty recycle bin with classic functionality

### Interactive Features
- **Multi-language Support**: English and Arabic with RTL support
- **Drag and Drop**: Fully draggable windows with position persistence
- **Audio System**: Global music player with track management
- **Mobile Responsive**: Optimized for mobile devices with touch support
- **Loading Screen**: Boot sequence animation with startup sound

## Data Flow

1. **Application Initialization**: 
   - Loading screen with boot animation
   - Audio system initialization
   - Language preference loading
   - Desktop environment setup

2. **Window Management**:
   - Icon double-click triggers window creation
   - Window state managed through custom hooks
   - Z-index management for window layering
   - Minimize/maximize state persistence

3. **User Interactions**:
   - Contact form submissions via EmailJS
   - Music playback through HTML5 Audio API
   - Terminal commands processed locally
   - Language switching with localStorage persistence

## External Dependencies

### Core Framework Dependencies
- **React**: UI framework with hooks and context
- **Express.js**: Backend server framework
- **TypeScript**: Type safety and development experience
- **Vite**: Build tool and development server

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components
- **Shadcn/ui**: Pre-built component library
- **Class Variance Authority**: Component variant management

### Database and Storage
- **Drizzle ORM**: Type-safe database ORM
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **Zod**: Schema validation library

### External Services
- **EmailJS**: Client-side email service for contact forms
- **SendGrid**: Server-side email service (configured but not actively used)

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Autoprefixer
- **TSX**: TypeScript execution for development

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite middleware integrated with Express server
- **Development Server**: Single server handling both API and static assets
- **TypeScript Compilation**: Real-time compilation with error reporting

### Production Build
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Static Assets**: Served directly by Express in production
- **Environment Variables**: Database URL and service keys configured via environment

### Deployment Configuration
- **Start Command**: `NODE_ENV=production node dist/index.js`
- **Build Process**: `vite build && esbuild server/index.ts --bundle --outdir=dist`
- **Database Push**: `drizzle-kit push` for schema deployment

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- July 01, 2025: Enhanced Windows 98-style modal windows with proper sizing (480x600px)
- July 01, 2025: Added company logos in modal title bars for authentic Windows experience  
- July 01, 2025: Implemented A+ font scaling system for individual windows using fontSize CSS
- July 01, 2025: Added minimize/maximize functionality to modal windows
- July 01, 2025: Complete Arabic/English translation system with RTL/LTR support
- July 01, 2025: Windows 98-style buttons for "Read More" functionality
- July 01, 2025: Full bilingual interface with proper text direction handling

## Font Scaling System

The A+ font scaling feature works individually for each window:
- A+ button increases font size by 0.2rem (max 2.5rem)
- A- button decreases font size by 0.2rem (min 0.6rem)
- Font scaling applies via CSS fontSize property to window content
- Each window maintains its own font scale state
- Scaling affects all text content within the active window only

## Changelog

Changelog:
- July 01, 2025. Initial setup
- July 01, 2025. Added modal windows, font scaling, and complete bilingual support