import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [newPhoto, setNewPhoto] = useState('');
  const [materials, setMaterials] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Au montage, récupérer le token du localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      navigate('/');
    } else {
      setToken(savedToken);
    }
  }, [navigate]);

  // Fonction pour récupérer les matériaux, lancée uniquement si token défini
  const fetchMaterials = async () => {
    if (!token) return; // sécurité si token pas encore chargé

    try {
      setLoading(true);
      const res = await api.get('/materials', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(res.data);
      setLoading(false);
    } catch {
      setError('Impossible de charger les matériels');
      setLoading(false);
    }
  };

  // Dès que token est défini, fetch les matériaux
  useEffect(() => {
    if (token) {
      fetchMaterials();
    }
  }, [token]);

  const addPhoto = () => {
    if (newPhoto.trim()) {
      setPhotos([...photos, newPhoto.trim()]);
      setNewPhoto('');
    }
  };

  const submit = async () => {
    if (!title || !description || !price) {
      setError('Veuillez remplir les champs obligatoires');
      return;
    }

    if (!token) {
      setError('Utilisateur non authentifié');
      return;
    }

    setError('');
    try {
      await api.post(
        '/materials',
        { title, description, price: Number(price), coverPhoto, photos },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setCoverPhoto('');
      setPhotos([]);
      fetchMaterials();
    } catch {
      setError('Erreur lors de l’enregistrement');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-[100px] bg-red rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Ajouter un matériel</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Titre *"
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
          placeholder="Prix *"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={price}
          onChange={e => setPrice(e.target.value)}
          min="0"
          step="0.01"
        />
        <input
          type="url"
          placeholder="Photo de couverture (URL)"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={coverPhoto}
          onChange={e => setCoverPhoto(e.target.value)}
        />

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Photos supplémentaires (URL)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Ajouter une photo (URL)"
              className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={newPhoto}
              onChange={e => setNewPhoto(e.target.value)}
            />
            <button
              type="button"
              className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700 transition"
              onClick={addPhoto}
            >
              Ajouter
            </button>
          </div>
          {photos.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              {photos.map((photo, i) => (
                <li key={i} className="break-words">
                  • {photo}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
          onClick={submit}
          disabled={loading}
        >
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>

      <hr className="my-8" />

      <h2 className="text-xl font-semibold mb-4 text-gray-800">Matériels existants</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : materials.length === 0 ? (
        <p>Aucun matériel enregistré pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {materials.map((m) => (
            <li
              key={m.id}
              className="border p-4 rounded shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <h3 className="text-lg font-bold">{m.title}</h3>
              <p className="text-gray-700 mb-1">{m.description}</p>
              <p className="font-semibold text-green-700">{m.price} €</p>
              {m.cover_photo && (
                <img
                  src={m.cover_photo}
                  alt={m.title}
                  className="mt-2 w-full max-h-48 object-cover rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
