# Quick Start Guide

## Frontend + Laravel Backend Integration

This guide will help you quickly set up and run the E3 Innovation website with Laravel backend.

---

## Prerequisites

- Node.js 18+ installed
- PHP 8.2+ installed
- Composer installed
- MySQL database access

---

## Step 1: Frontend Setup (React)

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update API URL in .env
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env

# Start development server
npm run dev
```

Frontend will run at: **http://localhost:5173**

---

## Step 2: Laravel Backend Setup

### Option A: Quick Setup (If you have the backend ready)

```bash
# Navigate to your Laravel project
cd /path/to/laravel-backend

# Install dependencies
composer install

# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=103.209.40.89
DB_PORT=3306
DB_DATABASE=innovation
DB_USERNAME=root
DB_PASSWORD="B*()cyTBD%^>"

# Run migrations
php artisan migrate

# Seed database with sample data
php artisan db:seed

# Link storage for file uploads
php artisan storage:link

# Start Laravel server
php artisan serve
```

Backend API will run at: **http://localhost:8000**

---

### Option B: Create New Laravel Backend

If you don't have a Laravel backend yet, follow these steps:

```bash
# Create new Laravel project
composer create-project laravel/laravel e3innovation-backend
cd e3innovation-backend

# Install required packages
composer require laravel/sanctum
composer require tymon/jwt-auth

# Follow complete setup in LARAVEL_BACKEND_GUIDE.md
```

---

## Step 3: Verify Integration

### Test API Connection

Open your browser console at `http://localhost:5173` and check:

1. **No CORS errors** in console
2. **Data loads** on homepage (services, projects, team)
3. **Contact form** submits successfully
4. **Navigation** works smoothly

### Common Checks

```bash
# Check Laravel is running
curl http://localhost:8000/api/public/settings

# Should return JSON response
{
  "success": true,
  "data": {
    "site_title": "E3 Innovation",
    ...
  }
}
```

---

## Step 4: API Endpoints Reference

### Your Laravel backend should have these routes:

**routes/api.php:**

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\AdminServiceController;
use App\Http\Controllers\Admin\AdminProjectController;
use App\Http\Controllers\Admin\AdminTeamController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminContactController;
use App\Http\Controllers\Admin\UploadController;

// Public routes
Route::prefix('public')->group(function () {
    Route::get('/settings', [PublicController::class, 'getSettings']);
    Route::get('/services', [PublicController::class, 'getServices']);
    Route::get('/services/{slug}', [PublicController::class, 'getServiceBySlug']);
    Route::get('/projects', [PublicController::class, 'getProjects']);
    Route::get('/projects/{slug}', [PublicController::class, 'getProjectBySlug']);
    Route::get('/team', [PublicController::class, 'getTeam']);
    Route::post('/contact', [PublicController::class, 'submitContact']);
});

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

// Admin routes (protected)
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::apiResource('services', AdminServiceController::class);
    Route::apiResource('projects', AdminProjectController::class);
    Route::apiResource('team', AdminTeamController::class);

    Route::get('settings', [AdminSettingController::class, 'index']);
    Route::put('settings', [AdminSettingController::class, 'update']);

    Route::get('contacts', [AdminContactController::class, 'index']);
    Route::get('contacts/{id}', [AdminContactController::class, 'show']);
    Route::patch('contacts/{id}/read', [AdminContactController::class, 'markAsRead']);

    Route::post('upload', [UploadController::class, 'upload']);
});
```

---

## Step 5: Test Admin Panel (Future)

Once you implement admin panel in React:

```bash
# Default admin credentials (from seeder)
Email: admin@e3innovation.com
Password: password

# Login endpoint
POST http://localhost:8000/api/auth/login
{
  "email": "admin@e3innovation.com",
  "password": "password"
}
```

---

## Troubleshooting

### Frontend not loading data?

```bash
# Check if backend is running
curl http://localhost:8000/api/public/services

# Check browser console for CORS errors
# Fix in Laravel: config/cors.php
```

### CORS Error?

**Laravel config/cors.php:**
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

### 404 on API routes?

```bash
# Clear Laravel cache
php artisan route:clear
php artisan config:clear
php artisan cache:clear

# Check routes
php artisan route:list
```

### Database connection error?

```bash
# Test database connection
php artisan migrate:status

# If fails, check .env file
DB_CONNECTION=mysql
DB_HOST=103.209.40.89
DB_DATABASE=innovation
```

---

## File Structure Overview

```
project/
├── frontend/ (This React project)
│   ├── src/
│   │   ├── pages/           # React pages
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API calls
│   │   └── types/           # TypeScript types
│   └── .env                 # Frontend config
│
└── backend/ (Your Laravel project)
    ├── app/
    │   ├── Http/Controllers/
    │   ├── Models/
    │   └── ...
    ├── routes/
    │   └── api.php          # API routes
    ├── database/
    │   ├── migrations/
    │   └── seeders/
    └── .env                 # Backend config
```

---

## Next Steps

1. **Start both servers** (Laravel + React)
2. **Test homepage** - Should load services, projects, team
3. **Test contact form** - Should submit successfully
4. **Review logs** if any errors occur
5. **Customize content** via database

---

## Production Deployment

### Frontend (React)
```bash
npm run build
# Deploy dist/ folder to Netlify/Vercel/AWS
```

### Backend (Laravel)
```bash
# Configure production .env
# Set up web server (Apache/Nginx)
# Run migrations on production DB
# Set proper file permissions
```

---

## Support Documentation

- **BACKEND_INTEGRATION_GUIDE.md** - Complete API documentation
- **LARAVEL_BACKEND_GUIDE.md** - Laravel setup (Part 1)
- **LARAVEL_BACKEND_GUIDE_PART2.md** - Laravel setup (Part 2)
- **README.md** - Full project documentation

---

## Need Help?

1. Check Laravel logs: `storage/logs/laravel.log`
2. Check browser console for errors
3. Test API with Postman
4. Review CORS configuration
5. Verify database has seeded data

---

**That's it! You're ready to develop with React frontend + Laravel backend.**
