import { Facebook, Linkedin, Twitter, Github } from 'lucide-react';

interface TeamCardProps {
  name: string;
  designation: string;
  photo: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const TeamCard = ({ name, designation, photo, socialLinks }: TeamCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative h-80 overflow-hidden bg-gray-200">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-dark)' }}>{name}</h3>
        <p className="font-medium mb-4" style={{ color: 'var(--color-primary)' }}>{designation}</p>
        {socialLinks && (
          <div className="flex justify-center space-x-3">
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:text-white flex items-center justify-center transition-all duration-300"
                style={{ color: 'var(--color-text-gray)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.color = 'var(--color-text-gray)';
                }}
              >
                <Facebook size={18} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:text-white flex items-center justify-center transition-all duration-300"
                style={{ color: 'var(--color-text-gray)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.color = 'var(--color-text-gray)';
                }}
              >
                <Linkedin size={18} />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:text-white flex items-center justify-center transition-all duration-300"
                style={{ color: 'var(--color-text-gray)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.color = 'var(--color-text-gray)';
                }}
              >
                <Twitter size={18} />
              </a>
            )}
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:text-white flex items-center justify-center transition-all duration-300"
                style={{ color: 'var(--color-text-gray)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.color = 'var(--color-text-gray)';
                }}
              >
                <Github size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
