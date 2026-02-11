// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'] 
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Scroll detection
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Check login status (Client-side only)
    const checkLogin = () => {
      const userPhone = sessionStorage.getItem("userPhone");
      setIsLoggedIn(!!userPhone);
    };

    checkLogin();
    
    // Optional: Listen for storage changes if you have multiple tabs
    window.addEventListener('storage', checkLogin);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkLogin);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Services", href: "/servicespage" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Login", href: "/login" }, // Default, changes dynamically below
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 1)',
        boxShadow: scrolled 
          ? '0 8px 30px rgba(0, 0, 0, 0.15)' 
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
        paddingTop: scrolled ? '0.75rem' : '1rem',
        paddingBottom: scrolled ? '0.75rem' : '1rem',
      }}
      transition={{ 
        y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.5, ease: "easeOut" },
        background: { duration: 0.4 },
        boxShadow: { duration: 0.4 },
        paddingTop: { duration: 0.4 },
        paddingBottom: { duration: 0.4 }
      }}

      className={`${workSans.className} px-4 sm:px-6 sticky top-0 z-50 ${scrolled ? 'border-b border-gray-100' : ''}`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* LOGO */}
        <motion.div className="flex items-center gap-20">
          <Link href="/" className="flex items-center gap-2">
            <motion.div transition={{ type: "spring", stiffness: 400 }}>
              <Image 
                src="/favicon2.png"
                alt="Drvyn Logo"
                className="h-7 sm:h-8 w-7 sm:w-8 object-contain rounded-full"
                width={500}
                height={300} 
              />
            </motion.div>
            <motion.span className="text-lg sm:text-xl font-bold text-black cursor-pointer">
              Drvyn
               <sup className="text-[1rem] relative -top-1 ml-0.5">™</sup>
            </motion.span>
          </Link> 
        </motion.div>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <motion.li 
              key={link.name}
              className="relative"
              transition={{ type: "spring", stiffness: 400 }}
            >
              {link.name === "Login" ? (
                <Link
                  // Dynamic href: Dashboard if logged in, Login if not
                  href={isLoggedIn ? "/dashboard" : "/login"}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-5 py-2 text-sm rounded-full font-bold tracking-tight hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {isLoggedIn ? "Dashboard" : "Login"}
                </Link>
              ) : (
                <div className="relative">
                  <Link
                    href={link.href}
                    className="relative px-2 sm:px-3 py-1.5 group"
                  >
                    <span 
                      className="relative z-10 text-sm font-medium text-gray-800 tracking-tight hover:text-blue-600 transition-colors duration-200"
                      style={{ letterSpacing: '0.5px' }} 
                    >
                      {link.name.toUpperCase()}
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </Link>
                </div>
              )}
            </motion.li>
          ))}
        </ul>

        {/* MOBILE TOGGLE */}
        <motion.div 
          className="md:hidden z-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            className="p-2 sm:p-3 rounded-md bg-black/5 hover:bg-black/10 transition-all duration-300 touch-manipulation"
          >
            {isOpen ? (
              <X className="w-5 sm:w-6 h-5 sm:h-6 text-gray-700" />
            ) : (
              <Menu className="w-5 sm:w-6 h-5 sm:h-6 text-gray-700" />
            )}
          </button>
        </motion.div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/30 md:hidden z-40"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 pt-20 space-y-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.07,
                      type: "spring", 
                      stiffness: 300,
                      damping: 15
                    }}
                    className="mb-2 last:mb-0"
                  >
                    {link.name === "Login" ? (
                      <Link
                        href={isLoggedIn ? "/dashboard" : "/login"}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base md:text-lg px-6 md:px-8 py-3 rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                      >
                        {isLoggedIn ? "Dashboard" : "Login"}
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-4 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;