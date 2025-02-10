import instagramLogo from '../../assets/instagram.svg';
import tiktokLogo from '../../assets/tiktok.svg';
import facebookLogo from '../../assets/facebook.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='flex justify-center flex-col items-center bg-gray-100 p-4'>
      <div className='flex flez-row'>
        <Link to="/home"><img src={instagramLogo} alt="lien vers instagram" className='w-10'/></Link>
        <Link to="/home"><img src={tiktokLogo} alt="lien vers tiktok" className='w-10 mx-10'/></Link>
        <Link to="/home"><img src={facebookLogo} alt="lien vers facebook" className='w-10'/></Link>
      </div>
      <div className='m-2'>
        <p>© 2025 Talk The Globe. All Rights Reserved</p>
      </div>
    </footer>
  );
}       

export default Footer;