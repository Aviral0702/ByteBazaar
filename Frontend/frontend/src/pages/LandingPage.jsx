import React, { useEffect, useState } from 'react';
import { FaSearch, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoMdSearch, IoMdChatbubbles } from "react-icons/io";
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
    <div className="text-center mb-8">
          <h1 className="text-7xl font-serif font-thin text-blue-400">Har Business Ko</h1><br />
          <h1 className="text-7xl font-thin font-serif text-blue-400">Bnaye Aasaan</h1>
          <p className="text-2xl font-bold text-black mt-5">Discover, Compare, and Deploy Leading SaaS Solutions With Ease and Precision</p>
        </div>
      <div className="relative w-full max-w-lg md:max-w-2xl mt-8">
        <input
          type="text"
          placeholder="Search a product or topic"
          className="w-full py-3 px-4 border border-gray-300 rounded-full focus:outline-none"
        />
        <FaSearch className="absolute top-3 right-4 text-gray-400" size={20} />
      </div>

      <div className="flex items-center mt-4">
        <FaQuestionCircle className="text-blue-600 mr-2" size={24} />
        <Link to='/search' className='text to-blue-400'>Want To Explore Around</Link>
      </div>
    </main>


    {/* Listing sections for Featured, sale, and rent */}
    <div className='max-w-6xl mx-auto p-3 md:p-6 flex flex-col gap-8 '>
      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <div>
          <div className='my-3'>
            <h2 className='text-xl md:text-2xl font-semibold text-gray-800'>Featured Listings</h2>
            <Link className='text-sm text-blue-600 hover:underline' to={'/search?featured=true'}>Show more Featured</Link>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {featuredListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}

      {/* Communication Listings */}
      {communicationListings.length > 0 && (
        <div>
          <div className='my-3'>
            <h2 className='text-xl md:text-2xl font-semibold text-gray-800'>Communication Products</h2>
            <Link className='text-sm text-blue-600 hover:underline' to={'/search?type=communication'}>Show more Communication Products</Link>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {communicationListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
       {/* Testimonials */}
       <section className="bg-white py-10 flex justify-center">
      <Testimonials />
    </section>
        {/* SaaS Discounts */}
        <section className="bg-gray-100 py-10">
          <SaasDiscounts />
        </section>
      {/* Sale Listings */}
      {saleListings.length > 0 && (
        <div>
          <div className='my-3'>
            <h2 className='text-xl md:text-2xl font-semibold text-gray-800'>Recent Sale Products</h2>
            <Link className='text-sm text-blue-600 hover:underline' to={'/search?type=sale'}>Show more Sale Products</Link>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
    </div>

   <div className='mt-10 '>
    <Footer />
   </div>
  </div>
  );
};

export default LandingPage;
