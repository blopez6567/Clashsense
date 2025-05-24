import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 32, 
  showText = true,
  className = ''
}) => {
  const logoPath = showText 
    ? '/images/Clash Sense Logo PNG.png'
    : '/images/Clash Sense Logo No Text PNG.png';

  return (
    <img 
      src={logoPath}
      alt="Clashsense Logo" 
      className={`h-auto ${className}`}
      style={{ width: size }}
    />
  );
};

export default Logo;