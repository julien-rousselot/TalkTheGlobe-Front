import { useState, useEffect } from 'react';
import { Material } from '../types/types';
import { materialsCache } from '../utils/materialsCache';
import api from '../api';

interface UseMaterialsReturn {
  materials: Material[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useShopMaterials = (): UseMaterialsReturn => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const fetchMaterials = async () => {
  try {
    setLoading(true);
    setError(null);

    // Try to get from cache first
    const cachedMaterials = materialsCache.getShopMaterials();
    if (cachedMaterials) {
      // Sort cached materials too, just in case
      const sortedCached = [...cachedMaterials].sort(
        (a, b) => new Date(b.publishAt ?? '').getTime() - new Date(a.publishAt ?? '').getTime()
      );
      setMaterials(sortedCached);
      setLoading(false);
      return;
    }

    // If no cache, fetch from API
    const response = await api.get('/materials/shop');
    const processedMaterials = response.data
      .filter((material: Material) => material.stripePriceId)
      .map((material: Material) => {
        if (material.pdf && material.pdf.data) {
          const path = new TextDecoder().decode(new Uint8Array(material.pdf.data));
          return { ...material, pdfUrl: `http://localhost:3000${path}` };
        }
        return material;
      })
      // 🔹 Sort by publish_at (newest first)
      .sort(
        (a, b) => new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime()
      );

    setMaterials(processedMaterials);

    // Cache the sorted results
    materialsCache.setShopMaterials(processedMaterials);

  } catch (err) {
    setError('Failed to load shop materials');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchMaterials();
  }, []);

  return {
    materials,
    loading,
    error,
    refetch: fetchMaterials
  };
};

export const useResourceMaterials = (): UseMaterialsReturn => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const fetchMaterials = async () => {
  try {
    setLoading(true);
    setError(null);

    // Try to get from cache first
    const cachedMaterials = materialsCache.getResourceMaterials();
    if (cachedMaterials) {
      const sortedCached = [...cachedMaterials].sort(
        (a, b) => new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime()
      );
      setMaterials(sortedCached);
      setLoading(false);
      return;
    }

    // If no cache, fetch from API
    const response = await api.get('/materials/resource');
    const processedMaterials = response.data
      .map((material: Material) => {
        if (material.pdf && material.pdf.data) {
          const path = new TextDecoder().decode(new Uint8Array(material.pdf.data));
          return { ...material, pdfUrl: `http://localhost:3000${path}` };
        }
        return material;
      })
      // 🔹 Sort from newest to oldest by publishAt
      .sort(
        (a, b) => new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime()
      );

    setMaterials(processedMaterials);
    materialsCache.setResourceMaterials(processedMaterials);

  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching resource materials:', error);
    }
    setError('Failed to load resource materials');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchMaterials();
  }, []);

  return {
    materials,
    loading,
    error,
    refetch: fetchMaterials
  };
};