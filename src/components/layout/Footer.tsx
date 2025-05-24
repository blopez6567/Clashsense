import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Linkedin, Github } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 pt-16 pb-12 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-semibold">
                Clash<span className="text-blue-600">sense</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              Empowering your financial future through innovative technology and user-centered design.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Products</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Investments</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Savings</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Retirement</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Insurance</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Taxes</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Press</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Help Center</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Contact Us</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">FAQs</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Clashsense. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;