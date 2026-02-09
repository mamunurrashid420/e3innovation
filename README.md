# E3Innovation Limited

A modern corporate website built with React and Laravel.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Modern icon library

### Backend
- **Laravel 11** - PHP framework
- **MySQL** - Database
- **JWT Authentication** - Secure API authentication

## 📋 Features

- ✅ Responsive corporate design
- ✅ Dynamic content management via Laravel API
- ✅ Admin dashboard for CRUD operations
- ✅ File upload system with drag & drop
- ✅ Contact forms and team management
- ✅ Project portfolio showcase
- ✅ Service listings
- ✅ Image slider/carousel

## 📦 Installation

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup

```bash
# Create Laravel project
composer create-project laravel/laravel e3innovation-backend

# Configure database in .env
DB_DATABASE=e3innovation
DB_USERNAME=root
DB_PASSWORD=

# Run migrations
php artisan migrate

# Start Laravel server
php artisan serve
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── FileUpload.tsx
│   ├── FormInput.tsx
│   └── Alert.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Projects.tsx
│   ├── Team.tsx
│   ├── Contact.tsx
│   └── admin/         # Admin dashboard pages
├── services/          # API service layer
│   └── laravelApi.ts
├── types/             # TypeScript types
└── App.tsx            # Main app component
```

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🌐 API Endpoints

### Public Endpoints
```
GET    /api/sliders              # Get homepage sliders
GET    /api/services             # List all services
GET    /api/projects             # List all projects
GET    /api/team                 # List team members
POST   /api/contact              # Submit contact form
```

### Admin Endpoints (Protected with JWT)
```
POST   /api/auth/login           # Admin login
POST   /api/auth/logout          # Admin logout

# CRUD Operations
GET    /api/admin/sliders
POST   /api/admin/sliders
PUT    /api/admin/sliders/{id}
DELETE /api/admin/sliders/{id}

GET    /api/admin/services
POST   /api/admin/services
PUT    /api/admin/services/{id}
DELETE /api/admin/services/{id}

GET    /api/admin/projects
POST   /api/admin/projects
PUT    /api/admin/projects/{id}
DELETE /api/admin/projects/{id}

GET    /api/admin/team
POST   /api/admin/team
PUT    /api/admin/team/{id}
DELETE /api/admin/team/{id}

POST   /api/upload               # File upload
```

## 🚀 Quick Start

### Development

```bash
# Frontend
npm run dev          # http://localhost:5173

# Backend
php artisan serve    # http://localhost:8000
```

### Production Build

```bash
# Frontend
npm run build

# Deploy dist/ folder to hosting
```

---

## 🎨 Design System

### Colors
- **Primary**: Red #E92C33
- **Text**: Gray-900
- **Background**: White
- **Accent**: Gray-50

### Typography
- **Font**: Lato
- **Headings**: Bold (700)
- **Body**: Regular (400)

---

## 📄 Pages

1. **Home** - Hero slider, services, projects, team
2. **About** - Company information
3. **Services** - Service listings
4. **Projects** - Portfolio showcase
5. **Team** - Team members
6. **Contact** - Contact form
7. **Admin Dashboard** - Content management

---

## 🔒 Admin Features

- Secure JWT authentication
- Slider management
- Service CRUD operations
- Project portfolio management
- Team member management
- File upload with drag & drop
- Image preview and validation

---

## 📞 Contact

**E3Innovation Limited**
- Email: info@e3innovationlimited.com
- Website: www.e3innovationlimited.com

---

## 📝 License

© 2024 E3Innovation Limited. All rights reserved.
