import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { div } from 'framer-motion/client';

function Dashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [pictures, setPictures] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [publishAt, setPublishAt] = useState<string | null>(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const allImages = cover ? [cover, ...pictures] : pictures;

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      navigate('/');
    } else {
      setToken(savedToken);
    }
  }, [navigate]);

const submitMaterial = async () => {
  if (!title || !description || !cover) {
    setError('Please fill in all required fields');
    return;
  }

  if (!token) {
    setError('User not authenticated');
    return;
  }

  setError('');

  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', String(price));
    formData.append('isDraft', String(isDraft));
    formData.append('cover', cover)
    console.log(isDraft);

    pictures.forEach((pic) => {
      formData.append('pictures', pic);
    });

    if (publishAt) {
      formData.append('publishAt', publishAt);
    }

    await api.post('/material', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    setTitle('');
    setDescription('');
    setPrice('');
    setCover(null);
    setPictures([]);
    setPublishAt(null);
    setError('');
  } catch {
    setError('Error during submission, please try again later.');
  }
};


  const removePhoto = (index: number) => {
    setPictures(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddPictures = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  // Convert FileList to an array
  const newFiles = Array.from(files);

  // Add new pictures without deleting the previous
  setPictures(prev => [...prev, ...newFiles]);

  // Reset the input value to allow re-uploading the same file
  e.target.value = '';
  };

  return (
    <div className='bg-gray-100 py-10'>
      <div className='flex flex-row m-[100px] justify-center gap-5'>
        <div className=" w-1/2 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add your material</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title *"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description *"
              rows={3}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min="0"
              step="0.01"
            />
            <label className="block mb-1 text-lg font-bold">Cover picture</label>
            {/* Ajout cover */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setCover(file);
                  setCurrentIndex(0); // utile si tu as un carrousel et veux revenir à l’image principale
                }
              }}
            />

            {cover && (
              <div className="relative mt-2 w-20 h-20">
                <img
                  src={URL.createObjectURL(cover)}
                  alt="Cover Preview"
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => setCover(null)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700"
                  title="Supprimer la cover"
                >
                  &times;
                </button>
              </div>
            )}


            <div>
              {/* Ajout de plusieurs photos */}
              <label className="block mb-1 font-bold text-lg text-gray-700">More pictures</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAddPictures}
              />
              {pictures.length > 0 && (
                <ul className="mt-2 text-gray-600 gap-2 flex flex-row flex-wrap">
                  {pictures.map((photo, i) => (
                    <li key={i} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Aperçu ${i + 1}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700"
                        title="Supprimer cette photo"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
            )}
            <button
              className="bg-text w-[150px] mr-10 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
              onClick={submitMaterial}
              disabled={!!error}
            >
              {loading ? 'Loading...' : 'Send Material'}
            </button>
            <label className='bg-gray-200 p-3 rounded-lg text-text font-semibold'>
              <input
                className='mr-2'
                type="checkbox"
                checked={isDraft}
                onChange={(e) => (setIsDraft(e.target.checked), console.log(isDraft))}
              />
              Check to draft
            </label>
          </div> 
          <div className='flex flex-row rounded-lg bg-text text-white border-lg p-4 my-2 items-center justify-center gap-5'>           
            <label htmlFor="publishAt">Planified Date</label>
            <input
              className='p-2 rounded-lg text-text'
              id="publishAt"
              type="datetime-local"
              value={publishAt || ''}
              onChange={(e) => setPublishAt(e.target.value)}
            />
          </div>
        </div>
        <div className='w-full rounded-lg p-10 flex flex-row gap-20 bg-[#E8FDF4]'>
          <div className='w-1/2'>
            {allImages.length > 0 && (
              <div className="relative w-[350px] h-full flex items-center">
                <img
                  src={URL.createObjectURL(allImages[currentIndex])}
                  alt={`Image ${currentIndex + 1}`}
                  className="rounded-lg"
                />

                {/* Flèche gauche */}
                {allImages.length > 1 && (
                  <button
                    onClick={() =>
                      setCurrentIndex((currentIndex - 1 + allImages.length) % allImages.length)
                    }
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 px-3 py-1 rounded-full shadow"
                  >
                    ◀
                  </button>
                )}

                {/* Flèche droite */}
                {allImages.length > 1 && (
                  <button
                    onClick={() => setCurrentIndex((currentIndex + 1) % allImages.length)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 px-3 py-1 rounded-full shadow"
                  >
                    ▶
                  </button>
                )}
              </div>
            )}
          </div>
          <div className='flex flex-col gap-4 w-1/2 break-words p-4 rounded'>
            <h1 className='text-4xl text-text font-bold break-words'>{title}</h1>
            <p className='text-text text-xl break-words'>{description}</p>
            {price && (
              <p className='text-text text-xl'>Price: {price} €</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
