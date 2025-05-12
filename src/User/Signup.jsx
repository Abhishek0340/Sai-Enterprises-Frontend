

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";

const Signup = () => {
  const [step, setStep] = useState(1); 
  const [otp, setOtp] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.BACKEND_URL}/register`, { name, email, mobile, password })
      .then((res) => {
        if (res.data.success) {
          
          localStorage.setItem("pendingSignupEmail", email);
          setStep(2); 
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.BACKEND_URL}/verify-otp`, { email, otp })
      .then((res) => {
        if (res.data.success) {
          alert("Signup successful!");
         
          localStorage.setItem("loggedInUser", email);
          navigate("/login");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="h-screen w-screen overflow-x-hidden flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border-gray-300 p-6 sm:p-8 rounded-2xl shadow-2xl border">
          <h1 className="text-center font-bold text-3xl sm:text-4xl text-black mb-6">
            {step === 1 ? "Signup" : "Verify OTP"}
          </h1>

          {step === 1 ? (
            <form onSubmit={handleRegister} className="capitalize space-y-4">
              <input
                type="text"
                placeholder="Enter Name..."
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border capitalize border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition duration-300"
                required
              />
              <input
                type="email"
                placeholder="Enter Email..."
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border capitalize border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition duration-300"
                required
              />
              <input
                type="number"
                placeholder="Enter Mobile Number..."
                onChange={(e) => setMobile(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border capitalize border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition duration-300"
                required
              />
              <input
                type="password"
                placeholder="Enter Password..."
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition duration-300"
                required
              />
              <button className="w-full h-12 bg-indigo-200 text-black rounded-lg font-semibold shadow-md hover:bg-indigo-300 transition duration-300 transform hover:scale-105">
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <input
                type="text"
                placeholder="Enter OTP..."
                onChange={(e) => setOtp(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition duration-300"
                required
              />
              <button className="w-full h-12 bg-indigo-200 text-black rounded-lg font-semibold shadow-md hover:bg-indigo-300 transition duration-300 transform hover:scale-105">
                Verify OTP
              </button>
            </form>
          )}

          <hr className="my-6 border-gray-300" />
          <div className="text-center text-black">
            <p>
              Already have an account?
              <Link
                to="/login"
                className="ml-2 font-semibold text-indigo-500 hover:text-indigo-700 transition duration-300 underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
