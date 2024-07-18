import React, { useEffect, useState } from 'react';
import { FaSearch, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import SaasDiscounts from '../components/SaasDiscounts';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Navbar from '../components/Navbar';
import ListingItem from '../components/ListingItem';

const LandingPage = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [communicationListings, setCommunicationListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const res = await fetch('/api/listing/get?featured=true&limit=4');
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setFeaturedListings(data);
          fetchCommunicationListings();
        } else {
          throw new Error('Failed to fetch featured listings');
        }
      } catch (error) {
        console.error('Error fetching featured listings:', error);
      }
    };

    const fetchCommunicationListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=communication&limit=4');
        if (res.ok) {
          const data = await res.json();
          setCommunicationListings(data);
          fetchSaleListings();
        } else {
          throw new Error('Failed to fetch communication listings');
        }
      } catch (error) {
        console.error('Error fetching communication listings:', error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        if (res.ok) {
          const data = await res.json();
          setSaleListings(data);
        } else {
          throw new Error('Failed to fetch sale listings');
        }
      } catch (error) {
        console.error('Error fetching sale listings:', error);
      }
    };

    fetchFeaturedListings();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 mt-16">
        <h1 className="text-5xl font-bold text-gray-900">The SaaS Marketplace</h1>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl">
          Get <span className="font-bold">massive discounts</span> on hundreds of major SaaS products.
          <span className="font-bold"> Discover</span> new relevant SaaS products.
          <span className="font-bold"> Manage</span> all SaaS payments in one place using virtual credit cards.
        </p>
        <div className="bg-yellow-300 text-yellow-900 font-bold py-2 px-4 rounded-full mt-6">
          Total savings of $4,489,608/year available!
        </div>

        <div className="relative w-full max-w-2xl mt-8">
          <input
            type="text"
            placeholder="Search a product or topic"
            className="w-full py-3 px-4 border border-gray-300 rounded-full focus:outline-none"
          />
          <FaSearch className="absolute top-3 right-4 text-gray-400" size={20} />
        </div>

        <div className="flex items-center mt-4">
          <FaQuestionCircle className="text-blue-600 mr-2" size={24} />
          <a href="#" className="text-blue-600">Ask Shaman SaaS-related questions.</a>
        </div>

        <button className="mt-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full">
          Ask ByteBot
        </button>
      </main>

      {/* Swiper for featured listings */}
      <Swiper navigation>
        {featuredListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px]'
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Listing sections for Featured, sale, and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {/* Featured Listings */}
        {featuredListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Featured Listings</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?featured=true'}>Show more Featured</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {featuredListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Rent Listings */}
        {communicationListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Communication Products</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=communication'}>Show more communication products</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {communicationListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Sale Listings */}
        {saleListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Sale products</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more sale products</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Testimonials */}
      <section className="bg-white py-10">
        <Testimonials />
      </section>

      {/* SaaS Discounts */}
      <section className="bg-gray-100 py-10">
        <SaasDiscounts />
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
