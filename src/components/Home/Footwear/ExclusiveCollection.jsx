import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import RecommendedProductsArea from "../RecomendedProductsArea/RecommendedProductsArea";

export default function ExclusiveCollection() {
  return (
    <>
      <div className="w-full">
        <img
          src={"/discount.png"}
          width={1200}
          height={500}
          alt=""
          className="h-[500px] w-full object-contain"
        />
      </div>

      <RecommendedProductsArea />
    </>
  );
}
