import Talktheglobe from '../../assets/Talk_the_globe-removebg-preview.png';
import Blackboard from '../../assets/blackboard.png';
import OneToOne from '../../assets/onetoone.png';
import SemiPrivate from '../../assets/semi-private.png';
import Group from '../../assets/Group.png';


const Services = () => {
  return (
    <section>
        <header className='bg-talktheglobe'>
            <div className='text-center p-6 flex md:items-center md:text-left flex-col md:flex-row md:p-0'>
                <img src={Talktheglobe} alt="Logo website"/>
                <div >
                    <h1 className='text-3xl'>LEARN ENGLISH AND SPANISH WITH ME!</h1>
                    <div className='flex flex-row items-center'>
                        <h2 className='text-xl my-6 flex justify-center'>Personalized lessons tailored to your <br /> goals—whether you're learning for work, travel, or personal growth</h2>
                        <img className='w-[20rem]' src={Blackboard} alt="board"/>
                    </div>
                </div>
            </div>
        </header>
        <main className="bg-[url('assets/Backgroundblanc.jpg')] w-full">
            <h3 className='text-center text-redTitle'>CHOOSE THE BEST OPTION FOR YOU!</h3>
            <div className='flex flex-row'>
                <div className='bg-purple flex-1'>
                    <h4 className='text-3xl font-semibold'>📍 1-on-1 Private Lessons</h4>
                    <ul>
                        <li className='text-3xl font-semibold'>Personalized lessons tailored to your level and goals.</li>
                        <li className='text-3xl font-semibold'>Flexible scheduling to fit your lifestyle.</li>
                        <li className='text-3xl font-semibold'>Perfect for rapid progress and customized learning.</li>
                    </ul>                   
                </div>
                <div className='flex-1'>
                    <img src={OneToOne} alt="" />
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='flex-1'>
                    <img src={SemiPrivate} alt="picture representing a group of students for a course"/>
                </div>
                <div className='bg-green flex-1'>
                    <h4 className='text-3xl font-semibold'>👥 Semi-Private Lessons (2 People)</h4>
                    <ul>
                        <li className='text-3xl font-semibold'>Ideal for friends or family learning together.</li>
                        <li className='text-3xl font-semibold'>Same level required for both students.</li>
                        <li className='text-3xl font-semibold'>Interactive and engaging lessons at a lower price per person.</li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='bg-yellow flex-1'>
                    <h4 className='text-3xl font-semibold'>🌍 Small Group Classes (3-6 People) — Coming Soon!</h4>
                    <ul>
                        <li className='text-3xl font-semibold'>Join a small, supportive learning community.</li>
                        <li className='text-3xl font-semibold'>Fun, interactive lessons covering all skills (speaking, listening, reading, and writing).</li>
                        <li className='text-3xl font-semibold'>Great for motivation and conversation practice.</li>
                    </ul>
                </div>
                <div className='flex-1'>
                    <img src={Group} alt="picture representing a group of students for a course"/>
                </div>
            </div>
        </main>
    </section>
  );
};

export default Services;