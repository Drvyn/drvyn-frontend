'use client';

import Image from "next/image";

export default function Brands() {
  const brands = [
    { name: "Aston Martin", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983930/Aston_Martin_aerwgu.png" },
    { name: "Audi", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983931/Audi_uo7gpi.png" },
    { name: "Bentley", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983838/Bentley_now6ui.png" },
    { name: "BMW", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983839/BMW_cz2ntf.png" },
    { name: "Chevrolet", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983840/Chevrolet_h87hew.png" },
    { name: "Citroen", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983838/Citroen_eqkvvl.png" },
   // { name: "Daewoo", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983839/Daewoo_rtioa8.png" },
    { name: "Datsun", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983839/Datsun_y8108h.png" },
    //{ name: "DC", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983839/DC_nxvirg.png" },
    //{ name: "EKA", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983839/EKA_uxudwy.png" },
    { name: "Ferrari", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983841/Ferrari_blfvfg.png" },
    { name: "Fiat", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983841/Fiat_n9mrax.png" },
    { name: "Force", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983851/Force_m1nuog.png" },
    { name: "Ford", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983853/Ford_xk8dgi.png" },
    { name: "Hindustan Motors", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983852/Hindustan_Motors_f0yz9f.png" },
    { name: "Honda", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983860/Honda_qxbmur.png" },
    { name: "Hyundai", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983856/Hyundai_xfzlw6.png" },
    { name: "Isuzu", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983854/Isuzu_bbgoos.png" },
    { name: "Jaguar", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983874/Jaguar_ak3o8h.png" },
    { name: "Jayem", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983908/Jayem_ymbz1u.png" },
    { name: "Jeep", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983911/Jeep_tbcsgr.png" },
    { name: "Kia", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983916/Kia_rfujvd.png" },
    { name: "Lamborghini", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983917/Lamborghini_dtdpsu.png" },
    { name: "Land Rover", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983918/Land_Rover_jzkdbr.png" },
    { name: "Lexus", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983917/Lexus_v5xox2.png" },
    { name: "Mahindra", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983919/Mahindra_nyatlb.png" },
    { name: "Maruti Suzuki", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983919/Maruti_Suzuki_ggwdmm.png" },
    { name: "Mercedes Benz", src: "/brandslogo/Mercedes Benz.png" },
    { name: "MG", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983923/MG_kypm1z.png" },
    { name: "Mini", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983923/Mini_smxnbm.png" },
    //{ name: "Mitsubishi", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983923/Mitsubishi_bfrlzc.png" },
    { name: "Nissan", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983925/Nissan_mhm6zj.png" },
    //{ name: "Opel", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983925/Opel_eild52.png" },
    { name: "Porsche", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983926/Porsche_ormmka.png" },
    { name: "Renault", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983925/Renault_o5iwuv.png" },
    { name: "Rolls Royce", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983926/Rolls_Royce_engll4.png" },
    { name: "Skoda", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983927/Skoda_l7jg3d.png" },
    { name: "Tata", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983927/Tata_swvedr.png" },
    { name: "Toyota", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983929/Toyota_ke85e2.png" },
    { name: "Volkswagen", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983930/Volkswagen_zmcaer.png" },
    { name: "Volvo", src: "https://res.cloudinary.com/dvslpq5o2/image/upload/v1770983930/Volvo_z22gc6.png" }
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