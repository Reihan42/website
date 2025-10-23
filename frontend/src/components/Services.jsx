import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Server, Network, Briefcase, ArrowRight } from 'lucide-react';
import { services } from '../data/mock';
import { Button } from './ui/button';

const iconMap = {
  server: Server,
  network: Network,
  briefcase: Briefcase
};

const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#FF6F00] font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A237E] mt-4 mb-6">
            Comprehensive Infrastructure Solutions
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We provide end-to-end solutions across technology infrastructure, information systems, and professional consulting services.
          </p>
          <div className="w-20 h-1 bg-[#FF6F00] mx-auto mt-6"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Card
                key={service.id}
                className="group p-8 border-2 border-gray-100 hover:border-[#FF6F00] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white"
              >
                {/* Icon */}
                <div className="bg-gradient-to-br from-[#FF6F00] to-[#FF8C00] w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon className="text-white" size={32} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#1A237E] mb-4 group-hover:text-[#FF6F00] transition-colors duration-300">
                  {service.category}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF6F00] mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <Button
                  onClick={() => navigate(`/service/${service.id}`)}
                  variant="ghost"
                  className="text-[#FF6F00] hover:text-[#FF6F00] hover:bg-[#FF6F00]/10 p-0 h-auto font-semibold group-hover:gap-2 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
