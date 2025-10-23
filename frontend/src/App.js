import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceDetail from './components/ServiceDetail';
import ProjectDetail from './components/ProjectDetail';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { Toaster } from './components/ui/toaster';
import './App.css';

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Services />
    <Projects />
    <Contact />
  </>
);

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <Toaster />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}

export default App;
