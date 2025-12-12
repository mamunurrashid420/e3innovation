# Laravel 11 Backend Implementation Guide - Part 2

Continuation of the backend implementation guide.

## Admin Controllers

### Admin ServiceController

**File:** `app/Http/Controllers/Api/Admin/ServiceController.php`

```php
<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $services = Service::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'short_description' => 'required|string',
            'long_description' => 'required|string',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'status' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except(['icon', 'image']);

        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('services/icons', 'public');
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('services/images', 'public');
        }

        $service = Service::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Service created successfully',
            'data' => $service
        ], 201);
    }

    public function show($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }

    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'short_description' => 'required|string',
            'long_description' => 'required|string',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'status' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except(['icon', 'image']);

        if ($request->hasFile('icon')) {
            if ($service->icon) {
                Storage::disk('public')->delete($service->icon);
            }
            $data['icon'] = $request->file('icon')->store('services/icons', 'public');
        }

        if ($request->hasFile('image')) {
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }
            $data['image'] = $request->file('image')->store('services/images', 'public');
        }

        $service->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Service updated successfully',
            'data' => $service
        ]);
    }

    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        if ($service->icon) {
            Storage::disk('public')->delete($service->icon);
        }

        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }

        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service deleted successfully'
        ]);
    }
}
```

### Admin ProjectController

**File:** `app/Http/Controllers/Api/Admin/ProjectController.php`

```php
<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $projects = Project::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'gallery_images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'status' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except(['featured_image', 'gallery_images']);

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('projects', 'public');
        }

        if ($request->hasFile('gallery_images')) {
            $galleryImages = [];
            foreach ($request->file('gallery_images') as $image) {
                $galleryImages[] = $image->store('projects/gallery', 'public');
            }
            $data['gallery_images'] = $galleryImages;
        }

        $project = Project::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Project created successfully',
            'data' => $project
        ], 201);
    }

    public function show($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $project
        ]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'gallery_images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'status' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except(['featured_image', 'gallery_images']);

        if ($request->hasFile('featured_image')) {
            if ($project->featured_image) {
                Storage::disk('public')->delete($project->featured_image);
            }
            $data['featured_image'] = $request->file('featured_image')->store('projects', 'public');
        }

        if ($request->hasFile('gallery_images')) {
            if ($project->gallery_images) {
                foreach ($project->gallery_images as $oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
            $galleryImages = [];
            foreach ($request->file('gallery_images') as $image) {
                $galleryImages[] = $image->store('projects/gallery', 'public');
            }
            $data['gallery_images'] = $galleryImages;
        }

        $project->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully',
            'data' => $project
        ]);
    }

    public function destroy($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found'
            ], 404);
        }

        if ($project->featured_image) {
            Storage::disk('public')->delete($project->featured_image);
        }

        if ($project->gallery_images) {
            foreach ($project->gallery_images as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully'
        ]);
    }
}
```

### Admin TeamController

**File:** `app/Http/Controllers/Api/Admin/TeamController.php`

```php
<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $team = Team::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $team
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'social_links' => 'nullable|json',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except('photo');

        if ($request->has('social_links')) {
            $data['social_links'] = json_decode($request->social_links, true);
        }

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('team', 'public');
        }

        $member = Team::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Team member created successfully',
            'data' => $member
        ], 201);
    }

    public function show($id)
    {
        $member = Team::find($id);

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Team member not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $member
        ]);
    }

    public function update(Request $request, $id)
    {
        $member = Team::find($id);

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Team member not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'social_links' => 'nullable|json',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except('photo');

        if ($request->has('social_links')) {
            $data['social_links'] = json_decode($request->social_links, true);
        }

        if ($request->hasFile('photo')) {
            if ($member->photo) {
                Storage::disk('public')->delete($member->photo);
            }
            $data['photo'] = $request->file('photo')->store('team', 'public');
        }

        $member->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Team member updated successfully',
            'data' => $member
        ]);
    }

    public function destroy($id)
    {
        $member = Team::find($id);

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Team member not found'
            ], 404);
        }

        if ($member->photo) {
            Storage::disk('public')->delete($member->photo);
        }

        $member->delete();

        return response()->json([
            'success' => true,
            'message' => 'Team member deleted successfully'
        ]);
    }
}
```

### Admin SettingsController

**File:** `app/Http/Controllers/Api/Admin/SettingsController.php`

```php
<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $settings = Setting::first();

        if (!$settings) {
            $settings = Setting::create([
                'site_title' => 'E3 Innovation Limited',
                'hero_title' => 'E3 INNOVATION',
                'hero_subtitle' => 'Your Trusted Software Development Partner',
                'about_section_content' => 'We are a leading software development company.',
                'contact_info' => [
                    'phone' => '+880 1234-567890',
                    'email' => 'info@e3innovationlimited.com',
                    'address' => 'Dhaka, Bangladesh'
                ],
                'footer_text' => '© 2024 E3 Innovation Limited. All rights reserved.',
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $settings = Setting::first();

        $validator = Validator::make($request->all(), [
            'site_title' => 'required|string|max:255',
            'hero_title' => 'required|string|max:255',
            'hero_subtitle' => 'required|string',
            'hero_background_image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'about_section_content' => 'required|string',
            'contact_info' => 'required|json',
            'footer_text' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except('hero_background_image');

        if ($request->has('contact_info')) {
            $data['contact_info'] = json_decode($request->contact_info, true);
        }

        if ($request->hasFile('hero_background_image')) {
            if ($settings->hero_background_image) {
                Storage::disk('public')->delete($settings->hero_background_image);
            }
            $data['hero_background_image'] = $request->file('hero_background_image')->store('settings', 'public');
        }

        $settings->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Settings updated successfully',
            'data' => $settings
        ]);
    }
}
```

