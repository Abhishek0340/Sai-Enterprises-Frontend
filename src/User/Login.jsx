
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (email && password) {
        login({ email });
        localStorage.setItem("loggedInUser", email); 
        navigate("/");
      } else {
        setError("Please enter email and password");
      }
    } catch (err) {
      setError("Failed to login");
    }
  };

  return (
    <>
      <Navbar />

      <div className="h-screen w-screen overflow-x-hidden flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border-gray-300 p-6 sm:p-8 rounded-2xl shadow-2xl border">
          <h1 className="text-center font-bold text-3xl sm:text-4xl text-black mb-6">Login</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition duration-300"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition duration-300"
              placeholder="Enter Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full h-12 bg-indigo-200 text-black rounded-lg font-semibold shadow-md hover:bg-indigo-300 transition duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <hr className="my-6 border-gray-300" />

          <div className="text-center text-black">
            <p>
              Don't have an account?
              <Link
                to="/signup"
                className="ml-2 font-semibold text-indigo-500 hover:text-indigo-700 transition duration-300 underline"
              >
                Sign up
              </Link>
            </p>
            <p className="text-center mt-4 text-sm">
              Forgot your password?{" "}
              <Link to="/forgot-password" className="text-indigo-500 underline">
                Reset Here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
