import React from "react";
import { Link } from "react-router-dom";

const LegalNotice: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <main className="max-w-4xl mx-auto px-6 bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-4 mb-8">
            Legal Notice
          </h1>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              This page contains the legal information for the website and services
              provided by the operator named below.
            </p>
          </div>

          <section className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <span className="text-blue-500 mr-2">ℹ️</span>
              Provider / Operator
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="font-medium text-gray-800">Company name</dt>
                <dd className="text-gray-600 ml-4">Fatima Caballero Foncubierta</dd>
              </div>

              <div>
                <dt className="font-medium text-gray-800">Address</dt>
                <dd className="text-gray-600 ml-4">39 avenue Clemenceau, 57100, Thionville</dd>
              </div>

              <div>
                <dt className="font-medium text-gray-800">Contact</dt>
                <dd className="text-gray-600 ml-4">
                  Email: <a href="mailto:talktheglobe7@gmail.com" className="text-blue-600 hover:text-blue-800 underline">talktheglobe7@gmail.com</a>
                </dd>
              </div>

              <div>
                <dt className="font-medium text-gray-800">Legal representative</dt>
                <dd className="text-gray-600 ml-4">Fatima Caballero Foncubierta</dd>
              </div>

              <div>
                <dt className="font-medium text-gray-800">Business registration</dt>
                <dd className="text-gray-600 ml-4">Registered as micro-entrepreneur in France</dd>
              </div>

              <div>
                <dt className="font-medium text-gray-800">SIRET</dt>
                <dd className="text-gray-600 ml-4">93367369100020</dd>
              </div>
            </dl>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              <span className="text-purple-500 mr-2">🌐</span>
              Hosting
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Hosting provider: Cloudflare — 101 Townsend St, San Francisco, CA 94107, United States.
              For the most recent hosting details see your hosting contract.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              <span className="text-red-500 mr-2">©️</span>
              Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All content on this website (text, graphics, logos, icons, images,
              software, etc.) is protected by copyright and other intellectual
              property laws and is owned or licensed by the operator unless
              otherwise noted. Reproduction, distribution or other use requires
              prior written consent of the rights holder.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              <span className="text-yellow-500 mr-2">⚠️</span>
              Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The information on this website is provided "as is" without warranty
              of any kind. To the maximum extent permitted by law, the operator
              excludes liability for any direct, indirect, incidental or
              consequential damages resulting from use of the website or reliance on
              its content.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              <span className="text-teal-500 mr-2">🔗</span>
              External Links
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This website may contain links to external sites. The operator is not
              responsible for the content of linked sites. Use of external links is
              at your own risk.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              <span className="text-indigo-500 mr-2">🔒</span>
              Data Protection & Cookies
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                Personal data collected through this website will be processed in
                accordance with applicable data protection laws. For details on which
                data is processed, retention periods and your rights, see our{" "}
                <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  Privacy Policy
                </Link>.
              </p>

              <p>
                We use cookies and similar technologies. You can control cookie
                preferences in your browser or via any cookie consent tool provided on
                this site.
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              <span className="text-gray-500 mr-2">⚖️</span>
              Applicable Law & Jurisdiction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These terms are governed by the laws of France. Any disputes
              arising in connection with this site are subject to the exclusive
              jurisdiction of the courts of Thionville, to the extent permitted
              by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              <span className="text-pink-500 mr-2">📧</span>
              Contact for Legal Requests
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              For legal inquiries (copyright takedown, data subject requests,
              etc.) please contact:
            </p>
            <address className="not-italic text-gray-600 bg-gray-50 p-4 rounded-lg">
              <div className="font-semibold">Legal Department – Talk The Globe</div>
              <div>Email: <a href="mailto:talktheglobe7@gmail.com" className="text-blue-600 hover:text-blue-800 underline">talktheglobe7@gmail.com</a></div>
            </address>
          </section>

          <footer className="border-t pt-6 mt-8">
            <div className="text-sm text-gray-500 text-center">
              Last updated: 16-10-2025
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default LegalNotice;