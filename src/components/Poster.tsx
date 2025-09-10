// components/Poster.jsx
"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useRouter } from 'next/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const posterImages = [
  '/poster/poster1.JPG',
  '/poster/poster2.JPG',
];

const Poster = () => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push('/');
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-8"> 
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
        navigation={false}
        className="mySwiper"
      >
        {posterImages.map((src, index) => (
          <SwiperSlide key={index}>
            <div 
              style={{ position: 'relative', width: '100%', paddingTop: '30%' }}
              className="rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={handleImageClick}
            >
              <Image
                src={src}
                alt={`Poster slide ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
                quality={90}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Poster;