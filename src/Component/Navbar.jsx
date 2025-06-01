import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { MdShoppingCart } from "react-icons/md";
import { FaUserAlt, FaHeart } from "react-icons/fa";
import { LuPlus, LuMinus } from "react-icons/lu";
import { useWishlist } from "../Context/WishlistContext";
import axios from "axios";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, dispatch } = useCart();
  const { isLoggedIn, logout } = useAuth(false);
  const navigate = useNavigate();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { wishlist } = useWishlist();
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.BACKEND_URL}/products?search=${searchText}`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchText]);

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar mb-3 shadow bg-white sticky top-0 z-50">
      {/* Logo and Title */}
      <div className="flex-1 bg-white flex items-center">
        <Link to="/" className="btn hover:bg-transparent bg-white hover:border-0 text-xl">
          <img src="https://i.ibb.co/bMMP5YzD/main-logo.png" className="w-10 h-8 mt-2" alt="Logo" />
          <span className="text-2xl sm:inline hidden">Sai Enterprises</span>
        </Link>
      </div>

      {/* Right side controls */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search Product..."
          className="input input-bordered w-24 md:w-auto hidden "
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Wishlist Button */}
        <button
          onClick={() => setWishlistOpen(!wishlistOpen)}
          className="text-indigo-500 font-extrabold relative"
        >
          <FaHeart fontSize={24} className={wishlist.length > 0 ? "text-red-500" : ""} />
        </button>

        {/* Wishlist Modal */}
        {wishlistOpen && (
          <div className="fixed top-16 right-4 w-80 bg-white shadow-lg p-4 rounded-lg z-50 border border-gray-200 overflow-y-auto max-h-80 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Wishlist</h2>
              <button className="btn btn-sm btn-outline" onClick={() => setWishlistOpen(false)}>✕</button>
            </div>

            {wishlist.length === 0 ? (
              <p className="text-gray-600">Your wishlist is empty.</p>
            ) : (
              <ul className="space-y-2">
                {wishlist.map((item) => (
                  <li key={item._id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
                    />
                    <span>
                      <Link to={`/product/${item._id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                        {item.name}
                      </Link>
                      <br />
                      <p className="text-gray-500">₹ {item.price}</p>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Cart Button */}
        <button className="btn btn-ghost btn-circle relative" onClick={() => setCartOpen(!cartOpen)}>
          <MdShoppingCart className="text-3xl font-semibold text-indigo-500" />
          {cart.length > 0 && (
            <span className="badge badge-xs bg-red-500 text-white absolute top-0 right-0">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>

        {/* Cart Modal */}
        {cartOpen && (
          <div className="fixed top-16 right-4 w-80 bg-white shadow-lg p-4 rounded-lg z-50 border border-gray-200 overflow-y-auto max-h-80 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Shopping Cart</h2>
              <button className="btn btn-sm btn-outline" onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center justify-between mb-2 border-b pb-2">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1 ml-2">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">₹ {item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="btn btn-xs btn-outline" onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { productId: item._id, amount: -1 } })}>
                        <LuMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button className="btn btn-xs btn-outline" onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { productId: item._id, amount: 1 } })}>
                        <LuPlus />
                      </button>
                      <button className="btn btn-xs text-red-500" onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item._id })}>X</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="mt-4 pt-2 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹ {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                </div>
                <button className="btn btn-primary w-full mt-2" onClick={handleCheckout}>Checkout</button>
              </div>
            )}
          </div>
        )}

        {/* User Authentication Menu */}
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 p-2 text-indigo-500">
                <FaUserAlt size={24} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
              <li><Link to="/orders">Orders</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <button className="btn btn-outline">
              <Link to="/login">Login</Link>
            </button>
            <button className="btn btn-primary">
              <Link to="/signup">Signup</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
