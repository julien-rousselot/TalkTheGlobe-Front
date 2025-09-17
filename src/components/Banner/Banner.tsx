import Talktheglobe from '../../assets/fatimaBannerCropStart.png';

interface BannerProps {
  Title: React.ReactNode;
  Subtitle: React.ReactNode;
  Span?: React.ReactNode;
  Image?: string;
  Button?: React.ReactNode;
}
  

const Banner: React.FC<BannerProps> = ({Title, Subtitle, Span, Button}) => {
  return (
    <header className="bg-gradient-to-b from-[#75e8b4] via-[#96f3c9] to-[#f9f9f4] pt-12 px-6 md:px-20 flex flex-col md:flex-row w-full relative h-[calc(100vh-5rem)] md:h-auto">  

        <div className='w-full md:w-1/2 pt-4 md:pt-8 flex justify-center items-center'>
          <img src={Talktheglobe} className='block absolute bottom-0 md:relative mx-auto px-2 md:px-6 pt-2 md:pt-6 w-3/4 md:w-full' alt="Logo website"/>
        </div>

        <div className='w-full md:w-1/2 flex flex-col justify-center px-4 md:pl-12 gap-6 md:gap-8 pb-6 md:pb-0'>
          <h1 className="text-5xl md:text-6xl font-extrabold text-center md:text-left">{Title}</h1>
          <h2 className='text-2xl md:text-2xl my-3 md:my-6 text-center md:text-left'> {Subtitle} <span className='text-xl md:text-3xl'>{Span}</span></h2>
          {/* {Image &&(<img className='w-[30%] pb-6 md:pb-0 block mx-auto md:w-[13%]' src={Image} alt="board"/>)} */}
          {Button && (
            <div className='flex justify-center md:justify-start'>
              <button className='bg-redText rounded-full text-white text-sm md:text-md hover:bg-red-700 px-4 md:px-2 py-2 w-fit pulse' style={{ boxShadow: '10px 5px 5px black' }}>
                {Button}
              </button>
            </div>
          )}
        </div>

        {/* Transition line at the bottom */}
        <div className="absolute h-[25px] bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-[#f9f9f4]"></div>

    </header>
  );
}
export default Banner;