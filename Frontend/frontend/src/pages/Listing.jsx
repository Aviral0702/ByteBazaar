// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { Link } from 'react-router-dom';

// const Listing = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [listing, setListing] = useState(null);
//   const params = useParams();

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/listing/get/${params.listingId}`);
//         const data = await res.json();
//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         setListing(data);
//         setLoading(false);
//         setError(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchListing();
//     window.scrollTo(0, 0); 
//   }, [params.listingId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: Something went wrong</div>;
//   }

//   if (!listing) {
//     return null;
//   }

//   return (
//     <>
//       <div className="min-h-screen flex flex-col mt-12 py-15">
//         <Navbar />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
//             {listing && (
//               <div>
//                 <div className="flex items-center justify-center">
//                   <img
//                     src={listing.imageUrls}
//                     alt="Product"
//                     className="w-48 h-48 mr-4 rounded-full"
//                   />
//                   <div>
//                     <h1 className="text-4xl font-bold">{listing.name}</h1>
//                     <div className="flex items-center mt-2">
//                       <span className="bg-yellow-300 text-yellow-800 text-lg font-semibold mr-2 px-3 py-1 rounded-full">
//                         {listing.cashbackOffer}
//                       </span>
//                       <span className="bg-purple-600 text-white text-lg font-semibold px-3 py-1 rounded-full flex items-center">
//                         💎 Premium
//                       </span>
//                       <Link
//                         to="/deals"
//                         className="inline-block ml-4 bg-blue-600 text-white px-3 py-1 rounded-full text-lg font-semibold hover:bg-blue-700"
//                       >
//                         Redeem Deal
//                       </Link>
//                     </div>
//                     <p className="text-green-700 mt-2 text-lg">
//                       Save up to {listing.savings}
//                     </p>
//                     <p className="text-gray-700 mt-4 text-lg">
//                       {listing.description}
//                     </p>
//                     <div className="flex items-center mt-4">
//                       <a
//                         href={listing.website}
//                         className="text-blue-600 hover:underline text-lg"
//                       >
//                         Website
//                       </a>
//                       <button className="ml-4 text-blue-600 hover:underline text-lg">
//                         Share
//                       </button>
//                     </div>
//                     <div className="flex items-center mt-4 space-x-3">
//                       {listing.tags.map((tag, index) => (
//                         <span
//                           key={index}
//                           className="bg-gray-200 text-gray-800 text-lg font-semibold px-3 py-1 rounded-full"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-8">
//                   <h2 className="text-2xl font-bold">
//                     Eligibility requirements
//                   </h2>
//                   <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
//                     {listing.eligibilityRequirements.map(
//                       (requirement, index) => (
//                         <li key={index}>{requirement}</li>
//                       )
//                     )}
//                   </ul>
//                 </div>
//                 <div className="mt-8">
//                   <h2 className="text-2xl font-bold">
//                     What is {listing.name}?
//                   </h2>
//                   <p className="text-base text-gray-700 mt-2">
//                     {listing.description}
//                   </p>
//                   <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
//                     {listing.features.map((feature, index) => (
//                       <li key={index}>{feature}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="mt-8">
//                   <h2 className="text-2xl font-bold">
//                     Key benefits of using {listing.name}
//                   </h2>
//                   <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
//                     {listing.benefits.map((benefit, index) => (
//                       <li key={index}>{benefit}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="bg-yellow-300 rounded-lg p-8 mt-10 text-center">
//                   <h2 className="text-4xl font-bold text-blue-900">
//                     {listing.discountTitle}
//                   </h2>
//                   <div className="flex justify-center items-center mt-4 space-x-4">
//                     <span className="bg-white text-black font-semibold py-2 px-4 rounded-full">
//                       {listing.cashbackOffer}
//                     </span>
//                     <span className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full">
//                       {listing.savings}
//                     </span>
//                   </div>
//                   <p className="text-black mt-4">
//                     {listing.discountDescription}
//                   </p>
//                   <Link
//                     to="/deals"
//                     className="inline-block mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full text-lg hover:bg-blue-700"
//                   >
//                     Redeem Offer Now!
//                   </Link>
//                   <p className="mt-4">
//                     <a href="#" className="text-blue-600 hover:underline">
//                       How NachoNacho discounts work
//                     </a>
//                   </p>
//                 </div>
//                 <div className="mt-10">
//                   <h2 className="text-2xl font-bold">
//                     Service providers who can help you with this product
//                   </h2>
//                   <div className="flex justify-between mt-6">
//                     {listing.serviceProviders.map((provider, index) => (
//                       <div
//                         key={index}
//                         className="bg-blue-50 rounded-lg p-4 w-1/2 mr-2"
//                       >
//                         <div className="flex items-center mb-2">
//                           <img
//                             src={provider.imageUrls}
//                             alt={provider.name}
//                             className="w-12 h-12 rounded-full"
//                           />
//                           <h3 className="text-xl font-bold ml-4">
//                             {provider.name}
//                           </h3>
//                         </div>
//                         <div className="flex items-center mb-2">
//                           {provider.services.map((service, idx) => (
//                             <span
//                               key={idx}
//                               className="bg-white text-black font-semibold px-2 py-1 rounded-full mr-2"
//                             >
//                               {service}
//                             </span>
//                           ))}
//                         </div>
//                         <p className="text-gray-700 mb-2">
//                           {provider.description}
//                         </p>
//                         <a
//                           href={provider.link}
//                           className="bg-yellow-300 text-black font-semibold px-2 py-1 rounded-full inline-block"
//                         >
//                           Contact
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Listing;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FaCartPlus, FaCartArrowDown } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Listing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null); // State to hold userId
  const params = useParams();

  useEffect(() => {
    const fetchUserId = async () => {

      try {
        // const userId=await signin();
        // console.log(userId);
        const res = await fetch('/api/auth/signedinuserid', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();
        console.log(data)
        if (data.userId) {
          setUserId(data.userId); 
        }
      } catch (error) {
        console.error('Error fetching signed-in user ID:', error);
      }
    };

    fetchUserId(); // Fetch userId when component mounts

    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing(); // Fetch listing data when component mounts

    window.scrollTo(0, 0);
  }, [params.listingId]);

  const addToCart = async () => {
    try {
      console.log(quantity)
      const res = await fetch('/api/cart/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, listingId: params.listingId, quantity }), 
      });
      const data = await res.json();
      console.log(data)
      if (data.message==="added to cart") {
        toast.success('Added to cart');
        setQuantity(quantity+1);
      } else {
        toast.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error adding to cart');
    }
  };

  const removeFromCart = async () => {
    try {
      const res = await fetch('/api/cart/remove-from-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, listingId: params.listingId, quantity}), 
      });
      const data = await res.json();
      if (data.message==="removed from cart") {
        toast.success('Removed from cart');
        setQuantity(quantity > 0 ? quantity - 1 : 0);
      } else {
        toast.error('Failed to remove from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Error removing from cart');
    }
  };
  const buyProduct = async () => {
    try {
      const res = await fetch('/api/cart/buyProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, listingId: params.listingId, quantity }), 
      });
      const data = await res.json();
      console.log(data);
      if (data.message==="Product purchased successfully") {
        toast.success('Product purchased successfully');
        // Optionally, you can redirect to a confirmation page or update UI accordingly
      } else {
        toast.error('Failed to purchase product');
      }
    } catch (error) {
      console.error('Error purchasing product:', error);
      toast.error('Error purchasing product');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Something went wrong</div>;
  }

  if (!listing) {
    return null;
  }


  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="min-h-screen flex flex-col mt-12 py-15">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
            {listing && (
              <div>
                <div className="flex items-center justify-center">
                  <img
                    src={listing.imageUrls}
                    alt="Product"
                    className="w-48 h-48 mr-4 rounded-full"
                  />
                  <div>
                    <div className="flex items-center">
                      <h1 className="text-4xl font-bold truncate max-w-lg">{listing.name}</h1>
                      <button
                        onClick={addToCart}
                        className="ml-4 bg-green-600 text-white px-3 py-1 rounded-full text-lg font-semibold hover:bg-green-700"
                      >
                        <FaCartPlus />
                      </button>
                      {quantity > 0 && (
                        <div className="flex items-center ml-2">
                          <button
                            onClick={removeFromCart}
                            className="bg-red-600 text-white px-3 py-1 rounded-full text-lg font-semibold hover:bg-red-700"
                          >
                            <FaCartArrowDown />
                          </button>
                          <span className="ml-2 text-lg">{quantity}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="bg-yellow-300 text-yellow-800 text-lg font-semibold mr-2 px-3 py-1 rounded-full">
                        {listing.cashbackOffer}
                      </span>
                      <span className="bg-purple-600 text-white text-lg font-semibold px-3 py-1 rounded-full flex items-center">
                        💎 Premium
                      </span>
                      <button 
                      onClick={buyProduct}>
                        Buy Now
                      </button>
                    </div>
                    <p className="text-green-700 mt-2 text-lg">
                      Save up to {listing.savings}
                    </p>
                    <p className="text-gray-700 mt-4 text-lg">
                      {listing.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <a
                        href={listing.website}
                        className="text-blue-600 hover:underline text-lg"
                      >
                        Website
                      </a>
                      <button className="ml-4 text-blue-600 hover:underline text-lg">
                        Share
                      </button>
                    </div>
                    <div className="flex items-center mt-4 space-x-3">
                      {listing.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 text-lg font-semibold px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">
                    Eligibility requirements
                  </h2>
                  <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
                    {listing.eligibilityRequirements.map(
                      (requirement, index) => (
                        <li key={index}>{requirement}</li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">
                    What is {listing.name}?
                  </h2>
                  <p className="text-base text-gray-700 mt-2">
                    {listing.description}
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
                    {listing.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">
                    Key benefits of using {listing.name}
                  </h2>
                  <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
                    {listing.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow-300 rounded-lg p-8 mt-10 text-center">
                  <h2 className="text-4xl font-bold text-blue-900">
                    {listing.discountTitle}
                  </h2>
                  <div className="flex justify-center items-center mt-4 space-x-4">
                    <span className="bg-white text-black font-semibold py-2 px-4 rounded-full">
                      {listing.cashbackOffer}
                    </span>
                    <span className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full">
                      {listing.savings}
                    </span>
                  </div>
                  <p className="text-black mt-4">
                    {listing.discountDescription}
                  </p>
                  <Link
                    to="/deals"
                    className="inline-block mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full text-lg hover:bg-blue-700"
                  >
                    Redeem Offer Now!
                  </Link>
                  <p className="mt-4">
                    <a href="#" className="text-blue-600 hover:underline">
                      How NachoNacho discounts work
                    </a>
                  </p>
                </div>
                <div className="mt-10">
                  <h2 className="text-2xl font-bold">
                    Service providers who can help you with this product
                  </h2>
                  <div className="flex justify-between mt-6">
                    {listing.serviceProviders.map((provider, index) => (
                      <div
                        key={index}
                        className="bg-blue-50 rounded-lg p-4 w-1/2 mr-2"
                      >
                        <div className="flex items-center mb-2">
                          <img
                            src={provider.imageUrls}
                            alt={provider.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <h3 className="text-xl font-bold ml-4">
                            {provider.name}
                          </h3>
                        </div>
                        <div className="flex items-center mb-2">
                          {provider.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="bg-white text-black font-semibold px-2 py-1 rounded-full mr-2"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-700 mb-2">
                          {provider.description}
                        </p>
                        <a
                          href={provider.link}
                          className="bg-yellow-300 text-black font-semibold px-2 py-1 rounded-full inline-block"
                        >
                          Contact
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Listing;
