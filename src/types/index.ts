export interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  icon: string;
  image: string;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  featured_image: string;
  gallery_images: string[];
  status: 'completed' | 'ongoing' | 'pending';
  created_at?: string;
  updated_at?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  photo: string;
  social_links: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Settings {
  site_title: string;
  hero_title: string;
  hero_subtitle: string;
  hero_background_image: string;
  about_section_content: string;
  contact_info: {
    phone: string;
    email: string;
    address: string;
  };
  footer_text: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from?: number;
  to?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ContactMessageResponse extends ContactMessage {
  id: number;
  is_read: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface UploadResponse {
  url: string;
  path: string;
  size: number;
  mime_type: string;
}
