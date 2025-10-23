import React from 'react';
import { Calendar, Tag, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="rounded-xl overflow-hidden shadow-lg -mt-2">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Project Header */}
          <DialogHeader>
            <div className="flex items-center gap-3 mb-3">
              <Badge className="bg-[#FF6F00] hover:bg-[#FF6F00]/90 text-white px-3 py-1">
                {project.category}
              </Badge>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span className="text-sm">{project.year}</span>
              </div>
            </div>
            <DialogTitle className="text-3xl font-bold text-[#1A237E]">
              {project.title}
            </DialogTitle>
          </DialogHeader>

          {/* Description */}
          <div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Detailed Content */}
          {project.detailedContent && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#1A237E] mb-3">Project Overview</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project.detailedContent}
              </p>
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-[#1A237E] mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="px-4 py-2 text-base border-[#FF6F00] text-[#FF6F00] hover:bg-[#FF6F00]/10"
                  >
                    <Tag size={16} className="mr-2" />
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={scrollToContact}
              className="w-full bg-[#FF6F00] hover:bg-[#FF6F00]/90 text-white py-6 text-lg font-medium"
            >
              Discuss Your Similar Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
