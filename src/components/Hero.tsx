import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  showCTA?: boolean;
}

const Hero = ({ title, subtitle, backgroundImage, showCTA = true }: HeroProps) => {
  return (
    <div
      className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-24 md:py-32"
      style={
        backgroundImage
          ? {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${backgroundImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
          : undefined
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            {subtitle}
          </p>
          {showCTA && (
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors"
              >
                Our Services
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium rounded transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
