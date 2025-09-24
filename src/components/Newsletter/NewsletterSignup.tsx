import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCookieConsent } from '../../utils/cookieConsent';

interface NewsletterSignupProps {
  className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const { canCollectEmails, hasMarketingConsent } = useCookieConsent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user has given consent to collect emails
    if (!canCollectEmails) {
      setMessage('Please accept our marketing cookies to subscribe to our newsletter.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Your newsletter signup API call
      const response = await fetch('http://localhost:3000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          consentGiven: hasMarketingConsent,
          consentDate: new Date().toISOString(),
          source: 'website_newsletter'
        }),
      });

      if (response.ok) {
        setMessage('✅ Thank you for subscribing to our newsletter!');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <FontAwesomeIcon icon="envelope" className="text-red-600 text-3xl mb-3" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Stay Updated with English Learning Tips! 📚
        </h3>
        <p className="text-gray-600">
          Get exclusive learning materials, grammar tips, and course updates delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
            disabled={!canCollectEmails}
          />
        </div>

        {!canCollectEmails && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 text-amber-700">
              <FontAwesomeIcon icon="cookie-bite" />
              <p className="text-sm">
                <strong>Cookie consent required:</strong> Please accept marketing cookies to subscribe to our newsletter.
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !canCollectEmails || !email}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isSubmitting || !canCollectEmails || !email
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon="spinner" className="animate-spin mr-2" />
              Subscribing...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon="paper-plane" className="mr-2" />
              Subscribe to Newsletter
            </>
          )}
        </button>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.includes('✅') 
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>
          By subscribing, you agree to receive educational content via email. 
          You can unsubscribe at any time. 
          <a href="/privacy-policy" className="text-red-600 hover:underline ml-1">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
