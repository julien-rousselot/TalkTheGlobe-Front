import { NavLink } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import { useState } from 'react';
import Talktheglobe from '../../assets/Talk_the_globe-removebg-preview.png';
import useIsMobile from "../../hooks/useIsMobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const baseLinkClass = "transition-colors duration-300 whitespace-nowrap font-semibold";
  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? `${baseLinkClass} text-redText border-b-2 border-redText pb-1` 
      : `${baseLinkClass}`;
  

  return (
    <nav className="fixed p-6 bg-white w-full z-50 text-black h-[5rem] flex items-center justify-between">
      {/* Logo */}
      <NavLink to="/home">
        <img className="w-1/4 md:w-[4rem] ml-[60px]" src={Talktheglobe} alt="Logo site web" />
      </NavLink>

      {/* Version Desktop */}
      {!isMobile ? (
        <div className="flex space-x-5 w-3/4 justify-between xl:pr-[400px]">
          <NavLink to="/home" className={getActiveClass}>HOME</NavLink>
          <NavLink to="/aboutme" className={getActiveClass}>ABOUT ME</NavLink>
          <NavLink to="/services" className={getActiveClass}>SERVICES</NavLink>
          <NavLink to="/resources" className={getActiveClass}>RESOURCES</NavLink>
          <NavLink to="/contact" className={getActiveClass}>CONTACT</NavLink>
          <NavLink to="/shop" className={getActiveClass}>SHOP</NavLink>
        </div>
      ) : (
        // Version Mobile avec menu burger
        <div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {menuOpen && (
            <div className="absolute flex flex-col items-center justify-around top-20 right-0 bg-white shadow-md py-[10rem] space-y-4 w-full h-[calc(100vh-5rem)] z-10">
              <NavLink to="/home" onClick={() => setMenuOpen(false)} className={getActiveClass}>HOME</NavLink>
              <NavLink to="/aboutme" onClick={() => setMenuOpen(false)} className={getActiveClass}>ABOUT ME</NavLink>
              <NavLink to="/services" onClick={() => setMenuOpen(false)} className={getActiveClass}>SERVICES</NavLink>
              <NavLink to="/resources" onClick={() => setMenuOpen(false)} className={getActiveClass}>RESOURCES</NavLink>
              <NavLink to="/blog" onClick={() => setMenuOpen(false)} className={getActiveClass}>BLOG</NavLink>
              <NavLink to="/testimonials" onClick={() => setMenuOpen(false)} className={getActiveClass}>TESTIMONIALS</NavLink>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={getActiveClass}>CONTACT</NavLink>
              <NavLink to="/shop" onClick={() => setMenuOpen(false)} className={getActiveClass}>SHOP</NavLink>
            
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
