import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      {/* Hero Section */}
      <div className="max-w-3xl text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Your Digital Wallet, <br /> Secure & Easy
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Manage your money, send payments, and track expenses — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 shadow-md transition-all"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-lg bg-transparent border-2 border-white font-semibold hover:bg-white hover:text-black transition-all"
          >
            Login
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="p-6 bg-gray-900 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-3 text-white">🔒 Secure</h2>
          <p className="text-gray-200">
            Advanced encryption keeps your money and data safe at all times.
          </p>
        </div>
        <div className="p-6 bg-gray-900 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-3 text-white">⚡ Fast Payments</h2>
          <p className="text-gray-200">
            Send and receive money instantly with just a few clicks.
          </p>
        </div>
        <div className="p-6 bg-gray-900 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-3 text-white">📊 Track Expenses</h2>
          <p className="text-gray-200">
            Stay on top of your finances with real-time expense tracking.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;