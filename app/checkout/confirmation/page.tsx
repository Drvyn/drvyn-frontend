"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Calendar, Clock, MapPin, Phone, Package } from "lucide-react";
import { useRouter } from "next/navigation";

type BookingDetails = {
  phone: string;
  date: string;
  time: string;
  address: string;
  alternatePhone: string;
  serviceCenter: string;
  totalPrice: number;
  cartItems: Array<{
    packageName: string;
    price: number;
    quantity: number;
  }>;
};

const AnimatedCheckmark = () => (
  <motion.svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    />
    <motion.path
      d="M8 12L11 15L16 9"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        delay: 0.3,
        duration: 0.3,
        ease: "easeInOut",
      }}
    />
  </motion.svg>
);

const ConfirmationPage = () => {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const details = sessionStorage.getItem("bookingDetails");
    if (!details) {
      router.push("/");
      return;
    }
    setBookingDetails(JSON.parse(details));
  }, [router]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-indigo-600 text-lg"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden border border-white/20"
      >
        {/* Header section */}
        <div className="relative h-40 sm:h-48 bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full"></div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full"></div>
          
          <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="mb-3 sm:mb-4"
            >
              <AnimatedCheckmark />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2"
            >
              Booking Confirmed!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="text-blue-100 text-sm sm:text-base lg:text-lg"
            >
              Your service is scheduled successfully
            </motion.p>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row">
          {/* Left panel - Booking details */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
            <div className="relative">
              {/* Vertical timeline line */}
              <div 
                style={{ left: '1.55rem' }} 
                className="absolute top-11 bottom-4 w-0.5 bg-gradient-to-b from-indigo-200 to-blue-200 hidden sm:block"
              ></div>
              
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center ml-0 sm:ml-2">
                <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 text-blue-600 mr-2 sm:mr-3 shadow-sm">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                Booking Details
              </h2>

              <div className="space-y-4 sm:space-y-6 pl-0 sm:pl-8 md:pl-12">
                {[
                  {
                    icon: <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />,
                    label: "Contact Number",
                    value: `+91 ${bookingDetails.phone}`,
                    color: "bg-blue-100",
                  },
                  ...(bookingDetails.alternatePhone ? [{
                    icon: <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />,
                    label: "Alternate Number",
                    value: `+91 ${bookingDetails.alternatePhone}`,
                    color: "bg-blue-100",
                  }] : []),
                  {
                    icon: <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />,
                    label: "Service Date",
                    value: formatDate(bookingDetails.date),
                    color: "bg-blue-100",
                  },
                  {
                    icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />,
                    label: "Service Time",
                    value: formatTime(bookingDetails.time),
                    color: "bg-blue-100",
                  },
                  {
                    icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />,
                    label: "Service Center",
                    value: bookingDetails.serviceCenter,
                    color: "bg-blue-100",
                  },
                  {
                    icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />,
                    label: "Pickup Address",
                    value: bookingDetails.address,
                    color: "bg-blue-100",
                    isAddress: true
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline dot - hidden on mobile */}
                    <div className={`absolute -left-5 sm:-left-7 top-4 sm:top-5 w-2 h-2 sm:w-3 sm:h-3 rounded-full ${item.color} border-2 border-white shadow-sm hidden sm:block`}></div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow max-w-full">
                      <div className="flex items-center mb-1">
                        <span className={`p-1 sm:p-1.5 rounded-lg ${item.color} mr-2 sm:mr-3`}>
                          {item.icon}
                        </span>
                        <h3 className="font-semibold text-gray-700 text-sm sm:text-base">{item.label}</h3>
                      </div>
                      <p className={`text-gray-600 text-sm sm:text-base pl-0 sm:pl-10 ${item.isAddress ? 'break-words whitespace-pre-wrap' : ''}`}>
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel - Service summary */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8">
            <div className="sticky top-4 sm:top-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 text-blue-600 mr-2 sm:mr-3 shadow-sm">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                Service Summary
              </h2>

              {/* Receipt card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm overflow-hidden mb-6 sm:mb-8"
              >
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-700 text-sm sm:text-base">ORDER SUMMARY</h3>
                    <span className="text-xs sm:text-sm text-gray-500">#{Math.floor(Math.random() * 10000)}</span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {bookingDetails.cartItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-3 sm:p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm sm:text-base">{item.packageName}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm sm:text-base">₹{item.price * item.quantity}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200">
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Subtotal</span>
                      <span className="text-sm sm:text-base">₹{bookingDetails.totalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 sm:pt-2 border-t border-gray-200 mt-1 sm:mt-2">
                      <span className="font-bold text-gray-800 text-sm sm:text-base">Total Amount</span>
                      <span className="text-lg sm:text-xl font-bold text-blue-600">
                        ₹{bookingDetails.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-1 gap-2 sm:gap-3"
              >
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.print()}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium flex items-center justify-center hover:bg-blue-50 transition-all text-sm sm:text-base"
                >
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  Download Receipt
                </motion.button>
                
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/service")}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-lg font-medium flex items-center justify-center hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base"
                >
                  Book Another Service
                </motion.button>
                
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/")}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center hover:bg-gray-200 transition-all text-sm sm:text-base"
                >
                  Back to Home
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;