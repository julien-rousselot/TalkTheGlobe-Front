import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import UK from '../assets/royaume-uni.png'
import Student from '../assets/studentHome.png';
import Teacher from '../assets/teacher.png';
import Picme from '../assets/Picme.jpg';
import Banner from '../components/Banner/Banner';
import CommentarySlider from '../components/CommentarySlider/CommentarySlider';
import FadeInSection from "../components/FadeInSection/FadeInSection";

const Home = () => {

  const scrollToMain = () => {
    const mainSection = document.getElementById('main-content');
    if (mainSection) {
      mainSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <section>
      <Banner Title={
                <div className='flex flex-col '>
                  <div className='flex flex-row'>
                    Learn{" "}
                    <span className="text-redText animated-word mx-4">English</span>{" "}
                    <img src={UK} className=' hidden md:block w-16 h-16 ml-2' alt="UK Flag" />
                  </div>
                  <span>to explore the world! </span>
                   {/* AND{" "} */}
                  {/* <span className="text-redText animated-word">SPANISH</span> */}
                </div>
              } 
              Subtitle={
              <h2 className="text-2xl inline align-start">
                Interactive online classes and resources to help you master the language
              </h2>

              } 
              Span={"⚡"}
              Button={
                <button onClick={scrollToMain} className="items-center gap-2 p-4 cursor-pointer">
                  <span>Start learning ! </span>
                  <FontAwesomeIcon icon="graduation-cap"/>
                </button>
              }/>
      <div className="px-[5%] md:px-[15%] bg-[#f9f9f4] pb-16">
        <main id="main-content" className='3xl:w-[60%] m-auto '>
          <FadeInSection>
            <h2 className='text-text font-extrabold text-center text-6xl sm:text-7xl py-12 md:py-20'>
              What <span className="text-redText learn-animate">I Offer</span>
            </h2>
          </FadeInSection>

          <div className='flex flex-col justify-center gap-14 m-auto md:flex-row md:py-4'>
            <FadeInSection className="flex flex-col justify-center gap-14 m-auto lg:flex-row md:py-4">
              <div className='bg-talktheglobe lg:w-[400px] border-[2px] md:border-[3px] border-text rounded-3xl p-[15px] md:p-[70px] lg:p-[30px] hover:bg-text hover:text-white'>
                <h3 className='text-center text-5xl font-semibold'>I’M A <strong>STUDENT</strong>  !</h3>
                <img className='h-[200px] md:h-[270px] mx-auto my-4 md:my-10' src={Student} alt="image to select if you are a student and you want to get free resources or go to the classes part"/>
                <div className='flex justify-around gap-4'>
                  <Link to="/resources" className='bg-redText hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-md font-bold text-center'><button>Free ressources</button></Link>
                  <Link to="/services" className='bg-redText hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-md font-bold text-center flex justify-center'><button >Classes</button></Link>
                </div>
              </div>

              <div className='bg-talktheglobe lg:w-[400px] border-[2px] md:border-[3px] border-text rounded-3xl p-[15px] md:p-[70px] lg:p-[30px] hover:bg-text hover:text-white'>
                <h3 className='text-center text-5xl font-semibold'>I’M A <strong>TEACHER</strong>!</h3>
                <img className='h-[200px] md:h-[270px] md:w-[250px] mx-auto my-4 md:my-10 ' src={Teacher} alt="image to select if you are a student and you want to get free resources or go to the classes part"/>
                <div className='flex justify-around gap-4'>
                  <Link to="/resources" className='bg-redText hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-md font-bold text-center'><button>Free ressources</button></Link>
                  <Link to="/shop" className='bg-redText hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-md font-bold text-center flex justify-center'><button >Shop</button></Link>
                </div>
              </div>
          </FadeInSection>
          </div>
        </main>
        <section className='pt-8 md:mt-16'> 
          <FadeInSection>        
            <h2 className='text-redText text-center font-extrabold text-2xl md:text-4xl pb-6 md:pb-16'>
              <FontAwesomeIcon icon="graduation-cap" className="text-redText pr-5" />
              WHY LEARN WITH TALK THE GLOBE?
              <FontAwesomeIcon icon="graduation-cap" className="text-redText pl-5" />
            </h2>
          </FadeInSection>
          <FadeInSection>
            <section className="w-full">
              <div className="relative h-[300px] md:h-[550px] w-[90%] m-auto">
                <img
                  src={Picme}
                  alt="Photo de fond"
                  className="absolute inset-0 w-full h-full object-cover object-top brightness-90 rounded-xl"
                />

                <div className="hidden lg:flex relative z-10 flex-col items-center justify-center h-full text-center px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-32 max-w-5xl w-full justify-items-center">
                    <FadeInSection>
                      <div className="bg-white/10 p-2 flex justify-center flex-col text rounded-xl backdrop-blur-md w-[350px] shadow-lg">
                        <h3 className="text-lg text-[#f9f9f4] font-extrabold">⚡ INTERACTIVE ONLINE CLASSES</h3>
                        <p className="text-md text-[#f9f9f4]">Engaging lessons tailored to your needs</p>
                      </div>
                    </FadeInSection>
                    <FadeInSection>
                      <div className="bg-white/10 p-2 flex justify-center flex-col text rounded-xl backdrop-blur-md w-[350px] shadow-lg">
                        <h3 className="text-lg text-[#f9f9f4] font-extrabold">📝 FREE RESOURCES</h3>
                        <p className="text-md text-[#f9f9f4]">Access a library of free materials to boost your learning</p>
                      </div>
                    </FadeInSection>
                    <FadeInSection>
                      <div className="bg-white/10 p-2 flex justify-center flex-col text rounded-xl backdrop-blur-md w-[350px] shadow-lg">
                        <h3 className="text-lg text-[#f9f9f4] font-extrabold">🍵 CULTURAL EXPLORATION</h3>
                        <p className="text-md text-[#f9f9f4]">Learn the language while exploring traditions</p>
                      </div>
                    </FadeInSection>
                    <FadeInSection>
                      <div className="bg-white/10 p-2 flex justify-center flex-col text rounded-xl backdrop-blur-md w-[350px] shadow-lg">
                        <h3 className="text-lg text-[#f9f9f4] font-extrabold">🎓 CERTIFIED AND EXPERIENCED TEACHER</h3>
                        <p className="text-md text-[#f9f9f4]">To guaranty the quality of your learning journey</p>
                      </div>
                    </FadeInSection>
                  </div>
                </div>
              </div>

              {/* Texte sous l’image en mobile */}
              <div className="lg:hidden mt-6 px-4 text-center">
                <div className="space-y-4">
                  <FadeInSection>
                    <div className="bg-text p-4 px-6 text-[#f9f9f4] rounded-xl shadow-lg">
                      <h3 className="text-xl font-extrabold mb-1">⚡ INTERACTIVE ONLINE CLASSES</h3>
                      <p>Engaging lessons tailored to your needs</p>
                    </div>
                  </FadeInSection>
                  <FadeInSection>
                    <div className="bg-text p-4 px-6 text-[#f9f9f4] rounded-xl shadow-lg">
                      <h3 className="text-xl font-extrabold mb-1">📝 FREE RESOURCES</h3>
                      <p>Access a library of free materials to boost your learning</p>
                    </div>
                  </FadeInSection>
                  <FadeInSection>
                    <div className="bg-text p-4 px-6 text-[#f9f9f4] rounded-xl shadow-lg">
                      <h3 className="text-xl font-extrabold mb-1">📚 PERSONALIZED CURRICULUM</h3>
                      <p>Learn at your own pace with customized lessons</p>
                    </div>
                  </FadeInSection>
                  <FadeInSection>
                    <div className="bg-text p-4 px-6 text-[#f9f9f4] rounded-xl shadow-lg">
                      <h3 className="text-xl font-extrabold mb-1">🎯 REAL-WORLD APPLICATION</h3>
                      <p>Practical exercises to improve retention</p>
                    </div>
                  </FadeInSection>
                </div>
              </div>
            </section>
          </FadeInSection>
        </section>
        <footer>
          <FadeInSection>
            <h2 className='text-text font-extrabold text-center text-2xl sm:text-5xl lg:text-5xl pt-16'>
              ⭐ WHAT MY AMAZING STUDENTS SAY ⭐
            </h2>

            <div className='flex flex-col justify-center items-center gap-5 md:flex-row md:justify-around py-5 font-extrabold lg:w-2/3 m-auto'>
              <div className='flex flex-col w-full items-center gap-2 md:gap-0 text-center md:w-1/3'>
                <p className='bg-white rounded-md p-2 w-2/3 h-full shadow-lg'>👩🏻‍🎓 +100 students</p>
              </div>
              <div className='flex flex-col w-full items-center gap-2 md:gap-0 text-center md:w-1/3'>
                <p className='bg-white rounded-md p-2 w-2/3 h-full shadow-lg'>🌍 8 countries</p>
              </div>
              <div className='flex flex-col w-full items-center gap-2 md:gap-0 text-center md:w-1/3'>
                <p className='bg-white rounded-md p-2 w-2/3 h-full shadow-lg'>🎓 +5 years of experience</p>
              </div>
            </div>
          </FadeInSection>
          <FadeInSection>
            <CommentarySlider />
          </FadeInSection>
        </footer>
      </div>
    </section>
  );
};

export default Home;
