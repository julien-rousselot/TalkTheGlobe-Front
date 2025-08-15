import {NavLink, useLocation} from 'react-router-dom';
import { Menu, X } from "lucide-react";
import { useState } from 'react';
import Talktheglobe from '../../assets/Talk_the_globe-removebg-preview.png';
import useIsMobile from "../../hooks/useIsMobile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCart } from '../../contexts/CartContext';
import CartModal from '../Cart/CartModal';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const baseLinkClass = "transition-colors duration-300 whitespace-nowrap font-semibold";
  const getActiveClass = ({ isActive }: { isActive: boolean }) => isActive ? `${baseLinkClass} text-redText border-b-2 border-redText pb-1` : `${baseLinkClass}`;

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path || (path === '/home' && location.pathname === '/');
    return isActive
      ? `${baseLinkClass} text-redText border-b-2 border-redText pb-1`
      : baseLinkClass;
  };

  return (
    <nav className="fixed px-[60px] bg-white w-full z-50 text-black h-[5rem] flex items-center justify-between">
      {/* Logo */}
      <NavLink className="w-1/5" to="/home">
        <img className="  md:w-[4rem]" src={Talktheglobe} alt="Logo site web" />
      </NavLink>

      {/* Version Desktop */}
      {!isMobile ? (
        <div className="flex space-x-5 w-3/5 justify-between">
          <NavLink to="/home" className={() => getLinkClass("/home")}>HOME</NavLink>
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
              <NavLink to="/home" onClick={() => setMenuOpen(false)} className={() => getLinkClass("/home")}>HOME</NavLink>
              <NavLink to="/aboutme" onClick={() => setMenuOpen(false)} className={getActiveClass}>ABOUT ME</NavLink>
              <NavLink to="/services" onClick={() => setMenuOpen(false)} className={getActiveClass}>SERVICES</NavLink>
              <NavLink to="/resources" onClick={() => setMenuOpen(false)} className={getActiveClass}>RESOURCES</NavLink>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={getActiveClass}>CONTACT</NavLink>
              <NavLink to="/shop" onClick={() => setMenuOpen(false)} className={getActiveClass}>SHOP</NavLink>
            </div>
          )}
        </div>
      )}
      <div className="w-1/5 flex justify-end items-center relative">
        {/* Icône panier */}
        <button
          onClick={() => setCartOpen(true)}
          className="text-2xl text-text transition-transform duration-300 origin-right hover:scale-125 focus:outline-none"
        >
          <FontAwesomeIcon icon="shopping-cart" />
        </button>

        {/* Bulle du nombre d'articles */}
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg pointer-events-none">
            {totalItems}
          </span>
        )}
      </div>
      
      {/* Cart Modal */}
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
