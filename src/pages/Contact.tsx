
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banner from '../components/Banner/Banner';
import Email from '../components/Email/Email';
import FadeInSection from '../components/FadeInSection/FadeInSection';

const Contact = () => {
  return (
    <section>
        <Banner 
          Title="Let's connect! 💌" 
          Subtitle="Have questions? Ready to start learning? Send me a message, and I’ll get back to you as soon as possible!"
          Span="💬"
        />
        <main className="px-[10%] md:px-[5%] bg-[#f9f9f4]">
          <FadeInSection>
            <h2 className="text-text font-extrabold text-center text-6xl sm:text-6xl py-20">
              Send me a <span className="text-redText shop-animate">message ✍️</span>
            </h2>
				  </FadeInSection>
          <Email/>
          <div className="py-16 bg-[#f9f9f4]">
            <h2 className="text-redText text-center text-4xl font-bold mb-12">
              PREFER ANOTHER WAY TO REACH ME?
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
              {/* Email */}
              <a 
                href="mailto:talktheglobe7@gmail.com"
                className="flex flex-col justify-center items-center text-center bg-text text-[#F9F9F4] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-1/3 hover:scale-105 cursor-pointer"
              >
                <FontAwesomeIcon icon="envelope" className="text-6xl transition-colors duration-200 mb-4" />
                <p className="text-[1.2rem] font-semibold">talktheglobe7@gmail.com</p>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com/talktheglobe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-center items-center text-center bg-text text-[#F9F9F4] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-1/3 hover:scale-105 cursor-pointer"
              >
                <FontAwesomeIcon icon={['fab', 'instagram']} className="text-6xl transition-colors duration-200 mb-4" />
                <p className="text-[1.2rem] font-semibold">@talktheglobe</p>
              </a>

              {/* Messenger */}
              <a 
                href="https://m.me/talktheglobe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-center items-center text-center bg-text text-[#F9F9F4] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-1/3 hover:scale-105 cursor-pointer"
              >
                <FontAwesomeIcon icon={['fab', 'facebook-messenger']} className="text-6xl transition-colors duration-200 mb-4" />
                <p className="text-[1.2rem] font-semibold">Talk The Globe</p>
              </a>
            </div>
          </div>
        </main>
    </section>
  );
};

export default Contact;