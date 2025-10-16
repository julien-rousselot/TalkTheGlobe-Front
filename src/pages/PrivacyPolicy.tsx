import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cookieUtils } from '../utils/cookieConsent';

const PrivacyPolicy: React.FC = () => {
  const handleResetConsent = async () => {
    try {
      await cookieUtils.clearConsent();
    } catch (error) {
      window.dispatchEvent(new CustomEvent('consentCleared'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Privacy Policy & Cookie Usage
        </h1>

        <div className="space-y-8">
          {/* Cookie Policy Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon="cookie-bite" className="text-amber-500" />
              Cookie Policy
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We use cookies and similar technologies to enhance your experience on Talk The Globe. 
                Here's what cookies we use and why:
              </p>

              <div className="grid gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    <FontAwesomeIcon icon="cog" className="mr-2 text-gray-600" />
                    Necessary Cookies
                  </h3>
                  <p className="text-sm">
                    Essential for the website to function properly. These include session management, 
                    authentication, and basic site functionality. These cannot be disabled.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    <FontAwesomeIcon icon="envelope" className="mr-2 text-blue-600" />
                    Marketing & Newsletter Cookies
                  </h3>
                  <p className="text-sm">
                    Used to collect and store email addresses for our educational newsletter. 
                    This helps us send you relevant learning materials, course announcements, 
                    and English learning tips. We only collect emails with your explicit consent.
                  </p>
                  <ul className="text-sm mt-2 ml-4 list-disc">
                    <li>Email address collection for newsletter subscriptions</li>
                    <li>Tracking newsletter engagement (opens, clicks)</li>
                    <li>Personalizing educational content recommendations</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    <FontAwesomeIcon icon="chart-bar" className="mr-2 text-green-600" />
                    Analytics Cookies
                  </h3>
                  <p className="text-sm">
                    Help us understand how visitors interact with our website to improve your learning experience. 
                    This includes page views, session duration, and popular content.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Data Usage */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              <FontAwesomeIcon icon="newspaper" className="mr-2 text-red-600" />
              Newsletter Data Usage
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p><strong>What we collect:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Your email address (provided voluntarily)</li>
                <li>Subscription date and source (website, social media, etc.)</li>
                <li>Email engagement data (opens, clicks, unsubscribes)</li>
                <li>Your consent record and date</li>
              </ul>

              <p><strong>How we use your data:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Send weekly English learning tips and resources</li>
                <li>Notify you about new courses and materials</li>
                <li>Share exclusive educational content</li>
                <li>Improve our content based on engagement</li>
              </ul>

              <p><strong>Your rights:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Unsubscribe at any time using the link in our emails</li>
                <li>Request a copy of your data</li>
                <li>Request deletion of your data</li>
                <li>Update your preferences</li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              <FontAwesomeIcon icon="shield-alt" className="mr-2 text-green-600" />
              Data Protection
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <p>
                We take your privacy seriously and implement appropriate security measures 
                to protect your personal information:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Secure data transmission (HTTPS/SSL)</li>
                <li>Regular security audits</li>
                <li>Limited access to personal data</li>
                <li>GDPR compliant data handling</li>
                <li>Data retention policies</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              <FontAwesomeIcon icon="envelope" className="mr-2 text-blue-600" />
              Contact Us
            </h2>
            
            <div className="text-gray-700">
              <p>
                If you have any questions about this privacy policy, cookie usage, 
                or your personal data, please contact us:
              </p>
              <div className="mt-3">
                <p><strong>Email:</strong> talktheglobe7@gmail.com</p>
                <p><strong>Website:</strong> www.talktheglobe.com/contact</p>
              </div>
            </div>
          </section>

          {/* Cookie Preferences */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Manage Your Preferences
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleResetConsent}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon="cog" />
                Reset Cookie Preferences
              </button>
              
              <p className="text-sm text-gray-600 flex items-center">
                Click this button to reset your cookie preferences and see the consent banner again.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
