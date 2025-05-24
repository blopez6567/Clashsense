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
      <Link to="/" className="absolute top-8 left-8 flex items-center text-white hover:text-white/90 transition-colors">
        <ArrowLeft size={16} className="mr-2" />
        Back to home
      </Link>
      
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-blue-100">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-white hover:text-blue-200">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 mx-auto w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-sm py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-white/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-white">
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
                      className="appearance-none block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm placeholder-white/50 focus:outline-none focus:ring-white focus:border-white bg-white/10 text-white sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-white">
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
                      className="appearance-none block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm placeholder-white/50 focus:outline-none focus:ring-white focus:border-white bg-white/10 text-white sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
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
                    className="appearance-none block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm placeholder-white/50 focus:outline-none focus:ring-white focus:border-white bg-white/10 text-white sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
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
                    className="appearance-none block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm placeholder-white/50 focus:outline-none focus:ring-white focus:border-white bg-white/10 text-white sm:text-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white"
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
                  className="h-4 w-4 text-blue-600 focus:ring-white border-white/20 rounded bg-white/10"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-white">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-white hover:text-blue-200">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-white hover:text-blue-200">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div>
                <Button 
                  type="submit" 
                  fullWidth 
                  disabled={!agreeTerms}
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Create account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block relative w-0 flex-1 bg-white dark:bg-slate-800">
        <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto px-8">
          <div className="mb-12">
            <Logo size={400} showText={false} logoPath="/images/Clash Sense Logo No Text PNG No Background.png" />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white text-center">
            Join Clash<span className="text-blue-500">sense</span> Today
          </h2>
          <div className="space-y-4 w-full max-w-md">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                </div>
                <p className="ml-3 text-lg text-slate-600 dark:text-slate-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;