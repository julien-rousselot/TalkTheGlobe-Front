import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Material } from '../types/types';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { materialsCache } from '../utils/materialsCache';
import { getImageUrl } from '../config/storage';
import api from '../api';
import CartModal from '../components/Cart/CartModal';

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0)
  const [material, setMaterial] = useState<Material>();
  const [loading, setLoading] = useState(true);
  const [suggestedProducts, setSuggestedProducts] = useState<Material[]>([]);
  const [suggestedLoading, setSuggestedLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const pictures = material
    ? [...(material.pictures || [])]
    : [];

  useEffect(() => {
    if (id) {
      getMaterialById(id);
      fetchSuggestedProducts(id);
    }
  }, [id]);


  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + pictures.length) % pictures.length)
  }

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % pictures.length)
  }

  const handleBuyNow = () => {
    if (material) {
      addToCart(material);
      setCartOpen(true);
    }
  }

  const handleBackToProducts = () => {
    // Navigate back with state to indicate scroll restoration should happen
    navigate('/shop', { state: { restoreScroll: true } });
  };

  const getMaterialById = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/material/${id}`);
      let material: Material = response.data;

      if (material.pdf && material.pdf.data) {
        const path = new TextDecoder().decode(new Uint8Array(material.pdf.data));
        material = { ...material, pdfUrl: `http://localhost:3000${path}` };
      }

      setMaterial(material); // Met à jour l'état avec l'objet matériel complet
    } catch (error) {
      setMaterial(undefined); // Ou gérer comme tu veux en cas d'erreur
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestedProducts = (currentId: string) => {
    try {
      setSuggestedLoading(true);
      
      // Get materials from localStorage
      const cachedMaterials = materialsCache.getShopMaterials();
      
      if (cachedMaterials && cachedMaterials.length > 0) {
        // Filter out current product and get 4 random products
        const otherProducts = cachedMaterials.filter(product => 
          product.id.toString() !== currentId
        );
        
        // Shuffle and get 4 products
        const shuffled = otherProducts.sort(() => 0.5 - Math.random());
        setSuggestedProducts(shuffled.slice(0, 4));
      } else {
        // No cached materials available
        setSuggestedProducts([]);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error fetching suggested products from cache:', error);
      }
      setSuggestedProducts([]);
    } finally {
      setSuggestedLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center bg-[#f9f9f4] justify-center px-[5%] min-h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="flex-1 flex items-center bg-[#f9f9f4] justify-center px-[5%] py-10 min-h-full">
        <div className="text-center">
          <FontAwesomeIcon icon="exclamation-triangle" className="text-6xl text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f9f9f4] min-h-full">
      {/* Back Button */}
      <div className="px-[5%] pt-4">
        <button
          onClick={handleBackToProducts}
          className="inline-flex items-center px-4 py-4 text-red-600 font-bold hover:text-red-700 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
          Back to Products
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-[12%] md:px-[5%]">
        {/* Carrousel + description */}
        <div className="flex flex-col justify-center items-center lg:flex-row gap-8 w-full max-w-7xl">
        {/* Carrousel */}
        <div className="relative w-full lg:w-[50%] rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
          {pictures.length > 0 ? (
            <>
              <img
                src={getImageUrl(pictures[currentIndex].url)}
                alt={`${material?.title} image ${currentIndex + 1}`}
                className="w-full aspect-[4/3] lg:aspect-[3/2] select-none"
                draggable={false}
              />

              {/* Flèches */}
              {pictures.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </>
              )}

              {/* Indicateurs */}
              {pictures.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {pictures.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-red-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full aspect-[4/3] lg:aspect-[3/2] bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <FontAwesomeIcon icon="image" className="text-6xl text-gray-400 mb-4" />
                <p className="text-gray-500">No image available</p>
              </div>
            </div>
          )}
        </div>
        {/* Description + PDF + date */}
        <div className="lg:w-[50%] flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-4xl font-extrabold text-red-600 mb-2">{material?.title}</h1>
            <p className="text-3xl lg:text-3xl font-bold text-gray-800">{material?.price} €</p>
            <p className="text-gray-700 text-sm leading-relaxed">{material?.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className='flex gap-5 flex-col sm:flex-row'>
              <button
                onClick={e => {
                  e.stopPropagation();
                  if (material) {
                    addToCart(material);
                  }
                }}
                className="bg-red-600 rounded-full text-white hover:bg-red-500 px-8 py-3 shadow-lg flex items-center justify-center gap-2 select-none text-lg font-semibold transition-all duration-300 hover:scale-105"
                type="button"
              >
                ADD TO CART
                <FontAwesomeIcon icon="cart-plus" className="text-white text-lg" />
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-text rounded-full text-white hover:bg-blue-600 px-8 py-3 shadow-lg flex items-center justify-center gap-2 select-none text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                BUY NOW
                <FontAwesomeIcon icon="credit-card" className="text-white text-lg" />
              </button>
            </div>
            {/* <p className="text-gray-500 text-sm italic">
              Publié le : {new Date(material?.publishAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p> */}
          </div>
        </div>
      </div>

      {/* Suggested Products Carousel */}
      <div className="mt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
              <FontAwesomeIcon icon="heart" className="text-red-500" />
              You might also like
              <FontAwesomeIcon icon="heart" className="text-red-500" />
            </h2>
            <p className="text-gray-600">Discover more amazing educational materials</p>
          </div>

          {suggestedLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : suggestedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                    <img
                      src={getImageUrl(product.cover)}
                      alt={product.title}
                      className="aspect-[1/1] w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 relative min-h-[120px]">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 pr-2">
                      {product.title}
                    </h3>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xl font-extrabold text-[#EF4444]">
                        {product.price} €
                      </span>
                        <FontAwesomeIcon                         
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }} icon="cart-plus" className="text-xl hover:text-2xl text-[#DC2626] transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No other products available at the moment.</p>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Cart Modal */}
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
