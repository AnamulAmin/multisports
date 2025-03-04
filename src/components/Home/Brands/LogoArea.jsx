import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import useGetAllProductBrands from "../../../Hook/GetDataHook/useGetAllProductBrands";
import useGetAllProductBrandsPublic from "../../../Hook/GetPublicDataHook/useGetAllProductBrandsPublic";

function LogoArea() {
  const [loading, setLoading] = useState(true); // Initially loading is true

  const productBrands = useGetAllProductBrandsPublic({ setLoading });

  return (
    <div className="mx-auto">
      <Swiper
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 10 },
          1280: { slidesPerView: 6, spaceBetween: 10 },
        }}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={true}
        modules={[Navigation, Autoplay]}
        className="brand"
      >
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center h-[100px] md:h-[200px] bg-gray-200 animate-pulse rounded"></div>
              </SwiperSlide>
            ))
          : productBrands.map((product, index) => (
              <SwiperSlide key={index}>
                <Link
                  to={`/products/all?brand=${product.slug}`}
                  className="flex justify-center hover:scale-125 transition-all duration-300 items-center h-[100px] md:border-none border-l border-gray-200  md:h-[200px]"
                >
                  <img
                    width={400}
                    height={300}
                    src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${product.logo}`}
                    alt={product.brandName}
                    className="mix-blend-multiply object-contain py-3 px-5 md:p-12"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default LogoArea;
