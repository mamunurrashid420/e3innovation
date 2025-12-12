import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">
              E3<span className="text-red-600">INNOVATION</span>
            </h3>
            <p className="text-sm leading-relaxed">
              Your trusted technology partner delivering innovative software solutions.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-red-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-red-600 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-red-600 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-red-600 transition-colors">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="hover:text-red-600 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-red-600 transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-red-600 transition-colors">
                  Custom Software
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-red-600 transition-colors">
                  QA & Testing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-red-600 mt-1 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-red-600 flex-shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-red-600 flex-shrink-0" />
                <span>info@e3innovationlimited.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
          <p>
            &copy; {currentYear} E3 Innovation Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
