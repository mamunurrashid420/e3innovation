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
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="relative h-80 overflow-hidden bg-gray-200">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-red-600 font-medium mb-4">{designation}</p>
        {socialLinks && (
          <div className="flex justify-center space-x-3">
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin size={18} />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <Twitter size={18} />
              </a>
            )}
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
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
