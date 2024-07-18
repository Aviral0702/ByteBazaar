import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

function GetStarted() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-between">
        <div className="container mx-auto p-8 mt-20">
          <h1 className="text-3xl font-bold mb-4">Get started with NachoNacho</h1>
          <p className="text-gray-600 mb-8">What type of account are you interested in?</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`bg-gray-300 rounded-md p-6 shadow-md cursor-pointer ${
                selectedAccount === 'buyer' ? 'border-4 border-blue-800' : ''
              }`}
              onClick={() => handleAccountSelect('buyer')}
            >
              <div className="flex items-center mb-4">
                <div className="bg-white rounded-full p-2 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-8 4l-2.293-2.293c-.63-.63-.184-1.707.707-1.707H7"
                    />
                  </svg>
                </div>
                <h2 className="text-gray-800 font-bold text-xl">Buyer account</h2>
              </div>
              <p className="text-gray-800">
                For Businesses to manage, discover & get discounts on SaaS and services.
              </p>
              <button className="bg-white text-blue-800 rounded-md px-4 py-2 mt-4">
                Get started →
              </button>
            </div>

            <div
              className={`bg-gray-300 rounded-md p-6 shadow-md cursor-pointer ${
                selectedAccount === 'seller' ? 'border-4 border-blue-800' : ''
              }`}
              onClick={() => handleAccountSelect('seller')}
            >
              <div className="flex items-center mb-4">
                <div className="bg-white rounded-full p-2 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-gray-800 font-bold text-xl">Seller account</h2>
              </div>
              <p className="text-gray-800">
                For SaaS vendors to reach new subscribers at a lower cost.
              </p>
              <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4">
                List your product →
              </button>
            </div>

            <div
              className={`bg-gray-300 rounded-md p-6 shadow-md cursor-pointer ${
                selectedAccount === 'maven' ? 'border-4 border-blue-800' : ''
              }`}
              onClick={() => handleAccountSelect('maven')}
            >
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 rounded-full p-2 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l-3.536 3.536M9.353 5.636l3.536 3.536m3.536 5.656l3.536 3.536"
                    />
                  </svg>
                </div>
                <h2 className="text-gray-800 font-bold text-xl">Maven account</h2>
              </div>
              <p className="text-gray-800">
                For experts to monetize their knowledge and skills.
              </p>
              <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4">
                Become a Maven →
              </button>
            </div>
          </div>
        </div>
        <Footer className="mt-auto" />
      </div>
    </>
  );
}

export default GetStarted;
