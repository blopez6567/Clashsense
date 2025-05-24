import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Terms of Service | Clashsense';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to home
        </Link>

        <div className="prose dark:prose-invert max-w-none">
          <h1>ClashSense – Terms of Service</h1>
          <p className="text-slate-600 dark:text-slate-400">Effective Date: 2025-05-24</p>

          <p>Welcome to ClashSense! These Terms of Service ("Terms") govern your access to and use of the ClashSense platform, website, mobile applications, and related services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.</p>

          <h2>1. About ClashSense</h2>
          <p>ClashSense is a cloud-based collaboration and coordination platform for the AEC (Architecture, Engineering, and Construction) industry, focused on clash detection, issue tracking, and model review. Some features of the platform may incorporate artificial intelligence (AI) to generate suggestions for resolving coordination issues.</p>

          <h2>2. Eligibility</h2>
          <p>You must be at least 18 years old or have reached the age of majority in your jurisdiction to use the Service. By using the Service, you affirm that you have the legal capacity to enter into this agreement.</p>

          <h2>3. Account Registration</h2>
          <p>To access certain features, you must create an account. You agree to provide accurate and complete information and to keep it updated. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</p>

          <h2>4. Use of the Service</h2>
          <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You must not:</p>
          <ul>
            <li>Violate any applicable laws or regulations.</li>
            <li>Use the Service to upload or distribute malicious code.</li>
            <li>Interfere with the operation or security of the Service.</li>
          </ul>

          <h2>5. AI-Generated Content and Recommendations</h2>
          <p>ClashSense may provide AI-generated coordination suggestions based on model data and issue context. These recommendations are for informational purposes only and are not a substitute for professional judgment.</p>
          <p>ClashSense does not warrant the accuracy, completeness, or suitability of any AI-generated content. You acknowledge and agree that:</p>
          <ul>
            <li>All decisions regarding design coordination and clash resolution remain solely with you.</li>
            <li>The responsibility for reviewing, validating, and implementing any recommendations lies with the licensed engineer, general contractor, model coordinator, or authorized project stakeholder.</li>
            <li>ClashSense is not liable for any consequences, errors, or losses arising from the use of AI-generated suggestions.</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>All content, software, and materials provided through the Service are the property of ClashSense or its licensors and are protected by intellectual property laws. You may not copy, modify, distribute, or reverse-engineer any part of the Service without express permission.</p>

          <h2>7. User Content</h2>
          <p>You retain ownership of any data, models, or content you upload ("User Content"). By uploading User Content, you grant ClashSense a non-exclusive, worldwide, royalty-free license to use, host, process, and display it solely to provide and improve the Service.</p>

          <h2>8. Subscriptions and Payment</h2>
          <p>Access to certain features may require a paid subscription. Prices, billing cycles, and payment terms will be displayed during checkout. You authorize ClashSense to charge your payment method in accordance with your subscription plan.</p>

          <h2>9. Termination</h2>
          <p>We may suspend or terminate your access to the Service at our discretion, with or without notice, if you violate these Terms or for security reasons. Upon termination, your right to use the Service will cease immediately.</p>

          <h2>10. Disclaimers and Limitation of Liability</h2>
          <p>The Service is provided "as is" and "as available." ClashSense makes no warranties, express or implied, including but not limited to:</p>
          <ul>
            <li>The reliability of AI-generated suggestions.</li>
            <li>The availability or uptime of the platform.</li>
            <li>The accuracy of any results or data generated by the Service.</li>
          </ul>
          <p>To the maximum extent permitted by law, ClashSense is not liable for any indirect, incidental, or consequential damages, including damages arising from reliance on AI-generated coordination results or from decisions made based on the use of the Service.</p>

          <h2>11. Changes to the Terms</h2>
          <p>We may update these Terms periodically. If we make material changes, we will notify you via email or through the Service. Your continued use of the Service after changes are posted constitutes your acceptance of the updated Terms.</p>

          <h2>12. Contact Us</h2>
          <p>For questions about these Terms, please contact us at:</p>
          <p><a href="mailto:legal@clashsense.com">legal@clashsense.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;