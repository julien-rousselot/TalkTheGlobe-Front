
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banner from '../components/Banner/Banner';
import Email from '../components/Email/Email';

const Contact = () => {
  return (
    <section>
        <Banner Title="LEARN ENGLISH AND SPANISH WITH ME!" Subtitle="Personalized lessons tailored to your  goals, whether you're learning for work, travel, or personal growth"/>
        <main className="px-[5%] bg-[#f9f9f4] p-16">
          <h2 className='text-redText text-center text-4xl p-4'>
            SEND ME A MESSAGE
          </h2>
          <Email/>
          <div className="py-16 bg-[#f9f9f4]">
            <h2 className="text-redText text-center text-4xl font-bold mb-12">
              PREFER ANOTHER WAY TO REACH ME?
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
              {/* Email */}
              <div className="flex flex-col justify-center items-center text-center bg-talktheglobe p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full md:w-1/3">
                <FontAwesomeIcon icon="envelope" className="text-6xl text-text transition-colors duration-200 mb-4" />
                <p className="text-2xl font-semibold text-[#262a38]">talktheglobe7@gmail.com</p>
              </div>

              {/* Instagram */}
              <div className="flex flex-col justify-center items-center text-center bg-talktheglobe p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full md:w-1/3">
                <FontAwesomeIcon icon={['fab', 'instagram']} className="text-6xl text-text transition-colors duration-200 mb-4" />
                <p className="text-2xl font-semibold text-[#262a38]">@talktheglobe</p>
              </div>

              {/* Messenger */}
              <div className="flex flex-col justify-center items-center text-center bg-talktheglobe p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full md:w-1/3">
                <FontAwesomeIcon icon={['fab', 'facebook-messenger']} className="text-6xl text-text transition-colors duration-200 mb-4" />
                <p className="text-2xl font-semibold text-[#262a38]">Talk The Globe</p>
              </div>
            </div>
          </div>
        </main>
    </section>
  );
};

export default Contact;