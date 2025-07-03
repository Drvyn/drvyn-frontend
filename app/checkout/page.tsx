"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {FiCalendar, FiClock, FiMapPin, FiPhone, FiShoppingBag} from "react-icons/fi"

type CartItem = {
  packageName: string;
  price: number;
  quantity: number;
};

type CarInfo = {
  model?: string;
  phone?: string;
  [key: string]: unknown;
};

const CheckoutPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [carInfo, setCarInfo] = useState<CarInfo>({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [address, setAddress] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [serviceCenter, setServiceCenter] = useState("COIMBATORE");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const cartData = sessionStorage.getItem("cart");
    const carData = sessionStorage.getItem("carFormData");

    if (cartData) setCart(JSON.parse(cartData));
    if (carData) {
      const parsedCarData: CarInfo = JSON.parse(carData);
      setCarInfo(parsedCarData);
    }
  }, []);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const validateForm = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select date and time for service");
      return false;
    }

    if (!address.trim()) {
      toast.error("Please enter a valid pickup address");
      return false;
    }

    if (alternatePhone && !/^\d{10}$/.test(alternatePhone)) {
      toast.error("Please enter a valid 10-digit alternate phone number");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

  try {
    const bookingDetails = {
      brand: carInfo.brand || "",
      model: carInfo.model || "",
      fuelType: carInfo.fuelType || "",
      year: carInfo.year || "",
      phone: carInfo.phone || "",
      date: selectedDate,
      time: selectedTime,
      address,
      alternatePhone,
      serviceCenter,
      totalPrice,
      cartItems: cart
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submit-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingDetails),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit booking");
    }

    const result = await response.json();
    
    // Store booking details in sessionStorage for confirmation page
    sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    sessionStorage.removeItem("cart");
    router.push("/checkout/confirmation");
  } catch (error) {
    let errorMessage = "Failed to place order. Please try again.";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    console.error("Order submission error:", error);
    toast.error(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/*Header*/}
      <div className="bg-white p-6 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center flex-col sm:flex-row">
            <h1 className=" text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Complete Your Booking</h1>
            <div className="flex items-center space-x-2">
              <FiShoppingBag className="text-blue-600 "/>
              <span className="font-medium">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        </div>
      </div>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Left side - Checkout Details */}
          <div className="lg:w-[70%]">
            {/* Customer Information Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <FiPhone className="mr-2 text-blue-600"/> Customer Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registered Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500">
                      +91
                    </span>
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={carInfo.phone || ""}
                      readOnly
                    />
                  </div>
                </div>

                {/* Vehicle Model - Only shows if model exists */}
                {carInfo.model && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Model
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                      value={carInfo.model}
                      readOnly
                    />
                  </div>
                )}
              </div>
            </div>


            {/* Date and Time Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
              <h2 className="text-xl flex items-center font-semibold mb-6 text-gray-800">
                <FiCalendar className="mr-2 text-blue-600"/>Service Schedule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FiCalendar className="mr-2 text-gray-500"/>Date *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FiClock className="mr-2 text-gray-500"/>Time *</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Address Selection */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
              <h2 className="text-xl flex font-semibold mb-6 text-gray-800 items-center"><FiMapPin className="mr-2 text-blue-600"/>Pickup Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Address *</label>
              <textarea
                placeholder="Enter your complete address including landmarks"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            
            {/* Alternate Phone number */}
            <div className="mb-6">
              <h2 className="block text-sm font-medium mb-2 text-gray-700">Alternate Phone Number (Optional)</h2>
              <input
                type="tel"
                maxLength={10}
                placeholder="Enter 10-digit alternate number"
                className="w-full border border-gray-300 p-3 sm:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                value={alternatePhone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setAlternatePhone(value);
                }}
              />
            </div>

            {/* Service Centre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Center</label>
              <select 
                className="w-full border border-gray-300 p-3 sm:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                value={serviceCenter}
                onChange={(e) => setServiceCenter(e.target.value)}
              >
                <option value="COIMBATORE">Coimbatore Service Center</option>
                <option value="CHENNAI" disabled>(Coming Soon)</option>
              </select>
            </div>
          </div>
        </div>

          {/* Right side - Order Summary */}
          <div className="lg:w-[30%]">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 sticky top-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-r">Order Summary</h2>

            {cart.length > 0 ? (
              <ul className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm text-gray-700">
                    <div className="flex items-center">
                     <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-3">{item.quantity}</span>
                    <span className="text-sm">{item.packageName}</span>
                    </div>
                    <div className="font-semibold">₹{item.price * item.quantity}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mb-6 text-center py-8">
                  <FiShoppingBag className="mx-auto text-gray-400 text-3xl mb-2" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
            )}

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-gray-800 items-center text-lg font-semibold">
                <span>Total Amount:</span>
                <span>₹{totalPrice}</span>
              </div>
            </div> 
                <button
                onClick={handlePlaceOrder}
                className={`w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                } ${cart.length === 0 ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed" : ""}`}
                disabled={cart.length === 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Confirm & Place Order"}
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                 <p>By placing your order, you agree to our</p>
                <p>
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default CheckoutPage;