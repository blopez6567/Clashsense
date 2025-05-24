import React from 'react';

interface LogoProps {
  size?: number;
  showBackground?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 32, 
  showBackground = true,
  className = ''
}) => {
  return (
    <img 
      src="YOUR_GITHUB_RAW_URL_HERE" 
      alt="Your Logo" 
      className={`h-auto ${className}`}
      style={{ width: size }}
    />
  );
};

export default Logo;