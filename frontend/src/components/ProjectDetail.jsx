import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { getProject } from '../utils/api';
import { projects } from '../data/mock';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProject(id);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
        // Fallback to mock data
        const mockProject = projects.find(p => p.id === id);
        setProject(mockProject);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6F00] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#1A237E] mb-4">Project not found</p>
          <Button onClick={() => navigate('/')} className="bg-[#FF6F00] hover:bg-[#FF6F00]/90">
            <ArrowLeft size={20} className="mr-2" /> Back to Home
          </Button>
        </div>
      </div>
    );
  }

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

        {/* Project Image */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge className="bg-[#FF6F00] hover:bg-[#FF6F00]/90 text-white px-4 py-1">
              {project.category}
            </Badge>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} />
              <span>{project.year}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A237E] mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Detailed Content */}
        {project.detailedContent && (
          <Card className="p-8 mb-8 border-2 border-gray-100">
            <h2 className="text-2xl font-bold text-[#1A237E] mb-6">Project Overview</h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {project.detailedContent}
            </p>
          </Card>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <Card className="p-8 border-2 border-gray-100">
            <h2 className="text-2xl font-bold text-[#1A237E] mb-6">Technologies Used</h2>
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
          </Card>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Have a similar project in mind?</p>
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
            Discuss Your Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
