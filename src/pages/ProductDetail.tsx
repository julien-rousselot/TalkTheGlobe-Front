import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faDownload } from '@fortawesome/free-solid-svg-icons'
import api from '../api';
import { Material } from '../types/types';
import { useParams } from 'react-router-dom';
import { main } from 'framer-motion/client';

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();

  const [currentIndex, setCurrentIndex] = useState(0)
  const [material, setMaterial] = useState<Material>();

  const pictures = material?.pictures || []

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
    <main className="bg-gray-100 h-full px-4 pt-16">
      <div className="max-w-6xl mx-auto p-6 bg-blue-100 rounded-xl shadow-lg">
        {/* Titre + prix */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-red-600 mb-2">{material?.title}</h1>
          <p className="text-3xl font-bold text-gray-800">{material?.price} €</p>
      </div>

      {/* Carrousel + description */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Carrousel */}
        <div className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden border border-gray-200 shadow-md">
          {pictures.length > 0 ? (
            <>
              <img
                src={`http://localhost:3000${pictures[currentIndex].url}`}
                alt={`${material?.title} image ${currentIndex + 1}`}
                className="w-full h-96 object-cover select-none"
                draggable={false}
              />
              {/* Flèches */}
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-2 shadow-lg"
                aria-label="Image précédente"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-2 shadow-lg"
                aria-label="Image suivante"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>

              {/* Indicateurs */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {pictures.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-red-600' : 'bg-gray-300'}`}
                    aria-label={`Voir l'image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <img
              src={`http://localhost:3000${material?.cover}`}
              alt={material?.title}
              className="w-full h-96 object-cover rounded-2xl select-none"
              draggable={false}
            />
          )}
        </div>

        {/* Description + PDF + date */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 mb-6">{material?.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href={material?.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg w-max select-none"
              download
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Télécharger la fiche PDF
            </a>

            <p className="text-gray-500 text-sm italic">
              Publié le : {new Date(material?.publishAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
  )
}
