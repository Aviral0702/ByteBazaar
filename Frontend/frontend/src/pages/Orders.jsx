import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [userId, setUserId] = useState(null);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch('/api/auth/signedinuserid');
        const data = await res.json();
        console.log('User ID:', data);
        setUserId(data.userId);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserProducts = async () => {
        try {
          const res = await fetch(`/api/cart/getPurchasedProducts/${userId}`);
          const data = await res.json();
          console.log('Fetched User Products:', data);

          // Sort products by purchase date in descending order
          const sortedProducts = data.sort((a, b) => new Date(b.boughtAt) - new Date(a.boughtAt));
          setUserProducts(sortedProducts);
        } catch (error) {
          console.error('Failed to fetch user products:', error);
        }
      };

      fetchUserProducts();
    }
  }, [userId]);

  return (
    <div className="flex flex-col md:flex-row">
      <SideBar />
      <motion.div
        className="flex-1 p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        {userProducts.length === 0 ? (
          <p className="text-lg">No orders found.</p>
        ) : (
          userProducts.map((product, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex flex-col md:flex-row items-center mb-2">
                <img
                  src={product.imageUrls[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover mb-2 md:mb-0 md:mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-500">Quantity: {product.quantity}</p>
                  <p className="text-gray-500">Price: ${product.discountPrice}</p>
                  <p className="text-gray-500">Bought At: {new Date(product.boughtAt).toLocaleDateString()}</p>
                </div>
              </div>
              <Link to={`/listing/${product.listingId}`} className="text-blue-500">
                View Product
              </Link>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Orders;
