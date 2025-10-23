import React from 'react';
import { CheckCircle, Target, Award, Users } from 'lucide-react';
import { companyInfo } from '../data/mock';
import { Card } from './ui/card';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to deliver forward-thinking solutions"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering high-quality services that exceed expectations"
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Building trusted relationships with clients through collaboration"
    },
    {
      icon: CheckCircle,
      title: "Reliability",
      description: "Ensuring sustainable and dependable infrastructure solutions"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#FF6F00] font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A237E] mt-4 mb-6">
            Who We Are
          </h2>
          <div className="w-20 h-1 bg-[#FF6F00] mx-auto"></div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#1A237E]">
              {companyInfo.name}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {companyInfo.description}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              {companyInfo.mission}
            </p>
            <div className="pt-4">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="text-[#FF6F00] mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700">Multidisciplinary approach combining innovation and expertise</p>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="text-[#FF6F00] mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700">Supporting both private and public sector clients</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[#FF6F00] mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700">Advancing Indonesia's digital and structural development</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="About PT Navodaya Multi Solusi"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#FF6F00]/20 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-[#1A237E]/20 rounded-2xl -z-10"></div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="p-6 border-2 border-gray-100 hover:border-[#FF6F00] transition-all duration-300 hover:shadow-lg group">
                <div className="bg-[#FF6F00]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FF6F00] transition-colors duration-300">
                  <Icon className="text-[#FF6F00] group-hover:text-white transition-colors duration-300" size={28} />
                </div>
                <h4 className="text-xl font-bold text-[#1A237E] mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
