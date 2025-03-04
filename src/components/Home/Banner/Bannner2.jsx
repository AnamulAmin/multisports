import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import useGetAllShoesBanners from "../../../Hook/GetPublicDataHook/useGetAllShoesBanners";
import { useState } from "react";
import { baseImageUrl } from "../../../apis/apis";

const breakpoints = {
  0: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 1.5,
  },
};

const Banner2 = () => {
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const shoes = useGetAllShoesBanners({
    setLoading,
    isShowModal,
    isEdited,
    isDeleted,
  });
  return (
    <div className="relative  mx-auto  overflow-hidden">
      {!loading && (
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          autoplay={{
            delay: 3000,
          }}
          pagination={{
            clickable: true,
          }}
          spaceBetween={10} // Space between slides
          breakpoints={breakpoints}
          centeredSlides={true} // Center the active slide
          centeredSlidesBounds={true} // Center the active slide
          loop={true} // Enable infinite scrolling
          paginationVariant="circle"
          // buttonGroupClassName="hidden"
          // navigation={true}
          initialSlide={1}
        >
          {shoes.map((slide, index) => (
            <SwiperSlide key={index} className="px-1.5 md:px-2.5 xl:px-3.5">
              <div className="relative h-[180px] md:h-[500px]">
                <img
                  // src={slide.image}
                  src={`${baseImageUrl}/${slide?.image}`}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Banner2;
