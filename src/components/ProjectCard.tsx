import { Link } from 'react-router-dom';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  slug: string;
}

const ProjectCard = ({ title, category, image, slug }: ProjectCardProps) => {
  return (
    <Link
      to={`/projects/${slug}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3" style={{ backgroundColor: '#FEF2F2', color: 'var(--color-primary)' }}>
          {category}
        </span>
        <h3 className="text-xl font-bold transition-colors" style={{ color: 'var(--color-text-dark)' }}>
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default ProjectCard;
