// Storage configuration for handling local vs Cloudflare R2 URLs
interface StorageConfig {
  baseUrl: string;
  isR2: boolean;
}

/**
 * 🔧 CLOUDFLARE R2 CONFIGURATION GUIDE
 * 
 * NEW R2 URL format detected: https://pub-a69e81e1c8964a66b52f33ccfcf0da8d.r2.dev/...
 * This is the public R2 domain format
 */
const storageConfig: StorageConfig = {
  // 🔹 CLOUDFLARE R2 (handles both old and new domains)
  baseUrl: '', // Empty since backend returns full R2 URLs
  isR2: true
  
  // 🔹 LOCAL DEVELOPMENT (comment out when using R2)
  // baseUrl: 'http://localhost:3000',
  // isR2: false
};

/**
 * Returns a placeholder image as base64 data URL (always works, no external dependencies)
 * @returns Base64 encoded SVG placeholder
 */
export const getPlaceholderImage = (): string => {
  // Gray placeholder with "No Image" text - 200x200 SVG
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
};

/**
 * Detects if URL is a Cloudflare R2 URL
 * @param url - URL to check
 * @returns true if R2 URL, false otherwise
 */
export const isR2Url = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.includes('.r2.dev/');
};

/**
 * Get the full image URL with proper handling for R2 vs local paths
 * @param imagePath - Image path from backend (could be local path or full R2 URL)
 * @returns Full URL to display the image
 */
export const getImageUrl = (imagePath: string | null | undefined): string => {
  // Return placeholder if no path provided
  if (!imagePath) {
    return getPlaceholderImage();
  }

  // If already a complete R2 URL, use it directly
  if (isR2Url(imagePath)) {
    return imagePath;
  }

  // If using R2 but got a local path, this is an error
  if (storageConfig.isR2 && imagePath.startsWith('/uploads/')) {
    return getPlaceholderImage();
  }

  // Local development - construct full URL
  if (!storageConfig.isR2) {
    const baseUrl = storageConfig.baseUrl.endsWith('/') ? storageConfig.baseUrl.slice(0, -1) : storageConfig.baseUrl;
    const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${baseUrl}${path}`;
  }
  return getPlaceholderImage();
};

export default storageConfig;
