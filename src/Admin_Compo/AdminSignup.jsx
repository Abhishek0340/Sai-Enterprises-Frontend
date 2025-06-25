// import React, { useState } from 'react';
// import axios from 'axios';

// const AdminSignup = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/adminsignup', formData);
//       setMessage(res.data.msg);
//       setFormData({ name: '', email: '', password: '' });
//     } catch (err) {
//       setMessage(err.response?.data?.msg || 'Signup failed');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4">Admin Signup</h2>
//       {message && <p className="mb-2 text-sm text-green-600">{message}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="border p-2 rounded" />
//         <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="border p-2 rounded" />
//         <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="border p-2 rounded" />
//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default AdminSignup;


import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const AdminSignup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/adminsignup', formData);
      setMessage(res.data.msg);
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border-gray-300 p-6 sm:p-8 rounded-2xl shadow-2xl border">
        <h2 className="text-center font-bold text-3xl sm:text-4xl text-black mb-6">Admin Signup</h2>
        {message && (
          <p className="mb-4 text-sm text-center text-green-600 font-medium">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name..."
            required
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition duration-300"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email..."
            required
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition duration-300"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password..."
            required
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition duration-300"
          />
          <button
            type="submit"
            className="w-full h-12 bg-indigo-200 text-black rounded-lg font-semibold shadow-md hover:bg-indigo-300 transition duration-300 transform hover:scale-105"
          >
            Signup
          </button>
        </form>
                  <div className="text-center mt-4 text-black">
            <p>
              Already have an account?
              <Link
                to="/adminlogin"
                className="ml-2 font-semibold text-indigo-500 hover:text-indigo-700 transition duration-300 underline"
              >
                Admin Login
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
};

export default AdminSignup;
