import Banner from '../components/Banner/Banner';
import your from '../assets/yourvsyoure.png';
import colours from '../assets/thecolours.png';
import pronons from '../assets/pronouns.png';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const Resources = () => {
  const [sent, setSent] = useState('');
  const [materials, setMaterials] = useState<any[]>([]);

  useEffect(() => {
    getFreeMaterials();
  }, []);

  const handleMailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formdata = new FormData(form);
    const message = formdata.get('message');

    await fetch("http://localhost:3000/api/send-suggestion", {
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

  const getFreeMaterials = async () => {
    try {
      const response = await api.get('/materials/resource');
      // console.log("Matériaux sans prix récupérés :", response.data);
      setMaterials(response.data);
      response.data.forEach((material: any) => {
        console.log('Material cover URL:', 'http://localhost:3000' + material.cover);
      });
      // console.log('http://localhost:3000' + response.data.cover);
    } catch (error) {
      console.error("Erreur lors de la récupération des matériaux sans prix :", error);
      return [];
    }
  };

  // const resources = [
  //   {
  //     imgUrl: your,
  //     title: "YOUR VS YOU’RE",
  //     desc: "This is a common grammar mistake. Get the guide to never mix them up again!",
  //   },
  //   {
  //     imgUrl: colours,
  //     title: "THE COLOURS",
  //     desc: "Visual flashcards to learn the most common colours in English.",
  //   },
  //   {
  //     imgUrl: pronons,
  //     title: "PERSONAL PRONOUNS",
  //     desc: "Learning a new language means starting with the very basics.",
  //   },
  //   {
  //     imgUrl: pronons,
  //     title: "PERSONAL PRONOUNS",
  //     desc: "Learning a new language means starting with the very basics.",
  //   },
  //   {
  //     imgUrl: pronons,
  //     title: "PERSONAL PRONOUNS",
  //     desc: "Learning a new language means starting with the very basics.",
  //   },
  // ];

  return (
    <section>
      <Banner
        Title="LEARN ENGLISH AND SPANISH WITH ME!"
        Subtitle="Personalized lessons tailored to your  goals, whether you're learning for work, travel, or personal growth"
      />
      <main className="px-[5%] bg-[#f9f9f4] p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {materials.map((resource, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center p-4 bg-white rounded-xl shadow-sm"
            >
              <div className="flex flex-col items-center gap-4 flex-grow">
                <img
                  src={
                    resource.cover 
                      ? `http://localhost:3000${encodeURI(resource.cover)}` 
                      : '/path/to/default-image.jpg'  // image par défaut si cover manquant
                  }                   
                  loading="lazy"
                  className="border rounded-2xl max-w-full h-auto"
                  alt={resource.title}
                />
                <h4 className="text-redText font-bold text-center text-xl">{resource.title}</h4>
                <p className="text-center text-md line-clamp-3">{resource.description}</p>
              </div>
              <a
                href="/files/document.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-redText rounded-full text-white hover:bg-red-700 p-3 px-8 shadow-lg mt-6 inline-block text-center"
              >
                DOWNLOAD
              </a>
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
            <form onSubmit={handleMailSubmit} className='flex flex-col mt-6 w-full'>
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