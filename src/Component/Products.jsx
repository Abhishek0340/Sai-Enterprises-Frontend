import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';

export function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState({});
    const { dispatch: cartDispatch } = useCart();
    const { dispatch: wishlistDispatch } = useWishlist();

    useEffect(() => {
        axios.get(`${import.meta.env.BACKEND_URL}/products`)
            .then((res) => {
                setProducts(res.data);
                const groupedCategories = res.data.reduce((acc, product) => {
                    const category = product.category || "General";
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(product);
                    return acc;
                }, {});
                for (const category in groupedCategories) {
                    groupedCategories[category] = groupedCategories[category]
                        .sort((a, b) => b.sales - a.sales)
                        .slice(0, 4);
                }
                setCategories(groupedCategories);
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <>
            {Object.keys(categories).map((category) => (
                <div className="mt-8   rounded  p-4  mb-2" key={category}>
                    <h1 className="text-2xl font-semibold mt-6  mb-8 bg-gray-50   px-4  capitalize text-center">{category}</h1>
                    <div className="grid  grid-cols-1 sm:grid-cols-2 m-4 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mb-8">
                        {categories[category].map((product) => (
                            <div key={product._id} 
                            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                                <figure>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-32 w-full object-contain"
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                    />
                                </figure>
                                <div className="mt-4">
                                    <Link to={`/product/${product._id}`} className="text-lg font-semibold text-blue-600 hover:underline block text-center">
                                        {product.name}
                                    </Link>
                                    <p className="font-bold text-gray-800 text-center mt-2">${product.price}</p>
                                    <div className="flex justify-center items-center space-x-4 mt-3">
                                        <button
                                            className="flex items-center justify-center text-gray-500 hover:text-red-600"
                                            onClick={() => wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: product })}
                                        >
                                            <FaHeart fontSize={18} />
                                        </button>
                                        <button
                                            className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            onClick={() => cartDispatch({ type: "ADD_TO_CART", payload: product })}
                                        >
                                            <FaShoppingCart fontSize={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}
