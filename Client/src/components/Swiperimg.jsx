import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from "../assets/passport.webp"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../Design/Swiperimg.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const Swiperimg=()=>{
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://demo.bravisthemes.com/immigway/wp-content/uploads/2023/10/Girl-and-world.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://html.kodesolution.com/2024/visago-php/images/resource/country2-1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://demo.bravisthemes.com/immigway/wp-content/uploads/2023/10/IELTS-Exam-Preparation-433x426.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image1} />
        </SwiperSlide>
  
        <SwiperSlide>
          <img src="https://demo.bravisthemes.com/immigway/wp-content/uploads/2023/10/Hue_Saturation.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://html.kodesolution.com/2024/visago-php/images/resource/about1-1.jpg" />
        </SwiperSlide>
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
export default Swiperimg
