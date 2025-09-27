import OneToOne from '../assets/onetoone.png';
import SemiPrivate from '../assets/semi-private.png';
import Group from '../assets/Group.png';
import Banner from '../components/Banner/Banner';
import Email from '../components/Email/Email';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Services = () => {
  return (
    <section>
        <Banner 
          Title="Learn English with me!👩🏻‍🏫" 
          Subtitle="Personalized lessons tailored to your goals—whether you're learning for work, travel, or personal growth"
          Span="✨"
        />
        <main className="bg-[#f9f9f4] w-full">
  <h2 className="text-redText font-bold text-center text-3xl sm:text-4xl md:text-5xl px-4 pt-16 md:pb-12">
    <FontAwesomeIcon icon="star" className="text-redText pr-3" />
    CHOOSE THE BEST OPTION FOR YOU !
    <FontAwesomeIcon icon="star" className="text-redText pl-3" />
  </h2>

  {/* Group Classes */}
    <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-auto md:h-[400px]">
    <div className="bg-[#ffe8a3] w-full md:w-1/2 h-auto md:h-full flex flex-col justify-center p-6 sm:p-10">
        <h4 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        <FontAwesomeIcon icon="earth-europe" className="mr-2" />
        Small group classes (3–6 People)
        </h4>
        <ul className="space-y-4 text-lg sm:text-xl">
        <li>Join a small, supportive learning community.</li>
        <li>Fun, interactive lessons covering all skills.</li>
        <li>Great for motivation and conversation practice.</li>
        </ul>
    </div>
    <div className="w-full md:w-1/2 h-auto md:h-full flex justify-center p-6">
        <img src={Group} alt="Group of students" className="max-h-full object-contain" />
    </div>
    </div>


  {/* Semi Private */}
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-auto md:h-[400px]">
    <div className="w-full md:w-1/2 h-auto md:h-full flex justify-center p-6">
        <img src={SemiPrivate} alt="Semi-private lesson" className="max-h-full object-contain" />
    </div>
    <div className="bg-greenSelf w-full md:w-1/2 h-auto md:h-full flex flex-col justify-center p-6 sm:p-10">
        <h4 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        <FontAwesomeIcon icon="user-group" className="mr-2" />
        Semi-private lessons (2 People)
        </h4>
        <ul className="space-y-4 text-lg sm:text-xl">
        <li>Ideal for friends or family learning together.</li>
        <li>Same level required for both students.</li>
        <li>Interactive and engaging lessons at a lower price per person.</li>
        </ul>
    </div>
    </div>


  {/* 1-on-1 */}
    <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-auto md:h-[400px]">
    <div className="bg-purple w-full md:w-1/2 h-auto md:h-full flex flex-col justify-center p-6 sm:p-10">
        <h4 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        <FontAwesomeIcon icon="map-pin" className="mr-2" />
        1-on-1 Private lessons
        </h4>
        <ul className="space-y-4 text-lg sm:text-xl">
        <li>Personalized lessons tailored to your level and goals.</li>
        <li>Flexible scheduling to fit your lifestyle.</li>
        <li>Perfect for rapid progress and customized learning.</li>
        </ul>
    </div>
    <div className="w-full md:w-1/2 h-auto md:h-full flex justify-center p-6">
        <img src={OneToOne} alt="Private lesson" className="max-h-full object-contain" />
    </div>
    </div>


  {/* Call to Action */}
  <div className="text-center text-redText text-2xl sm:text-3xl md:text-4xl flex flex-col sm:flex-row justify-center items-center gap-4 pt-16 px-4">
    <FontAwesomeIcon icon="envelope" className="text-4xl sm:text-5xl" />
    CHOOSE THE BEST OPTION FOR YOU !
    <FontAwesomeIcon icon="envelope" className="text-4xl sm:text-5xl" />
  </div>
    <div className="p-6">
        <Email />
    </div>
</main>

    </section>
  );
};

export default Services;