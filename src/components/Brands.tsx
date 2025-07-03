'use client';

import Image from "next/image";

export default function Brands() {
  const brands = [
    { name: "Aston Martin", src: "/brandslogo/Aston Martin.png" },
    { name: "Audi", src: "/brandslogo/Audi.png" },
    { name: "Bentley", src: "/brandslogo/Bentley.png" },
    { name: "BMW", src: "/brandslogo/BMW.png" },
    { name: "Chevrolet", src: "/brandslogo/Chevrolet.png" },
    { name: "Citroen", src: "/brandslogo/Citroen.png" },
    { name: "Daewoo", src: "/brandslogo/Daewoo.png" },
    { name: "Datsun", src: "/brandslogo/Datsun.png" },
    { name: "DC", src: "/brandslogo/DC.png" },
    { name: "EKA", src: "/brandslogo/EKA.png" },
    { name: "Ferrari", src: "/brandslogo/Ferrari.png" },
    { name: "Fiat", src: "/brandslogo/Fiat.png" },
    { name: "Force", src: "/brandslogo/Force.png" },
    { name: "Ford", src: "/brandslogo/Ford.png" },
    { name: "Hindustan Motors", src: "/brandslogo/Hindustan Motors.png" },
    { name: "Honda", src: "/brandslogo/Honda.png" },
    { name: "Hyundai", src: "/brandslogo/Hyundai.png" },
    { name: "Isuzu", src: "/brandslogo/Isuzu.png" },
    { name: "Jaguar", src: "/brandslogo/Jaguar.png" },
    { name: "Jayem", src: "/brandslogo/Jayem.png" },
    { name: "Jeep", src: "/brandslogo/Jeep.png" },
    { name: "Kia", src: "/brandslogo/Kia.png" },
    { name: "Lamborghini", src: "/brandslogo/Lamborghini.png" },
    { name: "Land Rover", src: "/brandslogo/Land Rover.png" },
    { name: "Lexus", src: "/brandslogo/Lexus.png" },
    { name: "Mahindra", src: "/brandslogo/Mahindra.png" },
    { name: "Maruti Suzuki", src: "/brandslogo/Maruti Suzuki.png" },
    { name: "Mercedes Benz", src: "/brandslogo/Mercedes Benz.png" },
    { name: "MG", src: "/brandslogo/MG.png" },
    { name: "Mini", src: "/brandslogo/Mini.png" },
    { name: "Mitsubishi", src: "/brandslogo/Mitsubishi.png" },
    { name: "Nissan", src: "/brandslogo/Nissan.png" },
    { name: "Opel", src: "/brandslogo/Opel.png" },
    { name: "Porsche", src: "/brandslogo/Porsche.png" },
    { name: "Renault", src: "/brandslogo/Renault.png" },
    { name: "Rolls Royce", src: "/brandslogo/Rolls Royce.png" },
    { name: "Skoda", src: "/brandslogo/Skoda.png" },
    { name: "Tata", src: "/brandslogo/Tata.png" },
    { name: "Toyota", src: "/brandslogo/Toyota.png" },
    { name: "Volkswagen", src: "/brandslogo/Volkswagen.png" },
    { name: "Volvo", src: "/brandslogo/Volvo.png" }
  ];

  return (
    <section className="bg-black py-16 text-center text-gray-300 overflow-hidden">
      <div className="relative inline-block mb-10">
        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-red-600 absolute top-[-25px] left-1/2 transform -translate-x-1/2"></div>
        <h2 className="text-3xl font-bold text-white">Brands We Serve</h2>
      </div>

      <div className="relative w-full overflow-hidden py-4">
        <div className="animate-slide flex gap-5 whitespace-nowrap">
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="inline-flex items-center justify-center transition-transform duration-300 hover:scale-110 flex-shrink-0"
            >
              <Image 
                src={brand.src} 
                alt={brand.name} 
                width={200} 
                height={200}
                className="object-contain h-20"
                onError={(e) => {
                  e.currentTarget.src = '/fallback-image.png';
                  e.currentTarget.alt = 'Brand logo not available';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}