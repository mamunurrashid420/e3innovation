# E3 Innovation Limited - Corporate Website

A professional corporate website with React frontend and Laravel backend API.

## Project Structure

This repository contains the **React Frontend** application. The Laravel backend is implemented separately following the documentation provided.

### Design Reference

UI/UX design inspired by: [https://www.enosisbd.com/](https://www.enosisbd.com/)

---

## Frontend (React + Vite + TailwindCSS)

### Features

- Modern, responsive design matching the reference website
- Dynamic content from Laravel API
- Professional color scheme with red accent (#E92C33)
- Smooth animations and transitions
- SEO-friendly structure
- Mobile-first approach

### Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Utility-first CSS
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **TypeScript** - Type safety
- **Lucide React** - Icon library

### Pages

1. **Home** - Hero, Services, About, Projects, Team, CTA
2. **About** - Company information, values, statistics
3. **Services** - Service listing and details
4. **Projects** - Portfolio with filtering
5. **Team** - Team members with social links
6. **Contact** - Contact form and information

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Update API URL in .env
VITE_API_BASE_URL=http://localhost:8000/api

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar
│   ├── Footer.tsx      # Footer component
│   ├── Hero.tsx        # Hero section
│   ├── ServiceCard.tsx # Service card
│   ├── ProjectCard.tsx # Project card
│   ├── TeamCard.tsx    # Team member card
│   ├── FormInput.tsx   # Form input component
│   └── Alert.tsx       # Alert/Toast notification
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── About.tsx       # About page
│   ├── Services.tsx    # Services listing
│   ├── ServiceDetails.tsx
│   ├── Projects.tsx    # Projects listing
│   ├── ProjectDetails.tsx
│   ├── Team.tsx        # Team page
│   └── Contact.tsx     # Contact page
├── services/           # API service layer
│   └── api.ts          # Axios configuration & endpoints
├── types/              # TypeScript types
│   └── index.ts        # Type definitions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

---

## Backend (Laravel 11 REST API)

### Implementation Guide

The Laravel backend implementation is fully documented in:

- **LARAVEL_BACKEND_GUIDE.md** - Part 1 (Setup, Models, Public APIs)
- **LARAVEL_BACKEND_GUIDE_PART2.md** - Part 2 (Admin APIs, Routes, Configuration)

### Features

- RESTful API architecture
- JWT authentication for admin
- Image upload handling
- Input validation
- CORS enabled
- Error handling
- MySQL database

### Database Models

1. **Service** - Company services
2. **Project** - Portfolio projects
3. **Team** - Team members
4. **Setting** - Site settings
5. **ContactMessage** - Contact form submissions
6. **User** - Admin users

### API Endpoints

#### Public Endpoints

```
GET    /api/home                 # Get homepage data
GET    /api/services             # List all services
GET    /api/services/{slug}      # Get service by slug
GET    /api/projects             # List all projects
GET    /api/projects/{slug}      # Get project by slug
GET    /api/team                 # List team members
POST   /api/contact              # Submit contact form
```

#### Authentication

```
POST   /api/auth/login           # Admin login
POST   /api/auth/logout          # Admin logout
```

#### Admin Endpoints (Protected)

```
# Services
GET    /api/admin/services
POST   /api/admin/services
GET    /api/admin/services/{id}
PUT    /api/admin/services/{id}
DELETE /api/admin/services/{id}

# Projects
GET    /api/admin/projects
POST   /api/admin/projects
GET    /api/admin/projects/{id}
PUT    /api/admin/projects/{id}
DELETE /api/admin/projects/{id}

# Team
GET    /api/admin/team
POST   /api/admin/team
GET    /api/admin/team/{id}
PUT    /api/admin/team/{id}
DELETE /api/admin/team/{id}

# Settings
GET    /api/admin/settings
PUT    /api/admin/settings

# Contacts
GET    /api/admin/contacts
```

### Database Configuration

```env
DB_CONNECTION=mysql
DB_HOST=103.209.40.89
DB_PORT=3306
DB_DATABASE=innovation
DB_USERNAME=root
DB_PASSWORD="B*()cyTBD%^>"
```

---

## Development Workflow

### 1. Setup Backend (Laravel)

Follow the complete guide in `LARAVEL_BACKEND_GUIDE.md`:

```bash
# In a separate directory
composer create-project laravel/laravel e3innovation-backend
cd e3innovation-backend

# Follow the implementation guide
# Install JWT, configure database, run migrations, etc.

# Start Laravel server
php artisan serve
```

### 2. Setup Frontend (React)

```bash
# In this directory
npm install

# Configure API URL
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env

# Start development server
npm run dev
```

### 3. Access Applications

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api

---

## Deployment

### Frontend Deployment

```bash
# Build for production
npm run build

# Deploy the dist/ folder to your hosting
# Compatible with: Vercel, Netlify, AWS S3, etc.
```

### Backend Deployment

1. Configure production environment
2. Set up MySQL database
3. Run migrations
4. Configure web server (Apache/Nginx)
5. Set up SSL certificate
6. Update CORS settings
7. Configure file storage

---

## Design System

### Colors

- **Primary**: Red #E92C33
- **Text**: Gray-900 #1F2937
- **Background**: White #FFFFFF
- **Secondary BG**: Gray-50 #F9FAFB
- **Dark**: Gray-900 #111827

### Typography

- **Font Family**: Lato
- **Headings**: Bold (700)
- **Body**: Regular (400)
- **Line Height**: 1.5 (body), 1.2 (headings)

### Spacing

- Consistent 8px grid system
- Section padding: 80px (py-20)
- Component gaps: 32px (gap-8)

---

## Features Checklist

### Frontend
- ✅ Responsive navigation
- ✅ Hero section with CTA
- ✅ Services showcase
- ✅ Projects portfolio with filtering
- ✅ Team members display
- ✅ Contact form with validation
- ✅ About page
- ✅ Service details
- ✅ Project details
- ✅ Footer with links
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications

### Backend
- ✅ RESTful API
- ✅ JWT authentication
- ✅ CRUD operations
- ✅ Image uploads
- ✅ Input validation
- ✅ Error handling
- ✅ CORS configuration
- ✅ Database migrations
- ✅ Eloquent models
- ✅ API resources

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## Performance

- Optimized images
- Code splitting
- Lazy loading
- Minified assets
- Gzip compression

---

## Security

- HTTPS in production
- JWT token authentication
- Input validation
- XSS protection
- CSRF protection
- SQL injection prevention

---

## Support

For questions or issues:
- Email: info@e3innovationlimited.com
- Website: e3innovationlimited.com

---

## License

Copyright © 2024 E3 Innovation Limited. All rights reserved.
