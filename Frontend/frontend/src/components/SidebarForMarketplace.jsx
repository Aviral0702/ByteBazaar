import React from "react";
import { Link, useLocation } from "react-router-dom";
const SidebarMarketplace = ({ categories }) => {
    const location = useLocation();
    const selectedCategory = location.pathname.split('/')[2]; // Extract category from URL

    return (
        <nav>
            <h2>Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category}>
                        <Link
                            to={`/marketplace/${category}`}
                            className={category === selectedCategory ? 'active' : ''}
                        >
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SidebarMarketplace;
