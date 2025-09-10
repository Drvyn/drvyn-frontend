"use client"

import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation, Pagination , Autoplay  } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const posterImages= [
    '/poster/poster1.JPG',
    '/poster/poster2.JPG',
]


const Poster = () => {
    return(
        <div className="w-full px-4 my-8 md:px-8">

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
            clickable:true,
            dynamicBullets:true,
        }}
        navigation={true}
        className='mySwiper'
        />
        {posterImages.map((src,index)=>(
            <SwiperSlide></SwiperSlide>
        ))}
            
        </div>
    );
}

export default Poster;