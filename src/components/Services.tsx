"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const services = [
  { image: "/media/1.png", title: "Auto Maintenance Services", link: "/" },
  { image: "/media/2.png", title: "Brake Repair Pads & Rotors", link: "/" },
  { image: "/media/3.png", title: "Shocks, Struts Replacement", link: "/" },
  { image: "/media/4.png", title: "System Diagnosis & Repair", link: "/" },
  { image: "/media/5.png", title: "Air Conditioning Services", link: "/" },
  { image: "/media/6.png", title: "Body Shop Repairs", link: "/" },
  { image: "/media/1.png", title: "Auto Maintenance Services", link: "/" },
  { image: "/media/2.png", title: "Brake Repair Pads & Rotors", link: "/" },
  { image: "/media/3.png", title: "Shocks, Struts Replacement", link: "/" },
  { image: "/media/4.png", title: "System Diagnosis & Repair", link: "/" },
  { image: "/media/5.png", title: "Air Conditioning Services", link: "/" },
  { image: "/media/6.png", title: "Body Shop Repairs", link: "/" },
  { image: "/media/1.png", title: "Auto Maintenance Services", link: "/" },
  { image: "/media/2.png", title: "Brake Repair Pads & Rotors", link: "/" },
  { image: "/media/3.png", title: "Shocks, Struts Replacement", link: "/" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-10 lg:py- bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header - unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Our Services
          </h2>
          <div className="w-24 h-1.5 bg-red-500 mx-auto my-4 rounded-full" />
          <p className="text-sm sm:text-base tracking-wider text-gray-600 uppercase font-medium">
            Expert Repair & Maintenance for All Vehicle Needs
          </p>
        </motion.div>

        {/* Services Grid - only changed the card size */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={service.link} className="block h-full">
                <div className="bg-white rounded-lg p-4 h-full flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-red-100">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-3">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 48px, 56px"
                    />
                  </div>
                  <h3 className="text-sm sm:text-md font-semibold text-gray-800 mb-1">
                    {service.title}
                  </h3>
                  
                    
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA - unchanged */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
        </motion.div>
      </div>
    </section>
  );
}