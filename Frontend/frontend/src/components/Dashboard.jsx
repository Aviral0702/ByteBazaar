import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'chart.js/auto';
import Graphs from './Graphs';
import Sidebar from './SideBar';

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user ID
        const userIdResponse = await fetch('/api/auth/signedInUserId');
        const userIdData = await userIdResponse.json();
        const { userId } = userIdData;
        setUserId(userId);

        // Fetch user details (name and avatar)
        const userResponse = await fetch(`/api/user/${userId}`); // Adjust endpoint as per your backend
        const userData = await userResponse.json();
        setUserName(userData.username);
        setUserAvatar(userData.avatar);

        // Fetch purchased products
        const purchasedResponse = await fetch(`/api/cart/getPurchasedProducts/${userId}`);
        const purchasedData = await purchasedResponse.json();
        setPurchasedProducts(purchasedData);

        // Fetch cart products
        const cartResponse = await fetch(`/api/cart/getcart/${userId}`);
        const cartData = await cartResponse.json();
        setCartProducts(cartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-20 mr-8 p-8 w-full"> {/* Adjusted ml-20 and added mr-8 for left margin and right margin */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img src={userAvatar} alt="User Avatar" className="h-12 w-12 rounded-full object-cover mr-4" />
            <div>
              <h1 className="text-3xl font-bold">{userName}</h1>
              <p className="text-gray-600">Welcome to your dashboard!</p>
            </div>
          </div>
          <Link to="/profile">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Edit Profile</button>
          </Link>
        </div>

        {/* Section: Graphs */}
        <div className="mb-12">
          <Graphs />
        </div>

        {/* Horizontal dotted line */}
        <hr className="border-t-2 border-black my-8 mx-2" />

        
        {/* Section: Purchased Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Your Purchased Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedProducts.map(product => (
              <motion.div
                key={product._id}
                className="bg-white rounded-lg shadow-md p-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-700">${product.discountPrice}</span>
                  <Link to={`/listing/${product.listingId}`}>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md">Buy Again</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Horizontal dotted line */}
        <hr className="border-t-2 border-black my-8 mx-2" />


        {/* Section: Cart Products */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartProducts.map(product => (
              <motion.div
                key={product._id}
                className="bg-white rounded-lg shadow-md p-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-700">${product.discountPrice}</span>
                  <Link to={`/listing/${product.listingId}`}>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md">Remove</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
