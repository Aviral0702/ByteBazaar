import React, { useEffect, useState } from 'react';
import Item from './Item'; // Adjust the import path for Item as needed

const ItemContainer = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedListings = async () => {
    try {
      const res = await fetch('/api/listing/get?type=featured&limit=4');
      if (!res.ok) {
        throw new Error('Failed to fetch featured listings');
      }
      const data = await res.json();
      console.log('Fetched Featured Listings:', data); // Log fetched data
      setFeaturedListings(data);
    } catch (error) {
      console.error('Error fetching featured listings:', error);
      setError('Failed to fetch featured listings');
    }
  };

  const fetchRentListings = async () => {
    try {
      const res = await fetch('/api/listing/get?type=rent&limit=4');
      if (!res.ok) {
        throw new Error('Failed to fetch rent listings');
      }
      const data = await res.json();
      console.log('Fetched Rent Listings:', data); // Log fetched data
      setRentListings(data);
    } catch (error) {
      console.error('Error fetching rent listings:', error);
      setError('Failed to fetch rent listings');
    }
  };

  const fetchSaleListings = async () => {
    try {
      const res = await fetch('/api/listing/get?type=sale&limit=4');
      if (!res.ok) {
        throw new Error('Failed to fetch sale listings');
      }
      const data = await res.json();
      console.log('Fetched Sale Listings:', data); // Log fetched data
      setSaleListings(data);
    } catch (error) {
      console.error('Error fetching sale listings:', error);
      setError('Failed to fetch sale listings');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchFeaturedListings(),
          fetchRentListings(),
          fetchSaleListings()
        ]);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError('Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Render Featured Listings */}
        {featuredListings.length > 0 && (
          <div className="my-6">
            <h2 className="text-2xl font-semibold text-slate-600">Featured Listings</h2>
            <div className="flex flex-wrap gap-4">
              {featuredListings.map((listing) => (
                <Item
                  key={listing._id}
                  id={listing._id}
                  name={listing.name}
                  imageUrl={listing.imageUrl}
                  creditAmount={listing.creditAmount}
                  savingsAmount={listing.savingsAmount}
                  description={listing.description} // Pass description prop
                />
              ))}
            </div>
          </div>
        )}

        {/* Render Listings for Sale */}
        {saleListings.length > 0 && (
          <div className="my-6">
            <h2 className="text-2xl font-semibold text-slate-600">Listings for Sale</h2>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <Item
                  key={listing._id}
                  id={listing._id}
                  name={listing.name}
                  imageUrl={listing.imageUrl}
                  creditAmount={listing.creditAmount}
                  savingsAmount={listing.savingsAmount}
                  description={listing.description} // Pass description prop
                />
              ))}
            </div>
          </div>
        )}

        {/* Render Listings for Rent */}
        {rentListings.length > 0 && (
          <div className="my-6">
            <h2 className="text-2xl font-semibold text-slate-600">Listings for Rent</h2>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <Item
                  key={listing._id}
                  id={listing._id}
                  name={listing.name}
                  imageUrl={listing.imageUrl}
                  creditAmount={listing.creditAmount}
                  savingsAmount={listing.savingsAmount}
                  description={listing.description} // Pass description prop
                />
              ))}
            </div>
          </div>
        )}

        {/* Render Loading or Error Messages */}
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ItemContainer;
