import Banner from '../components/Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Material } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import FadeInSection from "../components/FadeInSection/FadeInSection";
import { useShopMaterials } from '../hooks/useMaterials';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination/Pagination';

const Shop = () => {
  const navigate = useNavigate();
  const [sent, setSent] = useState('');
  const { addToCart } = useCart();
  
  // Use cached materials hook instead of manual API calls
  const { materials, loading, error } = useShopMaterials();
  
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

  const viewProduct = (resource: Material) => {
    navigate(`/product/${resource.id}`);
  };

  return (
    <section>
      <style>
        {`
          @keyframes shopPulse {
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
          .shop-animate {
            animation: shopPulse 2s ease-in-out infinite;
          }
        `}
      </style>
      <Banner
        Title={
          <>
            Teach smarter,<br />
            learn faster 💥
          </>
        }
        Subtitle="Engaging materials to make language learning and teaching easier, more fun, and more effective"
        Span="✅"
      />
      <main className="px-[12%] bg-[#f9f9f4] pb-16">
        <FadeInSection>
          <h2 className="text-text font-extrabold text-center text-6xl sm:text-6xl py-12 md:py-20">
						Let's <span className="text-redText shop-animate">shop!</span>
					</h2>
				</FadeInSection>
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
            <p className="ml-4 text-lg text-gray-600">Loading materials...</p>
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

        {/* Materials count info */}
        {!loading && !error && totalItems > 0 && (
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Showing {currentItems.length} of {totalItems} materials
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </p>
          </div>
        )}

        {/* Materials grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {currentItems.map((resource, index) => (
            <div
              key={index}
              onClick={() => viewProduct(resource)}
              className="flex flex-col justify-between items-center gap-4 p-4 bg-white rounded-xl shadow-md 
                         transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onKeyDown={e => e.key === 'Enter' && viewProduct(resource)}
              role="button"
              tabIndex={0}
            >
              {/* Image */}
              <div className="w-full aspect-[1/1] overflow-hidden rounded-2xl border border-gray-200">
                <img
                  src={`http://localhost:3000${encodeURI(resource.cover)}`}
                  loading="lazy"
                  alt={resource.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>

              {/* Infos produit */}
              <h4 className="text-red-600 font-bold text-xl text-center">
                {resource.stripeName}
              </h4>
              <h3 className="text-2xl font-extrabold text-center">
                {resource.price} €
              </h3>

              {/* Bouton panier */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  addToCart(resource);
                }}
                className="bg-red-600 rounded-full text-white hover:bg-red-700 px-6 py-2 shadow-lg flex items-center gap-2 select-none mt-2 transition-colors duration-300"
                type="button"
              >
                ADD TO CART
                <FontAwesomeIcon icon="cart-plus" className="text-white text-lg" />
              </button>
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

        {/* Section suggestions */}
        <div className="flex flex-col justify-center items-center ">
          <h2 className="text-text font-extrabold text-center text-6xl sm:text-6xl py-20">
            Looking for something specific? 🤔
          </h2>  
          <div className="flex flex-col justify-center items-center mb-2 gap-10">
            <p className="text-2xl text-center">
              Can’t find the kind of resource you need? I’d love to hear your suggestions!
            </p>
            <FontAwesomeIcon icon="envelope-open-text" className="text-redText text-7xl" />
          </div>

          {/* Formulaire suggestion */}
          <div className="flex justify-center items-center w-full max-w-xl">
            <form onSubmit={handleMailSubmit} className="flex flex-col mt-6 w-full">
              <div className="flex flex-col">
                <textarea
                  name="message"
                  placeholder="Hello, what would you like to see?"
                  className="border-2 border-text p-3 my- mb-4 h-32 font-extrabold rounded-md bg-gray-100 text-left focus:outline-none"
                />
              </div>
              <button
                className="bg-[#cba7f8] hover:bg-[#c599fa] text-center border-2 border-[#667175] p-2 rounded-md font-extrabold transition-colors duration-300"
                type="submit"
              >
                Send
              </button>
              <p className="mt-2">{sent}</p>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Shop;
