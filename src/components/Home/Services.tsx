import Blackboard from '../../assets/blackboard.png';
import OneToOne from '../../assets/onetoone.png';
import SemiPrivate from '../../assets/semi-private.png';
import Group from '../../assets/Group.png';
import Banner from '../Banner/Banner';
import Email from '../Email/Email';


const Services = () => {
  return (
    <section>
        <Banner Title="LEARN ENGLISH AND SPANISH WITH ME!" Subtitle="Personalized lessons tailored to your  goals, whether you're learning for work, travel, or personal growth" Image={Blackboard} ButtonText=""/>
        <main className="bg-[url('assets/Backgroundblanc.jpg')] w-full">
            <h3 className='text-center text-redTitle text-4xl p-10'>CHOOSE THE BEST OPTION FOR YOU!</h3>
            <div className='flex flex-col-reverse md:flex-row'>
                <div className='bg-purple flex-1 pb-8 md:pb-0'>
                    <h4 className='text-3xl p-8'>📍 1-on-1 Private Lessons</h4>
                    <ul>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Personalized lessons tailored to your level and goals.</li>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Flexible scheduling to fit your lifestyle.</li>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Perfect for rapid progress and customized learning.</li>
                    </ul>                   
                </div>
                <div className='flex-1 flex justify-center'>
                    <img src={OneToOne} alt="" />
                </div>
            </div>
            <div className='flex flex-col md:flex-row'>
                <div className='flex-1 flex justify-center'>
                    <img src={SemiPrivate} alt="picture representing a group of students for a course"/>
                </div>
                <div className='bg-green flex-1 justify-center' >
                    <h4 className='text-3xl p-8'>👥 Semi-Private Lessons (2 People)</h4>
                    <ul>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Ideal for friends or family learning together.</li>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Same level required for both students.</li>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Interactive and engaging lessons at a lower price per person.</li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-col-reverse md:flex-row'>
                <div className='bg-[#ffe8a3] flex-1'>
                    <h4 className='text-3xl p-8'>🌍 Small Group Classes (3-6 People) — Coming Soon!</h4>
                    <ul>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Join a small, supportive learning community.</li>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Fun, interactive lessons covering all skills (speaking, listening, reading, and writing).</li>
                        <li className='text-3xl px-8 pb-6 md:px-12'>Great for motivation and conversation practice.</li>
                    </ul>
                </div>
                <div className='flex-1 flex justify-center'>
                    <img src={Group} alt="picture representing a group of students for a course"/>
                </div>
            </div>
        </main>
        <Email/>
    </section>
  );
};

export default Services;