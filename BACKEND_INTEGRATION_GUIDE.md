# Laravel Backend Integration Guide

This React frontend is configured to work with a Laravel REST API backend. Follow this guide to set up and connect your backend.

## Backend API Base URL

The frontend is configured to connect to: `http://localhost:8000/api`

You can change this in the `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## API Endpoints Structure

The frontend expects the following Laravel API endpoints:

### Public Endpoints (No Authentication Required)

#### Settings
```
GET /api/public/settings
```
Returns site settings, hero content, and contact information.

#### Services
```
GET /api/public/services
GET /api/public/services/{slug}
```
Returns all services or a single service by slug.

#### Projects
```
GET /api/public/projects?category=&page=&per_page=
GET /api/public/projects/{slug}
```
Returns projects with optional filtering and pagination.

#### Team
```
GET /api/public/team
```
Returns all team members.

#### Contact
```
POST /api/public/contact
```
Submit contact form messages.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+880 1234567890",
  "subject": "Business Inquiry",
  "message": "I would like to discuss..."
}
```

### Admin Endpoints (Authentication Required)

#### Authentication
```
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

**Login Request:**
```json
{
  "email": "admin@e3innovation.com",
  "password": "password"
}
```

**Login Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJh...",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@e3innovation.com"
    }
  }
}
```

#### Admin Services CRUD
```
GET    /api/admin/services
POST   /api/admin/services
GET    /api/admin/services/{id}
PUT    /api/admin/services/{id}
DELETE /api/admin/services/{id}
```

#### Admin Projects CRUD
```
GET    /api/admin/projects
POST   /api/admin/projects
GET    /api/admin/projects/{id}
PUT    /api/admin/projects/{id}
DELETE /api/admin/projects/{id}
```

#### Admin Team CRUD
```
GET    /api/admin/team
POST   /api/admin/team
GET    /api/admin/team/{id}
PUT    /api/admin/team/{id}
DELETE /api/admin/team/{id}
```

#### Admin Settings
```
GET /api/admin/settings
PUT /api/admin/settings
```

#### Admin Contacts
```
GET   /api/admin/contacts?status=&page=
GET   /api/admin/contacts/{id}
PATCH /api/admin/contacts/{id}/read
```

#### File Upload
```
POST /api/admin/upload
```

**Request:** multipart/form-data
```
file: [file upload]
folder: "services|projects|team" (optional)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "http://localhost:8000/storage/uploads/filename.jpg",
    "path": "uploads/filename.jpg",
    "size": 1024000,
    "mime_type": "image/jpeg"
  }
}
```

## API Response Structure

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field_name": ["Error message for field"]
  }
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [
    // Array of items
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 10,
    "total": 50,
    "from": 1,
    "to": 10
  }
}
```

## Authentication

The frontend uses JWT Bearer token authentication:

1. User logs in via `/api/auth/login`
2. Backend returns an `access_token`
3. Frontend stores token in `localStorage` as `admin_token`
4. All admin requests include header: `Authorization: Bearer {token}`
5. Token is automatically cleared on 401 responses

## CORS Configuration

Your Laravel backend must allow requests from the frontend:

**config/cors.php:**
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

## Database Models Required

Your Laravel backend should have these models with corresponding migrations:

1. **Service** - Service offerings
2. **Project** - Portfolio projects
3. **TeamMember** - Team members
4. **ContactMessage** - Contact form submissions
5. **Setting** - Site-wide settings (key-value store)
6. **User** - Admin users (for authentication)

## Quick Setup Checklist

- [ ] Laravel project set up with required models
- [ ] API routes configured in `routes/api.php`
- [ ] JWT authentication configured (Laravel Sanctum/Passport)
- [ ] CORS configured to allow frontend origin
- [ ] Database migrated with sample data
- [ ] File upload configured (public storage linked)
- [ ] API returning responses in expected format
- [ ] Frontend `.env` file updated with backend URL

## Testing the Connection

1. Start your Laravel backend: `php artisan serve`
2. Start the React frontend: `npm run dev`
3. Open `http://localhost:5173` in your browser
4. Check browser console for any API errors
5. Verify data loads correctly on the homepage

## Sample Data

Make sure your Laravel backend has seeded data for:
- At least 4-6 services
- At least 6-8 projects
- At least 4-6 team members
- Site settings (hero text, about content, contact info)
- 1 admin user for testing

## Troubleshooting

### CORS Errors
- Check Laravel CORS configuration
- Verify frontend origin is in allowed_origins
- Clear browser cache

### 401 Unauthorized
- Check JWT token is being sent
- Verify token hasn't expired
- Check Laravel auth middleware

### 404 Not Found
- Verify API routes are registered
- Check route prefixes match
- Ensure controllers are returning responses

### Data Not Loading
- Check API response format matches expected structure
- Verify database has data
- Check browser console for errors
- Test API endpoints with Postman/Insomnia

## Environment Variables

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

**Backend (.env):**
```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173
```

## Need Help?

If you encounter any issues:
1. Check browser console for errors
2. Check Laravel logs: `storage/logs/laravel.log`
3. Test API endpoints directly with Postman
4. Verify database connections
5. Check file permissions for uploads

---

**Next Step:** Refer to `LARAVEL_BACKEND_GUIDE.md` for complete Laravel backend setup instructions.
