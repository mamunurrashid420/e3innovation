import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { api } from '../services/api';
import { Service } from '../types';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.services.getAll();
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const defaultServices: Service[] = [
    {
      id: 1,
      title: 'Custom Software Development',
      slug: 'custom-software-development',
      short_description: 'Tailored software solutions designed to meet your unique business requirements and challenges.',
      long_description: '',
      icon: 'https://via.placeholder.com/40',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      status: true,
    },
    {
      id: 2,
      title: 'Web Application Development',
      slug: 'web-application-development',
      short_description: 'Modern, responsive web applications built with cutting-edge technologies and best practices.',
      long_description: '',
      icon: 'https://via.placeholder.com/40',
      image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg',
      status: true,
    },
    {
      id: 3,
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      short_description: 'Native and cross-platform mobile applications for iOS and Android devices.',
      long_description: '',
      icon: 'https://via.placeholder.com/40',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
      status: true,
    },
    {
      id: 4,
      title: 'Quality Assurance & Testing',
      slug: 'quality-assurance-testing',
      short_description: 'Comprehensive testing services to ensure your software is bug-free and performs flawlessly.',
      long_description: '',
      icon: 'https://via.placeholder.com/40',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
      status: true,
    },
    {
      id: 5,
      title: 'Cloud Solutions',
      slug: 'cloud-solutions',
      short_description: 'Scalable cloud infrastructure and migration services for modern businesses.',
      long_description: '',
      icon: 'https://via.placeholder.com/40',
      image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
      status: true,
    },
    {
      id: 6,
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      short_description: 'Beautiful, intuitive user interfaces that provide exceptional user experiences.',
      long_description: '',
      icon: 'https://via.placeholder.com/40',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      status: true,
    },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <div className="min-h-screen">
      <Hero
        title="Our Services"
        subtitle="Comprehensive software development services to help your business succeed in the digital age"
        showCTA={false}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From concept to deployment, we provide end-to-end software development services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.short_description}
                icon={service.icon}
                slug={service.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Development Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We follow a proven agile methodology to deliver high-quality software on time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Discovery</h3>
              <p className="text-gray-600">
                Understanding your requirements, goals, and challenges
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Planning</h3>
              <p className="text-gray-600">
                Creating detailed project roadmap and technical specifications
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Development</h3>
              <p className="text-gray-600">
                Building your solution using agile sprints and best practices
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Deployment</h3>
              <p className="text-gray-600">
                Launching your product with ongoing support and maintenance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
