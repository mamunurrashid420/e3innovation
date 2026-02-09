import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { api } from '../services/api';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerSettings, setFooterSettings] = useState({
    footer_about_text: 'Your trusted technology partner delivering innovative software solutions.',
    contact_address_bd: 'Hussain Tower, 5th Floor, Sector #7, Uttara, Dhaka, Bangladesh',
    contact_address_china: '5# Area B, Guxin Road, Zhangcha, Foshan, Guangdong, China',
    contact_phone: '+880 1234-567890',
    contact_email: 'info@e3innovationlimited.com',
  });

  const [socialLinks, setSocialLinks] = useState({
    social_facebook: 'https://facebook.com',
    social_twitter: 'https://twitter.com',
    social_linkedin: 'https://linkedin.com',
    social_instagram: 'https://instagram.com',
  });

  const [appearance, setAppearance] = useState({
    site_logo: ''
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [footerData, socialData, appearanceData] = await Promise.all([
          api.settings.getPublicByGroup('footer'),
          api.settings.getPublicByGroup('social'),
          api.settings.getPublicByGroup('appearance')
        ]);

        if (footerData) {
          setFooterSettings(prev => ({
            ...prev,
            ...footerData
          }));
        }

        if (socialData) {
          setSocialLinks(prev => ({
            ...prev,
            ...socialData
          }));
        }

        if (appearanceData) {
          setAppearance(prev => ({ ...prev, ...appearanceData }));
        }
      } catch (error) {
        console.error('Failed to fetch footer settings:', error);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer style={{ backgroundColor: '#2C2C2C' }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="mb-4">
              {appearance.site_logo ? (
                <img src={appearance.site_logo} alt="E3 Innovations" className="h-10 w-auto object-contain" />
              ) : (
                <h3 className="text-white text-xl font-bold">
                  E3<span style={{ color: 'var(--color-primary)' }}>INNOVATIONS </span> LIMITED
                </h3>
              )}
            </div>
            <p className="text-sm leading-relaxed">
              {footerSettings.footer_about_text}
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.social_facebook && (
                <a
                  href={socialLinks.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 text-white"
                >
                  <Facebook size={20} />
                </a>
              )}
              {socialLinks.social_twitter && (
                <a
                  href={socialLinks.social_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 text-white"
                >
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks.social_linkedin && (
                <a
                  href={socialLinks.social_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 text-white"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {socialLinks.social_instagram && (
                <a
                  href={socialLinks.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 text-white"
                >
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:transition-colors duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:transition-colors duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:transition-colors duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="hover:transition-colors duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/services"
                  className="hover:transition-colors duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:transition-colors duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:transition-colors duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  Custom Software
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:transition-colors duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  QA & Testing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <p className="font-semibold text-white mb-1">BD Office:</p>
                  <p>{footerSettings.contact_address_bd}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <p className="font-semibold text-white mb-1">China Office:</p>
                  <p>{footerSettings.contact_address_china}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <Phone size={18} className="flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                <a href={`tel:${footerSettings.contact_phone}`} className="hover:text-white transition-colors">
                  {footerSettings.contact_phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                <a href={`mailto:${footerSettings.contact_email}`} className="hover:text-white transition-colors">
                  {footerSettings.contact_email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-center text-sm" style={{ borderColor: '#3D3D3D' }}>
          <p>
            &copy; {currentYear} E3 Innovations Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
