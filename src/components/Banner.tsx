"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { BsChevronDown, BsArrowLeft, BsSearch } from "react-icons/bs";
import SocialMedia from "@/components/SocialMedia";
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from "framer-motion";
import { auth } from "@/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, FirebaseError } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined;
  }
}

interface CarModel {
  name: string;
  imageUrl?: string;
  fuel_types?: string[];
}

interface CarBrand {
  brand: string;
  logoUrl?: string;
  models: CarModel[];
}

interface FuelType {
  type: string;
  url: string;
}

type Direction = "forward" | "backward";
type ViewType = "form" | "brands" | "models" | "fuels" | "years";

const Banner = () => {
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>("form");
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [fuelIcons, setFuelIcons] = useState<FuelType[]>([]);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [transitionDirection, setTransitionDirection] = useState<Direction>("forward");
  const [viewHeight, setViewHeight] = useState("auto");
  const [resendTimer, setResendTimer] = useState(0);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);

  const initializeRecaptcha = useCallback((retryCount = 0, maxRetries = 3) => {
    if (typeof window === "undefined" || !auth || !recaptchaContainerRef.current) {
      console.log("Initialization conditions not met");
      setRecaptchaReady(false);
      return false;
    }

    if (retryCount >= maxRetries) {
      setOtpError("Verification system unavailable. Please try again later.");
      return false;
    }

    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = undefined;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        recaptchaContainerRef.current,
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
            setRecaptchaReady(true);
          },
          'expired-callback': () => {
            console.log("reCAPTCHA expired, reinitializing...");
            setRecaptchaReady(false);
            window.recaptchaVerifier = undefined;
            initializeRecaptcha(retryCount + 1, maxRetries);
          },
          'error-callback': (error: unknown) => {
            console.error("reCAPTCHA error:", error);
            setRecaptchaReady(false);
            setOtpError("Verification failed. Please try again.");
          },
        }
      );

      window.recaptchaVerifier.render().then((widgetId) => {
        console.log("reCAPTCHA widget ID:", widgetId);
        setRecaptchaReady(true);
      }).catch((error) => {
        console.error("reCAPTCHA render error:", error);
        setRecaptchaReady(false);
        setOtpError("Failed to initialize verification. Please try again.");
        window.recaptchaVerifier = undefined;
      });

      return true;
    } catch (error) {
      console.error("reCAPTCHA initialization error:", error);
      setRecaptchaReady(false);
      setOtpError("Verification system failed to initialize. Please try again.");
      window.recaptchaVerifier = undefined;
      return false;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && auth) {
      const initialize = () => {
        if (recaptchaContainerRef.current) {
          initializeRecaptcha();
        } else {
          setTimeout(initialize, 100);
        }
      };
      initialize();
    }

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = undefined;
      }
    };
  }, [initializeRecaptcha]);

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

  const viewVariants: Variants = {
    enter: (direction: Direction) => ({
      x: direction === "forward" ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3
      }
    },
    exit: (direction: Direction) => ({
      x: direction === "forward" ? "-30%" : "30%",
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.2
      }
    })
  };

  const formItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
        ease: "easeOut"
      }
    })
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
        ease: "easeOut"
      }
    })
  };

  const checkmarkVariants: Variants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20
      }
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        
        const [brandsRes, fuelsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/all-brands`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/fuel-icons`)
        ]);

        if (!brandsRes.ok || !fuelsRes.ok) throw new Error("Failed to fetch data");

        const [brandsData, fuelsData] = await Promise.all([
          brandsRes.json(),
          fuelsRes.json()
        ]);

        setBrands(brandsData);
        setFuelIcons(fuelsData);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load data";
        setError(message);
        console.error("Fetch error:", error); 
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  useEffect(() => {
    const formElement = document.getElementById('form-view');
    if (formElement) {
      setViewHeight(`${formElement.scrollHeight}px`);
    }
  }, [currentView]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleVerifyOtp = useCallback(async () => {
    if (otp.length !== 6 || !confirmationResult) return;

    try {
      setIsSendingOtp(true);
      setOtpError("");
      
      await confirmationResult.confirm(otp);
      setOtpVerified(true);
      setOtpError("");
    } catch (error: unknown) {
      console.error("OTP verification error:", error);
      setOtpError("Invalid OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  }, [otp, confirmationResult]);

  useEffect(() => {
    if (otp.length === 6 && !otpVerified) {
      handleVerifyOtp();
    }
  }, [otp, otpVerified, handleVerifyOtp]);

  const filteredBrands = brands.filter(brand =>
    brand.brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredModels = (selectedBrand?.models || []).filter(model =>
    model.name.toLowerCase().includes(modelSearch.toLowerCase())
  );

  const handleViewChange = (newView: ViewType, direction: Direction) => {
    setTransitionDirection(direction);
    setCurrentView(newView);
  };

  const handleBrandSelect = (brand: CarBrand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedFuel(null);
    setSelectedYear(null);
    setModelSearch("");
    handleViewChange("models", "forward");
  };

  const handleModelSelect = (model: CarModel) => {
    setSelectedModel(model);
    setSelectedFuel(null);
    setSelectedYear(null);
    handleViewChange("fuels", "forward");
  };

  const handleFuelSelect = (fuel: string) => {
    setSelectedFuel(fuel);
    handleViewChange("years", "forward");
  };

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    handleViewChange("form", "forward");
  };

  const handleBack = () => {
    if (currentView === "models") handleViewChange("brands", "backward");
    else if (currentView === "fuels") handleViewChange("models", "backward");
    else if (currentView === "years") handleViewChange("fuels", "backward");
  };

  const handleSendOtp = async () => {
    console.log("Send OTP clicked:", { recaptchaReady, isSendingOtp, resendTimer, phone });
    const cleanedPhone = phone.replace(/\D/g, '');
    if (!cleanedPhone || cleanedPhone.length !== 10) {
      setOtpError("Please enter a valid 10-digit phone number");
      return;
    }

    if (!navigator.onLine) {
      setOtpError("No internet connection. Please check your network and try again.");
      return;
    }

    if (!window.recaptchaVerifier || !recaptchaReady) {
      console.log("Initializing reCAPTCHA...");
      const initialized = initializeRecaptcha();
      if (!initialized) {
        setOtpError("Verification system is initializing. Please try again.");
        return;
      }
    }

    try {
      setIsSendingOtp(true);
      setOtpError("");

      if (!window.recaptchaVerifier) {
        throw new Error("reCAPTCHA verifier not initialized");
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${cleanedPhone}`,
        window.recaptchaVerifier
      );

      setConfirmationResult(confirmation);
      setOtpSent(true);
      setResendTimer(30);
    } catch (error: unknown) {
      console.error("OTP error:", error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-phone-number":
            setOtpError("Invalid phone number format");
            break;
          case "auth/too-many-requests":
            setOtpError("Too many attempts. Please wait a few minutes and try again.");
            break;
          case "auth/quota-exceeded":
            setOtpError("Verification limit reached. Please try again later.");
            break;
          case "auth/network-request-failed":
            setOtpError("Network error. Please check your connection and try again.");
            break;
          case "auth/billing-not-enabled":
            setOtpError("Phone verification is not enabled. Please contact support.");
            break;
          default:
            setOtpError(error.message || "Failed to send OTP. Please try again.");
            break;
        }
      } else {
        setOtpError("An unexpected error occurred. Please try again.");
      }
      window.recaptchaVerifier = undefined;
      setRecaptchaReady(false);
    } finally {
      console.log("Resetting isSendingOtp");
      setIsSendingOtp(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));
    
    if (value && index < 5 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && otpInputRefs.current[index - 1]) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand || !selectedModel || !selectedFuel || !selectedYear || !phone) {
      setError("Please fill all fields");
      return;
    }

    if (!otpVerified) {
      setError("Please verify your phone number with OTP");
      return;
    }
  
    try {
      sessionStorage.setItem('carFormData', JSON.stringify({
        brand: selectedBrand.brand,
        model: selectedModel.name,
        fuelType: selectedFuel,
        year: selectedYear,
        phone,
        image: selectedModel.imageUrl
      }));
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/submit-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: selectedBrand.brand,
          model: selectedModel.name,
          fuelType: selectedFuel,
          year: selectedYear,
          phone,
        }),
      });
  
      if (!response.ok) throw new Error("Failed to submit request");
      window.location.href = '/service';
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit. Please try again.");
    }
  };

  const renderImage = (url: string, alt: string, className = "") => (
    <div className={`w-16 h-16 flex items-center justify-center ${className}`}>
      <Image 
        src={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
        alt={alt}
        width={124}
        height={124}
        className="max-w-full max-h-full object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.visibility = 'hidden';
        }}
      />
    </div>
  );

  if (isLoading) {
    return (
      <section className="relative flex items-center justify-center h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 font-sans">
        <div className="absolute inset-0 z-0 blur-sm opacity-30 bg-[url('/media/bg2.png')] bg-cover bg-center" />
        <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl px-8 py-12 flex flex-col items-center text-center">
          <div className="mb-6 rounded-full h-28 w-28 overflow-hidden">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="h-full w-full object-cover"
              onPlay={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                const video = e.currentTarget;
                video.playbackRate = 2.0;
              }}
              onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                const video = e.currentTarget;
                video.playbackRate = 2.0;
                video.play().catch((error) => {
                  console.error("Autoplay prevented:", error);
                });
              }}
            >
              <source src="/animation.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading car data</h2>
          <p className="text-sm text-gray-500">Please wait while we fetch the latest information for you.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col lg:flex-row min-h-[400px] lg:min-h-screen w-full overflow-hidden font-sans">
      <div 
        id="recaptcha-container" 
        ref={recaptchaContainerRef} 
        className="absolute opacity-0 w-1 h-1 overflow-hidden"
        style={{ position: 'absolute', left: '-9999px' }}
      />
      
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/media/bg2.png')" }} />

      <div className="relative top-0 lg:-top-7 z-20 w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md sm:max-w-lg bg-white shadow-xl p-6 sm:p-8 md:p-10 rounded-xl">
          {error && (
            <motion.div 
              className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.div>
          )}

          <div className="relative overflow-hidden" style={{ minHeight: viewHeight }}>
            <AnimatePresence custom={transitionDirection} mode="wait">
              {currentView === "form" && (
                <motion.div
                  id="form-view"
                  key="form"
                  custom={transitionDirection}
                  variants={viewVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <form onSubmit={handleSubmit} className="w-full">
                    <motion.h2 
                      className="text-2xl sm:text-3xl font-extrabold mb-4 text-black leading-tight"
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                    >
                      Experience Premier Car Services In Coimbatore
                    </motion.h2>
                    <motion.p 
                      className="mb-6 text-gray-600 text-base sm:text-lg"
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                    >
                      Get instant quotes for your car service
                    </motion.p>

                    <motion.div 
                      className="mb-4 p-3 sm:p-4 border border-gray-300 rounded-lg flex justify-between items-center"
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={2}
                    >
                      <span className="font-medium">COIMBATORE</span>
                      <BsChevronDown className="text-gray-500" />
                    </motion.div>

                    <motion.div 
                      className="mb-4"
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={3}
                    >
                      <button
                        type="button"
                        onClick={() => handleViewChange("brands", "forward")}
                        className="flex items-center justify-between w-full border p-3 sm:p-4 border-gray-300 hover:border-gray-400 rounded-lg text-sm sm:text-base transition-colors duration-200"
                      >
                        <span>
                          {selectedBrand?.brand || "SELECT YOUR CAR"}
                          {selectedModel && ` ${selectedModel.name}`}
                          {selectedFuel && ` (${selectedFuel})`}
                          {selectedYear && ` - ${selectedYear}`}
                        </span>
                        <BsChevronDown className="text-gray-500" />
                      </button>
                    </motion.div>  

                    <motion.div 
                      className="mb-4"
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={4}
                    >
                      <div className="flex gap-2 w-full">
                        <div className="w-[70%] sm:flex-1">
                          <input
                            type="tel"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              setPhone(value);
                              if (otpSent) {
                                setOtpSent(false);
                                setOtpVerified(false);
                                setOtp("");
                                if (window.recaptchaVerifier) {
                                  window.recaptchaVerifier.clear();
                                  window.recaptchaVerifier = undefined;
                                  setRecaptchaReady(false);
                                  initializeRecaptcha();
                                }
                              }
                            }}
                            placeholder="ENTER MOBILE NUMBER"
                            className="w-full border border-gray-300 p-3 sm:p-4 rounded-lg focus:shadow-[inset_0_0_0_2px_rgb(59,130,246)] text-sm sm:text-base transition-colors duration-200"
                            required
                            disabled={otpVerified}
                          />
                        </div>
                        
                        <div className="w-[30%] sm:w-auto">
                          {!otpVerified && (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              disabled={isSendingOtp || (otpSent && resendTimer > 0) || !recaptchaReady}
                              className={`w-full sm:w-[120px] text-white cursor-pointer font-semibold py-3 sm:py-4 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                                isSendingOtp || (otpSent && resendTimer > 0) || !recaptchaReady
                                  ? 'bg-blue-400'
                                  : 'bg-blue-600 hover:bg-blue-700'
                              }`}
                            >
                              {isSendingOtp
                                ? "Sending..."
                                : otpSent && resendTimer > 0
                                ? `${resendTimer}s`
                                : otpSent
                                ? "Resend"
                                : "Send OTP"}
                            </button>
                          )}
                        </div>
                      </div>
                      {otpError && (
                        <p className="mt-1 text-sm text-red-500">{otpError}</p>
                      )}
                    </motion.div>

                    {otpSent && !otpVerified && (
                      <motion.div 
                        className="mb-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">
                            Enter 6-digit OTP sent to +91 {phone}
                          </p>
                          {otpError && (
                            <p className="text-sm text-red-500">{otpError}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-6 gap-2 mb-3 mr-1 ml-1">
                          {Array.from({ length: 6 }).map((_, index) => (
                            <input
                              key={index}
                              type="text"
                              maxLength={1}
                              value={otp[index] || ''}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(index, e)}
                              ref={(el) => {
                                if (el) otpInputRefs.current[index] = el;
                              }}
                              className="w-full h-12 sm:h-14 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                              inputMode="numeric"
                              disabled={isSendingOtp}
                            />
                          ))}
                        </div>
                        {isSendingOtp && (
                          <p className="text-sm text-blue-600 text-center">Verifying OTP...</p>
                        )}
                      </motion.div>
                    )}

                    {otpVerified && (
                      <motion.div 
                        className="mb-4 p-2 bg-green-100 text-green-700 rounded text-center text-sm flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          variants={checkmarkVariants}
                          initial="initial"
                          animate="animate"
                          className="mr-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                        Phone number verified successfully!
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      className="w-full bg-blue-600 text-white cursor-pointer font-semibold py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md text-base sm:text-lg"
                      disabled={isLoading}
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={5}
                    >
                      {isLoading ? "PROCESSING..." : "CHECK PRICES FOR FREE"}
                    </motion.button>

                    <motion.div 
                      className="mt-6 sm:mt-8 flex justify-between text-xs sm:text-sm text-gray-600"
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={6}
                    >
                      <div className="text-center">
                        <span className="text-green-600 font-bold text-xl sm:text-2xl">4.5</span>/5
                        <br />
                        <span className="text-xs">Based on 100+ Reviews</span>
                      </div>
                      <div className="text-center">
                        <span className="font-bold text-xl sm:text-2xl">1000+</span>
                        <br />
                        Happy Customers
                      </div>
                    </motion.div>
                  </form>
                </motion.div>
              )}

              {currentView === "brands" && (
                <motion.div
                  key="brands"
                  custom={transitionDirection}
                  variants={viewVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <div className="flex items-center mb-4">
                    <button 
                      onClick={() => handleViewChange("form", "backward")} 
                      className="mr-2 text-gray-500 hover:text-black transition-colors duration-200"
                    >
                      <BsArrowLeft size={20} />
                    </button>
                    <h2 className="text-lg sm:text-xl font-bold">Select Manufacturer</h2>
                  </div>
                  
                  <motion.div 
                    className="relative mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    <BsSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search Brands"
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    />
                  </motion.div>
                  
                  <div className="h-[400px] overflow-y-auto">
                    {filteredBrands.length === 0 ? (
                      <motion.p 
                        className="text-center py-8 text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {brands.length === 0 ? "No brands available" : "No matching brands found"}
                      </motion.p>
                    ) : (
                      <motion.div 
                        className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.03 }}
                      >
                        {filteredBrands.map((brand, index) => (
                          <motion.div 
                            key={brand.brand} 
                            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200" 
                            onClick={() => handleBrandSelect(brand)}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                          >
                            {brand.logoUrl && renderImage(brand.logoUrl, brand.brand)}
                            <p className="text-xs sm:text-sm font-medium text-center mt-2">{brand.brand}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentView === "models" && (
                <motion.div
                  key="models"
                  custom={transitionDirection}
                  variants={viewVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <div className="flex items-center mb-4">
                    <button 
                      onClick={handleBack} 
                      className="mr-2 text-gray-500 hover:text-black transition-colors duration-200"
                    >
                      <BsArrowLeft size={20} />
                    </button>
                    <h2 className="text-lg sm:text-xl font-bold">Select Model</h2>
                  </div>
                  
                  <motion.div 
                    className="relative mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    <BsSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search Models"
                      value={modelSearch}
                      onChange={(e) => setModelSearch(e.target.value)}
                      className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    />
                  </motion.div>
                  
                  <div className="h-[400px] overflow-y-auto">
                    {filteredModels.length === 0 ? (
                      <motion.p 
                        className="text-center py-8 text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {selectedBrand?.models.length === 0 ? "No models available" : "No matching models found"}
                      </motion.p>
                    ) : (
                      <motion.div 
                        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.03 }}
                      >
                        {filteredModels.map((model, index) => (
                          <motion.div
                            key={model.name}
                            className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors duration-200 bg-white"
                            onClick={() => handleModelSelect(model)}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                          >
                            {model.imageUrl && renderImage(model.imageUrl, model.name, "mb-3 w-20 h-20 sm:w-24 sm:h-24")}
                            <p className="font-medium text-center text-sm sm:text-base">{model.name}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentView === "fuels" && (
                <motion.div
                  key="fuels"
                  custom={transitionDirection}
                  variants={viewVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <div className="flex items-center mb-4">
                    <button 
                      onClick={handleBack} 
                      className="mr-2 text-gray-500 hover:text-black transition-colors duration-200"
                    >
                      <BsArrowLeft size={20} />
                    </button>
                    <h2 className="text-lg sm:text-xl font-bold">Select Fuel Type</h2>
                  </div>
                  
                  <div className="h-[400px] overflow-y-auto">
                    {selectedModel?.fuel_types?.length === 0 ? (
                      <motion.p 
                        className="text-center py-8 text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        No fuel types available
                      </motion.p>
                    ) : (
                      <motion.div 
                        className="grid grid-cols-2 gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.03 }}
                      >
                        {selectedModel?.fuel_types?.map((fuel, index) => {
                          const fuelIcon = fuelIcons.find(f => 
                            f.type.toLowerCase() === fuel.toLowerCase()
                          );
                          return (
                            <motion.div
                              key={fuel}
                              className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors duration-200 bg-white"
                              onClick={() => handleFuelSelect(fuel)}
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              custom={index}
                            >
                              {fuelIcon?.url && renderImage(fuelIcon.url, fuel, "mb-2")}
                              <p className="font-medium text-center text-sm sm:text-base">{fuel}</p>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentView === "years" && (
                <motion.div
                  key="years"
                  custom={transitionDirection}
                  variants={viewVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <div className="flex items-center mb-4">
                    <button 
                      onClick={handleBack} 
                      className="mr-2 text-gray-500 hover:text-black transition-colors duration-200"
                    >
                      <BsArrowLeft size={20} />
                    </button>
                    <h2 className="text-lg sm:text-xl font-bold">Select Manufacturing Year</h2>
                  </div>
                  
                  <div className="h-[400px] overflow-y-auto">
                    {years.length === 0 ? (
                      <motion.p 
                        className="text-center py-8 text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        No years available
                      </motion.p>
                    ) : (
                      <motion.div 
                        className="grid grid-cols-3 gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.03 }}
                      >
                        {years.map((year, index) => (
                          <button
                            key={year}
                            className={`p-3 border rounded-lg hover:border-blue-500 cursor-pointer text-center transition-colors duration-200 ${
                              selectedYear === year ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => handleYearSelect(year)}
                          >
                            <motion.p 
                              className="font-medium text-sm sm:text-base"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.03 }}
                            >
                              {year}
                            </motion.p>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <SocialMedia />
    </section>
  );
};

export default Banner;