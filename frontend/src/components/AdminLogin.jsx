import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Lock, User } from 'lucide-react';
import { adminLogin } from '../utils/api';
import { useToast } from '../hooks/use-toast';
import { companyInfo } from '../data/mock';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await adminLogin(credentials);
      localStorage.setItem('adminToken', response.data.access_token);
      toast({
        title: "Login Successful",
        description: "Welcome to admin dashboard"
      });
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Incorrect username or password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A237E] to-[#283593] flex items-center justify-center px-6">
      <Card className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src={companyInfo.logo}
            alt={companyInfo.name}
            className="h-16 w-auto mx-auto mb-4 object-contain"
          />
          <h1 className="text-2xl font-bold text-[#1A237E] mb-2">Admin Login</h1>
          <p className="text-gray-600">Access your content management dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
                className="pl-10 border-2 border-gray-200 focus:border-[#FF6F00] focus:ring-[#FF6F00]"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="pl-10 border-2 border-gray-200 focus:border-[#FF6F00] focus:ring-[#FF6F00]"
                placeholder="Enter password"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF6F00] hover:bg-[#FF6F00]/90 text-white py-6 text-lg font-medium"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {/* Default Credentials Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <strong>Default Credentials:</strong><br />
            Username: admin | Password: admin
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-[#FF6F00] hover:underline text-sm"
          >
            ← Back to Homepage
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
