export interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  icon: string;
  image: string;
  status: boolean;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  featured_image: string;
  gallery_images: string[];
  status: boolean;
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
    github?: string;
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

export interface HomeData {
  settings: Settings;
  services: Service[];
  projects: Project[];
  team: TeamMember[];
}
