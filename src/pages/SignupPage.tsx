import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  React.useEffect(() => {
    document.title = 'Sign Up | Clashsense';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const benefits = [
    'Real-time clash detection & resolution tools',
    'AI-powered conflict resolution suggestions',
    'Comprehensive dispute tracking & management',
    'Secure team collaboration platform',
    'Context-aware resolution recommendations'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      <Link to="/" className="absolute top-8 left-8 flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft size={16} className="mr-2" />
        Back to home
      </Link>
      
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 mx-auto w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-slate-200 dark:border-slate-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      id="first-name"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      id="last-name"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white sm:text-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 rounded"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div>
                <Button type="submit" fullWidth disabled={!agreeTerms}>
                  Create account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="absolute inset-0 bg-slate-900 opacity-20"></div>
          <div className="flex flex-col justify-center h-full max-w-lg mx-auto px-8 text-white">
            <img 
              src="/home/project/Clash Sense Logo PNG.png"
              alt="Clashsense Logo"
              className="w-64 h-auto mb-12"
            />
            <h2 className="text-3xl font-bold mb-8">Join Clashsense Today</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-300" />
                  </div>
                  <p className="ml-3 text-lg text-blue-50">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;