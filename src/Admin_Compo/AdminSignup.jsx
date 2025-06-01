import React, { useState } from 'react';
import axios from 'axios';

const AdminSignup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://sai-enterprises-backend.onrender.com/adminsignup', formData);
      setMessage(res.data.msg);
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Signup</h2>
      {message && <p className="mb-2 text-sm text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="border p-2 rounded" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="border p-2 rounded" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Signup</button>
      </form>
    </div>
  );
};

export default AdminSignup;
