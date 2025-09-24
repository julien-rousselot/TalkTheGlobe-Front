// Cookie consent utilities
export interface CookiePreferences {
  necessary: boolean;
  marketing: boolean;
  analytics: boolean;
}

export const cookieUtils = {
  // Check if user has given consent
  hasConsent: (): boolean => {
    const consent = localStorage.getItem('cookieConsent');
    return consent === 'accepted' || consent === 'custom';
  },

  // Check if user has given marketing consent (for newsletter)
  hasMarketingConsent: (): boolean => {
    const consent = localStorage.getItem('cookieConsent');
    
    if (consent === 'accepted') {
      return true; // Accepted all cookies
    }
    
    if (consent === 'custom') {
      const preferences = localStorage.getItem('cookiePreferences');
      if (preferences) {
        const parsed: CookiePreferences = JSON.parse(preferences);
        return parsed.marketing;
      }
    }
    
    return false;
  },

  // Check if user has given analytics consent
  hasAnalyticsConsent: (): boolean => {
    const consent = localStorage.getItem('cookieConsent');
    
    if (consent === 'accepted') {
      return true;
    }
    
    if (consent === 'custom') {
      const preferences = localStorage.getItem('cookiePreferences');
      if (preferences) {
        const parsed: CookiePreferences = JSON.parse(preferences);
        return parsed.analytics;
      }
    }
    
    return false;
  },

  // Get user consent status
  getConsentStatus: (): 'pending' | 'accepted' | 'declined' | 'custom' => {
    const consent = localStorage.getItem('cookieConsent');
    return (consent as any) || 'pending';
  },

  // Get consent date
  getConsentDate: (): Date | null => {
    const dateStr = localStorage.getItem('consentDate');
    return dateStr ? new Date(dateStr) : null;
  },

  // Clear all consent (for testing or reset)
  clearConsent: (): void => {
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookiePreferences');
    localStorage.removeItem('consentDate');
  },

  // Check if consent is still valid (e.g., within 12 months)
  isConsentValid: (): boolean => {
    const consentDate = cookieUtils.getConsentDate();
    if (!consentDate) return false;
    
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    return consentDate > twelveMonthsAgo;
  }
};

// Hook for React components
import { useState, useEffect } from 'react';

export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState(false);
  const [hasMarketingConsent, setHasMarketingConsent] = useState(false);
  const [consentStatus, setConsentStatus] = useState<'pending' | 'accepted' | 'declined' | 'custom'>('pending');

  useEffect(() => {
    const updateConsentState = () => {
      setHasConsent(cookieUtils.hasConsent());
      setHasMarketingConsent(cookieUtils.hasMarketingConsent());
      setConsentStatus(cookieUtils.getConsentStatus());
    };

    updateConsentState();

    // Listen for localStorage changes (in case user changes consent in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookieConsent' || e.key === 'cookiePreferences') {
        updateConsentState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    hasConsent,
    hasMarketingConsent,
    consentStatus,
    canCollectEmails: hasMarketingConsent,
    canUseAnalytics: cookieUtils.hasAnalyticsConsent()
  };
};
