import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Material } from '../types/types';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();

  const [currentIndex, setCurrentIndex] = useState(0)
  const [material, setMaterial] = useState<Material>();

  const pictures = material
    ? [{ id: "cover", url: material.cover }, ...(material.pictures || [])]
    : [];

  useEffect(() => {
    if (id) {
      getMaterialById(id);
    }
  }, [id]);


  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + pictures.length) % pictures.length)
  }

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % pictures.length)
  }

  const getMaterialById = async (id: string) => {
    try {
      const response = await api.get(`/material/${id}`);
      let material: Material = response.data;

      // Si tu as un champ pdf avec données à décoder
      if (material.pdf && material.pdf.data) {
        const path = new TextDecoder().decode(new Uint8Array(material.pdf.data));
        material = { ...material, pdfUrl: `http://localhost:3000${path}` };
      }

      setMaterial(material); // Met à jour l'état avec l'objet matériel complet

      console.log("Matériel récupéré avec PDF transformé :", material);
    } catch (error) {
      console.error("Erreur lors de la récupération du matériel :", error);
      setMaterial(undefined); // Ou gérer comme tu veux en cas d'erreur
    }
  };
  return (
    <div className="flex-1 flex p-10 items-center bg-[#f9f9f4] justify-center px-[5%]">
      {/* Carrousel + description */}
      <div className="flex flex-col justify-center items-center lg:flex-row gap-8">
        {/* Carrousel */}
        <div className="relative w-full lg:w-[40%] rounded-2xl overflow-hidden border border-gray-200 shadow-md">
          {pictures.length > 0 && (
            <>
              <img
                src={`http://localhost:3000${pictures[currentIndex].url}`}
                alt={`${material?.title} image ${currentIndex + 1}`}
                className="w-full h-[18rem] sm:h-[27rem] md:h-[24rem] lg:h-[25rem] 3xl:h-[30rem] select-none"
                draggable={false}
              />

              {/* Flèches */}
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-2 shadow-lg"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-2 shadow-lg"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>

              {/* Indicateurs */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {pictures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-red-600' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        {/* Description + PDF + date */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-red-600 mb-2">{material?.title}</h1>
            <p className="text-3xl font-bold text-gray-800">{material?.price} €</p>
            <p className="text-gray-700 md:text-xl">{material?.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className='flex gap-5 flex-row'>
              <button
                onClick={e => {
                  e.stopPropagation();
                  addToCart(resource);
                }}
                className="bg-red-600 rounded-full text-white hover:bg-red-700 px-6 py-2 shadow-lg flex items-center gap-2 select-none mt-2"
                type="button"
              >
                ADD TO CART
                <FontAwesomeIcon icon="cart-plus" className="text-white text-lg" />
              </button>
              <button className="bg-red-600 rounded-full text-white hover:bg-red-700 px-6 py-2 shadow-lg flex items-center gap-2 select-none mt-2">
                Buy
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
    </div>
  )
}
