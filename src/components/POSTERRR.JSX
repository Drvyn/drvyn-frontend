// components/Poster.js

"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const posterImages = [
  '/poster/poster1.JPG', // Ensure the exact file name and case
  '/poster/poster2.JPG', // Ensure the exact file name and case
];

const Poster = () => {
  return (
    // ADDED 'my-8' FOR TOP AND BOTTOM MARGIN.
    <div className="w-full px-4 md:px-8 my-8"> 
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        {posterImages.map((src, index) => (
          <SwiperSlide key={index}>
            <div 
              style={{ position: 'relative', width: '100%', paddingTop: '30%' }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={src}
                alt={`Poster slide ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Poster;