import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import useGetAllTestimonials from "../../../Hook/GetPublicDataHook/useGetAllTestimonials";
import CustomImage from "../../../shared/ImageComponents/CustomImage";

// const testimonials = [
//   {
//     name: "Jiniya Snow",
//     location: "from Duisbarg",
//     rating: 4.5,
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "https://chawkbazar.vercel.app/assets/images/testimonials/4.jpg",
//   },
//   {
//     name: "Ketty Rawn",
//     location: "from Duisbarg",
//     rating: 4.5,
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "https://chawkbazar.vercel.app/assets/images/testimonials/1.jpg",
//   },
//   {
//     name: "Amanda ",
//     location: "from Duisbarg",
//     rating: 4.5,
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "https://chawkbazar.vercel.app/assets/images/testimonials/2.jpg",
//   },
//   {
//     name: "Marvel Blu",
//     location: "from Duisbarg",
//     rating: 4.5,
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "https://chawkbazar.vercel.app/assets/images/testimonials/5.jpg",
//   },
//   {
//     name: "Amanda ",
//     location: "from Duisbarg",
//     rating: 4.5,
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "https://chawkbazar.vercel.app/assets/images/testimonials/3.jpg",
//   },
//   {
//     name: "Marvel Blu",
//     location: "from Duisbarg",
//     rating: 4.5,
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "https://chawkbazar.vercel.app/assets/images/testimonials/4.jpg",
//   },
// ];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const testimonials = useGetAllTestimonials({});

  useEffect(() => {
    const swiperInstance = swiperRef.current;
    if (swiperInstance) {
      swiperInstance.on("slideChange", () => {
        setActiveIndex(swiperInstance.realIndex);
      });
    }
  }, []);

  return (
    <div className="w-[90%] md:w-full mx-auto py-5 md:py-10 relative">
      <h2 className="text-2xl  font-semibold mb-4 md:my-9">Testimonial</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 5 },
          1024: { slidesPerView: 4, spaceBetween: 25 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="">
            <div
              className={`md:px-9 p-5 md:py-7 flex flex-col items-start rounded-lg transition-transform duration-300 ${
                index === activeIndex
                  ? " md:bg-gray-200 bg-gray-50"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-center md:gap-4 gap-2 md:mb-4">
                <div className="bg-white p-1 shadow-lg rounded-full">
                  <CustomImage
                    imageKey={testimonial.image}
                    width={70}
                    height={70}
                    className="md:w-20 w-14 rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex justify-between gap-5">
                    <h3 className="font-semibold text-xl">
                      {testimonial.customerName}
                    </h3>
                    <div className="absolute right-7 flex items-center">
                      <FaStar className="text-yellow-400" />
                      <span className="ml-1 font-semibold">
                        {testimonial.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500">{testimonial.designation}</p>
                </div>
              </div>
              <p className="text-gray-500 md:text-gray-600 mt-5 md:mt-0 mb-4 ">
                {testimonial.description}
              </p>
              <div className="flex justify-end w-full">
                <img
                  src="https://static.thenounproject.com/png/275847-200.png"
                  className="w-8 md:w-6 scale-x-[-1] opacity-30"
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Dot Pagination */}
      <div className="relative justify-center bottom-0 bg-gray-50 mt-7 md:mt-16 left-1/2 -translate-x-1/2 flex z-10">
        <div className="relative flex md:gap-24 rounded-full">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className="h-[5px] w-8 bg-gray-50 cursor-pointer shadow-lg"
              onClick={() => swiperRef.current.slideToLoop(index)}
            ></div>
          ))}

          <div
            className="absolute rounded-full h-[5px] w-9 md:w-80 bg-black shadow-lg transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${activeIndex * (32 + 8)}px)` }} // 32px (w-8) + 8px gap
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
