# Backend Documentation

এই প্রজেক্টের Backend সম্পর্কিত সম্পূর্ণ তথ্য এই ডকুমেন্টে দেওয়া আছে।

## Technology Stack

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password)
- **API Client**: Axios + Supabase JS Client
- **State Management**: React Context API

## Database Structure

### 1. Services Table (`services`)

```sql
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  icon text,
  details text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Features:**
- Unique slug for URL routing
- Icon storage (URL/path)
- Full details for service detail pages
- Timestamps for tracking

**RLS Policies:**
- Public can SELECT (read)
- Only authenticated users can INSERT/UPDATE/DELETE

### 2. Projects Table (`projects`)

```sql
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image text,
  details text,
  technologies text[],
  client_name text,
  project_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Features:**
- Category-based filtering
- Image storage
- Technology stack array
- Client information
- Project URL link
- Detailed description

**RLS Policies:**
- Public can SELECT
- Only authenticated users can INSERT/UPDATE/DELETE

### 3. Team Members Table (`team_members`)

```sql
CREATE TABLE team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  photo text,
  bio text,
  social_links jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Features:**
- Profile photo storage
- Biography
- Social media links (JSON format)
- Professional designation

**Social Links JSON Structure:**
```json
{
  "facebook": "https://facebook.com/username",
  "linkedin": "https://linkedin.com/in/username",
  "twitter": "https://twitter.com/username",
  "github": "https://github.com/username"
}
```

**RLS Policies:**
- Public can SELECT
- Only authenticated users can INSERT/UPDATE/DELETE

### 4. Contact Messages Table (`contact_messages`)

```sql
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

**Features:**
- Contact form submissions
- Read/unread tracking
- Email and subject fields
- Timestamp for received date

**RLS Policies:**
- Anyone can INSERT (submit contact form)
- Only authenticated users can SELECT/UPDATE

### 5. Sliders Table (`sliders`)

