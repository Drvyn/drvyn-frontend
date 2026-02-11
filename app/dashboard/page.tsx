// app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, MapPin, Package, Settings, LogOut } from "lucide-react";

type Booking = {
  _id: string;
  brand: string;
  model: string;
  date: string;
  time: string;
  address: string;
  serviceCenter: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  cartItems: { packageName: string; quantity: number }[];
};

export default function DashboardPage() {
  const router = useRouter();
  const [phone, setPhone] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userPhone = sessionStorage.getItem("userPhone");
    if (!userPhone) {
      router.push("/login");
      return;
    }
    setPhone(userPhone);

    // Fetch bookings from backend
    // Note: Banner.tsx saves phone as +91XXXXXXXXXX, so we encode the '+' as %2B
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings?phone=%2B91${userPhone}`
        );
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("userPhone");
    router.push("/");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-600">Managing bookings for +91 {phone}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
              <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
              <p className="text-gray-500 mb-6">You haven't booked any car services yet.</p>
              <button
                onClick={() => router.push("/servicespage")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Book a Service
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {booking.brand} {booking.model}
                        </h2>
                        <p className="text-sm text-gray-500">Booking ID: {booking._id}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Service Date</p>
                          <p className="text-gray-900">{booking.date}</p>
                          <p className="text-gray-600 text-sm">{booking.time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p className="text-gray-900">{booking.serviceCenter}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Amount</p>
                          <p className="text-gray-900 font-bold">₹{booking.totalPrice}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-sm font-medium text-gray-500 mb-3">Packages Booked:</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.cartItems.map((item, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">
                            {item.packageName} {item.quantity > 1 ? `(x${item.quantity})` : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}