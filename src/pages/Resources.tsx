import Banner from '../components/Banner/Banner';
import your from '../assets/yourvsyoure.png';
import colours from '../assets/thecolours.png';
import pronons from '../assets/pronouns.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const Resources = () => {
  const [sent, setSent] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formdata = new FormData(form);
    const message = formdata.get('message');

    await fetch("http://localhost:8000/api/send-suggestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    setSent('Message Envoyé');
    console.log(sent);
    form.reset();
  };

  const resources = [
    {
      imgUrl: your,
      title: "YOUR VS YOU’RE",
      desc: "This is a common grammar mistake. Get the guide to never mix them up again!",
    },
    {
      imgUrl: colours,
      title: "THE COLOURS",
      desc: "Visual flashcards to learn the most common colours in English.",
    },
    {
      imgUrl: pronons,
      title: "PERSONAL PRONOUNS",
      desc: "Learning a new language means starting with the very basics.",
    },
  ];

  return (
    <section>
      <Banner
        Title="LEARN ENGLISH AND SPANISH WITH ME!"
        Subtitle="Personalized lessons tailored to your  goals, whether you're learning for work, travel, or personal growth"
      />
      <main className="px-[5%] bg-[#f9f9f4] p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {resources.map((item, i) => (
            <div
              key={i}
              className="flex flex-col justify-between items-center p-4 bg-white rounded-xl shadow-sm"
            >
              <div className="flex flex-col items-center gap-4 flex-grow">
                <img
                  src={item.imgUrl}
                  loading="lazy"
                  className="border rounded-2xl max-w-full h-auto"
                  alt={item.title}
                />
                <h4 className="text-redText font-bold text-center text-xl">{item.title}</h4>
                <p className="text-center text-md line-clamp-3">{item.desc}</p>
              </div>
              <button className="bg-redText rounded-full text-white hover:bg-red-700 p-3 px-8 shadow-lg mt-6">
                DOWNLOAD
              </button>
            </div>
          ))}
        </div>

        <div className='flex flex-col justify-center items-center mt-20'>
          <h2 className='text-redText text-center text-4xl p-4'>
            LOOKING FOR SOMETHING SPECIFIC ?
          </h2>
          <div className='flex flex-col justify-center items-center mb-2 gap-10'>
            <p className='text-2xl text-center'>Can’t find the kind of resource you need ? I’d love to hear your suggestions!</p>
            <FontAwesomeIcon icon="envelope-open-text" className="text-redText text-7xl" />
          </div>
          <div className='flex justify-center items-center w-full max-w-xl'>
            <form onSubmit={handleSubmit} className='flex flex-col mt-6 w-full'>
              <div className='flex flex-col'>
                <textarea
                  name='message'
                  placeholder='Hello, what would you like to see ?'
                  className='border-2 border-text p-1 my-2 mb-4 h-32 rounded-md bg-gray-100 text-left focus:outline-none'
                />
              </div>
              <button
                className='bg-[#cba7f8] hover:bg-[#c599fa] text-center border-2 border-[#667175] p-2 rounded-md font-semibold'
                type="submit"
              >
                Send
              </button>
              <p className='font-semibold'>{sent}</p>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Resources;