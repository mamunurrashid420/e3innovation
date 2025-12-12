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
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
      <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center mb-4">
        <img src={icon} alt={title} className="w-10 h-10 object-contain" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      <Link
        to={`/services/${slug}`}
        className="inline-flex items-center text-red-600 hover:text-red-700 font-medium group"
      >
        Learn More
        <ArrowRight
          size={18}
          className="ml-2 group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>
  );
};

export default ServiceCard;
