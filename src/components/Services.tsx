"use client";

import Link from "next/link";
import Image from "next/image";

const benefits: {
  image: string;
  title: string;
  link?: string;
  subtitle?: string;
}[] = [
  { image: "/media/1.png", title: "Auto Maintenance Services​", link: "/" },
  { image: "/media/2.png", title: "Brake Repair Pads & Rotors​", link: "/" },
  { image: "/media/3.png", title: "Shocks, Struts Replacement​", link: "/" },
  { image: "/media/4.png", title: "System Diagnosis & Repair​​", link: "/" },
  { image: "/media/5.png", title: "Air Conditioning Services​​", link: "/" },
  { image: "/media/6.png", title: "Body Shop Repairs", link: "/" },
  { image: "/media/1.png", title: "Auto Maintenance Services​", link: "/" },
  { image: "/media/2.png", title: "Brake Repair Pads & Rotors​", link: "/" },
  { image: "/media/3.png", title: "Shocks, Struts Replacement​", link: "/" },
  { image: "/media/4.png", title: "System Diagnosis & Repair​​", link: "/" },
  { image: "/media/5.png", title: "Air Conditioning Services​​", link: "/" },
  { image: "/media/6.png", title: "Body Shop Repairs", link: "/" },
  { image: "/media/1.png", title: "Auto Maintenance Services​", link: "/" },
  { image: "/media/2.png", title: "Brake Repair Pads & Rotors​", link: "/" },
  { image: "/media/3.png", title: "Shocks, Struts Replacement​", link: "/" },
];

export default function Services() {
  return (
    <section id="services" className="py-16 bg-white text-center">
      <div className="relative z-20 max-w-3xl px-6 md:px-12 mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black">
          Our Services
        </h2>
        <div className="w-24 md:w-64 h-1 bg-red-500 mx-auto my-4 rounded" />
        <p className="text-sm md:text-base tracking-wide text-gray-600 uppercase">
          Our certified mechanics are here to help you!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 px-4 mt-10">
        {benefits.map((benefit, index) =>
          benefit.link ? (
            <Link
              href={benefit.link}
              key={index}
              className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-200"
            >
              <Image
                src={benefit.image}
                alt={benefit.title}
                width={60}
                height={60}
                style={{ width: "auto" }}
                className="mb-5 rounded-full shadow-md"
              />
              <h4 className="text-md font-semibold text-blue-900">
                {benefit.title}
              </h4>
              {benefit.subtitle && (
                <p className="text-sm text-gray-600 mt-1">{benefit.subtitle}</p>
              )}
            </Link>
          ) : (
            <div
              key={index}
              className="flex flex-col items-center text-center cursor-default"
            >
              {/* <div className="text-red-500 mb-2">{benefit.icon}</div> */}
              <h4 className="text-md font-semibold text-blue-900">
                {benefit.title}
              </h4>
              {benefit.subtitle && (
                <p className="text-sm text-gray-600 mt-1">{benefit.subtitle}</p>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}
