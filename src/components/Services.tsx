"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const services = [
  {
    image: "/media/14.png",
    title: "Auto Maintenance Services",
    description: "Complete routine maintenance including oil changes, filter replacements, brake inspections, and fluid checks to keep your vehicle running smoothly and extend its lifespan.",
    link: "/"
  },
  {
    image: "/media/12.png",
    title: "AC Service & Repair",
    description: "Professional AC system diagnostics, refrigerant recharge, compressor repairs, and full system restoration to keep you cool and comfortable in all seasons.",
    link: "/"
  },
  {
    image: "/media/10.png",
    title: "Detailing Services",
    description: "Comprehensive interior and exterior detailing including deep cleaning, polishing, waxing, and protection treatments to make your car look showroom new.",
    link: "/"
  },
  {
    image: "/media/11.png",
    title: "Car Inspections",
    description: "Thorough pre-purchase inspections, safety checks, and diagnostic scans to identify potential issues and ensure your vehicle is in optimal condition.",
    link: "/"
  },
  {
    image: "/media/16.png",
    title: "Insurance Claims",
    description: "Assistance with insurance claims, paperwork, and coordination with providers to streamline the repair process after accidents or damage.",
    link: "/"
  },
    {
    image: "/media/1.png",
    title: "Denting & Painting",
    description: "Expert dent removal, scratch repair, and professional painting services to restore your vehicle's appearance and protect it from corrosion.",
    link: "/"
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-20 relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center justify-center">
        {/* Enhanced Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto mb-20 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
            Premium <span className="text-blue-600 relative">Auto Care
            <svg className="absolute -bottom-2 left-0 right-0 mx-auto w-full" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,5 C50,0 150,10 200,5" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-200" />
            </svg>
            </span> Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center">
            Experience top-quality automotive services with our expert technicians. We use cutting-edge technology and premium products to keep your vehicle in perfect condition.
          </p>
        </motion.div>

        {/* Services Grid  */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col items-center justify-center"
            >
              <Link href={service.link} className="block h-full w-full flex flex-col items-center">
                <div className="h-full w-full flex flex-col rounded-2xl p-8 border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-500 group-hover:border-blue-200 relative overflow-hidden text-center items-center justify-center">
                  {/* Icon container  */}
                  <div className="relative w-25 h-25 mb-6 rounded-2xl flex items-center justify-center p-4 transition-colors duration-500 mx-auto">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={60}
                      height={60}
                      className="object-contain transition-transform duration-500 group-hover:scale-110 mx-auto"
                    />
                  </div>
                 
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300 text-center">
                    {service.title}
                  </h3>
                 
                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow text-center">
                    {service.description}
                  </p>

                  {/* CTA  */}
                  <div className="mt-auto flex items-center justify-center text-blue-600 font-semibold text-sm">
                    <span>Explore Service</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}