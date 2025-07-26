import Banner from '../components/Banner/Banner';
import world from '../assets/1stparagraph-world.png';
import board from '../assets/2ndparagraph-me.jpeg';
import computer from '../assets/3rdparagraph-computer.png';
import FadeInSection from "../components/FadeInSection/FadeInSection";

const AboutMe = () => {

  return (
    <section>
			<Banner Title="LEARN ENGLISH AND SPANISH WITH ME!" Subtitle="Personalized lessons tailored to your  goals, whether you're learning for work, travel, or personal growth"/>
			<main className='bg-[#f9f9f4] px-44'>
				<FadeInSection>
					<h2 className='text-redText font-bold text-center text-5xl pt-20'>
							MY STORY
					</h2>
				</FadeInSection>
				<div className='p-10'>
					<FadeInSection>
						<div className='flex flex-row justify-between items-center pb-5'>
							<p className='text-2xl pr-10'>Growing up, I always had a passion for languages and teaching. From a young age, I was fascinated by how language connects people, opening doors to new opportunities and experiences. This curiosity led me to pursue a degree in Education with a major in linguistic.</p>
							<img className='w-[200px]' src={world} alt="" />
						</div>
					</FadeInSection>
					<FadeInSection>
						<div className='flex flex-row justify-between items-center p-5'>
							<img className='w-[40%]' src={board} alt="" />
							<p className='text-2xl pl-10'>After earning my Master’s in teaching Spanish as a foreign language and also my TESOL, I have worked in Spain, Ireland and France. I believe  that learning a language is not just about grammar or vocabulary, it’s about building bridges between cultures. My goal as a teacher is to make learning an exciting journey.</p>
						</div>
					</FadeInSection>
					<FadeInSection>
						<div className='flex flex-row justify-between items-center pt-5'>
							<p className='text-2xl pr-10'>What makes my teaching unique is my interactive and personalized approach. Whether it’s through fun activities, cultural discussions, or real-life scenarios, I ensure every lesson is tailored to your needs. I firmly believe that learning a language should be both effective and enjoyable, and I’m here to guide you every step of the way.</p>
							<img className='w-[300px]' src={computer} alt="" />
						</div>
					</FadeInSection>
				</div>
			</main>
    </section>
  )
}

export default AboutMe;
