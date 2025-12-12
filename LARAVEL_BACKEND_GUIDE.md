# Laravel 11 Backend Implementation Guide

This guide provides complete step-by-step instructions to build the Laravel 11 REST API backend for E3 Innovation Limited website.

## Table of Contents
1. [Installation](#installation)
2. [Database Configuration](#database-configuration)
3. [Migrations](#migrations)
4. [Models](#models)
5. [Controllers](#controllers)
6. [Routes](#routes)
7. [Middleware](#middleware)
8. [JWT Authentication](#jwt-authentication)
9. [Resources](#resources)
10. [Validation](#validation)
11. [Image Upload](#image-upload)
12. [CORS Configuration](#cors-configuration)

---

## Installation

```bash
# Create new Laravel 11 project
composer create-project laravel/laravel e3innovation-backend

cd e3innovation-backend

# Install JWT Authentication
composer require php-open-source-saver/jwt-auth

# Publish JWT config
php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"

# Generate JWT secret
php artisan jwt:secret

# Create storage symlink
php artisan storage:link
```

---

## Database Configuration

Update your `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=103.209.40.89
DB_PORT=3306
DB_DATABASE=innovation
DB_USERNAME=root
DB_PASSWORD="B*()cyTBD%^>"

JWT_SECRET=your_generated_jwt_secret_here
```

---

## Migrations

### Create Migration Files

```bash
php artisan make:migration create_services_table
php artisan make:migration create_projects_table
php artisan make:migration create_team_table
php artisan make:migration create_settings_table
php artisan make:migration create_contact_messages_table
```

### Migration: Services Table

**File:** `database/migrations/xxxx_xx_xx_create_services_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description');
            $table->longText('long_description');
            $table->string('icon')->nullable();
            $table->string('image')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
```

### Migration: Projects Table

**File:** `database/migrations/xxxx_xx_xx_create_projects_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('category');
            $table->string('featured_image')->nullable();
            $table->json('gallery_images')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
```

### Migration: Team Table

**File:** `database/migrations/xxxx_xx_xx_create_team_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('designation');
            $table->string('photo')->nullable();
            $table->json('social_links')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team');
    }
};
```

### Migration: Settings Table

**File:** `database/migrations/xxxx_xx_xx_create_settings_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_title');
            $table->string('hero_title');
            $table->text('hero_subtitle');
            $table->string('hero_background_image')->nullable();
            $table->longText('about_section_content');
            $table->json('contact_info');
            $table->text('footer_text');
            $table->timestamps();
        });

        // Insert default settings
        DB::table('settings')->insert([
            'site_title' => 'E3 Innovation Limited',
            'hero_title' => 'E3 INNOVATION - Your Trusted Software Development Partner',
            'hero_subtitle' => 'We deliver innovative software solutions that transform businesses.',
            'about_section_content' => 'We are a leading software development company.',
            'contact_info' => json_encode([
                'phone' => '+880 1234-567890',
                'email' => 'info@e3innovationlimited.com',
                'address' => 'Dhaka, Bangladesh'
            ]),
            'footer_text' => '© 2024 E3 Innovation Limited. All rights reserved.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
```

### Migration: Contact Messages Table

**File:** `database/migrations/xxxx_xx_xx_create_contact_messages_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('subject');
            $table->text('message');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
```

### Run Migrations

```bash
php artisan migrate
```

---

## Models

### Service Model

**File:** `app/Models/Service.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'long_description',
        'icon',
        'image',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->title);
            }
        });

        static::updating(function ($service) {
            if ($service->isDirty('title')) {
                $service->slug = Str::slug($service->title);
            }
        });
    }
}
```

### Project Model

**File:** `app/Models/Project.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'category',
        'featured_image',
        'gallery_images',
        'status',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'status' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });

        static::updating(function ($project) {
            if ($project->isDirty('title')) {
                $project->slug = Str::slug($project->title);
            }
        });
    }
}
```

### Team Model

**File:** `app/Models/Team.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $table = 'team';

    protected $fillable = [
        'name',
        'designation',
        'photo',
        'social_links',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];
}
```

### Setting Model

**File:** `app/Models/Setting.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_title',
        'hero_title',
        'hero_subtitle',
        'hero_background_image',
        'about_section_content',
        'contact_info',
        'footer_text',
    ];

    protected $casts = [
        'contact_info' => 'array',
    ];
}
```

### ContactMessage Model

**File:** `app/Models/ContactMessage.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
    ];
}
```

### User Model (for Admin Authentication)

**File:** `app/Models/User.php`

Update the existing User model to implement JWT:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
```

---

## Controllers

### Public API Controllers

#### HomeController

**File:** `app/Http/Controllers/Api/HomeController.php`

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Project;
use App\Models\Team;
use App\Models\Setting;

class HomeController extends Controller
{
    public function index()
    {
        $settings = Setting::first();
        $services = Service::where('status', true)->get();
        $projects = Project::where('status', true)->latest()->take(6)->get();
        $team = Team::latest()->take(4)->get();

        return response()->json([
            'success' => true,
            'data' => [
                'settings' => $settings,
                'services' => $services,
                'projects' => $projects,
                'team' => $team,
            ]
        ]);
    }
}
```

#### ServiceController

**File:** `app/Http/Controllers/Api/ServiceController.php`

```php
<?php

namespace App\Http/Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::where('status', true)->get();

        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    public function show($slug)
    {
        $service = Service::where('slug', $slug)->where('status', true)->first();

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
}
```

#### ProjectController

**File:** `app/Http/Controllers/Api/ProjectController.php`

```php
<?php

namespace App\Http/Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::where('status', true)->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $projects
        ]);
    }

    public function show($slug)
    {
        $project = Project::where('slug', $slug)->where('status', true)->first();

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
}
```

#### TeamController

**File:** `app/Http/Controllers/Api/TeamController.php`

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;

class TeamController extends Controller
{
    public function index()
    {
        $team = Team::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $team
        ]);
    }
}
```

#### ContactController

**File:** `app/Http/Controllers/Api/ContactController.php`

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        ContactMessage::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully'
        ]);
    }
}
```

### Authentication Controller

#### AuthController

**File:** `app/Http/Controllers/Api/AuthController.php`

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }
}
```

### Admin Controllers

*Continued in next section due to length...*

---

## Continue Reading

The complete implementation includes:
- Admin CRUD Controllers for Services, Projects, Team, Settings
- Request Validation Classes
- API Resources
- Routes Configuration
- Middleware Setup
- Image Upload Handling
- CORS Configuration

Please see `LARAVEL_BACKEND_GUIDE_PART2.md` for the complete implementation.

---

## Quick Start Commands

```bash
# Run migrations
php artisan migrate

# Create admin user (run in tinker)
php artisan tinker
User::create(['name' => 'Admin', 'email' => 'admin@e3innovation.com', 'password' => bcrypt('password123')]);

# Start development server
php artisan serve
```

---

## API Base URL

```
http://localhost:8000/api
```

## Frontend Configuration

Update your React frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```
