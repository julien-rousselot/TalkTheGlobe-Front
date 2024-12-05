import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <div className="flex justify-center items-center space-x-6 bg-gray-800 p-4">
      <Link to="/accueil" className="text-white font-semibold hover:text-yellow-500 transition-colors">ACCUEIL</Link>
      <Link to="/cours" className="text-white font-semibold hover:text-yellow-500 transition-colors">COURS</Link>
      <Link to="/contact" className="text-white font-semibold hover:text-yellow-500 transition-colors">CONTACT</Link>
      <Link to="/apropos" className="text-white font-semibold hover:text-yellow-500 transition-colors">A PROPOS</Link>
      <Link to="/blog" className="text-white font-semibold hover:text-yellow-500 transition-colors">BLOG</Link>
      <Link to="/reservations" className="text-white font-semibold hover:text-yellow-500 transition-colors">RESERVATIONS</Link>
      <Link to="/tarifs" className="text-white font-semibold hover:text-yellow-500 transition-colors">TARIFS</Link>
      <Link to="/temoignages" className="text-white font-semibold hover:text-yellow-500 transition-colors">TEMOIGNAGES</Link>
      <Link to="/evenements" className="text-white font-semibold hover:text-yellow-500 transition-colors">EVENEMENTS</Link>
    </div>
  );
};

export default NavigationBar;
