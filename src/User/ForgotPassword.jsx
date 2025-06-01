import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const sendOtp = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.BACKEND_URL}/send-reset-otp`, { email })
      .then((res) => {
        if (res.data.success) {
          setStep(2);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const resetPassword = (e) => {
    e.preventDefault();
    axios
      .post("https://sai-enterprises-e-commerce-backend.vercel.app/reset-password", { email, otp, newPassword })
      .then((res) => {
        if (res.data.success) {
          alert("Password reset successful!");
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
      <div className="h-screen w-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md p-6 border rounded-2xl shadow-lg bg-white">
          <h2 className="text-2xl font-bold text-center mb-6">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>

          {step === 1 ? (
            <form onSubmit={sendOtp} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-12 px-4 border rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="w-full h-12 bg-indigo-200 hover:bg-indigo-300 rounded-lg font-semibold">
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={resetPassword} className="space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full h-12 px-4 border rounded-lg"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter New Password"
                className="w-full h-12 px-4 border rounded-lg"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button className="w-full h-12 bg-indigo-200 hover:bg-indigo-300 rounded-lg font-semibold">
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
