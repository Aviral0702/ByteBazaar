import React, { useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { SiUpwork, SiPaytm, SiGooglepay, SiPhonepe } from 'react-icons/si';

function BuyNow() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showUPIOptions, setShowUPIOptions] = useState(false); // State to toggle UPI options visibility

  const handlePaymentMethodChange = (method) => {
    if (method === 'upi') {
      setShowUPIOptions(prevState => !prevState); // Toggle UPI options visibility
    } else {
      setPaymentMethod(method);
      setShowUPIOptions(false); // Close UPI options if switching to another method
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Payment Method:', paymentMethod);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <div className="bg-red-100 rounded-md p-3 mb-4">
            <p className="text-red-500">
              Save $8.90 on this order with AppSumo Plus! ...and get a $25 coupon
              every 90 days. It's a no brainer!
            </p>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600">
              Learn more
            </button>
          </div>
          <h3 className="text-xl font-bold mb-2">Select a payment method</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('card')}
                className={`flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md mb-2 ${paymentMethod === 'card' ? 'bg-blue-200' : ''}`}
              >
                <FaCreditCard className="mr-2" /> Credit/Debit Card
              </button>
            </div>
            <div className="mb-4 relative">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('upi')}
                className={`flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md mb-2 relative ${paymentMethod === 'upi' ? 'bg-blue-200' : ''}`}
              >
                <SiUpwork className="mr-2" /> BHIM UPI
              </button>
              {showUPIOptions && (
                <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-52 py-2">
                  <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md mb-2">
                    <SiGooglepay className="mr-2" /> Google Pay
                  </button>
                  <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md mb-2">
                    <SiPhonepe className="mr-2" /> PhonePe
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('paytm')}
                className={`flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md mb-2 ${paymentMethod === 'paytm' ? 'bg-blue-200' : ''}`}
              >
                <SiPaytm className="mr-2" /> Paytm
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline w-full"
            >
              Continue to billing information
            </button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Order summary</h2>
          <div className="flex items-center mb-4">
            <span className="material-icons-outlined">shopping_cart</span>
            <span className="ml-2">View cart (1 Item)</span>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-bold">Subtotal</p>
            <p className="text-gray-900 font-bold text-right">
              $89.00
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-bold">Coupon savings</p>
            <p className="text-gray-900 font-bold text-right">
              $0.00
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-bold">Sales tax</p>
            <p className="text-gray-900 font-bold text-right">
              $0.00
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-bold">Total:</p>
            <p className="text-gray-900 font-bold text-right">
              $89.00
            </p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline w-full">
            <span className="material-icons-outlined">lock</span>
            Place order now
          </button>
          <p className="mt-4 text-gray-600">
            By clicking the "Place order now" button, you confirm that you have read,
            understand, and accept our Terms and Conditions and Privacy Policy.
          </p>
          <p className="text-gray-600">
            Need help? Reach out to our support team with any questions you may
            have.
          </p>
          <div className="mt-4 flex justify-center">
            <img
              src="https://assets.appsumo.com/img/marketing/money-back-guarantee-60-days-shield.svg"
              alt="60 Day Money-Back Guarantee"
              className="h-12"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">
              1.5+ million entrepreneurs helped
            </h3>
            <p className="text-gray-600">
              Try thousands of products risk-free Sumo-lings are protected by our
              industry-best refund policy. We offer a 60-day money-back guarantee
              for qualifying purchases -- no matter the reason.
            </p>
            <p className="text-gray-600">
              World-class customer support There's customer support, and then there's
              AppSumo customer support. We take pride in going above and beyond to
              keep our community happy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;
