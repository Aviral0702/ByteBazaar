import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

const Pricing = () => {
  return (
    <div>
    <Navbar />
    <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 p-8 mt-10 md:mt-20 mb-10 md:mb-20">
      {/* Basic Plan */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex-1 max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Basic</h2>
        <ul className="mb-6 space-y-2">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> Access to hundreds of software discounts/perks.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> Access to Maven Marketplace, where you find your ideal professional service provider.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> Access to Mastermind, a peer-to-peer community of SaaS experts.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> Write reviews for SaaS products and professional service providers.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> Simple, fast account setup with no KYC, demos, or talking to sales.
          </li>
        </ul>
        <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">Start now</button>
        <p className="mt-4 text-lg font-bold text-center">Free</p>
      </div>

      {/* Premium Plan */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex-1 max-w-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
          Premium <span className="ml-2 bg-purple-500 text-white px-2 py-1 rounded-full">💎</span>
        </h2>
        <ul className="mb-6 space-y-2">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> All Basic features, plus:
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> Discounts on thousands more SaaS products.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> Manage your SaaS & business expenses using virtual and physical credit cards.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> Unlimited: virtual credit cards, subscriptions, and transactions.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> Earn 1.5% cashback on your spend.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> Manage multiple companies with a single login.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> AI-powered SaaS recommendations to help you discover the best software for your specific needs.
          </li>
        </ul>
        <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">Book a demo</button>
        <p className="mt-4 text-lg font-bold text-center">$5 /user/month after 1 month free trial</p>
      </div>

      {/* Custom Plan */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex-1 max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Custom</h2>
        <p className="mb-6 text-center">Ask us for a custom quote if:</p>
        <ul className="mb-6 space-y-2">
          <li className="flex items-center">✔ Your company has more than 50 users.</li>
          <li className="flex items-center">✔ You are an MSP or agency that manages spend for clients.</li>
          <li className="flex items-center">✔ You are an affiliate and want to work with NachoNacho.</li>
          <li className="flex items-center">✔ You are a SaaS vendor, VC, PE firm, or operate a community of businesses.</li>
          <li className="flex items-center">✔ You are interested in a partnership with NachoNacho.</li>
        </ul>
        <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">Contact us</button>
      </div>
    </div>
    <Footer />
  </div>
);
};

export default Pricing;
