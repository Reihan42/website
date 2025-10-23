import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#1A237E 1px, transparent 1px), linear-gradient(90deg, #1A237E 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF6F00]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1A237E]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6F00]/10 rounded-full border border-[#FF6F00]/20">
            <span className="w-2 h-2 bg-[#FF6F00] rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-[#1A237E]">Business Infrastructure Solutions</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-[#1A237E] leading-tight">
            {companyInfo.tagline}
          </h1>

          {/* Subline */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {companyInfo.subline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              onClick={() => scrollToSection('services')}
              className="bg-[#FF6F00] hover:bg-[#FF6F00]/90 text-white px-8 py-6 text-lg font-medium rounded-md transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2"
            >
              Explore Our Services
              <ArrowRight size={20} />
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-2 border-[#1A237E] text-[#1A237E] hover:bg-[#1A237E] hover:text-white px-8 py-6 text-lg font-medium rounded-md transition-all duration-300 flex items-center gap-2"
            >
              Get In Touch
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF6F00]">10+</div>
              <div className="text-sm text-gray-600 mt-2">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF6F00]">100+</div>
              <div className="text-sm text-gray-600 mt-2">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF6F00]">50+</div>
              <div className="text-sm text-gray-600 mt-2">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#1A237E] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#FF6F00] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
