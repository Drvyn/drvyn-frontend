"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "" },
    { name: "Blog", href: "" },
    { name: "About", href: "" },
    { name: "Contact", href: "" },
    { name: "Login", href: "" },
  ];

  return (
    <nav className="bg-white shadow-lg px-4 py-3 sticky top-0 z-50 backdrop-blur-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
         <Link href="/">
        <Image 
            src="/favicon2.png"
            alt="Drvyn Logo"
            className="h-9 w-9 object-contain rounded-full"
            width={500}
            height={300} 
          />
          </Link> 
          <Link href="/"> 
          <span className="text-xl font-bold text-black cursor-pointer">Drvyn</span>
          </Link> 
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.name === "Login" ? (
                <Link
                  href={link.href}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="relative group hover:text-blue-600 transition-colors"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            className="p-2 rounded-md bg-black/80 transition"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col mt-3 space-y-2 text-gray-700 font-medium px-2">
          {navLinks.map((link) =>
            link.name === "Login" ? (
              <li key={link.name} className="flex justify-center my-2">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  {link.name}
                </Link>
              </li>
            ) : (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 rounded-md hover:bg-blue-50 transition"
                >
                  {link.name}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
