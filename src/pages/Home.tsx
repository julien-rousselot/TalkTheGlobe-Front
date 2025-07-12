import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Student from '../assets/student.png';
import Teacher from '../assets/teacher.png';
import Picme from '../assets/Picme.jpg';
import Banner from '../components/Banner/Banner';

const Home = () => {

  return (
    <section>
      <Banner Title={
                <>
                  🗺️ LEARN{" "}
                  <span className="text-[#C6192E]">ENGLISH</span> AND{" "}
                  <span className="text-[#C6192E]">SPANISH</span> TO EXPLORE THE WORLD ! 🗺️
                </>
              } 
              Subtitle={
                <>
                  <FontAwesomeIcon icon="bolt" className="text-[#FFD43B] mr-2" />  
                  Interactive <span> online classes</span> and{" "} <span>resources</span> to help you master the language
                  <FontAwesomeIcon icon="bolt" className="text-[#FFD43B] ml-2" />                
                </>
              } 
              Button={
                <button className="flex items-center gap-2  px-4 py-2">
                  <span>START LEARNING TODAY !</span>
                  <FontAwesomeIcon icon="rocket"/>
                </button>
              }/>
      <div className="px-[5%] md:px-[15%] bg-[#f9f9f4] bg-cover bg-center p-16">
        <main>
          <h2 className='text-[#C6192E] text-center text-4xl pb-16'>
            <FontAwesomeIcon icon="graduation-cap" className="text-[#C6192E] pr-5" />
            WHY LEARN WITH TALK THE GLOBE?
            <FontAwesomeIcon icon="graduation-cap" className="text-[#C6192E] pl-5" />
          </h2>
          <section className="w-full">
            <div className="relative h-[300px] md:h-[750px] w-full">
              <img
                src={Picme}
                alt="Photo de fond"
                className="absolute inset-0 w-full h-full object-cover object-top brightness-75 rounded-xl"
              />

              <div className="hidden md:flex relative z-10 flex-col items-center justify-center h-full text-white text-center px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">
                  Why Learn with Talk The Globe?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
                  <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md">
                    <h3 className="text-2xl font-bold mb-2">⚡ INTERACTIVE ONLINE CLASSES</h3>
                    <p className="text-lg">Engaging lessons tailored to your needs</p>
                  </div>

                  <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md">
                    <h3 className="text-2xl font-bold mb-2">📝 FREE RESOURCES</h3>
                    <p className="text-lg">Access a library of free materials to boost your learning</p>
                  </div>

                  <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md">
                    <h3 className="text-2xl font-bold mb-2">📚 PERSONALIZED CURRICULUM</h3>
                    <p className="text-lg">Learn at your own pace with customized lessons</p>
                  </div>

                  <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md">
                    <h3 className="text-2xl font-bold mb-2">🎯 REAL-WORLD APPLICATION</h3>
                    <p className="text-lg">Practical exercises to improve retention</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Texte sous l’image en mobile */}
            <div className="md:hidden mt-6 px-4 text-center">
              <h2 className="text-2xl font-bold mb-6">
                Why Learn with Talk The Globe?
              </h2>

              <div className="space-y-4">
                <div className="bg-[#E8FDF4] p-4 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-1">⚡ INTERACTIVE ONLINE CLASSES</h3>
                  <p>Engaging lessons tailored to your needs</p>
                </div>

                <div className="bg-[#E8FDF4] p-4 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-1">📝 FREE RESOURCES</h3>
                  <p>Access a library of free materials to boost your learning</p>
                </div>

                <div className="bg-[#E8FDF4] p-4 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-1">📚 PERSONALIZED CURRICULUM</h3>
                  <p>Learn at your own pace with customized lessons</p>
                </div>

                <div className="bg-[#E8FDF4] p-4 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-1">🎯 REAL-WORLD APPLICATION</h3>
                  <p>Practical exercises to improve retention</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer>          
          <h2 className='text-red-500 font-bold text-center text-5xl p-10'>WHAT I OFFER</h2>
          <div className='flex flex-col md:flex-row  md:py-4'>

            <div className='bg-talktheglobe m-6 md:w-1/2 md:mr-4 border-4 border-[#a2f3dd] rounded-md'>
              <div className='flex flex-col'>
                <h3 className='text-center text-5xl pt-4 font-semibold'>I’m a student!</h3>
                <img src={Student} alt="image to select if you are a student and you want to get free resources or go to the classes part"/>
              </div>
              <div className='flex justify-around'>
                <Link to="/resources" className='bg-black text-white rounded-md w-1/2 p-4 m-6 text-lg text-center font-semibold'><button>Free ressources</button></Link>
                <Link to="/resources" className='bg-black text-white rounded-md w-1/2 p-4 m-6 text-lg text-center flex justify-center font-semibold'><button >Classes</button></Link>
              </div>
            </div>

            <div className='bg-talktheglobe m-6 md:w-1/2 md:ml-4 border-4 border-[#a2f3dd] rounded-md'> 
              <div className='flex flex-col'>
                <h3 className='text-center text-5xl pt-4 font-semibold'>I’m a teacher!</h3>
                <img src={Teacher} alt="image to select if you are a teacher and you want to get free resources or go to the shop part"/>
              </div>
              <div className='flex justify-around'>
                <Link to="/resources" className='bg-black text-white rounded-md w-1/2 p-4 m-6 text-lg text-center font-semibold'><button>Free ressources</button></Link>
                <Link to="/resources" className='bg-black text-white rounded-md w-1/2 p-4 m-6 text-lg text-center flex justify-center font-semibold'><button >Shop</button></Link>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </section>
  );
};

export default Home;
