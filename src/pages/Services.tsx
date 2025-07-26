import Blackboard from '../assets/blackboard.png';
import OneToOne from '../assets/onetoone.png';
import SemiPrivate from '../assets/semi-private.png';
import Group from '../assets/Group.png';
import Banner from '../components/Banner/Banner';
import Email from '../components/Email/Email';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Services = () => {
  return (
    <section>
        <Banner Title="LEARN ENGLISH AND SPANISH WITH ME!" Subtitle="Personalized lessons tailored to your  goals, whether you're learning for work, travel, or personal growth" Image={Blackboard}/>
        <main className="bg-[#f9f9f4] w-full">
        <h2 className='text-redText font-bold text-center text-5xl p-20'>
            <FontAwesomeIcon icon="star" className="text-redText pr-5" />
            CHOOSE THE BEST OPTION FOR YOU !
            <FontAwesomeIcon icon="star" className="text-redText pl-5" />
        </h2>
            <div className='flex flex-col-reverse md:flex-row w-full justify-center h-[400px]'>
                <div className='bg-[#ffe8a3] w-[50%] h-full flex justify-center flex-col'>
                <h4 className='text-3xl font-bold p-8 text-center'><FontAwesomeIcon icon="earth-europe" className='text-3xl '/> Small Group Classes (3-6 People) — Coming Soon!</h4>
                    <ul>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Join a small, supportive learning community.</li>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Fun, interactive lessons covering all skills (speaking, listening, reading, and writing).</li>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Great for motivation and conversation practice.</li>
                    </ul>
                </div>
                <div className='flex-1 flex justify-center w-[50%] h-full'>
                    <img src={Group} alt="picture representing a group of students for a course"/>
                </div>
            </div>

            <div className='flex flex-col md:flex-row items-center w-full h-[400px]'>
                <div className='flex-1 flex justify-center w-[50%] h-full'>
                    <img src={SemiPrivate} className='p-10' alt="picture representing a group of students for a course"/>
                </div>
                <div className='bg-green w-[50%] h-full flex justify-center flex-col' >
                <h4 className='text-3xl font-bold p-8 text-center'><FontAwesomeIcon icon="user-group" className='text-3xl '/> Semi-Private Lessons (2 People)</h4>
                    <ul>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Ideal for friends or family learning together.</li>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Same level required for both students.</li>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Interactive and engaging lessons at a lower price per person.</li>
                    </ul>
                </div>
            </div>
            
            <div className='flex flex-col-reverse items-center md:flex-row h-[400px]'>
                <div className='bg-purple pb-8 md:pb-0 w-[50%] h-full flex justify-center flex-col'>
                    <h4 className='text-3xl font-bold p-8 text-center'><FontAwesomeIcon icon="map-pin" className='text-3xl '/> 1-on-1 Private Lessons</h4>
                    <ul>
                        <li className='text-3xl px-8 pb-6 md:px-12 m-auto'>Personalized lessons tailored to your level and goals.</li>
                        <li className='text-3xl px-8 pb-6 md:px-12 m-auto'>Flexible scheduling to fit your lifestyle.</li>
                        <li className='text-3xl px-8 pb-6 md:px-12 m-auto'>Perfect for rapid progress and customized learning.</li>
                    </ul>                   
                </div>
                <div className='flex justify-center w-[50%] h-full'>
                    <img src={OneToOne} alt="" />
                </div>
            </div>
            <div className='text-center text-redText text-4xl flex flex-row justify-center items-center gap-8 pt-20'>
                <FontAwesomeIcon icon="envelope" className='text-5xl'/>
                CHOOSE THE BEST OPTION FOR YOU ! 
                <FontAwesomeIcon icon="envelope" className='text-5xl'/>
            </div>     
            <Email/>
        </main>
    </section>
  );
};

export default Services;