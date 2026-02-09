import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { Target, Users, Award, TrendingUp } from 'lucide-react';
import { api } from '../services/api';

const About = () => {
  const [stats, setStats] = useState({
    stats_projects_completed: '50+',
    stats_happy_clients: '30+',
    stats_team_members: '20+',
    stats_years_experience: '5+'
  });
  const [appearance, setAppearance] = useState({
    bg_about_hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    bg_about_stats_section: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80',
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsData, appearanceData] = await Promise.all([
          api.settings.getPublicStats(),
          api.settings.getPublicByGroup('appearance').catch(() => null),
        ]);
        if (statsData) {
          setStats(prev => ({ ...prev, ...statsData }));
        }
        if (appearanceData) {
          setAppearance(prev => ({ ...prev, ...appearanceData }));
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-white">
      <Hero
        title="About E3 Innovation"
        subtitle="We are a leading software development company dedicated to delivering innovative solutions that transform businesses"
        backgroundImage={appearance.bg_about_hero}
        showCTA={false}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                E3 Innovation Limited is a premier software development company specializing in
                custom software solutions, web applications, mobile apps, and quality assurance
                services. With years of experience and a team of highly skilled professionals,
                we help businesses leverage technology to achieve their goals.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Our mission is to deliver exceptional software solutions that not only meet but
                exceed our clients' expectations. We combine technical expertise with business
                acumen to create solutions that drive real business value.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe in building long-term partnerships with our clients, providing
                ongoing support and continuously improving our solutions to adapt to changing
                business needs.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="About Us"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We stand out from the competition through our commitment to excellence and
              client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Highly qualified engineers and developers with extensive industry experience
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Client-Focused</h3>
              <p className="text-gray-600">
                Dedicated to understanding and meeting your unique business requirements
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Driven</h3>
              <p className="text-gray-600">
                Rigorous testing and quality assurance processes ensure flawless delivery
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scalable Solutions</h3>
              <p className="text-gray-600">
                Built to grow with your business and adapt to changing needs
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We embrace new technologies and methodologies to deliver cutting-edge solutions
                that give our clients a competitive advantage.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We strive for excellence in everything we do, from code quality to customer
                service, ensuring the highest standards.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrity</h3>
              <p className="text-gray-600 leading-relaxed">
                We conduct business with honesty, transparency, and ethical practices, building
                trust with our clients and partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-gray-900 text-white relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url("${appearance.bg_about_stats_section}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">{stats.stats_projects_completed}</div>
              <div className="text-lg text-gray-300">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">{stats.stats_happy_clients}</div>
              <div className="text-lg text-gray-300">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">{stats.stats_team_members}</div>
              <div className="text-lg text-gray-300">Team Members</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">{stats.stats_years_experience}</div>
              <div className="text-lg text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
