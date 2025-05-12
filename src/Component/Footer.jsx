import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative  text-gray-200 mt-10  bg-indigo-950">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-t-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-12 lg:py-16 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

          {/* Logo & About */}
          <div className="text-center">
            <img src="https://i.ibb.co/bMMP5YzD/main-logo.png" alt="Logo" className="w-16 block m-auto h-16 mb-4 filter invert brightness-0" />
            <h2 className="text-white text-xl font-semibold">Sai Enterprises</h2>
            <p className="text-sm mt-2">
              Your trusted online shop for top-quality electronics and fashion since 2024.
            </p>
          </div>

          {/* Explore */}
          <div className="text-center">
            <h3 className="text-white font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-white transition">All Products</Link></li>
              <li><Link to="/mobile" className="hover:text-white transition">Mobiles</Link></li>
              <li><Link to="/electronics" className="hover:text-white transition">Electronics</Link></li>
              <li><Link to="/categories/fashion" className="hover:text-white transition">Fashion</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-center">
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about_us" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact_us" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="text-center">
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms_of_use" className="hover:text-white transition">Terms of Use</Link></li>
              <li><Link to="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition">Returns & Shipping</Link></li>
            </ul>
            <div className=" gap-4 hidden text-center mt-5 text-gray-400">
              <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-blue-500 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-red-600 transition"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
          Made with <span className="text-red-500">♥</span> by Sai Enterprises © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
