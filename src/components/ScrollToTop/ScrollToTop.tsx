import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // ou 'auto' si tu veux sans animation
  }, [pathname]);

  return null;
};

export default ScrollToTop;
