import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { getService } from '../utils/api';
import { services } from '../data/mock';

const iconMap = {
  server: require('lucide-react').Server,
  network: require('lucide-react').Network,
  briefcase: require('lucide-react').Briefcase
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await getService(id);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
        // Fallback to mock data
        const mockService = services.find(s => s.id === id);
        setService(mockService);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6F00] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#1A237E] mb-4">Service not found</p>
          <Button onClick={() => navigate('/')} className="bg-[#FF6F00] hover:bg-[#FF6F00]/90">
            <ArrowLeft size={20} className="mr-2" /> Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-8 text-[#1A237E] hover:text-[#FF6F00] hover:bg-[#FF6F00]/10"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Home
        </Button>

        {/* Service Header */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-[#FF6F00] to-[#FF8C00] w-20 h-20 rounded-xl flex items-center justify-center mb-6 shadow-lg">
            {Icon && <Icon className="text-white" size={40} />}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A237E] mb-4">
            {service.category}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Features Grid */}
        <Card className="p-8 mb-12 border-2 border-gray-100">
          <h2 className="text-2xl font-bold text-[#1A237E] mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="text-[#FF6F00] mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Detailed Content */}
        {service.detailedContent && (
          <Card className="p-8 border-2 border-gray-100">
            <h2 className="text-2xl font-bold text-[#1A237E] mb-6">Overview</h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {service.detailedContent}
            </p>
          </Card>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Interested in this service?</p>
          <Button
            onClick={() => {
              navigate('/');
              setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            className="bg-[#FF6F00] hover:bg-[#FF6F00]/90 text-white px-8 py-6 text-lg"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
