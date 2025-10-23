import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LogOut, Building, Briefcase, FolderKanban, Mail } from 'lucide-react';
import { getCompanyInfo, getServices, getProjects, getContactMessages } from '../utils/api';
import { useToast } from '../hooks/use-toast';
import { companyInfo } from '../data/mock';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [company, setCompany] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [companyRes, servicesRes, projectsRes, messagesRes] = await Promise.all([
        getCompanyInfo(),
        getServices(),
        getProjects(),
        getContactMessages().catch(() => ({ data: [] }))
      ]);

      setCompany(companyRes.data);
      setServices(servicesRes.data);
      setProjects(projectsRes.data);
      setMessages(messagesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully"
    });
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6F00] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={companyInfo.logo} alt="Logo" className="h-10 w-auto object-contain" />
            <h1 className="text-2xl font-bold text-[#1A237E]">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-[#1A237E] text-[#1A237E]"
            >
              View Website
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-[#FF6F00] hover:bg-[#FF6F00]/90"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-l-[#FF6F00]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Services</p>
                <p className="text-3xl font-bold text-[#1A237E]">{services.length}</p>
              </div>
              <Briefcase className="text-[#FF6F00]" size={32} />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-[#1A237E]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Projects</p>
                <p className="text-3xl font-bold text-[#1A237E]">{projects.length}</p>
              </div>
              <FolderKanban className="text-[#1A237E]" size={32} />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New Messages</p>
                <p className="text-3xl font-bold text-[#1A237E]">{messages.length}</p>
              </div>
              <Mail className="text-blue-500" size={32} />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Company Info</p>
                <p className="text-3xl font-bold text-[#1A237E]">✓</p>
              </div>
              <Building className="text-green-500" size={32} />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="company">Company Info</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-[#1A237E] mb-4">Company Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-gray-700">Company Name:</label>
                  <p className="text-gray-600">{company?.name}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Tagline:</label>
                  <p className="text-gray-600">{company?.tagline}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Phone:</label>
                  <p className="text-gray-600">{company?.phone}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Email:</label>
                  <p className="text-gray-600">{company?.email}</p>
                </div>
                <Button className="bg-[#FF6F00] hover:bg-[#FF6F00]/90 mt-4">
                  Edit Company Info
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1A237E]">Services</h2>
                <Button className="bg-[#FF6F00] hover:bg-[#FF6F00]/90">
                  Add New Service
                </Button>
              </div>
              <div className="space-y-4">
                {services.map((service) => (
                  <Card key={service.id} className="p-4 border-2 border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-[#1A237E]">{service.category}</h3>
                        <p className="text-sm text-gray-600">{service.description.substring(0, 100)}...</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1A237E]">Projects</h2>
                <Button className="bg-[#FF6F00] hover:bg-[#FF6F00]/90">
                  Add New Project
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="p-4 border-2 border-gray-100">
                    <div className="flex gap-4">
                      <img src={project.image} alt={project.title} className="w-24 h-24 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-bold text-[#1A237E] mb-1">{project.title}</h3>
                        <p className="text-xs text-gray-600 mb-2">{project.category} • {project.year}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-[#1A237E] mb-6">Contact Messages</h2>
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No messages yet</p>
                ) : (
                  messages.map((message) => (
                    <Card key={message.id} className="p-4 border-2 border-gray-100">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-[#1A237E]">{message.name}</h3>
                            <span className="text-sm text-gray-500">{message.email}</span>
                          </div>
                          <p className="text-gray-600">{message.message}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(message.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-600">
                          Delete
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
