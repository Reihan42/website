import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Server, Network, Briefcase } from 'lucide-react';

const iconMap = {
  server: Server,
  network: Network,
  briefcase: Briefcase
};

const ServiceDetailModal = ({ service, isOpen, onClose }) => {
  if (!service) return null;

  const Icon = iconMap[service.icon];

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-[#FF6F00] to-[#FF8C00] w-16 h-16 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              {Icon && <Icon className="text-white" size={32} />}
            </div>
            <DialogTitle className="text-3xl font-bold text-[#1A237E]">
              {service.category}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Description */}
          <div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Features */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-[#1A237E] mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-[#FF6F00] mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Content */}
          {service.detailedContent && (
            <div>
              <h3 className="text-xl font-bold text-[#1A237E] mb-3">Overview</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {service.detailedContent}
              </p>
            </div>
          )}

          {/* CTA Button */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={scrollToContact}
              className="w-full bg-[#FF6F00] hover:bg-[#FF6F00]/90 text-white py-6 text-lg font-medium"
            >
              Get In Touch About This Service
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
