import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkExistingConsent();
  }, []);

  const checkExistingConsent = async () => {
    try {
      // First check localStorage for quick response
      const localConsent = localStorage.getItem('cookieConsent');
      if (localConsent) {
        return; // User already made a choice
      }

      // 🎯 Check with backend using your API structure
      const response = await fetch('http://localhost:3000/api/consent/check', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.has_consent) {
          // 🎉 User already has consent recorded, sync with localStorage
          localStorage.setItem('cookieConsent', data.consent_type);
          localStorage.setItem('cookiePreferences', JSON.stringify({
            necessary: data.functional_allowed,
            marketing: data.marketing_allowed,
            analytics: data.analytics_allowed
          }));
          localStorage.setItem('consentDate', data.timestamp);
          return; // Don't show banner
        }
      }

      // No consent found, show banner after delay
      setTimeout(() => setIsVisible(true), 2000);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('❌ Error checking consent:', error);
      }
      // Show banner on error to be safe
      setTimeout(() => setIsVisible(true), 2000);
    }
  };

  const sendConsentToBackend = async (consentType: 'accepted' | 'declined' | 'custom', preferences?: any) => {
    try {
      // 🎯 Match backend API structure exactly
      const consentData = {
        consent_type: consentType,
        marketing_allowed: preferences?.marketing ?? (consentType === 'accepted'),
        functional_allowed: preferences?.necessary ?? true, // Always true for necessary cookies
        analytics_allowed: preferences?.analytics ?? (consentType === 'accepted')
      };

      const response = await fetch('http://localhost:3000/api/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for IP tracking
        body: JSON.stringify(consentData)
      });

      if (!response.ok) {
        throw new Error('Failed to record consent');
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleAccept = async () => {
    setIsSubmitting(true);
    
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('consentDate', new Date().toISOString());
    
    await sendConsentToBackend('accepted');
    
    setIsVisible(false);
    setIsSubmitting(false);
    onAccept?.();
  };

  const handleDecline = async () => {
    setIsSubmitting(true);
    
    // Store locally for immediate UI response
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('consentDate', new Date().toISOString());
    
    await sendConsentToBackend('declined');

    setIsVisible(false);
    setIsSubmitting(false); 
    onDecline?.();
  };

  const handleAcceptSelected = async () => {
    setIsSubmitting(true);
    
    const necessary = (document.getElementById('necessary-cookies') as HTMLInputElement)?.checked;
    const marketing = (document.getElementById('marketing-cookies') as HTMLInputElement)?.checked;
    const analytics = (document.getElementById('analytics-cookies') as HTMLInputElement)?.checked;

    const preferences = {
      necessary: necessary || true, // Always true for necessary cookies
      marketing: marketing || false,
      analytics: analytics || false,
    };

    // Store locally for immediate UI response
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    localStorage.setItem('consentDate', new Date().toISOString());
    
    await sendConsentToBackend('custom', preferences);

    setIsVisible(false);
    setIsSubmitting(false);
    onAccept?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto p-6">
        {!showDetails ? (
          // Simple consent banner
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon="cookie-bite" className="text-amber-500 text-2xl flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="text-gray-600">
                  We use cookies and similar technologies to collect data for our newsletter, 
                  analyze website usage, and improve your learning experience.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 underline text-sm"
              >
                Customize
              </button>
              <button
                onClick={handleDecline}
                disabled={isSubmitting}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors disabled:cursor-not-allowed"
              >
                <FontAwesomeIcon 
                  icon={isSubmitting ? faSpinner : faTimes} 
                  className={`mr-2 ${isSubmitting ? 'animate-spin' : ''}`} 
                />
                {isSubmitting ? 'Saving...' : 'Decline'}
              </button>
              <button
                onClick={handleAccept}
                disabled={isSubmitting}
                className="px-6 py-2 bg-text text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors font-medium disabled:cursor-not-allowed"
              >
                <FontAwesomeIcon 
                  icon={isSubmitting ? faSpinner : faCheck} 
                  className={`mr-2 ${isSubmitting ? 'animate-spin' : ''}`} 
                />
                {isSubmitting ? 'Saving...' : 'Accept All'}
              </button>
            </div>
          </div>
        ) : (
          // Detailed consent form
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Cookie Preferences</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon="times" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="necessary-cookies"
                  checked={true}
                  disabled={true}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="necessary-cookies" className="font-medium text-gray-900">
                    Necessary Cookies <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    Essential for the website to function properly. These cannot be disabled.
                  </p>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  id="marketing-cookies"
                  defaultChecked={true}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="marketing-cookies" className="font-medium text-gray-900">
                    Marketing & Newsletter Cookies
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    Used to collect email addresses for our newsletter and educational content updates. 
                    This helps us send you relevant learning materials and course announcements.
                  </p>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  id="analytics-cookies"
                  defaultChecked={false}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="analytics-cookies" className="font-medium text-gray-900">
                    Analytics Cookies
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    Help us understand how visitors interact with our website to improve your experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-xs text-gray-500">
                You can change your preferences at any time in our privacy settings.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDecline}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon 
                    icon={isSubmitting ? faSpinner : faTimes} 
                    className={`mr-2 ${isSubmitting ? 'animate-spin' : ''}`} 
                  />
                  {isSubmitting ? 'Saving...' : 'Decline All'}
                </button>
                <button
                  onClick={handleAcceptSelected}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors font-medium disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon 
                    icon={isSubmitting ? faSpinner : faCheck} 
                    className={`mr-2 ${isSubmitting ? 'animate-spin' : ''}`} 
                  />
                  {isSubmitting ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