### Admin ContactController

**File:** `app/Http/Controllers/Api/Admin/ContactController.php`

```php
<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $messages = ContactMessage::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }
}
```

---

## Routes Configuration

**File:** `routes/api.php`

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Api\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Api\Admin\TeamController as AdminTeamController;
use App\Http\Controllers\Api\Admin\SettingsController as AdminSettingsController;
use App\Http\Controllers\Api\Admin\ContactController as AdminContactController;

// Public Routes
Route::get('/home', [HomeController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);
Route::get('/team', [TeamController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store']);

// Auth Routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout']);

// Admin Routes (Protected)
Route::prefix('admin')->group(function () {
    // Services
    Route::get('/services', [AdminServiceController::class, 'index']);
    Route::post('/services', [AdminServiceController::class, 'store']);
    Route::get('/services/{id}', [AdminServiceController::class, 'show']);
    Route::put('/services/{id}', [AdminServiceController::class, 'update']);
    Route::delete('/services/{id}', [AdminServiceController::class, 'destroy']);

    // Projects
    Route::get('/projects', [AdminProjectController::class, 'index']);
    Route::post('/projects', [AdminProjectController::class, 'store']);
    Route::get('/projects/{id}', [AdminProjectController::class, 'show']);
    Route::put('/projects/{id}', [AdminProjectController::class, 'update']);
    Route::delete('/projects/{id}', [AdminProjectController::class, 'destroy']);

    // Team
    Route::get('/team', [AdminTeamController::class, 'index']);
    Route::post('/team', [AdminTeamController::class, 'store']);
    Route::get('/team/{id}', [AdminTeamController::class, 'show']);
    Route::put('/team/{id}', [AdminTeamController::class, 'update']);
    Route::delete('/team/{id}', [AdminTeamController::class, 'destroy']);

    // Settings
    Route::get('/settings', [AdminSettingsController::class, 'index']);
    Route::put('/settings', [AdminSettingsController::class, 'update']);

    // Contacts
    Route::get('/contacts', [AdminContactController::class, 'index']);
});
```

---

## JWT Configuration

**File:** `config/auth.php`

Update the guards and providers:

```php
'defaults' => [
    'guard' => 'api',
    'passwords' => 'users',
],

'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
    'api' => [
        'driver' => 'jwt',
        'provider' => 'users',
    ],
],
```

---

## CORS Configuration

**File:** `config/cors.php`

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

---

## Global Exception Handler

**File:** `app/Exceptions/Handler.php`

```php
<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    public function register(): void
    {
        $this->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resource not found'
                ], 404);
            }
        });

        $this->renderable(function (ModelNotFoundException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resource not found'
                ], 404);
            }
        });

        $this->renderable(function (Throwable $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 500);
            }
        });
    }
}
```

---

## Setup and Deployment

### 1. Install Dependencies

```bash
composer install
```

### 2. Environment Setup

```bash
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
```

### 3. Configure Database

Update `.env` with your MySQL credentials

### 4. Run Migrations

```bash
php artisan migrate
```

### 5. Create Storage Link

```bash
php artisan storage:link
```

### 6. Create Admin User

```bash
php artisan tinker

User::create([
    'name' => 'Admin',
    'email' => 'admin@e3innovation.com',
    'password' => bcrypt('your_secure_password')
]);
```

### 7. Start Server

```bash
php artisan serve
```

---

## Testing API Endpoints

### Public Endpoints

```bash
# Get home data
curl http://localhost:8000/api/home

# Get all services
curl http://localhost:8000/api/services

# Get service by slug
curl http://localhost:8000/api/services/custom-software-development

# Submit contact form
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","phone":"123456","subject":"Test","message":"Hello"}'
```

### Admin Endpoints

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@e3innovation.com","password":"your_password"}'

# Use the token from login response
TOKEN="your_jwt_token_here"

# Create service
curl -X POST http://localhost:8000/api/admin/services \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Custom Software" \
  -F "short_description=Short desc" \
  -F "long_description=Long desc" \
  -F "icon=@/path/to/icon.png"
```

---

## Production Deployment

1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Configure your production database
4. Run `php artisan config:cache`
5. Run `php artisan route:cache`
6. Set up proper file permissions
7. Configure your web server (Apache/Nginx)
8. Set up SSL certificate
9. Configure CORS for your production frontend domain

---

## Security Best Practices

1. Never commit `.env` file
2. Use strong JWT secret
3. Use strong admin passwords
4. Keep Laravel and dependencies updated
5. Validate all user input
6. Use HTTPS in production
7. Implement rate limiting
8. Regular database backups
9. Monitor error logs

---

## Support

For issues or questions, contact: support@e3innovationlimited.com
