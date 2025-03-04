// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import CustomImage from "../../../../shared/ImageComponents/CustomImage";

export default function ExclusiveSliders({ data }) {
  return (
    <>
      <Swiper
        navigation={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="exclusive_banner"
      >
        {data?.length > 0 &&
          data.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[85dvh]">
                <CustomImage
                  width={1200}
                  height={600}
                  imageKey={banner.image}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
