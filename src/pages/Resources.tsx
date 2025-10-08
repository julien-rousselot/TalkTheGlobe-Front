import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useResourceMaterials } from '../hooks/useMaterials';
import { usePagination } from '../hooks/usePagination';
import { getImageUrl } from '../config/storage';
import Banner from '../components/Banner/Banner';
import FadeInSection from "../components/FadeInSection/FadeInSection";
import Pagination from '../components/Pagination/Pagination';

const Resources = () => {
  const [sent, setSent] = useState('');
  
  // Use cached materials hook instead of manual API calls
  const { materials, loading, error } = useResourceMaterials();
  
  // Add pagination (8 items per page)
  const {
    currentItems,
    currentPage,
    totalPages,
    totalItems,
    goToPage
  } = usePagination({ items: materials, itemsPerPage: 8 });

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

  return (
    <section>
      <style>
        {`
          @keyframes learnPulse {
            0%, 100% { 
              transform: scale(1);
              filter: brightness(1);
            }
            50% { 
              transform: scale(1.1);
              filter: brightness(1.2);
              text-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
            }
          }
          .learn-animate {
            animation: learnPulse 2s ease-in-out infinite;
          }
        `}
      </style>
      <Banner
        Title="Free materials to boost your English!🚀"
        Subtitle="The perfect place to boost your classes or practice on your own with downloadable and free materials!"
        Span="📚"
      />
      <main className="px-[12%] md:px-[5%] bg-[#f9f9f4] pb-16">
        <FadeInSection>
          <h2 className="text-text font-extrabold text-center text-6xl sm:text-6xl py-12 md:py-20">
            Let's <span className="text-redText learn-animate">learn!</span>
          </h2>
        </FadeInSection>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
            <p className="ml-4 text-lg text-gray-600">Loading resources...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center text-red-600">
              <FontAwesomeIcon icon="exclamation-triangle" className="text-4xl mb-4" />
              <p className="text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Resources count info */}
        {!loading && !error && totalItems > 0 && (
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Showing {currentItems.length} of {totalItems} resources
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </p>
          </div>
        )}

        {/* Resources grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {currentItems.map((resource, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center gap-4 p-4 bg-white rounded-xl shadow-md
                transform transition-transform duration-300 hover:scale-105 cursor-pointer"            >
              <div className="flex flex-col items-center gap-4 flex-grow">
                <div className="w-full aspect-[1/1] overflow-hidden rounded-2xl border">
                  <img
                    src={getImageUrl(resource.cover)}
                    loading="lazy"
                    className="w-full h-full"
                    alt={resource.title}
                  />
                </div>
              <h4 className="text-red-600 font-bold text-xl text-left w-full">
                  {resource.title}
                </h4>
                <p className="text-center text-md line-clamp-3">{resource.description}</p>
              </div>
              <a href={resource.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-redText rounded-full text-white hover:bg-red-700 p-3 px-8 shadow-lg mt-6 inline-block text-center"
              >
                Download
              </a>
            </div>
          ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        )}

        <div className='flex flex-col justify-center items-center mt-20'>
          <h2 className='text-redText text-center text-4xl p-4'>
            LOOKING FOR SOMETHING SPECIFIC?
          </h2>     
          <div className='flex flex-col justify-center items-center mb-2 gap-10'>
            <p className='text-2xl text-center'>Can’t find the kind of resource you need? I’d love to hear your suggestions!</p>
            <FontAwesomeIcon icon="envelope-open-text" className="text-redText text-7xl" />
          </div>
          <div className='flex justify-center items-center w-full max-w-xl'>
            <form onSubmit={handleMailSubmit} className='flex flex-col mt-6 w-full'>
              <div className='flex flex-col'>
                <textarea
                  name='message'
                  placeholder='Hello, what would you like to see?'
                  className='border-2 border-text p-3 my-2 mb-4 h-32 rounded-md bg-gray-100 font-extrabold text-left focus:outline-none'
                />
              </div>
              <button
                className='bg-[#cba7f8] hover:bg-[#c599fa] text-center border-2 border-[#667175] p-2 rounded-md font-extrabold'
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