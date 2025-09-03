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
    <header className="bg-gradient-to-b from-[#75e8b4] via-[#96f3c9] to-[#f9f9f4] px-20 flex flex-row w-full relative">  
        
        <div className='w-1/2 pt-8 flex justify-center items-center'>
          <img src={Talktheglobe} className='block mx-auto px-6 pt-6 w-full md:mx-0' alt="Logo website"/>
        </div>

        <div className='w-1/2 flex flex-col pl-12 gap-8 justify-center'>
          <h1 className="md:text-6xl font-extrabold">{Title}</h1>
          <h2 className='text-2xl my-6 md:my-0 '> {Subtitle} <span className='text-3xl'>{Span}</span></h2>
          {/* {Image &&(<img className='w-[30%] pb-6 md:pb-0 block mx-auto md:w-[13%]' src={Image} alt="board"/>)} */}
          {Button && (
            <button className='bg-redText rounded-full text-white text-md hover:bg-red-700 px-2 w-fit pulse' style={{ boxShadow: '10px 5px 5px black' }}>
              {Button}
            </button>
          )}
        </div>

        {/* Transition line at the bottom */}
        <div className="absolute h-[25px] bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-[#f9f9f4]"></div>

    </header>
  );
}
export default Banner;