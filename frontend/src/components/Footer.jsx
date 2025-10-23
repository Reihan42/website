import React from 'react';
import { companyInfo } from '../data/mock';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A237E] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img
              src={companyInfo.logo}
              alt={companyInfo.name}
              className="h-12 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 mb-4 max-w-md">
              Building smart, connected, and sustainable infrastructure solutions for Indonesia's digital future.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin size={16} className="text-[#FF6F00]" />
                <span className="text-sm">{companyInfo.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={16} className="text-[#FF6F00]" />
                <a href={`tel:${companyInfo.phone}`} className="text-sm hover:text-[#FF6F00] transition-colors">
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} className="text-[#FF6F00]" />
                <a href={`mailto:${companyInfo.email}`} className="text-sm hover:text-[#FF6F00] transition-colors">
                  {companyInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-300 hover:text-[#FF6F00] transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Technology Infrastructure</li>
              <li>Information & Communication</li>
              <li>Professional Services</li>
              <li>System Integration</li>
              <li>IT Consulting</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#FF6F00] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#FF6F00] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
