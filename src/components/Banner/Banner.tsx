import Talktheglobe from '../../assets/Talk_the_globe-removebg-preview.png';

interface BannerProps {
    Title: string;
    Subtitle: string;
    Image?: string;
    ButtonText: string;
  }

const Banner: React.FC<BannerProps> = ({ Title, Subtitle, Image, ButtonText }) => {
    return (
      <header className='bg-talktheglobe'>
        
        <div className='text-center flex pt-12 px-4 md:pl-6 md:items-center md:text-left flex-col '>
          <div className='md:flex flex-row items-center'>
            <img src={Talktheglobe} className='block mx-auto w-[60%] md:w-[15%] md:mx-0' alt="Logo website"/>
            <h1 className='text-3xl md:pl-10'>{Title}</h1>
          </div>

          <div className='md:mx-16 md:mb-12 flex'>
            <div className='md:flex items-center'>
              <h2 className='text-xl my-6 md:my-0 md:text-center' dangerouslySetInnerHTML={{ __html: Subtitle }}/>
              {Image &&(<img className='w-[30%] pb-6 md:pb-0 block mx-auto md:w-[13%] ' src={Image} alt="board"/>)}
            </div>
       
          </div>    
           {ButtonText && ( // Vérifie si ButtonText est défini avant d'afficher le bouton
                <button className='bg-red-500 rounded-md text-white p-4 md:p-3 text-md hover:bg-red-600 m-6'>
                  {ButtonText}
                </button>
            )}
        </div>
      </header>
    );
}
export default Banner;