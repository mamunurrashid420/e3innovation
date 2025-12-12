import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import TeamCard from '../components/TeamCard';
import { homeApi, servicesApi, projectsApi, teamApi } from '../services/api';
import { Settings, Service, Project, TeamMember } from '../types';
import { Users, Clock, Target, Award } from 'lucide-react';

const Home = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, servicesRes, projectsRes, teamRes] = await Promise.all([
          homeApi.getSettings(),
          servicesApi.getAll(),
          projectsApi.getAll({ per_page: 6 }),
          teamApi.getAll(),
        ]);

        setSettings(settingsRes.data);
        setServices(servicesRes.data.slice(0, 4));
        setProjects(projectsRes.data.slice(0, 6));
        setTeam(teamRes.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const defaultSettings = {
    site_title: 'E3 Innovation',
    hero_title: 'E3 INNOVATION - Your Trusted Software Development Partner',
    hero_subtitle: 'We deliver innovative software solutions that transform businesses. Expert team, agile methodology, and cutting-edge technology.',
    hero_background_image: '',
    about_section_content: 'We are a leading software development company specializing in custom software solutions, web applications, mobile apps, and quality assurance services.',
    contact_info: {
      phone: '',
      email: '',
      address: '',
    },
    footer_text: '',
  };

  return (
    <div className="min-h-screen">
      <Hero
        title={(settings || defaultSettings).hero_title}
        subtitle={(settings || defaultSettings).hero_subtitle}
        backgroundImage={(settings || defaultSettings).hero_background_image}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive software development services to help your business grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.short_description}
                  icon={service.icon}
                  slug={service.slug}
                />
              ))
            ) : (
              <>
                <ServiceCard
                  title="Custom Software"
                  description="Tailored solutions designed to meet your unique business needs"
                  icon="https://via.placeholder.com/40"
                  slug="custom-software"
                />
                <ServiceCard
                  title="Web Development"
                  description="Modern, responsive websites and web applications"
                  icon="https://via.placeholder.com/40"
                  slug="web-development"
                />
                <ServiceCard
                  title="Mobile Apps"
                  description="Native and cross-platform mobile applications"
                  icon="https://via.placeholder.com/40"
                  slug="mobile-apps"
                />
                <ServiceCard
                  title="QA & Testing"
                  description="Comprehensive quality assurance and testing services"
                  icon="https://via.placeholder.com/40"
                  slug="qa-testing"
                />
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About E3 Innovation
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                {(settings || defaultSettings).about_section_content}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Highly qualified engineers and developers
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dedicated Focus</h3>
              <p className="text-gray-600">
                Committed to delivering exceptional results
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Agile Process</h3>
              <p className="text-gray-600">
                Fast, iterative development methodology
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                Rigorous testing and quality control
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our portfolio of successful projects delivered to clients worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  category={project.category}
                  image={project.featured_image}
                  slug={project.slug}
                />
              ))
            ) : (
              <>
                <ProjectCard
                  title="E-Commerce Platform"
                  category="Web Development"
                  image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                  slug="ecommerce-platform"
                />
                <ProjectCard
                  title="Mobile Banking App"
                  category="Mobile Development"
                  image="https://images.pexels.com/photos/4968382/pexels-photo-4968382.jpeg"
                  slug="mobile-banking-app"
                />
                <ProjectCard
                  title="Healthcare System"
                  category="Custom Software"
                  image="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg"
                  slug="healthcare-system"
                />
              </>
            )}
          </div>

          <div className="text-center">
            <Link
              to="/projects"
              className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the talented individuals behind our success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.length > 0 ? (
              team.map((member) => (
                <TeamCard
                  key={member.id}
                  name={member.name}
                  designation={member.designation}
                  photo={member.photo}
                  socialLinks={member.social_links}
                />
              ))
            ) : (
              <>
                <TeamCard
                  name="John Doe"
                  designation="CEO & Founder"
                  photo="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  socialLinks={{
                    linkedin: 'https://linkedin.com',
                    twitter: 'https://twitter.com',
                  }}
                />
                <TeamCard
                  name="Jane Smith"
                  designation="CTO"
                  photo="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
                  socialLinks={{
                    linkedin: 'https://linkedin.com',
                    github: 'https://github.com',
                  }}
                />
                <TeamCard
                  name="Mike Johnson"
                  designation="Lead Developer"
                  photo="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                  socialLinks={{
                    linkedin: 'https://linkedin.com',
                    github: 'https://github.com',
                  }}
                />
                <TeamCard
                  name="Sarah Williams"
                  designation="UX Designer"
                  photo="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                  socialLinks={{
                    linkedin: 'https://linkedin.com',
                    twitter: 'https://twitter.com',
                  }}
                />
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Let's discuss how we can help transform your ideas into reality
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-white text-red-600 hover:bg-gray-100 font-medium rounded transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
