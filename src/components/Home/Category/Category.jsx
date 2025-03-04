import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { axiosSecure } from "../../../Hook/useAxiosSecure";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  useEffect(() => {
    const fetchCategories = async () => {
      console.log("inside the funciton");
      try {
        const res = await axiosSecure.get("/categories");
        if (res.status === 200 || res.status === 201) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.log("error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [axiosSecure]);

  return (
    <div className="relative block md:hidden my-4 md:my-16 mx-auto w-[90%]">
      <h2 className="text-xl md:text-3xl font-bold md:font-bold mb-9 md:mb-6 pl-1 md:pl-4">
        Shop by category
      </h2>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={0}
          slidesPerView={3}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 7 },
          }}
          loop={true}
        >
          {categories &&
            categories.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="bg-white rounded-lg px-2 md:px-4">
                  <div className="relative w-full aspect-square mb-3">
                    <img
                      src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${product.categoryIcon}`}
                      alt={product.categoryName}
                      className="w-full border border-gray-200 h-full bg-slate-50 rounded-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>
                  {product.categoryName.length > 10 ? (
                    <>
                      <h3 className="font-semibold text-xs md:text-base text-center md:mb-2">
                        {product.categoryName.slice(0, 10)}
                      </h3>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-xs md:text-base text-center md:mb-2">
                        {product.categoryName}
                      </h3>
                    </>
                  )}
                </div>
              </SwiperSlide>
            ))}
          {categories.length === 0 &&
            Array.from({ length: 9 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg px-2 md:px-4 animate-pulse">
                  <div className="relative w-full aspect-square mb-3 bg-gray-200 rounded-full"></div>
                  <div className="h-3 w-3/4 mx-auto bg-gray-200 rounded-md mb-2"></div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Custom Navigation Buttons Centered Relative to Image Div */}
        <button
          ref={prevRef}
          className="absolute top-1/3 -left-2 transform -translate-y-1/2 w-7 h-7 md:w-11 md:h-11 flex items-center justify-center bg-white text-black rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white hover:scale-110 hover:shadow-2xl z-10"
        >
          <IoIosArrowBack className="text-base" />
        </button>

        <button
          ref={nextRef}
          className="absolute top-1/3 -right-2 transform -translate-y-1/2 w-7 h-7 md:w-11 md:h-11 flex items-center justify-center bg-white text-black rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white hover:scale-110 hover:shadow-2xl z-10"
        >
          <IoIosArrowForward className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default Category;
