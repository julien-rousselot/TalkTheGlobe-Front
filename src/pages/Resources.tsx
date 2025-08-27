import Banner from '../components/Banner/Banner';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Material } from '../types/types';

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
    form.reset();
  };

const getFreeMaterials = async () => {
  try {
    const response = await api.get('/materials/resource');
    const materials = response.data.map((material: Material) => {
      if (material.pdf && material.pdf.data) {
        const path = new TextDecoder().decode(new Uint8Array(material.pdf.data));
        return { ...material, pdfUrl: `http://localhost:3000${path}` };
      }
      return material;
    });
    setMaterials(materials);
  } catch (error) {
    // Error handled silently
    return [];
  }
};

  return (
    <section>
      <Banner
        Title="LEARN ENGLISH AND SPANISH WITH ME!"
        Subtitle="Personalized lessons tailored to your  goals, whether you're learning for work, travel, or personal growth"
      />
      <main className="px-[5%] bg-[#f9f9f4] p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {[...materials].reverse().map((resource, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center gap-4 p-4 bg-white rounded-xl shadow-md
                transform transition-transform duration-300 hover:scale-105 cursor-pointer"            >
              <div className="flex flex-col items-center gap-4 flex-grow">
                <div className="w-full aspect-[1/1] overflow-hidden rounded-2xl border">
                  <img
                    src={`http://localhost:3000${encodeURI(resource.cover)}`}
                    loading="lazy"
                    className="w-full h-full"
                    alt={resource.title}
                  />
                </div>
                <h4 className="text-redText font-bold text-center text-xl">{resource.title}</h4>
                <p className="text-center text-md line-clamp-3">{resource.description}</p>
              </div>
              <a href={resource.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-redText rounded-full text-white hover:bg-red-700 p-3 px-8 shadow-lg mt-6 inline-block text-center"
              >
                OPEN PDF
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