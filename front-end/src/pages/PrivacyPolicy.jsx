import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-36">
      <div className=' bg-[#f2efde] dark:bg-[#141b28] p-12 rounded-lg'>
      <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4 text-lg">
        Welcome to React Blog! Your privacy is important to us. This Privacy Policy explains how we collect,
        use, and protect your information when you use our platform.
      </p>

      <div className='bg-[#ecdf96] dark:bg-[#00001c] p-4 rounded-lg'>
        <h2 className="text-2xl font-semibold mt-2">1. Information We Collect</h2>
        <p className="mb-4 pt-5">
            We collect information that you provide directly to us, such as your name, email address, and blog content.
            Additionally, we may collect data related to your interactions with the platform, such as comments and likes.
        </p>
      </div>

      <div className=' bg-[#ecdf96] dark:bg-[#00001c] p-4 mt-7 rounded-lg'>
        <h2 className="text-2xl font-semibold mt-2">2. How We Use Your Information</h2>
        <ul className="list-disc pt-5 pl-6 mb-4">
            <li>To provide and maintain our services</li>
            <li>To improve user experience</li>
            <li>To personalize content and recommendations</li>
            <li>To ensure security and prevent fraud</li>
        </ul>
      </div>

      <div className='bg-[#ecdf96] dark:bg-[#00001c] p-4 mt-7 rounded-lg'>
        <h2 className="text-2xl font-semibold mt-2">3. Sharing Your Information</h2>
        <p className="mb-4 pt-5">
            We do not sell or share your personal data with third parties. However, we may share aggregated data
            with partners to improve the platform.
        </p>
      </div>

      <div className='bg-[#ecdf96] dark:bg-[#00001c] p-4 mt-7 rounded-lg'>
        <h2 className="text-2xl font-semibold mt-2">4. Security</h2>
        <p className="mb-4 pt-5">
            We take reasonable measures to protect your data from unauthorized access and breaches.
        </p>
      </div>

      <div className='bg-[#ecdf96] dark:bg-[#00001c] p-4 mt-7 rounded-lg'>
        <h2 className="text-2xl font-semibold mt-2">5. Your Rights</h2>
        <p className="mb-4 pt-5">
            You have the right to access, update, or delete your personal information. Contact us for any requests.
        </p>
      </div>

      <div className='bg-[#ecdf96] dark:bg-[#00001c] p-4 mt-7 rounded-lg'>
        <h2 className="text-2xl font-semibold mt-2">6. Changes to This Policy</h2>
        <p className="mb-4 pt-5">
        We may update this Privacy Policy from time to time. Please review it periodically for any changes.
        </p>
      </div>
    </div>
    </div>
  );
};

export default PrivacyPolicy;
