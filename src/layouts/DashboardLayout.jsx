import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TopNavbar } from '../components/TopNavbar';
import { FooterShortcuts } from '../components/FooterShortcuts';

export function DashboardLayout({ children }) {
  // Default open on desktop, closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const location = useLocation();

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  // Sync with resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-[35] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-0 md:ml-[220px]' : 'ml-0'}`}>
        <TopNavbar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
        
        {/* Main scrollable content area */}
        <main className={`flex-1 pt-[45px] overflow-x-hidden ${location.pathname === '/dashboard' ? 'pb-24' : 'pb-0'}`}>
          {children}
        </main>
        
        {location.pathname === '/dashboard' && <FooterShortcuts isOpen={sidebarOpen} />}
      </div>
    </div>
  );
}
