import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface OfficeAddress {
  id: string;
  office_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
  phone?: string;
  email?: string;
  is_primary: boolean;
  order: number;
}

interface CompanyInfo {
  company_name: string;
  email?: string;
  phone?: string;
  about_text?: string;
  social_links?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [offices, setOffices] = useState<OfficeAddress[]>([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      const { data: companyData } = await supabase
        .from('company_info')
        .select('*')
        .maybeSingle();

      if (companyData) {
        setCompanyInfo(companyData);
      }

      const { data: officesData } = await supabase
        .from('office_addresses')
        .select('*')
        .order('order', { ascending: true });

      if (officesData) {
        setOffices(officesData);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer style={{ backgroundColor: '#2C2C2C' }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">
              E3<span style={{ color: 'var(--color-primary)' }}>INNOVATION</span>
            </h3>
            <p className="text-sm leading-relaxed">
              {companyInfo?.about_text || 'Your trusted technology partner delivering innovative software solutions.'}
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href={companyInfo?.social_links?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                style={{ color: 'white' }}
              >
                <Facebook size={20} />
              </a>
              <a
                href={companyInfo?.social_links?.twitter || 'https://twitter.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                style={{ color: 'white' }}
              >
                <Twitter size={20} />
              </a>
              <a
                href={companyInfo?.social_links?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                style={{ color: 'white' }}
              >
                <Linkedin size={20} />
              </a>
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
            <div className="space-y-6 text-sm">
              {offices.length > 0 ? (
                offices.map((office) => (
                  <div key={office.id} className="space-y-2">
                    <h5 className="text-white font-medium flex items-center">
                      {office.is_primary && (
                        <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: 'var(--color-primary)' }} />
                      )}
                      {office.office_name}
                    </h5>
                    <div className="flex items-start space-x-3">
                      <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                      <span className="leading-relaxed">
                        {office.address_line1}
                        {office.address_line2 && `, ${office.address_line2}`}
                        <br />
                        {office.city}
                        {office.state && `, ${office.state}`}
                        {office.postal_code && ` ${office.postal_code}`}
                        <br />
                        {office.country}
                      </span>
                    </div>
                    {office.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone size={16} className="flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                        <span>{office.phone}</span>
                      </div>
                    )}
                    {office.email && (
                      <div className="flex items-center space-x-3">
                        <Mail size={16} className="flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                        <span>{office.email}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start space-x-3">
                    <MapPin size={18} className="mt-1 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={18} className="flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                    <span>{companyInfo?.phone || '+880 1234-567890'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={18} className="flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                    <span>{companyInfo?.email || 'info@e3innovationlimited.com'}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-center text-sm" style={{ borderColor: '#3D3D3D' }}>
          <p>
            &copy; {currentYear} E3 Innovation Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
