import React from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

export default function TermsOfUse() {
  return (
    <>
    <Navbar />
    <div className="h-1/2 bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms of Use</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Sai Enterprises eCommerce website, you agree to comply with and be bound by these Terms of Use. If you do not agree with these terms, please do not use our website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Use of the Website</h2>
          <p>
            You agree to use this website only for lawful purposes. You must not use it in a way that infringes the rights of others or restricts their use of the site.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and images, is the property of Sai Enterprises or its content suppliers and is protected by applicable copyright and trademark laws.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
          <p>
            Sai Enterprises shall not be liable for any damages arising from your use of the website or inability to access the site or its features.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
          <p>
            We may update these Terms of Use at any time without prior notice. Your continued use of the site after changes are posted will be considered your acceptance of the revised terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:support@saienterprises.com" className="text-blue-600 underline">support@saienterprises.com</a>.
          </p>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
}
