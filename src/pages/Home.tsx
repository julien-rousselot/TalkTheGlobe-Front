import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Student from '../assets/studentHome.png';
import Teacher from '../assets/teacher.png';
import Picme from '../assets/Picme.jpg';
import Banner from '../components/Banner/Banner';

const Home = () => {

  return (
    <section>
      <Banner Title={
                <>
                   LEARN{" "}
                  <span className="text-[#C6192E] animated-word">ENGLISH</span> AND{" "}
                  <span className="text-[#C6192E] animated-word">SPANISH</span> <br /> TO EXPLORE THE WORLD ! 🗺️
                </>
              } 
              Subtitle={
                <>
                  <FontAwesomeIcon icon="bolt" className="text-[#1e293b] mr-2" />  
                  Interactive <span> online classes</span> and{" "} <span>resources</span> to help you master the language
                  <FontAwesomeIcon icon="bolt" className="text-[#1e293b] ml-2" />                
                </>
              } 
              Button={
                <button className="items-center gap-2 p-4">
                  <span>START LEARNING ! </span>
                  <FontAwesomeIcon icon="graduation-cap"/>
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
        <footer className='3xl:w-[60%] m-auto'>          
          <h2 className='text-red-500 font-bold text-center text-5xl p-5'>WHAT I OFFER</h2>
          <div className='flex flex-col justify-evenly gap-8 md:flex-row md:py-4'>

            <div className='bg-talktheglobe md:w-[400px] border-[3px] border-[#1e293b] rounded-3xl p-[30px] m-auto hover:bg-text hover:text-white'>
              <h3 className='text-center text-5xl font-semibold'>I’M A <strong>STUDENT</strong>  !</h3>
              <img className='h-[270px] mx-auto my-10' src={Student} alt="image to select if you are a student and you want to get free resources or go to the classes part"/>
              <div className='flex justify-around gap-4'>
                <Link to="/resources" className='bg-[#C6192E] hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-lg text-center'><button>Free ressources</button></Link>
                <Link to="/resources" className='bg-[#C6192E] hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-lg text-center flex justify-center'><button >Classes</button></Link>
              </div>
            </div>

            <div className='bg-talktheglobe md:w-[400px] border-[4px] border-[#1e293b] rounded-3xl p-[30px] m-auto hover:bg-text hover:text-white'>
              <h3 className='text-center text-5xl font-semibold'>I’M A <strong>TEACHER</strong>  !</h3>
              <img className='h-[270px] w-[250px] mx-auto my-10 ' src={Teacher} alt="image to select if you are a student and you want to get free resources or go to the classes part"/>
              <div className='flex justify-around gap-4'>
                <Link to="/resources" className='bg-[#C6192E] hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-lg text-center'><button>Free ressources</button></Link>
                <Link to="/resources" className='bg-[#C6192E] hover:bg-red-700 text-white rounded-full w-1/2 p-1 text-lg text-center flex justify-center'><button >Shop</button></Link>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </section>
  );
};

export default Home;
