import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Calendar, ExternalLink } from 'lucide-react';
import { projects } from '../data/mock';
import { Button } from './ui/button';

const Projects = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Technology Infrastructure', 'Information & Communication', 'Professional Services'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#FF6F00] font-semibold text-sm uppercase tracking-wider">Our Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A237E] mt-4 mb-6">
            Featured Projects
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore our portfolio of successful infrastructure projects across various industries.
          </p>
          <div className="w-20 h-1 bg-[#FF6F00] mx-auto mt-6"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-[#FF6F00] text-white hover:bg-[#FF6F00]/90'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border-2 border-gray-100 hover:border-[#FF6F00] transition-all duration-300 hover:shadow-2xl"
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden bg-gray-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-[#FF6F00] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {project.year}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="text-sm text-[#FF6F00] font-medium mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-[#1A237E] mb-3 group-hover:text-[#FF6F00] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <Button
                  onClick={() => navigate(`/project/${project.id}`)}
                  variant="ghost"
                  className="text-[#FF6F00] hover:text-[#FF6F00] hover:bg-[#FF6F00]/10 p-0 h-auto font-semibold group-hover:gap-2 transition-all duration-300"
                >
                  View Details
                  <ExternalLink size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
