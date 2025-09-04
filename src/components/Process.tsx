"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function Process() {
  const steps = [
    {
      icon: "/media/p1.png",
      title: "Your Choice",
      desc: "Explore our diverse range of services.",
    },
    {
      icon: "/media/p2.png",
      title: "Book",
      desc: "Make An Appointment With Us",
    },
    {
      icon: "/media/p3.png",
      title: "Fair Pricing",
      desc: "Just the Right Price for the Right Service",
    },
    {
      icon: "/media/p4.png",
      title: "At Your Doorstep",
      desc: "Convenient Doorstep Pick-Up and Drop-Off Services",
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

  return (
    <section id="process" className="bg-gray-50 py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Enhanced Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
            How It <span className="text-blue-600 relative">Works
            <svg className="absolute -bottom-2 left-0 right-0 mx-auto w-full" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,5 C50,0 150,10 200,5" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-200" />
            </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center">
            Expert Repair & Maintenance for All Vehicle Needs
          </p>
        </motion.div>

        {/* Steps Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="h-full flex flex-col rounded-2xl p-8 border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-500 group-hover:border-blue-200 relative overflow-hidden text-center items-center">
                {/* Icon container */}
                <div className="relative w-20 h-20 mb-6 rounded-2xl flex items-center justify-center p-4 transition-colors duration-500 mx-auto">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={160}
                    height={160}
                    className="object-contain transition-transform duration-500 group-hover:scale-110 mx-auto"
                  />
                </div>
               
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 transition-colors duration-300 text-center">
                  {step.title}
                </h3>
               
                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-center">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}