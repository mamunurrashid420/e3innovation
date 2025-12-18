import axios, { AxiosInstance, AxiosError } from 'axios';
import { cacheManager } from './cache';

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

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export const laravelApi = {
  // ============ SERVICES ============

  services: {
    getAll: async () => {
      try {
        const { data } = await apiClient.get('/services');
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch services:', error);
        throw error;
      }
    },

    getBySlug: async (slug: string) => {
      try {
        const { data } = await apiClient.get(`/services/${slug}`);
        return data.data || null;
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

  projects: {
    getAll: async (params?: any) => {
      try {
        const { data } = await apiClient.get('/projects', { params });
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error;
      }
    },

    getBySlug: async (slug: string) => {
      try {
        const { data } = await apiClient.get(`/projects/${slug}`);
        return data.data || null;
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
        return data.data || [];
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
        const { data } = await apiClient.get('/sliders');
        const sliders = data.data || [];
        return sliders.map((slider: any) => ({
          ...slider,
          image: `${API_BASE_URL.replace('/api', '')}/${slider.image_path}`,
          order_index: slider.display_order,
        }));
      } catch (error) {
        console.error('Failed to fetch sliders:', error);
        return [];
      }
    },

    adminGetAll: async () => {
      try {
        const { data } = await apiClient.get('/admin/sliders');
        const sliders = data.data || [];
        return sliders.map((slider: any) => ({
          ...slider,
          image: `${API_BASE_URL.replace('/api', '')}/${slider.image_path}`,
          order_index: slider.display_order,
        }));
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
        formData.append('description', sliderData.description || '');

        if (sliderData.imageFile) {
          formData.append('image', sliderData.imageFile);
        }

        if (sliderData.button_text) {
          formData.append('button_text', sliderData.button_text);
        }

        if (sliderData.button_link) {
          formData.append('button_link', sliderData.button_link);
        }

        if (sliderData.order_index !== undefined) {
          formData.append('display_order', sliderData.order_index.toString());
        }

        formData.append('is_active', sliderData.is_active ? '1' : '0');

        const { data } = await apiClient.post('/admin/sliders', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data.data;
      } catch (error) {
        console.error('Failed to create slider:', error);
        throw error;
      }
    },

    update: async (id: number, sliderData: any) => {
      try {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', sliderData.title);
        formData.append('subtitle', sliderData.subtitle || '');
        formData.append('description', sliderData.description || '');

        if (sliderData.imageFile) {
          formData.append('image', sliderData.imageFile);
        }

        if (sliderData.button_text) {
          formData.append('button_text', sliderData.button_text);
        }

        if (sliderData.button_link) {
          formData.append('button_link', sliderData.button_link);
        }

        if (sliderData.order_index !== undefined) {
          formData.append('display_order', sliderData.order_index.toString());
        }

        formData.append('is_active', sliderData.is_active ? '1' : '0');

        const { data } = await apiClient.post(`/admin/sliders/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data.data;
      } catch (error) {
        console.error('Failed to update slider:', error);
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
        if (data.data?.access_token) {
          localStorage.setItem('admin_token', data.data.access_token);
        }
        return data.data;
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
        return data.data;
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

  // ============ ADMIN DASHBOARD ============

  dashboard: {
    getStats: async () => {
      try {
        const { data } = await apiClient.get('/admin/dashboard/stats');
        return data.data;
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        throw error;
      }
    },
  },
};

export default laravelApi;
