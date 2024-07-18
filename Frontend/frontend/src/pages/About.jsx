import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white min-h-screen"> {/* Changed the main background to white */}
      <Navbar />
      <main className="container mx-auto px-4 py-24"> {/* Increased py-24 for more spacing */}
        <div className="text-center mb-12"> {/* Added mb-12 for more spacing */}
          <h1 className="text-blue-500 font-bold text-5xl mb-4"> {/* Changed text color to blue */}
            NACHONACHO
          </h1>
          <p className="text-gray-700 text-lg mb-8"> {/* Changed text color to gray */}
            NachoNacho is the world's largest marketplace for SaaS and professional
            services. Our mission is to harmonize the subscription and services
            economies and foster their further growth. We use the latest fintech and AI
            tools to create powerful user experiences for all stakeholders in the
            marketplace.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg leading-relaxed mb-4">
              Both NachoNacho founders have had extensive careers in large
              corporations as well as startups. The subscription economy has
              infiltrated almost all aspects of our professional (and personal) lives.
              Its effects are generally extremely positive for buyers and sellers of
              subscription products. However, we gathered our collective
              experiences and found various issues in the subscription as well as
              the B2B services economy.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              As buyers of subscriptions and services, we saw:
            </p>
            <ul className="list-disc ml-6">
              <li className="mb-2">
                How our companies would waste a lot of money due to the
                subscription sprawl and poor vendor selection.
              </li>
              <li className="mb-2">
                How difficult it was to figure out who had which subscription in the
                company.
              </li>
              <li>
                Companies weren't always sure of the best product to subscribe to for
                a specific need.
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg leading-relaxed mb-4">
              On the seller side, we saw massive competition in every subscription
              and service category, dramatically increasing user acquisition costs.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              And then it came to us - we need to harmonize the subscription and
              services economy by creating a central hub for buyers and sellers.
              It's what companies like Amazon, eBay, and Etsy built for physical
              products and Upwork built for talent. It's about time we built a
              marketplace for subscriptions and services that works for all
              stakeholders!
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleExpansion}
            >
              {isExpanded ? 'Collapse' : 'What We Do'}
            </button>
            {isExpanded && (
              <div className="mt-4">
                <p className="text-lg leading-relaxed mb-4">
                  We built a marketplace that is designed to address the
                  challenges that we saw in the subscription economy. Here are some
                  of the key features:
                </p>
                <ul className="list-disc ml-6">
                  <li className="mb-2">
                    Easy to use platform that allows users to find and compare
                    subscriptions.
                  </li>
                  <li className="mb-2">
                    A wide range of subscriptions to choose from, including both
                    B2C and B2B offerings.
                  </li>
                  <li>
                    Secure and reliable payment processing to ensure that user
                    transactions are safe.
                  </li>
                </ul>
                <p className="text-lg leading-relaxed mb-4">
                  We believe that NachoNacho is the future of the subscription
                  economy. We are committed to providing our users with the best
                  possible experience, and we are constantly working to improve our
                  platform.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional sections like Virtual Credit Cards, Subscriptions, Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12"> {/* Increased gap-12 for more spacing */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <h2 className="font-bold text-xl">Virtual Credit Cards</h2>
            </div>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt, odio eget ultrices lacinia, dolor lectus maximus justo,
              a blandit lacus mauris sed erat.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <h2 className="font-bold text-xl">Subscriptions</h2>
            </div>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt, odio eget ultrices lacinia, dolor lectus maximus justo,
              a blandit lacus mauris sed erat.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <h2 className="font-bold text-xl">Transactions</h2>
            </div>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt, odio eget ultrices lacinia, dolor lectus maximus justo,
              a blandit lacus mauris sed erat.
            </p>
          </div>
        </div>

      </main>
      <Footer className="mt-12" /> {/* Added mt-12 for more spacing */}
    </div>
  );
}

export default About;
