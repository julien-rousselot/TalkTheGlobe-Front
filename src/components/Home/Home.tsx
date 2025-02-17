import Talktheglobe from '../../assets/Talk_the_globe-removebg-preview.png';
import Student from '../../assets/student.png';
import Teacher from '../../assets/teacher.png';
import assistante from '../../assets/qualites-assistante-direction.jpg';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <section>
      <header className='bg-talktheglobe'>
        <div className='text-center p-6 flex md:items-center md:text-left flex-col md:flex-row md:p-0'>
          <img src={Talktheglobe} alt="Logo website"/>
          <div className=''>
            <h1 className='text-3xl'>LEARN ENGLISH AND SPANISH TO EXPLORE THE WORLD! 🗺️</h1>
            <h2 className='text-xl my-6'>Interactive online classes and resources to help you master the language</h2>
            <button className='bg-red-500 rounded-md text-white p-4 text-md hover:bg-red-600'>START LEARNING TODAY! 🚀</button>
          </div>
        </div>
      </header>
      <main>
        <h2 className='text-red-500 font-bold text-center pt-12'>WHY LEARN WITH TALK THE GLOBE?</h2>
        <div className="relative">
          <img src={assistante} alt="" className="w-full md:p-12" />

          {/* Haut gauche */}
          <div className="md:absolute top-1/4 left-[20%] md:text-white text-center md:w-1/4 text-2xl md:font-bold">
            <h3>⚡ INTERACTIVE ONLINE CLASSES</h3>
            <p>Engaging lessons tailored to your needs</p>
          </div>

          {/* Haut droite */}
          <div className="md:absolute top-1/4 right-[20%] md:text-white text-center md:w-1/4 text-2xl md:font-bold">
            <h3>📝 FREE RESOURCES</h3>
            <p>Access a library of free materials to boost your learning</p>
          </div>

          {/* Bas gauche */}
          <div className="md:absolute bottom-1/4 left-[20%] md:text-white text-center md:w-1/4 text-2xl md:font-bold">
            <h3>📚 PERSONALIZED CURRICULUM</h3>
            <p>Learn at your own pace with customized lessons</p>
          </div>

          {/* Bas droite */}
          <div className="md:absolute bottom-1/4 right-[20%] md:text-white text-center md:w-1/4 text-2xl md:font-bold">
            <h3>🎯 REAL-WORLD APPLICATION</h3>
            <p>Practical exercises to improve retention</p>
          </div>
        </div>
      </main>
      <footer>          
        <h2 className='text-red-500 font-bold text-center text-5xl p-10'>WHAT I OFFER</h2>
        <div className='flex flex-col md:flex-row md:px-32 md:py-4'>

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
    </section>
  );
};

export default Home;
