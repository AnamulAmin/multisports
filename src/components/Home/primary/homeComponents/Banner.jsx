import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./css/banner.module.css";

// import required modules
import { Navigation } from "swiper/modules";

export default function Banner() {
  return (
    <>
      <Swiper
        navigation={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Navigation]}
        className="home_banner"
      >
        <SwiperSlide>
          <div className="w-full">
            <img
              width={1200}
              height={600}
              src="/banner.png"
              alt=""
              className="h-[500px] w-full object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full">
            <img
              width={1200}
              height={600}
              src="/banner.png"
              alt=""
              className="h-[500px] w-full object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full">
            <img
              width={1200}
              height={600}
              src="/banner.png"
              alt=""
              className="h-[500px] w-full object-cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
