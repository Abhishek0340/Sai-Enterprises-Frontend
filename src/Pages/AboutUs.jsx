import React from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const AboutUs = () => {
  return (
    <>
    <Navbar />
    <div className="h-1/2 bg-white text-gray-800 px-4 py-10 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-3xl font-bold text-center mb-8">
          About Sai Enterprises
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          Sai Enterprises is your one-stop destination for high-quality products in categories like 
          <span className="font-semibold"> Mobiles, Electronics, and Fashion</span>. Our mission is to provide customers 
          with a seamless and satisfying shopping experience by offering the latest products, best deals, 
          and reliable customer service.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Founded in 2023, we are committed to combining technology with convenience to serve customers 
          across India. Whether you're shopping for the latest smartphone, stylish clothing, or cutting-edge electronics, 
          Sai Enterprises has you covered.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Our vision is to become a trusted and recognized name in the eCommerce space by offering a wide range 
          of genuine products, fast delivery, and exceptional service.
        </p>

        <div className="bg-gray-100 p-6 rounded-xl shadow-sm mt-10">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Curated selection of top brands and trending products</li>
            <li>Secure payment options including Card, UPI, NetBanking</li>
            <li>Fast delivery and easy return policy</li>
            <li>24/7 customer support</li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-xl font-medium mb-2">Have Questions?</h3>
          <p>Contact our support team at <a href="mailto:support@sai-enterprises.com" className="text-blue-600 underline">support@sai-enterprises.com</a></p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AboutUs;
