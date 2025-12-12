import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsApi } from '../services/api';
import { Project } from '../types';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;

      try {
        const response = await projectsApi.getBySlug(slug);
        setProject(response.data.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
        <Link
          to="/projects"
          className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div
        className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${project.featured_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center text-white hover:text-red-400 mb-6 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-300">
            <span className="inline-flex items-center">
              <Tag size={18} className="mr-2" />
              {project.category}
            </span>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                <p>{project.description}</p>
              </div>

              {project.gallery_images && project.gallery_images.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery_images.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-md">
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Project Highlights
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Modern and responsive design
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Built with latest technologies
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Scalable architecture
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Comprehensive testing and QA
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Deployed and maintained successfully
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Start Your Project
                </h3>
                <p className="text-gray-600 mb-6">
                  Have a similar project in mind? Let's discuss how we can help bring your ideas to life.
                </p>
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors mb-4"
                >
                  Get a Quote
                </Link>
                <Link
                  to="/services"
                  className="block w-full text-center px-6 py-3 bg-white border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 font-medium rounded transition-colors"
                >
                  View Services
                </Link>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Project Category</h4>
                  <span className="inline-block px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
