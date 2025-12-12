import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  slug: string;
}

const ServiceCard = ({ title, description, icon, slug }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-8 border border-gray-100 group">
      <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: '#FEF2F2' }}>
        <img src={icon} alt={title} className="w-10 h-10 object-contain" />
      </div>
      <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-dark)' }}>{title}</h3>
      <p className="leading-relaxed mb-6" style={{ color: 'var(--color-text-gray)' }}>{description}</p>
      <Link
        to={`/services/${slug}`}
        className="inline-flex items-center font-medium group-hover:translate-x-1 transition-transform duration-300"
        style={{ color: 'var(--color-primary)' }}
      >
        Learn More
        <ArrowRight
          size={18}
          className="ml-2"
        />
      </Link>
    </div>
  );
};

export default ServiceCard;
