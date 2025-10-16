import { Link } from "react-router-dom";

// src/pages/TermsConditions.tsx
const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12">
      <main className="max-w-4xl mx-auto px-6 bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-green-500 pb-4 mb-8">
            Terms and Conditions of Sale
          </h1>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              These terms and conditions govern your use of our educational services and digital products.
            </p>
          </div>

          <div className="space-y-6">
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-green-500 mr-2">📋</span>
                1. Purpose
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These general terms and conditions of sale exclusively govern 
                the sales of digital educational materials offered on the website 
                talktheglobe.com by TalkTheGlobe.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-blue-500 mr-2">📚</span>
                2. Products
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The products offered are digital educational materials 
                (PDF files, downloadable documents) intended for language learning.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-purple-500 mr-2">💳</span>
                3. Prices and Payment
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  Prices are expressed in euros including all taxes. Payment is made 
                  immediately by credit card via Stripe.
                </p>
                <p>
                  Payment processing is handled by Stripe. Your data may be shared with them 
                  solely to complete the transaction.
                </p>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-orange-500 mr-2">📦</span>
                4. Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Digital products are available immediately after payment confirmation 
                through direct download.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-red-500 mr-2">↩️</span>
                5. Right of Withdrawal
              </h2>
              <p className="text-gray-600 leading-relaxed">
                In accordance with Article L221-28 of the Consumer Code, 
                the right of withdrawal cannot be exercised for digital content 
                not provided on a physical medium whose performance has begun 
                with your agreement.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-indigo-500 mr-2">©️</span>
                6. Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All materials are protected by copyright. 
                Purchase gives you personal use rights only.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-yellow-500 mr-2">✅</span>
                7. Authorized Use
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  The purchased materials are intended for <strong>personal or classroom use only</strong>. 
                  It is strictly forbidden to:
                </p>
                <ul className="list-disc ml-6 bg-red-50 p-4 rounded-lg">
                  <li>Resell, redistribute or share the files</li>
                  <li>Modify or adapt the content without authorization</li>
                  <li>Use the materials for commercial purposes</li>
                  <li>Upload files to sharing platforms</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-teal-500 mr-2">🎓</span>
                8. Educational Use
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  These materials are designed for language teaching/learning. 
                  They can be used:
                </p>
                <ul className="list-disc ml-6 bg-green-50 p-4 rounded-lg">
                  <li>By teachers in class (up to 30 students)</li>
                  <li>For personal learning</li>
                  <li>In private lessons (1 teacher / 1-5 students max)</li>
                </ul>
                <p className="mt-2 font-semibold text-green-700">
                  For use in multiple classrooms or institutions, contact us for an extended license.
                </p>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-cyan-500 mr-2">📥</span>
                9. File Access
              </h2>
              <p className="text-gray-600 leading-relaxed">
                After purchase, you have <strong>30 days</strong> to download your files. 
                After this period, download links expire. It is your responsibility to save the files.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-amber-500 mr-2">🛡️</span>
                10. Warranty and Liability
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  Materials are provided "as is". TalkTheGlobe strives to ensure 
                  the educational quality of its content but cannot guarantee that it 
                  will perfectly meet your specific needs.
                </p>
                <p>
                  Our liability is limited to the amount paid for the product concerned. 
                  In addition, French consumer law provides for a legal guarantee against 
                  hidden defects and non-conformity.
                </p>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-blue-500 mr-2">🔒</span>
                11. Data Protection
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  Your personal data (email, name) is collected solely to 
                  process your order and send you download links. 
                  It is never shared with third parties except as needed for payment processing.
                </p>
                <p>
                  In accordance with GDPR, you have the right to access, rectify 
                  and delete your data by contacting us.
                </p>
                <p>
                  Any personal data collected during your purchase will be handled in accordance with our 
                  <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline font-medium">Privacy Policy</Link>.
                </p>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-orange-500 mr-2">🍪</span>
                12. Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This website uses cookies and similar technologies for analytics and user experience. 
                You can manage your cookie preferences via your browser or any consent tool provided on this site. 
                For more information, see our <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline font-medium">Privacy Policy</Link>.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-pink-500 mr-2">⚖️</span>
                13. Dispute Resolution
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  In case of problems with your order, please contact us first at<br />
                  <a href="mailto:talktheglobe7@gmail.com" className="text-blue-600 hover:text-blue-800 underline">
                    talktheglobe7@gmail.com
                  </a>. We undertake to respond within 48 hours.
                </p>
                <p>
                  These terms and conditions are subject to French law. In case of dispute, 
                  the courts of Thionville, France will have jurisdiction.
                </p>
              </div>
            </section>

            <section className="mb-6 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-gray-500 mr-2">📧</span>
                14. Contact and Legal Information
              </h2>
              <address className="not-italic text-gray-600 bg-white p-4 rounded border">
                <div className="font-semibold text-gray-800">TalkTheGlobe</div>
                <div>Email: <a href="mailto:talktheglobe7@gmail.com" className="text-blue-600 hover:text-blue-800 underline">talktheglobe7@gmail.com</a></div>
                <div>Address: 39 avenue Clemenceau, 57100 Thionville, France</div>
                <div>SIRET: 933 673 691 00020</div>
              </address>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-violet-500 mr-2">📝</span>
                15. Terms Modification
              </h2>
              <p className="text-gray-600 leading-relaxed">
                TalkTheGlobe reserves the right to modify these conditions at any time. 
                The applicable conditions are those in force at the time of your order.
              </p>
            </section>
            
            <footer className="border-t pt-6 mt-8">
              <div className="text-sm text-gray-500 text-center">
                Last updated: {new Date().toLocaleDateString('en-US')}
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsConditions;
