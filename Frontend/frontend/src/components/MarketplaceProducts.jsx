import React, { useEffect, useState } from "react";

async function fetchProducts(category) {
    const response = await fetch(`/api/marketplace/${category}`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data;
}

export const MarketPlaceProducts = () => {
    const [category, setCategory] = useState(''); // Current category
    const [products, setProducts] = useState([]); // Array of fetched products
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const location = useLocation(); // Get current location for category selection
    const selectedCategory = location.pathname.split('/')[2]; // Extract category from URL

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const fetchedProducts = await fetchProducts(selectedCategory || ''); // Use selectedCategory or default to empty string
                setProducts(fetchedProducts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Fetch data on initial render
    }, [selectedCategory]); // Re-fetch on category change

    return (
        <div className="p-5">
        <div className="text-2xl font-bold mb-4">
          MarketPlace Products
        </div>
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
};
