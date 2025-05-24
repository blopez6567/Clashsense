import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Privacy Policy | ClashSense';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to home
        </Link>

        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-extrabold mb-2">🔒 ClashSense – Privacy Policy</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Effective Date: 2025-05-24</p>

          <p className="mb-12">ClashSense values your privacy. This Privacy Policy explains how we collect, use, and protect your personal data when you use our platform and services.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">1. Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-4">Information You Provide</h3>
          <ul className="mb-6 list-disc pl-6">
            <li className="mb-2">Name, email address, company, and job title when you register.</li>
            <li className="mb-2">Project data, models, files, and issue tracking information you upload.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">Automatically Collected Information</h3>
          <ul className="mb-12 list-disc pl-6">
            <li className="mb-2">Device and usage data (e.g., browser type, IP address, log files, pages viewed).</li>
            <li className="mb-2">Cookies and similar tracking technologies to personalize your experience.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-6">2. How We Use Your Information</h2>
          <p className="mb-4">We use your data to:</p>
          <ul className="mb-6 list-disc pl-6">
            <li className="mb-2">Provide and operate the ClashSense platform.</li>
            <li className="mb-2">Improve our services and develop new features, including AI-driven features.</li>
            <li className="mb-2">Communicate with you about your account or updates.</li>
            <li className="mb-2">Comply with legal obligations and enforce our Terms.</li>
          </ul>
          <p className="mb-12">Note: If you use AI-enabled features, your project data may be used to generate AI coordination suggestions. However, these remain your responsibility to validate.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">3. Sharing and Disclosure</h2>
          <p className="mb-4">We do not sell your personal data. We may share information:</p>
          <ul className="mb-12 list-disc pl-6">
            <li className="mb-2">With trusted third-party service providers (e.g., cloud hosting, analytics).</li>
            <li className="mb-2">If required by law, regulation, or legal process.</li>
            <li className="mb-2">In connection with a merger, acquisition, or asset sale.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-6">4. Data Security</h2>
          <p className="mb-12">We implement industry-standard security measures to protect your data. However, no system is completely secure. You are responsible for maintaining the security of your account credentials.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">5. Your Rights and Choices</h2>
          <p className="mb-4">You may:</p>
          <ul className="mb-6 list-disc pl-6">
            <li className="mb-2">Access or update your personal information.</li>
            <li className="mb-2">Request deletion of your account or data.</li>
            <li className="mb-2">Opt out of marketing communications.</li>
          </ul>
          <p className="mb-12">To make any of these requests, contact privacy@clashsense.com.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">6. Data Retention</h2>
          <p className="mb-12">We retain your data for as long as necessary to provide the Service and comply with legal obligations. Upon request or termination of service, we will delete your data in accordance with our retention policies.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">7. International Data Transfers</h2>
          <p className="mb-12">If you are located outside the country where our servers are hosted, your data may be transferred and processed across borders in compliance with applicable data protection laws.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">8. Children's Privacy</h2>
          <p className="mb-12">Our Service is not intended for children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">9. Changes to This Privacy Policy</h2>
          <p className="mb-12">We may update this Privacy Policy to reflect changes in our practices. We will notify you of significant changes and post the updated policy on our website.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">10. Contact Us</h2>
          <p className="mb-4">If you have questions about this Privacy Policy, please contact:</p>
          <p className="mb-12">📧 <a href="mailto:privacy@clashsense.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@clashsense.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;