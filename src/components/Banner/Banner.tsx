import Talktheglobe from '../../assets/fatimaBannerCropStart.png';

interface BannerProps {
  Title: React.ReactNode;
  Subtitle: React.ReactNode;
  Span?: React.ReactNode;
  Image?: string;
  Button?: React.ReactNode;
}
  

const Banner: React.FC<BannerProps> = ({Title, Subtitle, Span, Image, Button}) => {
  return (
    <header className="bg-gradient-to-b from-[#75e8b4] via-[#96f3c9] to-[#f9f9f4] pt-6 px-6 md:px-20 flex flex-col md:flex-row w-full relative h-[calc(100vh-5rem)] md:h-auto">  
        <div className='w-full md:w-1/2 pt-4 md:pt-8 flex justify-center items-center'>
          <img src={Talktheglobe} className='block absolute bottom-0 md:relative mx-auto px-2 md:px-6 pt-2 md:pt-6 w-full' alt="Logo website"/>
        </div>

        <div className='w-full md:w-1/2 flex flex-col justify-center px-2 pt-2 md:pl-12 gap-3 md:gap-8 pb-6 md:pb-0'>
          <h1 className="text-[2.9rem] md:text-6xl font-extrabold text-center md:text-left leading-[1.25]">{Title}</h1>
          <div className='text-[1.40rem] px-5 md:text-2xl md:my-6 text-center md:text-left leading-[1.45]'> {Subtitle} 
            <span className='text-2xl md:text-3xl'>{Span}</span>
          </div>
          {Button && (
            <div className='hidden md:flex justify-center md:justify-start'>
              {Button}
            </div>
          )}
          </div>
          {Image && (<img className='w-[35%] block mt-10 ml-auto md:hidden' src={Image} alt="board"/>)}
        <div className="absolute h-[25px] bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-[#f9f9f4]"></div>
    </header>
  );
}
export default Banner;