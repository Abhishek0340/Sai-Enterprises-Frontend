import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';

export default function PaymentSuccess() {
    return (
      <>
      <Navbar />
      <div className="text-center mt-10 mb-10 p-4">
        <h2 className="text-3xl font-bold text-green-600">Payment Successful!</h2>
        <p className="mt-4 mb-4">Thank you for your order.</p>
        <button className='btn hover:bg-gray-200'><Link to='/'>Home</Link></button>
      </div>
      <Footer />
      </>
    );
  }
  