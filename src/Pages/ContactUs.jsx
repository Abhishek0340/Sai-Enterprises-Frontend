
import React, { useState } from "react";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.BACKEND_URL}/contact`, formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending contact form:", err);
      alert("Failed to send message.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-1/3 bg-white text-gray-800 px-4 py-10 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-3xl font-bold text-center mb-8">Contact Us</h1>
          <p className="text-lg text-center mb-10">
            Have a question, concern, or feedback? We’d love to hear from you!
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-xl shadow-sm">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full capitalize px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 capitalize border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Your message"
                  required
                  className="w-full px-4 py-2 border capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            <div className="space-y-6 text-gray-700">
              <div>
                <h2 className="text-xl font-semibold mb-2">Sai Enterprises</h2>
                <h3 className="font-semibold">Address</h3>
                <p>123 Main Street, Pune, Maharashtra, India</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p><a href="mailto:support@sai-enterprises.com" className="text-blue-600 underline">support@sai-enterprises.com</a></p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>+91 98765 43210</p>
              </div>
              <div className="hidden">
                <h3 className="font-semibold">Working Hours</h3>
                <p>Mon - Sat: 9:00 AM – 7:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
