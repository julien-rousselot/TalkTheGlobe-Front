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
  const {totalItems} = useCart();

  const baseLinkClass = "transition-all duration-100 ease-in-out whitespace-nowrap text-text font-bold text-lg transform hover:scale-110 relative";
  
  const getActiveClass = (path: string) => {
    const isActive = location.pathname === path || (path === '/home' && location.pathname === '/');
    return isActive ? `${baseLinkClass} text-redText nav-link-active` : baseLinkClass;
  };

  return (
    <>
      <style>
        {`
          .nav-link-active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 3px;
            background-color: #ef4444;
            border-radius: 2px;
          }
        `}
      </style>
      <nav className="fixed px-[60px] bg-white w-full z-50 text-black h-[5rem] flex items-center justify-between">
      {/* Logo */}
      <NavLink className="w-1/5" to="/home">
        <img className="md:w-[4rem]" src={Talktheglobe} alt="Logo site web"/>
      </NavLink>

      {/* Version Desktop */}
      {!isMobile ? (
        <div className="flex space-x-5 w-3/5 justify-between relative">
          <NavLink to="/home" className={getActiveClass("/home")}>HOME</NavLink>
          <NavLink to="/aboutme" className={getActiveClass('/aboutme')}>ABOUT ME</NavLink>
          <NavLink to="/services" className={getActiveClass('/services')}>SERVICES</NavLink>
          <NavLink to="/resources" className={getActiveClass('/resources')}>RESOURCES</NavLink>
          <NavLink to="/contact" className={getActiveClass('/contact')}>CONTACT</NavLink>
          <NavLink to="/shop" className={getActiveClass('/shop')}>SHOP</NavLink>
        </div>
      ) : (
        // Version Mobile avec menu burger
        <div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {menuOpen && (
            <div className="absolute flex flex-col items-center justify-around top-20 right-0 bg-white shadow-md py-[10rem] space-y-4 w-full h-[calc(100vh-5rem)] z-10">
              <NavLink to="/home" onClick={() => setMenuOpen(false)} className={getActiveClass("/home")}>HOME</NavLink>
              <NavLink to="/aboutme" onClick={() => setMenuOpen(false)} className={getActiveClass('/aboutme')}>ABOUT ME</NavLink>
              <NavLink to="/services" onClick={() => setMenuOpen(false)} className={getActiveClass('/services')}>SERVICES</NavLink>
              <NavLink to="/resources" onClick={() => setMenuOpen(false)} className={getActiveClass('/resources')}>RESOURCES</NavLink>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={getActiveClass('/contact')}>CONTACT</NavLink>
              <NavLink to="/shop" onClick={() => setMenuOpen(false)} className={getActiveClass('/shop')}>SHOP</NavLink>
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
    </>
  );
};

export default Navbar;
