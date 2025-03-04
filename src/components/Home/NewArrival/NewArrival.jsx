import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import ProductCard from "../../../shared/Cards/ProductCard/ProductCard";
import useGetAllProducts from "../../../Hook/GetDataHook/useGetAllProducts";
// const products = [
//   {
//     id: 1,
//     title: "Womens Chino Pant",
//     price: 1250,
//     discount: 0,
//     old_price: 1250,
//     image:
//       "https://i.pinimg.com/564x/58/ac/ca/58acca94f0313e0f56c2b0aab45c9257.jpg",
//     is_new: true,
//   },
//   {
//     id: 2,
//     title: "Womens Pajama",
//     price: 693,
//     discount: 1297,
//     old_price: 1990,
//     image:
//       "https://i.pinimg.com/736x/88/39/9d/88399dd0cf22868e42d67e9f712e9c3a.jpg",
//     is_new: false,
//   },
//   {
//     id: 3,
//     title: "Womens Pajama",
//     price: 693,
//     discount: 1297,
//     old_price: 1990,
//     image:
//       "https://i.pinimg.com/736x/88/39/9d/88399dd0cf22868e42d67e9f712e9c3a.jpg",
//     is_new: false,
//   },
//   {
//     id: 4,
//     title: "Womens Chino Pant",
//     price: 1250,
//     discount: 0,
//     old_price: 1250,
//     image:
//       "https://i.pinimg.com/564x/58/ac/ca/58acca94f0313e0f56c2b0aab45c9257.jpg",
//     is_new: true,
//   },
//   {
//     id: 5,
//     title: "Womens Ethnic 3pcs",
//     price: 2555,
//     discount: 1025,
//     old_price: 3580,
//     image:
//       "https://i.pinimg.com/564x/8a/fb/ff/8afbffd853cca7a3096c6d9a4ecde588.jpg",
//     is_new: false,
//   },
//   {
//     id: 6,
//     title: "Womens Kaftan",
//     price: 1813,
//     discount: 7777,
//     old_price: 9590,
//     image:
//       "https://i.pinimg.com/736x/88/39/9d/88399dd0cf22868e42d67e9f712e9c3a.jpg",
//     is_new: false,
//   },
//   {
//     id: 7,
//     title: "Womens Ethnic 3pcs",
//     price: 2555,
//     discount: 1025,
//     old_price: 3580,
//     image:
//       "https://i.pinimg.com/564x/8a/fb/ff/8afbffd853cca7a3096c6d9a4ecde588.jpg",
//     is_new: false,
//   },
// ];
function NewArrivals() {
  const products = useGetAllProducts({});
  // const products = useGetAllProducts({ query: `new-arrival=true` });
  return (
    <div className="container mx-auto mt-16 mb-10">
      <div className="container mx-auto p-4 my-6 space-y-2 text-center">
        <h2 className="text-5xl font-semibold mb-7  dark:text-white">
          New Arrival
        </h2>
        <p className="dark:text-white max-w-2xl mx-auto">
          lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
          quia!
        </p>
      </div>
      <Swiper
        slidesPerView={3}
        breakpoints={{
          // when window width is <= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // when window width is <= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          // when window width is <= 1024px
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          // when window width is <= 1280px
          1280: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        navigation={true}
        loop={true}
        autoplay={true}
        modules={[Navigation, Autoplay]}
        className="new_arrivals"
      >
        {products?.length > 0 &&
          products.slice(0, 6).map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
      {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-4 ">
        {products.map((product) => (
          <NewArrivalProductCard product={product} key={product.id} />
        ))}
      </div> */}
    </div>
  );
}

export default NewArrivals;
