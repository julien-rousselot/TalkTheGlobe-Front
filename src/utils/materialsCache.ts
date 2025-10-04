import { Material } from '../types/types';

interface CacheData {
  materials: Material[];
  timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const SHOP_CACHE_KEY = 'shopMaterials';
const RESOURCES_CACHE_KEY = 'resourceMaterials';

export const materialsCache = {
  // Get cached shop materials
  getShopMaterials: (): Material[] | null => {
    try {
      const cached = localStorage.getItem(SHOP_CACHE_KEY);
      if (!cached) return null;

      const { materials, timestamp }: CacheData = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now - timestamp > CACHE_DURATION) {
        localStorage.removeItem(SHOP_CACHE_KEY);
        return null;
      }

      return materials;
    } catch {
      localStorage.removeItem(SHOP_CACHE_KEY);
      return null;
    }
  },

  // Cache shop materials
  setShopMaterials: (materials: Material[]) => {
    try {
      const cacheData: CacheData = {
        materials,
        timestamp: Date.now()
      };
      localStorage.setItem(SHOP_CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Failed to cache shop materials:', error);
      }
    }
  },

  // Get cached resource materials
  getResourceMaterials: (): Material[] | null => {
    try {
      const cached = localStorage.getItem(RESOURCES_CACHE_KEY);
      if (!cached) return null;

      const { materials, timestamp }: CacheData = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now - timestamp > CACHE_DURATION) {
        localStorage.removeItem(RESOURCES_CACHE_KEY);
        return null;
      }

      return materials;
    } catch {
      localStorage.removeItem(RESOURCES_CACHE_KEY);
      return null;
    }
  },

  // Cache resource materials
  setResourceMaterials: (materials: Material[]) => {
    try {
      const cacheData: CacheData = {
        materials,
        timestamp: Date.now()
      };
      localStorage.setItem(RESOURCES_CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Failed to cache resource materials:', error);
      }
    }
  },

  // Clear all materials cache
  clearCache: () => {
    try {
      localStorage.removeItem(SHOP_CACHE_KEY);
      localStorage.removeItem(RESOURCES_CACHE_KEY);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Failed to clear materials cache:', error);
      }
    }
  },

  // Clear specific cache
  clearShopCache: () => {
    try {
      localStorage.removeItem(SHOP_CACHE_KEY);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Failed to clear shop cache:', error);
      }
    }
  },

  clearResourceCache: () => {
    try {
      localStorage.removeItem(RESOURCES_CACHE_KEY);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Failed to clear resource cache:', error);
      }
    }
  }
};