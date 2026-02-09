import axios, { AxiosInstance, AxiosError } from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance with timeout
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);



export const laravelApi = {
  // ============ SERVICES ============

  services: {
    getAll: async () => {
      try {
        const { data } = await apiClient.get('/services');
        const services = data.data || [];
        const baseUrl = API_BASE_URL.replace(/\/api$/, '');
        return services.map((service: any) => {
          let iconUrl = service.icon;
          if (iconUrl && !iconUrl.startsWith('http')) {
            iconUrl = `${baseUrl}/${iconUrl.replace(/^\//, '')}`;
          }
          let imageUrl = service.image;
          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${baseUrl}/${imageUrl.replace(/^\//, '')}`;
          }
          return { ...service, icon: iconUrl, image: imageUrl };
        });
      } catch (error) {
        console.error('Failed to fetch services:', error);
        throw error;
      }
    },

    getBySlug: async (slug: string) => {
      try {
        const { data } = await apiClient.get(`/services/${slug}`);
        const service = data.data || null;
        if (service) {
          const baseUrl = API_BASE_URL.replace(/\/api$/, '');
          let iconUrl = service.icon;
          if (iconUrl && !iconUrl.startsWith('http')) {
            iconUrl = `${baseUrl}/${iconUrl.replace(/^\//, '')}`;
          }
          service.icon = iconUrl;

          let imageUrl = service.image;
          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${baseUrl}/${imageUrl.replace(/^\//, '')}`;
          }
          service.image = imageUrl;
        }
        return service;
      } catch (error) {
        console.error('Failed to fetch service:', error);
        throw error;
      }
    },

    create: async (serviceData: any) => {
      try {
        const { data } = await apiClient.post('/services', serviceData);
        return data.data;
      } catch (error) {
        console.error('Failed to create service:', error);
        throw error;
      }
    },

    update: async (id: number, serviceData: any) => {
      try {
        const { data } = await apiClient.put(`/services/${id}`, serviceData);
        return data.data;
      } catch (error) {
        console.error('Failed to update service:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        await apiClient.delete(`/services/${id}`);
        return { success: true };
      } catch (error) {
        console.error('Failed to delete service:', error);
        throw error;
      }
    },
  },

  // ============ PROJECTS ============

  // ============ PROJECTS ============

  projects: {
    getAll: async (params?: any) => {
      try {
        const { data } = await apiClient.get('/projects', { params });
        const projects = data.data || [];
        const baseUrl = API_BASE_URL.replace(/\/api$/, '');
        return projects.map((project: any) => {
          let imageUrl = project.image;
          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${baseUrl}/${imageUrl.replace(/^\//, '')}`;
          }
          return { ...project, image: imageUrl };
        });
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error;
      }
    },

    getBySlug: async (slug: string) => {
      try {
        const { data } = await apiClient.get(`/projects/${slug}`);
        const project = data.data || null;
        if (project) {
          const baseUrl = API_BASE_URL.replace(/\/api$/, '');
          let imageUrl = project.image;
          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${baseUrl}/${imageUrl.replace(/^\//, '')}`;
          }
          project.image = imageUrl;

          // Also handle multiple images if they exist
          if (project.images && Array.isArray(project.images)) {
            project.images = project.images.map((img: string) => {
              if (img && !img.startsWith('http')) {
                return `${baseUrl}/${img.replace(/^\//, '')}`;
              }
              return img;
            });
          }
        }
        return project;
      } catch (error) {
        console.error('Failed to fetch project:', error);
        throw error;
      }
    },

    create: async (projectData: any) => {
      try {
        const { data } = await apiClient.post('/projects', projectData);
        return data.data;
      } catch (error) {
        console.error('Failed to create project:', error);
        throw error;
      }
    },

    update: async (id: number, projectData: any) => {
      try {
        const { data } = await apiClient.put(`/projects/${id}`, projectData);
        return data.data;
      } catch (error) {
        console.error('Failed to update project:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        await apiClient.delete(`/projects/${id}`);
        return { success: true };
      } catch (error) {
        console.error('Failed to delete project:', error);
        throw error;
      }
    },
  },

  // ============ TEAM MEMBERS ============

  team: {
    getAll: async () => {
      try {
        const { data } = await apiClient.get('/team-members');
        const members = data.data || [];
        return members.map((member: any) => {
          const baseUrl = API_BASE_URL.replace(/\/api$/, '');
          let imageUrl = member.image;
          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${baseUrl}/${imageUrl.replace(/^\//, '')}`;
          }
          return {
            ...member,
            photo: imageUrl,
            image: imageUrl,
            designation: member.role,
            social_links: {
              facebook: member.facebook,
              twitter: member.twitter,
              linkedin: member.linkedin,
              instagram: member.instagram,
              github: member.github,
            }
          };
        });
      } catch (error) {
        console.error('Failed to fetch team:', error);
        throw error;
      }
    },

    getById: async (id: number) => {
      try {
        const { data } = await apiClient.get(`/team-members/${id}`);
        return data.data || null;
      } catch (error) {
        console.error('Failed to fetch team member:', error);
        throw error;
      }
    },

    create: async (memberData: any) => {
      try {
        const { data } = await apiClient.post('/team-members', memberData);
        return data.data;
      } catch (error) {
        console.error('Failed to create team member:', error);
        throw error;
      }
    },

    update: async (id: number, memberData: any) => {
      try {
        const { data } = await apiClient.put(`/team-members/${id}`, memberData);
        return data.data;
      } catch (error) {
        console.error('Failed to update team member:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        await apiClient.delete(`/team-members/${id}`);
        return { success: true };
      } catch (error) {
        console.error('Failed to delete team member:', error);
        throw error;
      }
    },
  },

  // ============ CONTACT MESSAGES ============

  contact: {
    submit: async (messageData: any) => {
      try {
        const { data } = await apiClient.post('/contact', messageData);
        return data.data;
      } catch (error) {
        console.error('Failed to submit contact message:', error);
        throw error;
      }
    },

    getAll: async (params?: any) => {
      try {
        const { data } = await apiClient.get('/contact/messages', { params });
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
        throw error;
      }
    },

    markAsRead: async (id: number) => {
      try {
        const { data } = await apiClient.put(`/contact/messages/${id}/mark-read`);
        return data.data;
      } catch (error) {
        console.error('Failed to mark contact as read:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        await apiClient.delete(`/contact/messages/${id}`);
        return { success: true };
      } catch (error) {
        console.error('Failed to delete contact message:', error);
        throw error;
      }
    },
  },

  // ============ SLIDERS ============

  sliders: {
    getAll: async () => {
      try {
        const { data } = await apiClient.get('/public/sliders');
        console.log('Sliders API Response:', data);
        const sliders = data.data || data || [];
        const mappedSliders = sliders.map((slider: any) => {
          const baseUrl = API_BASE_URL.replace(/\/api$/, '');
          let imageUrl = slider.image;
          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${baseUrl}/${imageUrl.replace(/^\//, '')}`;
          }

          return {
            id: slider.id,
            title: slider.title,
            subtitle: slider.subtitle || slider.description || '',
            image: imageUrl,
            button_text: slider.button_text || '',
            button_link: slider.button_link || '',
            order_index: slider.display_order || slider.order_index || 0,
          };
        });
        console.log('Mapped Sliders:', mappedSliders);
        return mappedSliders;
      } catch (error) {
        console.error('Failed to fetch sliders:', error);
        return [];
      }
    },

    adminGetAll: async () => {
      try {
        const { data } = await apiClient.get('/admin/sliders');
        const sliders = data.data || [];
        const baseUrl = API_BASE_URL.replace('/api', '');

        return sliders.map((slider: any) => {
          let imageUrl = slider.image;
          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${baseUrl}/${imageUrl.replace(/^\//, '')}`;
          }
          return {
            ...slider,
            image: imageUrl,
            order_index: slider.display_order,
          };
        });
      } catch (error) {
        console.error('Failed to fetch admin sliders:', error);
        return [];
      }
    },

    create: async (sliderData: any) => {
      try {
        const formData = new FormData();
        formData.append('title', sliderData.title);
        formData.append('subtitle', sliderData.subtitle || '');
        formData.append('description', sliderData.subtitle || sliderData.description || '');

        // Image is required for new slider
        if (sliderData.imageFile) {
          formData.append('image', sliderData.imageFile);
        } else if (sliderData.image) {
          formData.append('image', sliderData.image);
        } else {
          throw new Error('Image is required for creating a slider');
        }

        if (sliderData.button_text) {
          formData.append('button_text', sliderData.button_text);
        }

        if (sliderData.button_link) {
          formData.append('button_link', sliderData.button_link);
        }

        // Try both 'order' and 'display_order' field names
        if (sliderData.order_index !== undefined) {
          formData.append('order', sliderData.order_index.toString());
        }

        formData.append('is_active', sliderData.is_active ? '1' : '0');

        console.log('Creating slider with data:', {
          title: sliderData.title,
          subtitle: sliderData.subtitle,
          hasImage: !!sliderData.imageFile,
          button_text: sliderData.button_text,
          button_link: sliderData.button_link,
          order: sliderData.order_index,
          is_active: sliderData.is_active,
        });

        const { data } = await apiClient.post('/admin/sliders', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data.data;
      } catch (error: any) {
        console.error('Failed to create slider:', error);
        console.error('Error response:', error?.response?.data);
        throw error;
      }
    },

    update: async (id: number, sliderData: any) => {
      try {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', sliderData.title);
        formData.append('subtitle', sliderData.subtitle || '');
        formData.append('description', sliderData.subtitle || sliderData.description || '');

        // Image is optional for update
        if (sliderData.imageFile) {
          formData.append('image', sliderData.imageFile);
        } else if (sliderData.image && !sliderData.image.startsWith('http') && !sliderData.image.startsWith('storage')) {
          // Only append if it's a new path (not the full URL we might get from edit)
          // Actually, if we just want to update metadata, we usually don't send 'image' unless it changed.
          // But if we used FileUpload, we have a new path string.
          formData.append('image', sliderData.image);
        }

        if (sliderData.button_text) {
          formData.append('button_text', sliderData.button_text);
        }

        if (sliderData.button_link) {
          formData.append('button_link', sliderData.button_link);
        }

        // Try both 'order' and 'display_order' field names
        if (sliderData.order_index !== undefined) {
          formData.append('order', sliderData.order_index.toString());
        }

        formData.append('is_active', sliderData.is_active ? '1' : '0');

        console.log('Updating slider with data:', {
          id,
          title: sliderData.title,
          subtitle: sliderData.subtitle,
          hasNewImage: !!sliderData.imageFile,
          button_text: sliderData.button_text,
          button_link: sliderData.button_link,
          order: sliderData.order_index,
          is_active: sliderData.is_active,
        });

        const { data } = await apiClient.post(`/admin/sliders/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data.data;
      } catch (error: any) {
        console.error('Failed to update slider:', error);
        console.error('Error response:', error?.response?.data);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        await apiClient.delete(`/admin/sliders/${id}`);
        return { success: true };
      } catch (error) {
        console.error('Failed to delete slider:', error);
        throw error;
      }
    },

    toggleStatus: async (id: number) => {
      try {
        const { data } = await apiClient.put(`/admin/sliders/${id}/toggle-status`);
        return data.data;
      } catch (error) {
        console.error('Failed to toggle slider status:', error);
        throw error;
      }
    },

    reorder: async (orderData: Array<{ id: number; order: number }>) => {
      try {
        const { data } = await apiClient.put('/admin/sliders/reorder', { sliders: orderData });
        return data.data;
      } catch (error) {
        console.error('Failed to reorder sliders:', error);
        throw error;
      }
    },
  },

  // ============ AUTHENTICATION ============

  auth: {
    login: async (email: string, password: string) => {
      try {
        const { data } = await apiClient.post('/auth/login', { email, password });
        if (data?.access_token) {
          localStorage.setItem('admin_token', data.access_token);
        }
        return data;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    logout: async () => {
      try {
        await apiClient.post('/auth/logout');
        localStorage.removeItem('admin_token');
      } catch (error) {
        console.error('Logout failed:', error);
        localStorage.removeItem('admin_token');
      }
    },

    getUser: async () => {
      try {
        const { data } = await apiClient.get('/auth/user');
        return data;
      } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
      }
    },

    refresh: async () => {
      try {
        const { data } = await apiClient.post('/auth/refresh');
        if (data.data?.access_token) {
          localStorage.setItem('admin_token', data.data.access_token);
        }
        return data.data;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        throw error;
      }
    },
  },

  // ============ FILE UPLOAD & MEDIA ============

  upload: {
    file: async (file: File, folder?: string) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        if (folder) {
          formData.append('folder', folder);
        }

        const { data } = await apiClient.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data.data;
      } catch (error) {
        console.error('File upload failed:', error);
        throw error;
      }
    },
  },

  media: {
    upload: async (file: File, folder?: string) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        if (folder) {
          formData.append('folder', folder);
        }

        const { data } = await apiClient.post('/media/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data.data;
      } catch (error) {
        console.error('Media upload failed:', error);
        throw error;
      }
    },

    delete: async (mediaId: number) => {
      try {
        await apiClient.delete(`/media/${mediaId}`);
        return { success: true };
      } catch (error) {
        console.error('Failed to delete media:', error);
        throw error;
      }
    },
  },

  // ============ SETTINGS & STATS ============

  settings: {
    getAll: async () => {
      try {
        const { data } = await apiClient.get('/admin/settings');
        return data.data || {};
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        throw error;
      }
    },

    getByGroup: async (group: string) => {
      try {
        const { data } = await apiClient.get(`/admin/settings/${group}`);
        return data.data || {};
      } catch (error) {
        console.error(`Failed to fetch ${group} settings:`, error);
        throw error;
      }
    },

    update: async (settings: any, group: string = 'general') => {
      try {
        const { data } = await apiClient.post('/admin/settings', { settings, group });
        return data;
      } catch (error) {
        console.error('Failed to update settings:', error);
        throw error;
      }
    },

    getPublicByGroup: async (group: string) => {
      try {
        const { data } = await apiClient.get(`/public/settings/${group}`);
        return data.data || {};
      } catch (error) {
        console.error(`Failed to fetch public ${group} settings:`, error);
        throw error;
      }
    },

    getPublicStats: async () => {
      try {
        const { data } = await apiClient.get('/public/stats');
        return data.data || {};
      } catch (error) {
        console.error('Failed to fetch public stats:', error);
        throw error;
      }
    },
  },
};

export default laravelApi;
