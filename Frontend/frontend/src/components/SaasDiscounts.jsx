// SaasDiscounts.jsx
import React from 'react';
import { FaAmazonPay, FaRegCreditCard, FaSlack } from 'react-icons/fa';

export default function SaasDiscounts() {
  return (
    <div className="bg-blue-500 p-10 rounded-lg text-white mx-auto max-w-screen-lg my-16 min-h-[80vh]">
      <h1 className="text-4xl font-bold text-center mb-4 mt-9">SaaS Discounts & Management</h1>
      <p className="text-center mb-8">Access massive discounts on popular software products, and a powerful SaaS/spend management platform. Powered by Fintech and AI.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center flex flex-col justify-between h-full">
          <FaRegCreditCard className="mx-auto text-6xl mb-4 mt-7" />
          <div>
            <h2 className="text-2xl font-bold mb-2">Manage SaaS</h2>
            <p>Consolidate and control SaaS payments & all other expenses in one account. Use separate <span className="bg-yellow-200 text-black px-1 rounded">virtual credit cards</span> to pay each vendor, with tight limits. Get real-time visibility, control, & security. Get 1.5% cash back on your spend.</p>
            <p className="mt-4 font-bold">Save time and money →</p>
          </div>
        </div>

        <div className="text-center flex flex-col justify-between h-full">
          <FaSlack className="mx-auto text-6xl mb-4 mt-7" />
          <div>
            <h2 className="text-2xl font-bold mb-2">Discover SaaS</h2>
            <p>With the proliferation of SaaS products, it's impossible to figure out which product would be best for you. Our AI-powered recommendation engine, combined with a human-powered expert community (Mastermind) is here to help.</p>
            <p className="mt-4 font-bold">Find relevant SaaS products →</p>
          </div>
        </div>

        <div className="text-center flex flex-col justify-between h-full">
          <FaAmazonPay className="mx-auto text-6xl mb-4 mt-7" />
          <div>
            <h2 className="text-2xl font-bold mb-2 mt-5">Save on SaaS</h2>
            <p className='mb-10 '>Every product in the NachoNacho SaaS marketplace comes with a substantial discount - up to 30% lifetime. These discounts are applied to your purchase automatically.</p>
            <p className="mt-4 font-bold">Redeem offers seamlessly →</p>
          </div>
        </div>
      </div>
    </div>
  );
}
