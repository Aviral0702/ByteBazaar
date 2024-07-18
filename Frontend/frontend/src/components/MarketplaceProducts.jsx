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
        <div>
            <div>
                MarketPlace products
            </div>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <div key={product.id}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};
