import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { companyInfo } from '../data/mock';
import { useToast } from '../hooks/use-toast';
import { submitContactForm } from '../utils/api';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#FF6F00] font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A237E] mt-4 mb-6">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can help you build better infrastructure.
          </p>
          <div className="w-20 h-1 bg-[#FF6F00] mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 border-2 border-gray-100 shadow-lg">
            <h3 className="text-2xl font-bold text-[#1A237E] mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 focus:border-[#FF6F00] focus:ring-[#FF6F00]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 focus:border-[#FF6F00] focus:ring-[#FF6F00]"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full border-2 border-gray-200 focus:border-[#FF6F00] focus:ring-[#FF6F00] resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF6F00] hover:bg-[#FF6F00]/90 text-white py-6 text-lg font-medium rounded-md transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={20} />
              </Button>
            </form>
          </Card>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <Card className="p-6 border-2 border-gray-100 hover:border-[#FF6F00] transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FF6F00]/10 p-3 rounded-lg group-hover:bg-[#FF6F00] transition-colors duration-300">
                    <MapPin className="text-[#FF6F00] group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A237E] mb-1">Our Location</h4>
                    <p className="text-gray-600">{companyInfo.address}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-gray-100 hover:border-[#FF6F00] transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FF6F00]/10 p-3 rounded-lg group-hover:bg-[#FF6F00] transition-colors duration-300">
                    <Phone className="text-[#FF6F00] group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A237E] mb-1">Phone Number</h4>
                    <a href={`tel:${companyInfo.phone}`} className="text-gray-600 hover:text-[#FF6F00] transition-colors">
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-gray-100 hover:border-[#FF6F00] transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FF6F00]/10 p-3 rounded-lg group-hover:bg-[#FF6F00] transition-colors duration-300">
                    <Mail className="text-[#FF6F00] group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A237E] mb-1">Email Address</h4>
                    <a href={`mailto:${companyInfo.email}`} className="text-gray-600 hover:text-[#FF6F00] transition-colors">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Google Map */}
            <Card className="overflow-hidden border-2 border-gray-100 shadow-lg">
              <iframe
                src={`https://maps.google.com/maps?q=${companyInfo.coordinates.lat},${companyInfo.coordinates.lng}&hl=en&z=14&output=embed`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Company Location"
              ></iframe>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