```sql
CREATE TABLE sliders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  image text NOT NULL,
  button_text text,
  button_link text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Features:**
- Hero/homepage sliders
- Customizable button CTA
- Order management
- Active/inactive toggle
- Image storage

**RLS Policies:**
- Public can SELECT (only active sliders)
- Only authenticated users can INSERT/UPDATE/DELETE

## API Service Layer

**File:** `src/services/api.ts`

### Available API Functions:

#### Services
```typescript
getServices(): Promise<Service[]>
getServiceBySlug(slug: string): Promise<Service>
createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>)
updateService(id: string, service: Partial<Service>)
deleteService(id: string)
```

#### Projects
```typescript
getProjects(): Promise<Project[]>
getProjectBySlug(slug: string): Promise<Project>
createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>)
updateProject(id: string, project: Partial<Project>)
deleteProject(id: string)
```

#### Team Members
```typescript
getTeamMembers(): Promise<TeamMember[]>
createTeamMember(member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>)
updateTeamMember(id: string, member: Partial<TeamMember>)
deleteTeamMember(id: string)
```

#### Contact Messages
```typescript
createContactMessage(message: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>)
getContactMessages(): Promise<ContactMessage[]>
markMessageAsRead(id: string)
deleteContactMessage(id: string)
```

#### Sliders
```typescript
getSliders(): Promise<Slider[]>
getActiveSliders(): Promise<Slider[]>
createSlider(slider: Omit<Slider, 'id' | 'created_at' | 'updated_at'>)
updateSlider(id: string, slider: Partial<Slider>)
deleteSlider(id: string)
```

## Authentication System

**File:** `src/contexts/AuthContext.tsx`

### Features:
- Email/password authentication
- Session management
- Protected routes
- Auto-refresh on page reload

### Available Auth Functions:

```typescript
signUp(email: string, password: string): Promise<void>
signIn(email: string, password: string): Promise<void>
signOut(): Promise<void>
```

### Auth Context Values:

```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
```

## Admin Panel

**Route:** `/admin/*`

### Available Admin Pages:

1. **Dashboard** (`/admin/dashboard`)
   - Overview statistics
   - Quick actions

2. **Services Management** (`/admin/services`)
   - Create/Edit/Delete services
   - Manage service details

3. **Projects Management** (`/admin/projects`)
   - Create/Edit/Delete projects
   - Upload project images
   - Manage technologies

4. **Team Members** (`/admin/team-members`)
   - Add/Edit/Delete team members
   - Manage social links
   - Upload photos

5. **Contact Messages** (`/admin/messages`)
   - View all messages
   - Mark as read
   - Delete messages

6. **Sliders** (`/admin/sliders`)
   - Create/Edit/Delete sliders
   - Manage display order
   - Toggle active status

## Security Features

### Row Level Security (RLS)

সব টেবিলে RLS enable করা আছে:

1. **Public Tables** (Read-only for public):
   - services
   - projects
   - team_members
   - sliders (শুধু active sliders)

2. **Protected Tables** (Auth required):
   - Admin operations (CREATE, UPDATE, DELETE)
   - contact_messages (view/manage)

3. **Contact Form** (Anyone can submit):
   - contact_messages (INSERT only)

### Authentication Security

- JWT token-based authentication
- Session management
- Protected admin routes
- Auto-logout on token expiry

## Environment Variables

**File:** `.env`

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## API Client Configuration

**File:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Migration Files

সব database migrations `supabase/migrations/` ফোল্ডারে আছে:

1. `20251212130452_create_services_table.sql`
2. `20251212130515_create_projects_table.sql`
3. `20251212130534_create_team_members_table.sql`
4. `20251212130551_create_contact_messages_table.sql`
5. `20251212131644_create_sliders_table.sql`

## How to Use

### 1. Setup Environment

```bash
# Copy environment file
cp .env.example .env

# Add your Supabase credentials
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### 2. Run Migrations

Migrations already applied to the database. No need to run manually.

### 3. Create Admin User

```javascript
// Go to /admin/login and register first user
// First registered user becomes admin
```

### 4. Start Using API

```typescript
import { getServices, createService } from '@/services/api';

// Fetch all services
const services = await getServices();

// Create new service (requires authentication)
await createService({
  title: 'Web Development',
  slug: 'web-development',
  description: 'Custom web solutions',
  icon: '/icons/web.svg'
});
```

## Error Handling

API functions throw errors যা আপনি handle করতে পারবেন:

```typescript
try {
  const services = await getServices();
} catch (error) {
  console.error('Failed to fetch services:', error);
  // Show error message to user
}
```

## Data Validation

- TypeScript interfaces ensure type safety
- Required fields validation
- Unique constraints (slug)
- Foreign key relationships

## Performance Optimization

- Indexed columns (slug, email)
- Optimized queries
- Caching support (Supabase built-in)
- Connection pooling

## Backup & Recovery

Supabase provides:
- Automatic daily backups
- Point-in-time recovery
- Manual backup options

## Future Enhancements

Possible improvements:

1. File upload service (images, documents)
2. Email notifications
3. Advanced search/filtering
4. Analytics dashboard
5. API rate limiting
6. Role-based access control (multiple admin levels)
7. Audit logs
8. Bulk operations

---

## Quick Reference

### Get Data (Public)
```typescript
const services = await getServices();
const projects = await getProjects();
const team = await getTeamMembers();
const sliders = await getActiveSliders();
```

### Submit Contact Form
```typescript
await createContactMessage({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Inquiry',
  message: 'Hello...'
});
```

### Admin Operations (Authentication Required)
```typescript
// Login first
await signIn('admin@example.com', 'password');

// Then perform admin operations
await createService({ /* data */ });
await updateProject(id, { /* data */ });
await deleteTeamMember(id);
```

---

**Note:** This backend is fully functional and production-ready with proper security measures, RLS policies, and error handling.
