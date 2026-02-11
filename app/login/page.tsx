"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    sessionStorage.setItem("userPhone", phone);
    router.push("/dashboard");
  };

  return (
    <>
      <Navbar />

      {/* Main Section */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            w-full
            max-w-sm
            sm:max-w-md
            md:max-w-lg
            bg-white
            rounded-2xl
            shadow-lg
            border border-gray-100
            p-6 sm:p-8 md:p-10
          "
        >
          {/* Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Enter your phone number to view your bookings.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              {/* Input group */}
              <div className="flex w-full">
                <span className="flex items-center px-3 sm:px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm sm:text-base font-medium">
                  +91
                </span>

                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ""));
                    setError("");
                  }}
                  className="
                    flex-1
                    px-3 sm:px-4
                    py-3
                    border border-gray-300
                    rounded-r-lg
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    text-base sm:text-lg
                  "
                  placeholder="Enter mobile number"
                  autoFocus
                />
              </div>

              {error && (
                <p className="mt-2 text-xs sm:text-sm text-red-500">{error}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={phone.length !== 10}
              className="
                w-full
                bg-blue-600
                text-white
                font-semibold
                py-3
                rounded-lg
                hover:bg-blue-700
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                text-sm sm:text-base
              "
            >
              View Dashboard
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
