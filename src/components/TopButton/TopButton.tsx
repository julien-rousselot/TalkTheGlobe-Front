import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useIsMobile from '../../hooks/useIsMobile';

const TopButton: React.FC = () => {
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Only show on mobile devices
  if (!isMobile) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 left-8 px-4 py-3 bg-redText text-white border-none rounded-full cursor-pointer text-base flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50"
      aria-label="Come back to top"
    >
      <FontAwesomeIcon icon="arrow-up" className="text-xl" />
    </button>
  );
};

export default TopButton;