import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  const fetchProducts = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/listing/${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <h1>Products in {category}</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default ProductList;
