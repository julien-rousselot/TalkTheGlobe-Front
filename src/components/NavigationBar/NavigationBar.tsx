import { Link } from 'react-router-dom';
import Talktheglobe from '../../assets/Talk_the_globe-removebg-preview.png';

const NavigationBar = () => {
  return (
    <div className="flex justify-center items-center space-x-6 bg-white text-black p-4 h-24">
      <Link to="/accueil">
        <img className="h-24" src={Talktheglobe} alt="Logo site web" />
      </Link>
      <Link to="/accueil" className=" font-semibold hover:text-yellow-500 transition-colors">ACCUEIL</Link>
      <Link to="/cours" className=" font-semibold hover:text-yellow-500 transition-colors">COURS</Link>
      <Link to="/contact" className=" font-semibold hover:text-yellow-500 transition-colors">CONTACT</Link>
      <Link to="/apropos" className=" font-semibold hover:text-yellow-500 transition-colors">A PROPOS</Link>
      <Link to="/blog" className=" font-semibold hover:text-yellow-500 transition-colors">BLOG</Link>
      <Link to="/reservations" className=" font-semibold hover:text-yellow-500 transition-colors">RESERVATIONS</Link>
      <Link to="/tarifs" className=" font-semibold hover:text-yellow-500 transition-colors">TARIFS</Link>
      <Link to="/temoignages" className=" font-semibold hover:text-yellow-500 transition-colors">TEMOIGNAGES</Link>
      <Link to="/evenements" className=" font-semibold hover:text-yellow-500 transition-colors">EVENEMENTS</Link>
    </div>
  );
};

export default NavigationBar;
