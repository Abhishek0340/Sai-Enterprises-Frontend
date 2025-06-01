

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

export default function Accessories() {
  const [categories, setCategories] = useState({});
  const { dispatch } = useCart();
  const { dispatch: wishlistDispatch } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`https://sai-enterprises-backend.onrender.com/products`);

        
        const electronicsProducts = res.data.filter(product => product.category === "Accesories");

        
        const groupedCategories = {};
        electronicsProducts.forEach(product => {
          if (!groupedCategories[product.category]) {
            groupedCategories[product.category] = [];
          }
          groupedCategories[product.category].push(product);
        });

        setCategories(groupedCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {Object.keys(categories).length > 0 ? (
          Object.keys(categories).map((category) => (
            <div key={category} className="mb-8">
              <h1 className="text-2xl font-semibold text-center text-gray-800 bg-gray-100 p-4 rounded-lg">
                {category}
              </h1>
              <div className="flex flex-wrap gap-4 ml-4 mt-4 mb-4">
                {categories[category].map((product) => (
                  <div key={product._id} className="card bg-base-100 w-52 shadow-md p-4">
                    <Link to={`/product/${product._id}`}>
                      <figure>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-32 w-2/3 object-contain p-2"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                        />
                      </figure>
                    </Link>
                    <div className="card-body">
                      <Link
                        to={`/product/${product._id}`}
                        className="card-title text-lg font-semibold text-blue-600 hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="font-bold text-gray-800">${product.price}</p>

                      <div className="flex justify-center space-x-4 w-full mt-2">
                        <button
                          className="flex items-center justify-center text-gray-500 rounded-full w-10 h-10 hover:text-red-600"
                          onClick={() => wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: product })}
                        >
                          <FaHeart fontSize={18} />
                        </button>

                        <button
                          className="flex w-36 items-center justify-center bg-blue-500 text-white rounded h-10 hover:bg-blue-600"
                          onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
                        >
                          <FaShoppingCart fontSize={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 text-lg">No products available.</div>
        )}
      </div>

      <Footer />
    </>
  );
}
