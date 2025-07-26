import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Student from '../assets/studentHome.png';
import Teacher from '../assets/teacher.png';
import Picme from '../assets/Picme.jpg';
import Banner from '../components/Banner/Banner';
import CommentarySlider from '../components/CommentarySlider/CommentarySlider';
import FadeInSection from "../components/FadeInSection/FadeInSection";

const Home = () => {

  return (
    <section>
      <Banner Title={
                <>
                   LEARN{" "}
                  <span className="text-redText animated-word">ENGLISH</span>
                   {/* AND{" "} */}
                  {/* <span className="text-redText animated-word">SPANISH</span> */}
                   <br /> TO EXPLORE THE WORLD ! 🗺️
                </>
              } 
              Subtitle={
                <>
                  <FontAwesomeIcon icon="bolt" className="text-text mr-2" />  
                  Interactive <span> online classes</span> and{" "} <span>resources</span> to help you master the language
                  <FontAwesomeIcon icon="bolt" className="text-text ml-2" />                
                </>
              } 
              Button={
                <button className="items-center gap-2 p-4">
                  <span>START LEARNING ! </span>
                  <FontAwesomeIcon icon="graduation-cap"/>
                </button>
              }/>
      <div className="px-[5%] md:px-[15%] bg-[#f9f9f4] p-16">
        <main  className='3xl:w-[60%] m-auto'>
          <FadeInSection>
            <h2 className='text-red-500 font-bold text-center text-5xl p-5'>WHAT I OFFER</h2>
          </FadeInSection>

          <div className='flex flex-col justify-center gap-14 m-auto md:flex-row md:py-4'>
            <FadeInSection className="flex flex-col justify-center gap-14 m-auto md:flex-row md:py-4">
              <div className='bg-talktheglobe md:w-[400px] border-[3px] border-text rounded-3xl p-[30px]  hover:bg-text hover:text-white'>
                <h3 className='text-center text-5xl font-semibold'>I’M A <strong>STUDENT</strong>  !</h3>
                <img className='h-[270px] mx-auto my-10' src={Student} alt="image to select if you are a student and you want to get free resources or go to the classes part"/>
                <div className='flex justify-around gap-4'>
                  <Link to="/resources" className='bg-redText hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-lg text-center'><button>Free ressources</button></Link>
                  <Link to="/resources" className='bg-redText hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-lg text-center flex justify-center'><button >Classes</button></Link>
                </div>
              </div>

              <div className='bg-talktheglobe md:w-[400px] border-[3px] border-text rounded-3xl p-[30px] hover:bg-text hover:text-white'>
                <h3 className='text-center text-5xl font-semibold'>I’M A <strong>TEACHER</strong>  !</h3>
                <img className='h-[270px] w-[250px] mx-auto my-10 ' src={Teacher} alt="image to select if you are a student and you want to get free resources or go to the classes part"/>
                <div className='flex justify-around gap-4'>
                  <Link to="/resources" className='bg-redText hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-lg text-center'><button>Free ressources</button></Link>
                  <Link to="/resources" className='bg-redText hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-lg text-center flex justify-center'><button >Shop</button></Link>
                </div>
              </div>
          </FadeInSection>

          </div>
        </main>
        <section className='mt-16'> 
          <FadeInSection>        
            <h2 className='text-redText text-center text-4xl pb-16'>
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

                <div className="hidden md:flex relative z-10 flex-col items-center justify-center h-full text-white text-center px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-32 max-w-5xl w-full justify-items-center">
                    <FadeInSection>
                      <div className="bg-white/10 p-2 flex justify-center flex-col text rounded-xl backdrop-blur-md w-[350px]">
                        <h3 className="text-lg font-bold">⚡ INTERACTIVE ONLINE CLASSES</h3>
                        <p className="text-md">Engaging lessons tailored to your needs</p>
                      </div>
                    </FadeInSection>
                    <FadeInSection>
                      <div className="bg-white/10 p-2 flex justify-center flex-col text rounded-xl backdrop-blur-md w-[350px]">
                        <h3 className="text-lg font-bold">📝 FREE RESOURCES</h3>
                        <p className="text-md">Access a library of free materials to boost your learning</p>
                      </div>
                    </FadeInSection>
                    <FadeInSection>
                      <div className="bg-white/10 p-2 flex justify-center flex-col text rounded-xl backdrop-blur-md w-[350px]">
                        <h3 className="text-lg font-bold">🍵 CULTURAL EXPLORATION</h3>
                        <p className="text-md">Learn the language while exploring traditions</p>
                      </div>
                    </FadeInSection>
                    <FadeInSection>
                      <div className="bg-white/10 p-2 flex justify-center flex-col text rounded-xl backdrop-blur-md w-[350px]">
                        <h3 className="text-lg font-bold">🎓 CERTIFIED AND EXPERIENCED TEACHER</h3>
                        <p className="text-md">To guaranty the quality of your learning journey</p>
                      </div>
                    </FadeInSection>
                  </div>
                </div>
              </div>

              {/* Texte sous l’image en mobile */}
              <div className="md:hidden mt-6 px-4 text-center">
                <FadeInSection>
                  <h2 className="text-2xl font-bold mb-6">
                    Why Learn with Talk The Globe?
                  </h2>
                </FadeInSection>

                <div className="space-y-4">
                  <FadeInSection>
                    <div className="bg-[#E8FDF4] p-4 rounded-xl shadow-md">
                      <h3 className="text-xl font-semibold mb-1">⚡ INTERACTIVE ONLINE CLASSES</h3>
                      <p>Engaging lessons tailored to your needs</p>
                    </div>
                  </FadeInSection>
                  <FadeInSection>
                    <div className="bg-[#E8FDF4] p-4 rounded-xl shadow-md">
                      <h3 className="text-xl font-semibold mb-1">📝 FREE RESOURCES</h3>
                      <p>Access a library of free materials to boost your learning</p>
                    </div>
                  </FadeInSection>
                  <FadeInSection>
                    <div className="bg-[#E8FDF4] p-4 rounded-xl shadow-md">
                      <h3 className="text-xl font-semibold mb-1">📚 PERSONALIZED CURRICULUM</h3>
                      <p>Learn at your own pace with customized lessons</p>
                    </div>
                  </FadeInSection>
                  <FadeInSection>
                    <div className="bg-[#E8FDF4] p-4 rounded-xl shadow-md">
                      <h3 className="text-xl font-semibold mb-1">🎯 REAL-WORLD APPLICATION</h3>
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
            <h2 className='text-redText text-center text-4xl pt-16'>
              <FontAwesomeIcon icon="star" className="text-redText pr-5" />
              WHAT MY AMAZING STUDENTS SAY
              <FontAwesomeIcon icon="star" className="text-redText pl-5" />
            </h2>
          
            <div className='flex flex-row justify-center gap-8 pb-16 mt-5'>
              <p><FontAwesomeIcon icon="user-graduate" className="text-redText pr-5" />+100 students</p>
              <p><FontAwesomeIcon icon="earth-europe" className="text-redText pr-5" />8 countries</p>
              <p><FontAwesomeIcon icon="graduation-cap" className="text-redText pr-5" />+5 years of experience</p>
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
