import { Link } from 'react-router-dom';
import Talktheglobe from '../../assets/Talk_the_globe-removebg-preview.png';
import { Menu, X } from "lucide-react"; // Icônes pour le menu
import { useState } from 'react';
import useIsMobile from "../../hooks/useIsMobile"; // Import du hook


const NavigationBar = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className=" p-6 text-black h-[5rem] flex items-center justify-between">
      {/* Logo */}
      <Link to="/home">
        <img className="w-1/4 md:w-[4rem]" src={Talktheglobe} alt="Logo site web" />
      </Link>

      {/* Version Desktop */}
      {!isMobile ? (
        <div className="flex space-x-5">
          <Link to="/home" className="hover:text-yellow-500 transition-colors whitespace-nowrap">HOME</Link>
          <Link to="/about" className="hover:text-yellow-500 transition-colors whitespace-nowrap">ABOUT ME</Link>
          <Link to="/services" className="hover:text-yellow-500 transition-colors whitespace-nowrap">SERVICES</Link>
          <Link to="/resources" className="hover:text-yellow-500 transition-colors whitespace-nowrap">RESOURCES</Link>
          <Link to="/blog" className="hover:text-yellow-500 transition-colors whitespace-nowrap">BLOG</Link>
          <Link to="/testimonials" className="hover:text-yellow-500 transition-colors whitespace-nowrap">TESTIMONIALS</Link>
          <Link to="/contact" className="hover:text-yellow-500 transition-colors whitespace-nowrap">CONTACT</Link>
          <Link to="/shop" className="hover:text-yellow-500 transition-colors whitespace-nowrap">SHOP</Link>
        </div>
      ) : (
        // Version Mobile avec menu burger
        <div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {menuOpen && (
            <div className="absolute flex flex-col items-center justify-around top-20 right-0 bg-white shadow-md py-[10rem] space-y-4 w-full h-[calc(100vh-5rem)] z-10">
              <Link to="/home" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-yellow-500 transition-colors">HOME</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-yellow-500 transition-colors">ABOUT ME</Link>
              <Link to="/services" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-yellow-500 transition-colors">SERVICES</Link>
              <Link to="/resources" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-yellow-500 transition-colors">RESOURCES</Link>
              <Link to="/blog" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-yellow-500 transition-colors">BLOG</Link>
              <Link to="/testimonials" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-yellow-500 transition-colors">TESTIMONIALS</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-yellow-500 transition-colors">CONTACT</Link>
              <Link to="/shop" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-yellow-500 transition-colors">SHOP</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
