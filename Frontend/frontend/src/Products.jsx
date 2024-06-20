import React from "react";
import { useContext } from "react";
import { CartContext } from "./CartProvider";
import "./products.css"
const productList = [
    {
        id: 1,
        name: "Product 1",
        price: 100,
    },
    {
        id: 2,
        name: "Product 2",
        price: 200,
    },
    {
        id: 3,
        name: "Product 3",
        price: 300,
    },
];

const Products = () => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="product-body">
            {productList.map((product) => (
                <div key={product.id} className="product-item">
                    <div>
                    <h3>{product.name}</h3>
                    <div className="item-price">
                        <h2>Price</h2>
                        <h2>{product.price}</h2>
                    </div>
                    </div>
                    <button className="item-button" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default Products;