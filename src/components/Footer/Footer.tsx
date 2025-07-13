
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer className='flex justify-center flex-col items-center bg-gray-100 p-4'>
      <div className='flex flez-row gap-5 w-full  justify-center p-4'>
        <NavLink to="/home" className="text-[#1e293b] hover:text-[#C6192E]">
          <FontAwesomeIcon icon={['fab', 'instagram']} className="text-[#1e293b] text-4xl"/>
        </NavLink>
        <NavLink to="/home">
          <FontAwesomeIcon icon={['fab', 'tiktok']} className="text-[#1e293b] text-4xl" />
        </NavLink>
        <NavLink to="/home">
          <FontAwesomeIcon icon={['fab', 'facebook']} className="text-[#1e293b] text-4xl" />
        </NavLink>
      </div>
      <div className='m-2'>
        <p>© 2025 Talk The Globe. All Rights Reserved</p>
      </div>
    </footer>
  );
}       

export default Footer;