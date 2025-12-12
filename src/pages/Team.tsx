import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import TeamCard from '../components/TeamCard';
import { teamApi } from '../services/api';
import { TeamMember } from '../types';

const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await teamApi.getAll();
        setTeam(response.data.data);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const defaultTeam: TeamMember[] = [
    {
      id: 1,
      name: 'John Doe',
      designation: 'CEO & Founder',
      photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      social_links: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    },
    {
      id: 2,
      name: 'Jane Smith',
      designation: 'CTO',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
      social_links: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      id: 3,
      name: 'Mike Johnson',
      designation: 'Lead Developer',
      photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      social_links: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      id: 4,
      name: 'Sarah Williams',
      designation: 'UX Designer',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      social_links: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    },
    {
      id: 5,
      name: 'David Brown',
      designation: 'Senior Developer',
      photo: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg',
      social_links: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      id: 6,
      name: 'Emily Davis',
      designation: 'Project Manager',
      photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      social_links: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    },
    {
      id: 7,
      name: 'Robert Wilson',
      designation: 'QA Engineer',
      photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      social_links: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      designation: 'Business Analyst',
      photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
      social_links: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    },
  ];

  const displayTeam = team.length > 0 ? team : defaultTeam;

  return (
    <div className="min-h-screen">
      <Hero
        title="Our Team"
        subtitle="Meet the talented professionals who make E3 Innovation a leader in software development"
        showCTA={false}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The People Behind Our Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team consists of experienced professionals passionate about creating
              exceptional software solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayTeam.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                designation={member.designation}
                photo={member.photo}
                socialLinks={member.social_links}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals to join our growing team. If you're
            passionate about technology and innovation, we'd love to hear from you.
          </p>
          <a
            href="mailto:careers@e3innovationlimited.com"
            className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
};

export default Team;
