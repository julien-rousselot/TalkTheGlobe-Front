import Talktheglobe from '../../assets/Talk_the_globe-removebg-preview.png';

interface BannerProps {
  Title: React.ReactNode;
  Subtitle: React.ReactNode;
  Image?: string;
  Button?: React.ReactNode;
}
  

const Banner: React.FC<BannerProps> = ({ Title, Subtitle, Image, Button }) => {
  return (
<header className="bg-gradient-to-b from-[#d1f7e6] via-[#E9FDF4] to-[#eafdf3] py-8 mt-[80px]">
<div className='text-center flex px-4 md:pl-6 md:items-center md:text-left flex-col'>
        
        <div className='md:flex flex-row items-center'>
          <img src={Talktheglobe} className='block mx-auto w-[200px] md:mx-0' alt="Logo website"/>
          <h1 className="md:text-5xl md:ml-20">{Title}</h1>
        </div>

        <div className='md:mx-16 md:mb-12 flex'>
          <div className='md:flex items-center'>
            <h2 className='md:text-3xl my-6 md:my-0 md:text-center'> {Subtitle}</h2>
            {Image &&(<img className='w-[30%] pb-6 md:pb-0 block mx-auto md:w-[13%] ' src={Image} alt="board"/>)}
          </div>
        </div>  

          {Button && ( // Vérifie si ButtonText est défini avant d'afficher le bouton
            <button className='bg-[#C6192E] rounded-xl text-white p-4 text-md hover:bg-[#c53a3a]'>
              {Button}
            </button>
          )}
      </div>
    </header>
  );
}
export default Banner;