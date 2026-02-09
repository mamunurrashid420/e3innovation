import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { api } from '../services/api';
import { Project } from '../types';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [appearance, setAppearance] = useState({
    bg_projects_hero: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [projectsData, appearanceData] = await Promise.all([
          api.projects.getAll(),
          api.settings.getPublicByGroup('appearance').catch(() => null),
        ]);
        setProjects(projectsData || []);
        setFilteredProjects(projectsData || []);
        if (appearanceData) {
          setAppearance(prev => ({ ...prev, ...appearanceData }));
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const defaultProjects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      description: 'A comprehensive online shopping platform with payment integration',
      category: 'Web Development',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      gallery_images: [],
      status: 'completed',
      technologies: ['React', 'Node.js', 'Stripe'],
      features: ['User Auth', 'Payment Gateway', 'Admin Dashboard'],
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      slug: 'mobile-banking-app',
      description: 'Secure mobile banking application for iOS and Android',
      category: 'Mobile Development',
      image: 'https://images.pexels.com/photos/4968382/pexels-photo-4968382.jpeg',
      gallery_images: [],
      status: 'completed',
      technologies: ['React Native', 'Firebase'],
      features: ['Biometric Auth', 'Money Transfer'],
    },
    {
      id: 3,
      title: 'Healthcare Management System',
      slug: 'healthcare-management-system',
      description: 'Custom healthcare management and patient tracking system',
      category: 'Custom Software',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
      gallery_images: [],
      status: 'completed',
      technologies: ['Laravel', 'Vue.js', 'MySQL'],
      features: ['Patient Records', 'Appointment Scheduling'],
    },
    {
      id: 4,
      title: 'Inventory Management',
      slug: 'inventory-management',
      description: 'Real-time inventory tracking and warehouse management',
      category: 'Web Development',
      image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg',
      gallery_images: [],
      status: 'completed',
      technologies: ['Python', 'Django', 'PostgreSQL'],
      features: ['Stock Alerts', 'Barcode Scanning'],
    },
    {
      id: 5,
      title: 'Food Delivery App',
      slug: 'food-delivery-app',
      description: 'On-demand food delivery platform with real-time tracking',
      category: 'Mobile Development',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg',
      gallery_images: [],
      status: 'completed',
      technologies: ['Flutter', 'Node.js'],
      features: ['Live Tracking', 'Order Management'],
    },
    {
      id: 6,
      title: 'CRM System',
      slug: 'crm-system',
      description: 'Customer relationship management system for sales teams',
      category: 'Custom Software',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      gallery_images: [],
      status: 'completed',
      technologies: ['React', 'Express', 'MongoDB'],
      features: ['Contact Management', 'Pipeline View'],
    },
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  const categories = ['All', ...Array.from(new Set(displayProjects.map((p) => p.category)))];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProjects(displayProjects);
    } else {
      setFilteredProjects(displayProjects.filter((p) => p.category === category));
    }
  };

  useEffect(() => {
    setFilteredProjects(displayProjects);
  }, [projects]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero
        title="Our Projects"
        subtitle="Explore our portfolio of successful projects delivered to clients across various industries"
        backgroundImage={appearance.bg_projects_hero}
        showCTA={false}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                category={project.category}
                image={project.image}
                slug={project.slug}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
