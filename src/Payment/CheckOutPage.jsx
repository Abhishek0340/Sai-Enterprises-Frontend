import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

export default function CheckOutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || {};
  const { dispatch } = useCart();
  const { isLoggedIn } = useAuth();

  const [userEmail, setUserEmail] = useState(""); 

  const [addressData, setAddressData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      setUserEmail(user.email); 
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () =>
    cart?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  const handleSimpleCheckout = async () => {
    const payload = {
      cart,
      totalAmount: calculateTotal(),
      shippingAddress: addressData,
    };

    try {
      const res = await fetch(`http://localhost:5000/pending-orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        navigate("/payment", {
          state: {
            amount: calculateTotal(),
            cart,
            userInfo: {
              name: addressData.name,
              email: addressData.email,
              phone: addressData.phone,
            },
          },
        });
      } else {
        alert("Failed to place order: " + result.error);
      }
    } catch (err) {
      console.error("Order submission failed:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Items</h2>

          {cart?.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b py-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
                <div className="flex-1 ml-4">
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                  <p>₹ {item.price}</p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item._id })}
                >
                  -
                </button>
              </div>
            ))
          )}

          <div className="flex justify-between mt-6 text-xl font-bold border-t pt-4">
            <p id="useremail">Email: {userEmail}</p>
            <span>Total:</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={addressData.name}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={addressData.email}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={addressData.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={addressData.address}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={addressData.landmark}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={addressData.pincode}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={addressData.city}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={addressData.state}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={addressData.country}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <button
            onClick={handleSimpleCheckout}
            className="w-full mt-6 py-3 rounded font-semibold bg-green-600 hover:bg-green-700 text-white"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
