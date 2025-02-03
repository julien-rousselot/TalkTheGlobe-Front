import Talktheglobe from '../../assets/Talk_the_globe-removebg-preview.png';
import Student from '../../assets/student.png';
import Teacher from '../../assets/teacher.png';

// Composant Accueil
const Accueil = () => {
  return (
    <section>
      <header className='bg-talktheglobe'>
        <div className='flex items-center'>
          <img src={Talktheglobe} alt="Logo site web"/>
          <div>
            <h1 className='text-3xl'>LEARN ENGLISH AND SPANISH TO EXPLORE THE WORLD! 🗺️</h1>
            <h2 className='text-xl my-6'>Interactive online classes and resources to help you master the language</h2>
            <button className='bg-red-500 rounded-md text-white p-4 text-md hover:bg-red-600'>START LEARNING TODAY! 🚀</button>
          </div>
        </div>
      </header>
      <main>
        <h2 className='text-red-500 font-bold text-center'>WHY LEARN WITH TALK THE GLOBE?</h2>
        <div className='flex bg-orange-400 justify-center w-full'>
          <div className='relative bg-slate-400 w-1/2 flex justify-center'><img src={Student} alt="" /><h3 className='absolute top-1/3 left-1/3'>⚡ INTERACTIVE ONLINE CLASSES</h3><p className='absolute top-1/2'>Engaging lessons tailored to your needs</p></div>
          <div className='relative bg-red-400 w-1/2 flex justify-center'><img src={Teacher} alt="" /><h3 className='absolute top-1/3 left-1/3'>📝 FREE RESOURCES</h3><p className='absolute top-1/2'>Access a library of free materials to boost your learning</p></div>
        </div>
        <div className='flex bg-amber-400 relative justify-center'>
        <div className='relative bg-blue-400 w-1/2 flex justify-center'><img src={Student} alt="" /><h3 className='absolute top-1/3 left-1/3'>⚡ INTERACTIVE ONLINE CLASSES</h3><p className='absolute top-1/2'>Engaging lessons tailored to your needs</p></div>
        <div className='relative bg-green-400 w-1/2 flex justify-center'><img src={Teacher} alt="" /><h3 className='absolute top-1/3 left-1/3'>📝 FREE RESOURCES</h3><p className='absolute top-1/2'>Access a library of free materials to boost your learning</p></div>
        </div>
        
      </main>
      <footer>          
        <h2 className='text-red-500 font-bold text-center'>WHAT I OFFER</h2>

        <div className=' flex flex-row'>
          <div className='bg-talktheglobe w-1/2 '>
            <h3>I’m a student!</h3>
            <img src={Student} alt="" />
            <div>
              <button className='bg-black text-white rounded-md p-4 text-lg'>Free ressources</button>
              <button className='bg-black text-white rounded-md p-4 text-lg'>Classes</button>
            </div>
          </div>
          <div className='bg-blue-400 w-1/2'>
            <h3>I’m a teacher!</h3>
            <img src={Teacher} alt="" />
            <div className='bg-red-500 flex justify-around'>
              <button className='bg-black text-white rounded-md p-4 text-lg'>Free ressources</button>
              <button className='bg-black text-white rounded-md p-4 text-lg'>Shop</button>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Accueil;
