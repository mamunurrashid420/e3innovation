import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Service } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;

      try {
        const data = await api.services.getBySlug(slug);
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
        <Link
          to="/services"
          className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Services
        </Link>
      </div>
    );
  }

  const benefits = [
    'Experienced team of developers and engineers',
    'Agile development methodology',
    'Regular progress updates and transparent communication',
    'Quality assurance and rigorous testing',
    'Post-launch support and maintenance',
    'Scalable and maintainable code',
  ];

  return (
    <div className="min-h-screen pt-16">
      <div
        className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20"
        style={
          service.image
            ? {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center text-white hover:text-red-400 mb-6 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl text-gray-300">{service.short_description}</p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Service</h2>
              <div
                className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: service.long_description || service.short_description,
                }}
              />

              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Interested in This Service?
                </h3>
                <p className="text-gray-600 mb-6">
                  Get in touch with us to discuss your project requirements and receive a customized quote.
                </p>
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors"
                >
                  Contact Us
                </Link>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Other Services</h4>
                  <Link
                    to="/services"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
