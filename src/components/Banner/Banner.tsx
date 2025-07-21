import Talktheglobe from '../../assets/Talk_the_globe-removebg-preview.png';

interface BannerProps {
  Title: React.ReactNode;
  Subtitle: React.ReactNode;
  Image?: string;
  Button?: React.ReactNode;
}
  

const Banner: React.FC<BannerProps> = ({Title, Subtitle, Image, Button}) => {
  return (
    <header className="bg-gradient-to-b from-[#75e8b4] via-[#96f3c9] to-[#E9FDF4] py-48 mt-[80px] flex flex-row w-full">  
        
        <div className='w-1/3 flex justify-center items-center'>
          <img src={Talktheglobe} className='block mx-auto w-[350px] md:mx-0' alt="Logo website"/>
        </div>

        <div className='w-2/3 flex flex-col gap-8 justify-center'>
          <h1 className="md:text-5xl font-extrabold">{Title}</h1>
          <h2 className='md:text-2xl my-6 md:my-0 '> {Subtitle}</h2>
          {Image &&(<img className='w-[30%] pb-6 md:pb-0 block mx-auto md:w-[13%]' src={Image} alt="board"/>)}
          {Button && (
            <button className='bg-redText rounded-full text-white text-md hover:bg-red-700 px-2 w-fit pulse' style={{ boxShadow: '10px 5px 5px black' }}>
              {Button}
            </button>
          )}
        </div>

    </header>
  );
}
export default Banner;