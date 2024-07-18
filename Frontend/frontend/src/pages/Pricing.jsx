import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

const Pricing = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 p-8 mt-20 mb-20"> {/* Adjusted mt-20 and mb-20 for more margin */}
        {/* Basic Plan */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex-1 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Basic</h2>
          <ul className="mb-6 space-y-2">
            <li>✔ Access to hundreds of software discounts/perks.</li>
            <li>✔ Access to Maven Marketplace, where you find your ideal professional service provider.</li>
            <li>✔ Access to Mastermind, a peer-to-peer community of SaaS experts.</li>
            <li>✔ Write reviews for SaaS products and professional service providers.</li>
            <li>✔ Simple, fast account setup with no KYC, demos, or talking to sales.</li>
          </ul>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Start now</button>
          <p className="mt-4 text-lg font-bold">Free</p>
        </div>

        {/* Premium Plan */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex-1 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            Premium <span className="ml-2 bg-purple-500 text-white px-2 py-1 rounded-full">💎</span>
          </h2>
          <ul className="mb-6 space-y-2">
            <li>✔ All Basic features, plus:</li>
            <li>✔ Discounts on thousands more SaaS products.</li>
            <li>✔ Manage your SaaS & business expenses using virtual and physical credit cards.</li>
            <li>✔ Unlimited: virtual credit cards, subscriptions, and transactions.</li>
            <li>✔ Earn 1.5% cashback on your spend.</li>
            <li>✔ Manage multiple companies with a single login.</li>
            <li>✔ AI-powered SaaS recommendations to help you discover the best software for your specific needs.</li>
          </ul>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Book a demo</button>
          <p className="mt-4 text-lg font-bold">$5 /user/month after 1 month free trial</p>
        </div>

        {/* Custom Plan */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex-1 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Custom</h2>
          <p className="mb-6">Ask us for a custom quote if:</p>
          <ul className="mb-6 space-y-2">
            <li>✔ Your company has more than 50 users.</li>
            <li>✔ You are an MSP or agency that manages spend for clients.</li>
            <li>✔ You are an affiliate and want to work with NachoNacho.</li>
            <li>✔ You are a SaaS vendor, VC, PE firm, or operate a community of businesses.</li>
            <li>✔ You are interested in a partnership with NachoNacho.</li>
          </ul>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Contact us</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
