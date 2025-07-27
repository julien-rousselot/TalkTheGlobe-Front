import Banner from '../components/Banner/Banner';
import world from '../assets/1stparagraph-world.png';
import board from '../assets/2ndparagraph-me.jpeg';
import computer from '../assets/3rdparagraph-computer.png';
import FadeInSection from "../components/FadeInSection/FadeInSection";

const AboutMe = () => {

	return (
		<section>
			<Banner
				Title="LEARN ENGLISH AND SPANISH WITH ME!"
				Subtitle="Personalized lessons tailored to your goals, whether you're learning for work, travel, or personal growth"
			/>
			<main className="bg-[#f9f9f4] px-6 sm:px-12 lg:px-20 xl:px-32">
				<FadeInSection>
					<h2 className="text-redText font-bold text-center text-4xl sm:text-5xl pt-20">
						MY STORY
					</h2>
				</FadeInSection>

				<div className="py-10 space-y-10">
					<FadeInSection>
						<div className="flex flex-col lg:flex-row justify-between items-center gap-6">
							<p className="text-lg sm:text-xl lg:text-2xl text-justify lg:pr-10">
								Growing up, I always had a passion for languages and teaching.
								From a young age, I was fascinated by how language connects
								people, opening doors to new opportunities and experiences. This
								curiosity led me to pursue a degree in Education with a major in
								linguistic.
							</p>
							<img className="w-[200px] sm:w-[250px] lg:w-[200px]" src={world} alt="world" />
						</div>
					</FadeInSection>

					<FadeInSection>
						<div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-6">
							<img className="w-full sm:w-[80%] lg:w-[40%]" src={board} alt="board" />
							<p className="text-lg sm:text-xl lg:text-2xl text-justify lg:pl-10">
								After earning my Master’s in teaching Spanish as a foreign
								language and also my TESOL, I have worked in Spain, Ireland and
								France. I believe that learning a language is not just about
								grammar or vocabulary, it’s about building bridges between
								cultures. My goal as a teacher is to make learning an exciting
								journey.
							</p>
						</div>
					</FadeInSection>

					<FadeInSection>
						<div className="flex flex-col lg:flex-row justify-between items-center gap-6">
							<p className="text-lg sm:text-xl lg:text-2xl text-justify lg:pr-10">
								What makes my teaching unique is my interactive and personalized
								approach. Whether it’s through fun activities, cultural
								discussions, or real-life scenarios, I ensure every lesson is
								tailored to your needs. I firmly believe that learning a language
								should be both effective and enjoyable, and I’m here to guide you
								every step of the way.
							</p>
							<img className="w-[250px] sm:w-[300px] lg:w-[300px]" src={computer} alt="computer" />
						</div>
					</FadeInSection>
				</div>
			</main>
		</section>
	);
}

export default AboutMe;
