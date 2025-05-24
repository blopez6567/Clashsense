import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  logoPath?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 32, 
  showText = true,
  className = '',
  logoPath
}) => {
  const defaultLogoPath = showText 
    ? '/images/Clash Sense Logo PNG.png'
    : '/images/Clash Sense Logo No Text PNG.png';

  return (
    <img 
      src={logoPath || defaultLogoPath}
      alt="Clashsense Logo" 
      className={`h-auto ${className}`}
      style={{ width: size }}
    />
  );
};

export default Logo;