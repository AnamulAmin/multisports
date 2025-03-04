import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { baseImageUrl } from "../../../apis/apis";

const FlashSale = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/products/discount`);

        if (res.status === 200 || res.status === 201) {
          setProducts(res.data.products);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
        setLoading(false);
        throw new Error("Failed to fetch Products");
      }
    };

    fetchProducts();
  }, [axiosPublic]);

  return (
    <div className="relative border-y py-5  my-9 mx-auto w-[90%] md:w-full">
      <h2 className="text-xl md:text-2xl font-semibold  mb-4 md:mb-6 pl-1 md:pl-4">
        Flash Sale
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
          slidesPerView={2}
          breakpoints={{
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          loop={true}
        >
          {products?.length > 0 &&
            products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="bg-white rounded-lg px-2 md:px-4">
                  <div className="relative w-full aspect-square mb-4">
                    <img
                      src={`${baseImageUrl}/${product?.thumbnail}`}
                      alt={product.productTitle}
                      className="w-full h-full object-cover rounded transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>
                  {product.discount > 0 && (
                    <span className="absolute z-10 left-2 top-2  md:top-3 md:left-7 bg-yellow-700 text-white md:text-[10px] text-[10px] md:text-xs py-[2px] md:py-1 px-2 md:px-3 rounded-md">
                      {product.discount}% OFF
                    </span>
                  )}
                  <h3 className="text-sm md:text-base font-semibold mb-1 block md:hidden">
                    {product.productTitle.length > 12
                      ? `${product.productTitle.slice(0, 12)}..`
                      : product.productTitle}
                  </h3>
                  <h3 className="text-base font-semibold mb-2 md:block hidden">
                    {product.productTitle}
                  </h3>
                  <p
                    className="text-sm hidden md:block text-gray-600 mb-2"
                    dangerouslySetInnerHTML={{
                      __html:
                        product?.shortDescription?.length > 30
                          ? `${product?.shortDescription.slice(0, 30)}...`
                          : product?.shortDescription,
                    }}
                  />
                  <p
                    className="text-xs block md:hidden text-gray-600 mb-2"
                    dangerouslySetInnerHTML={{
                      __html:
                        product?.shortDescription?.length > 30
                          ? `${product?.shortDescription.slice(0, 30)}...`
                          : product?.shortDescription,
                    }}
                  />
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-sm md:text-lg font-semibold md:font-bold">
                      BDT {product.price * (1 - product.discount / 100)}
                    </span>
                    {product.discount > 0 && product.specialOffer && (
                      <span className="text-xs md:text-sm line-through text-gray-400">
                        BDT {product?.price}
                      </span>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Custom Navigation Buttons Centered Relative to Image Div */}
        <button
          ref={prevRef}
          className="absolute top-1/3 -left-2 transform -translate-y-1/2 w-7 h-7 md:w-11 md:h-11 flex items-center justify-center bg-white text-black rounded-full shadow-lg transition-all duration-300 ease-in-out md:hover:bg-gray-700 hover:text-white hover:scale-110 hover:shadow-2xl z-10"
        >
          <IoIosArrowBack className="text-base" />
        </button>

        <button
          ref={nextRef}
          className="absolute top-1/3 -right-2 transform -translate-y-1/2 w-7 h-7 md:w-11 md:h-11 flex items-center justify-center bg-white text-black rounded-full shadow-lg transition-all duration-300 ease-in-out md:hover:bg-gray-700 hover:text-white hover:scale-110 hover:shadow-2xl z-10"
        >
          <IoIosArrowForward className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default FlashSale;
