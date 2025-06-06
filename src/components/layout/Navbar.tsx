import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Logo from '../ui/Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavigation = (path: string) => {
    if (location.pathname === path) {
      // If clicking the current path, force a navigation to reset the page
      navigate('/', { replace: true }); // Navigate to home first
      setTimeout(() => {
        navigate(path); // Then navigate back to the clicked path
      }, 0);
    } else {
      navigate(path);
    }
  };

  const navLinks = [
    { name: 'Product', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Resources', path: '/resources' },
    { name: 'Integrations', path: '/integrations' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  const isProductPage = location.pathname === '/';
  const shouldBeTransparent = !isScrolled && isProductPage;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      shouldBeTransparent 
        ? 'bg-transparent' 
        : 'bg-slate-900 shadow-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo size={64} logoPath="/images/Clash Sense Logo No Text PNG No Background.png" />
              <span className="ml-2 text-xl font-semibold text-white">
                Clash<span className="text-blue-500">Sense</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-blue-500'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => handleNavigation('/login')}
              className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => handleNavigation('/signup')}
              className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow"
            >
              Sign up
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavigation(link.path)}
              className={`block w-full px-3 py-2 rounded-md text-base font-medium text-left ${
                location.pathname === link.path
                  ? 'text-blue-500 bg-slate-800'
                  : 'text-white/90 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 pb-3 border-t border-slate-700">
            <button
              onClick={() => handleNavigation('/login')}
              className="block w-full px-4 py-2 text-center text-base font-medium text-white/90 hover:text-white transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => handleNavigation('/signup')}
              className="block w-full mt-2 px-4 py-2 text-center text-base font-medium rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;