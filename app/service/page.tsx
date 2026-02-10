"use client";
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import RouteGuard from '@/components/RouteGuard';
import Image from 'next/image';
import { ChevronRight, ChevronDown, Check, Shield, Star, Circle, Trash2, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup, useTransform, useMotionValue, animate } from 'framer-motion';
import Head from 'next/head';

type CarInfo = {
  brand?: string;
  model?: string;
  fuelType?: string;
  phone?: string;
  year?: string;
  image?: string;
};

type ServicePackage = {
  name: string;
  price: number;
  discountedPrice: number;
  warranty: string;
  interval: string;
  services: string[];
  duration: string;
  recommended?: boolean;
  category?: string;
  Extra?: string;
  Extra1?: string;
};

type CartItem = {
  packageName: string;
  price: number;
  quantity: number;
  fuelType?: string;
  Extra?: string;
  Extra1?: string;
};

const ServicePage = () => {
  const [carInfo, setCarInfo] = useState<CarInfo>({});
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Periodic Car Services");
  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({});
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [insuranceSubmitting, setInsuranceSubmitting] = useState(false);
  const [insuranceSubmitted, setInsuranceSubmitted] = useState(false);
  const [companyPolicyName, setCompanyPolicyName] = useState(""); // New state for Company Policy Name
  const [companyPolicyError, setCompanyPolicyError] = useState<string | null>(null); // Error state for validation
  const scrollRef = useRef<HTMLDivElement>(null);

  const serviceCategories = [
    "Periodic Car Services",
    "AC Service & Repair",
    "Denting & Painting",
    "Detailing Services",
    "Car Inspections",
    "Insurance Claims",
    "Car Wash"
  ];

  const serviceImages: Record<string, string> = {
    "Periodic Car Services": "serviceCategories/PeriodicCarServices.png",
    "AC Service & Repair": "serviceCategories/ACService&Repair.png",
    "Denting & Painting": "serviceCategories/Denting&Painting.png",
    "Detailing Services": "serviceCategories/DetailingServices.png",
    "Car Inspections": "serviceCategories/CarInspections.png",
    "Insurance Claims": "serviceCategories/InsuranceClaims.png",
    "Car Wash": "serviceCategories/SOSService.png",
  };

  useEffect(() => {
    const data = sessionStorage.getItem('carFormData');
    if (data) {
      const carData = JSON.parse(data);
      setCarInfo(carData);
      fetchServicePackages(activeCategory, carData);
    } else {
      setCarInfo({ fuelType: "Petrol", brand: "Maruti", model: "Swift" });
      fetchServicePackages(activeCategory, { fuelType: "Petrol", brand: "Maruti", model: "Swift" });
    }
  }, [activeCategory]);

  const fetchServicePackages = async (category: string, carData: CarInfo) => {
    try {
      setLoading(true);
      setError(null);
      const encodedCategory = encodeURIComponent(category);
      const queryParams = new URLSearchParams({
        category: encodedCategory,
        fuel_type: carData.fuelType || "Petrol",
        brand: carData.brand || "",
        model: carData.model || "",
      }).toString();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/service-packages?${queryParams}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      const formattedPackages = data.map((pkg: ServicePackage) => ({
        ...pkg,
        services: Array.isArray(pkg.services) ? pkg.services : [],
        price: Number(pkg.price) || 0,
        discountedPrice: Number(pkg.discountedPrice) || Number(pkg.price) || 0,
      }));
      
      setPackages(formattedPackages);
      setExpandedPackages(prev => ({ ...prev, [category]: false }));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while fetching services');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (activeCategory !== category) {
      setActiveCategory(category);
      fetchServicePackages(category, carInfo);
    }
  };

  const toggleExpandPackages = () => {
    setExpandedPackages(prev => ({
      ...prev,
      [activeCategory]: !prev[activeCategory]
    }));
  };

  const toggleExpandServices = (packageName: string) => {
    setExpandedServices(prev => ({
      ...prev,
      [packageName]: !prev[packageName]
    }));
  };

  const addToCart = async (pkg: ServicePackage) => {
    setAddingToCart(pkg.name);
    await new Promise(resolve => setTimeout(resolve, 500)); // Animation duration
    
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.packageName === pkg.name && item.fuelType === carInfo.fuelType
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.packageName === pkg.name && item.fuelType === carInfo.fuelType
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart, 
          { 
            packageName: pkg.name, 
            price: pkg.discountedPrice, 
            quantity: 1,
            fuelType: carInfo.fuelType || "Petrol",
            Extra: pkg.Extra,
            Extra1: pkg.Extra1
          }
        ];
      }
    });
    
    setAddingToCart(null);
  };

  const removeFromCart = (packageName: string) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.packageName === packageName && item.fuelType === carInfo.fuelType)
      )
    );
  };

  const updateQuantity = (packageName: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.packageName === packageName && item.fuelType === carInfo.fuelType
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  const submitInsuranceRequest = async () => {
    // Validate Company Policy Name
    if (!companyPolicyName.trim()) {
      setCompanyPolicyError("Company Policy Name is required");
      return;
    }
    setCompanyPolicyError(null);

    try {
      setInsuranceSubmitting(true);
      setError(null);
      
      const requestData = {
        brand: carInfo.brand || '',
        model: carInfo.model || '',
        fuelType: carInfo.fuelType || '',
        year: carInfo.year || '',
        phone: carInfo.phone || '',
        companyPolicyName: companyPolicyName.trim(), // Include Company Policy Name
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submit-insurance-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit insurance request');
      }

      setInsuranceSubmitted(true);
      setCompanyPolicyName(""); // Reset the input field after successful submission
    } catch (error) {
      setError('Failed to submit insurance request. Please try again.');
    } finally {
      setInsuranceSubmitting(false);
    }
  };

  const visiblePackages = expandedPackages[activeCategory] 
    ? packages 
    : packages.slice(0, 4);

  const Counter = ({ value, duration = 1 }: { value: number; duration?: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

    useEffect(() => {
      const controls = animate(count, value, {
        duration: duration,
        ease: "easeOut",
      });
      return controls.stop;
    }, [value]);

    return <motion.span>{rounded}</motion.span>;
  };

  const proceedToCheckout = () => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '/checkout';
  };

  if (loading && packages.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 font-medium">Loading service packages...</p>
        </div>
      </div>
    );
  }

  return (
    <RouteGuard 
      requiredData="carFormData" 
      redirectTo="/"
    >
    <>
      
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6">
        {/* Mobile Horizontal Scrollable Categories */}
        <div className="lg:hidden bg-white py-4 shadow-sm mb-5">
          <div className="relative">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div 
              ref={scrollRef}
              className="flex gap-x-4 overflow-x-auto scrollbar-hide px-10"
            >
              {serviceCategories.map((service) => (
                <div 
                  key={service} 
                  className={`w-24 flex flex-col items-center flex-shrink-0 cursor-pointer transition-colors ${activeCategory === service ? 'text-blue-600' : 'text-gray-600'}`}
                  onClick={() => handleCategoryClick(service)}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors ${activeCategory === service ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <img 
                      src={serviceImages[service]} 
                      alt={service}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">{service}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Vertical Scrollable Sidebar for Categories (Desktop) */}
          <div className="hidden lg:block lg:w-1/5">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20 max-h-[88vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Categories</h3>
              <div className="space-y-2">
                {serviceCategories.map((service) => (
                  <motion.div
                    key={service}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                      activeCategory === service ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => handleCategoryClick(service)}
                    whileHover={{ x: 4 }}
                  >
                    <img 
                      src={serviceImages[service]} 
                      alt={service}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <span className="text-sm font-medium">{service}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-4/5 flex flex-col lg:flex-row gap-6">
            {/* Service Packages */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {activeCategory === "Insurance Claims" ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Insurance Assistance</h2>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">How it works</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                            <Check className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-700">We'll connect you with our insurance partners</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                            <Check className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-700">Get expert assistance with insurance processes</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                            <Check className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-700">Receive a callback within 24 hours</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Vehicle Details</h3>
                      <div className="space-y-4 flex flex-wrap gap-8">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Brand</p>
                          <p className="font-medium">{carInfo.brand || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Model</p>
                          <p className="font-medium">{carInfo.model || 'Not specified'}</p> 
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Fuel Type</p>
                          <p className="font-medium">{carInfo.fuelType || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Year</p>
                          <p className="font-medium">{carInfo.year || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                          <p className="font-medium">{carInfo.phone || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                    <div className='border border-gray-200 rounded-lg p-6 mb-6'>
                      <div className='mb-4'>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Policy Name</h3>
                        <input
                          type='text'
                          placeholder='Enter company policy name'
                          value={companyPolicyName}
                          onChange={(e) => setCompanyPolicyName(e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            companyPolicyError ? 'border-red-500' : 'border-gray-300'
                          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {companyPolicyError && (
                          <p className="text-red-500 text-sm mt-1">{companyPolicyError}</p>
                        )}
                      </div>
                    </div>
                   
                    {insuranceSubmitted ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Request Submitted!</h3>
                        <p className="text-gray-600 mb-4">
                          Our insurance team will contact you shortly to assist with your insurance needs.
                        </p>
                        <button
                          onClick={() => {
                            setInsuranceSubmitted(false);
                            setActiveCategory("Periodic Car Services");
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                          Back to Services
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={submitInsuranceRequest}
                          disabled={insuranceSubmitting}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {insuranceSubmitting ? 'Submitting...' : 'Request Insurance Assistance'}
                        </button>
                        <button
                          onClick={() => setActiveCategory("Periodic Car Services")}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer  "
                        >
                          Back to Services
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">{activeCategory}</h2>
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <Shield className="w-4 h-4 mr-1" />
                          {packages.length} Packages
                        </div>
                        {carInfo.fuelType && (
                          <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            ⛽ {carInfo.fuelType}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-4"
                        >
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="border border-gray-200 rounded-lg p-5 bg-gray-50 animate-pulse">
                              <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
                              <div className="h-4 w-2/3 bg-gray-200 rounded mb-6"></div>
                              <ul className="space-y-3 mb-6">
                                {[1, 2, 3, 4].map((j) => (
                                  <li key={j} className="flex items-center">
                                    <div className="w-5 h-5 bg-gray-200 rounded-full mr-3"></div>
                                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                  </li>
                                ))}
                              </ul>
                              <div className="flex justify-between items-center">
                                <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                                <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      ) : error ? (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center"
                        >
                          <div className="text-red-500 bg-red-50 p-3 rounded-full inline-flex mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">Error loading services</h3>
                          <p className="text-gray-600 mb-6">{error}</p>
                          <button 
                            onClick={() => fetchServicePackages(activeCategory, carInfo)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                          >
                            Retry
                          </button>
                        </motion.div>
                      ) : packages.length === 0 ? (
                        <motion.div
                          key="no-packages"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center"
                        >
                          <div className="text-gray-500 bg-gray-50 p-3 rounded-full inline-flex mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">No services available</h3>
                          <p className="text-gray-600 mb-6">
                            No services found for {carInfo.brand || 'selected brand'} {carInfo.model || 'model'} ({carInfo.fuelType || 'fuel type'}). Try another category or vehicle.
                          </p>
                          <button 
                            onClick={() => fetchServicePackages(activeCategory, carInfo)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                          >
                            Refresh
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={activeCategory}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          {visiblePackages.map((pkg, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              className={`border rounded-lg overflow-hidden bg-white ${
                                pkg.recommended ? 'border-blue-200 shadow-lg' : 'border-gray-200 hover:shadow-md'
                              }`}
                            >
                              {pkg.recommended && (
                                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 flex items-center">
                                  <Star className="w-4 h-4 text-yellow-300 mr-2" />
                                  <span className="text-sm font-medium">Recommended Package</span>
                                </div>
                              )}
                              <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">{pkg.name}</h3>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {pkg.Extra && (
                                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm flex items-center">
                                    <Circle size={7} fill="#a0a0a0" stroke="none" className="mr-1" />
                                    {pkg.Extra}
                                  </span>
                                )}
                                {pkg.Extra1 && (
                                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm flex items-center">
                                    <Circle size={7} fill="#a0a0a0" stroke="none" className="mr-1" />
                                    {pkg.Extra1}
                                  </span>
                                )}
                                {pkg.interval && (
                                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm flex items-center">
                                    <Circle size={7} fill="#a0a0a0" stroke="none" className="mr-1" />
                                    {pkg.interval}
                                  </span>
                                )}
                                {pkg.warranty && (
                                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm flex items-center">
                                    <Circle size={7} fill="#a0a0a0" stroke="none" className="mr-1" />
                                    {pkg.warranty}
                                  </span>
                                )}
                                {pkg.duration && (
                                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm flex items-center">
                                    <Circle size={7} fill="#a0a0a0" stroke="none" className="mr-1" />
                                    {pkg.duration}
                                  </span>
                                )}
                              </div>
                                <ul className="space-y-2 mb-4">
                                  {pkg.services.slice(0, 4).map((service, i) => (
                                    <motion.li
                                      key={i}
                                      className="flex items-center text-gray-700"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.03 }}
                                    >
                                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                                        <Check className="w-3 h-3" />
                                      </span>
                                      {service}
                                    </motion.li>
                                  ))}
                                  {pkg.services.length > 4 && !expandedServices[pkg.name] && (
                                    <motion.button 
                                      onClick={() => toggleExpandServices(pkg.name)}
                                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center mt-2"
                                      whileHover={{ x: 2 }}
                                    >
                                      + {pkg.services.length - 4} more services
                                      <ChevronDown className="w-4 h-4 ml-1" />
                                    </motion.button>
                                  )}
                                  {expandedServices[pkg.name] && pkg.services.slice(4).map((service, i) => (
                                    <motion.li
                                      key={i + 4}
                                      className="flex items-center text-gray-700"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.03 }}
                                    >
                                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                                        <Check className="w-3 h-3" />
                                      </span>
                                      {service}
                                    </motion.li>
                                  ))}
                                </ul>
                                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                    <span className="text-gray-500 line-through">Rs. {pkg.price}</span>
                                    <span className="text-lg font-bold text-gray-800">
                                      Rs. {pkg.discountedPrice}
                                    </span>
                                  </div>
                                  <motion.button 
                                    onClick={() => addToCart(pkg)}
                                    whileTap={{ 
                                      scale: addingToCart === pkg.name ? 0.95 : 1,
                                      backgroundColor: addingToCart === pkg.name ? "#1e40af" : "#2563eb",
                                    }}
                                    className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium cursor-pointer relative overflow-hidden ${
                                      addingToCart === pkg.name ? 'pointer-events-none' : ''
                                    }`}
                                    disabled={addingToCart === pkg.name}
                                  >
                                    {addingToCart === pkg.name ? (
                                      <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center justify-center gap-2"
                                      >
                                        <motion.div
                                          animate={{ rotate: 360 }}
                                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        Adding...
                                      </motion.span>
                                    ) : (
                                      <motion.span
                                        key={`add-${pkg.name}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="block"
                                      >
                                        Add to Cart
                                      </motion.span>
                                    )}
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                          {packages.length > 4 && (
                            <div className="text-center mt-6">
                              <motion.button 
                                onClick={toggleExpandPackages}
                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center mx-auto px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {expandedPackages[activeCategory] ? 'Show Less' : `+ ${packages.length - 4} more packages`}
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </motion.button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </div>

            {/* Vehicle Info and Cart */}
            <div className="lg:w-1/3 space-y-6">
              {/* Vehicle Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Your Vehicle</h2>
                <motion.div 
                  className="bg-gray-50 rounded-lg overflow-hidden h-48 flex items-center justify-center border border-gray-200"
                  whileHover={{ scale: 1.01 }}
                >
                  {carInfo?.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${carInfo.image}`}
                      alt={`${carInfo.brand} ${carInfo.model}`}
                      width={300}
                      height={200}
                      className="object-contain p-4"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center gap-2">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Car Image Preview</span>
                    </div>
                  )}
                </motion.div>
                <div className="mt-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                    <p className="font-bold text-xl text-gray-800 text-center mb-2">
                      {carInfo?.brand || 'Brand'} {carInfo?.model || 'Model'}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm border border-gray-200">
                        ⛽ {carInfo?.fuelType || 'Fuel Type'}
                      </span>
                      <span className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm border border-gray-200">
                        📅 {carInfo?.year || 'Year'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart */}
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Your Cart</h2>
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div>
                    <LayoutGroup>
                      <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                        {cart
                          .filter(item => item.fuelType === carInfo.fuelType)
                          .map((item, index) => (
                            <motion.div
                              key={index}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="flex justify-between items-center border-b border-gray-200 pb-3"
                            >
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">{item.packageName}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <button 
                                    onClick={() => updateQuantity(item.packageName, item.quantity - 1)}
                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.packageName, item.quantity + 1)}
                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <p className="font-medium text-gray-800">Rs. {item.price * item.quantity}</p>
                                <button 
                                  onClick={() => removeFromCart(item.packageName)}
                                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </motion.div>
                          ))
                        }
                      </div>
                    </LayoutGroup>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between font-semibold text-lg mb-2">
                        <span>Subtotal:</span>
                        <span className="flex">
                          Rs. <Counter 
                            value={cart
                              .filter(item => item.fuelType === carInfo.fuelType)
                              .reduce((sum, item) => sum + (item.price * item.quantity), 0)} 
                            duration={0.8} 
                          />
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-3">
                        <span>Total:</span>
                        <span className="flex">
                          Rs. <Counter 
                            value={cart
                              .filter(item => item.fuelType === carInfo.fuelType)
                              .reduce((sum, item) => sum + (item.price * item.quantity), 0)} 
                            duration={0.8} 
                          />
                        </span>
                      </div>
                      <button
                        onClick={proceedToCheckout}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition-colors duration-200 cursor-pointer"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    </RouteGuard>
  );
};

export default ServicePage;