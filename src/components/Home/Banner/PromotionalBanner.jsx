import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const PromotionalBanner = () => {
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [promoData, setPromoData] = useState({});
  // buttonLink , buttonText , color, description , headerText, image, titleText
  useEffect(() => {
    const getPromotionalBanner = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/promo-banner`);

        if (res.status === 200 || res.status === 201) {
          setPromoData(res.data.data[0]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Promotions:", error);
        setLoading(false);
        throw new Error("Failed to fetch Promotions");
      }
    };

    getPromotionalBanner();
  }, [axiosPublic]);

  return (
    <div className="w-[90%] hidden md:block md:w-full mx-auto my-3  md:my-9 mb-6 md:mb-16 relative overflow-hidden">
      {/* <img
        src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-3.jpg&w=1920&q=100"
        className='rounded-lg h-28  object-cover md:h-full w-full'
        alt="Banner"
      /> */}

      <PromoBanner promoData={promoData} />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
    </div>
  );
};

const PromoBanner = ({ promoData }) => {
  promoData;
  const { buttonLink, buttonText, color, headerText, image, titleText } =
    promoData;

  return (
    <div
      className="flex items-center py-16 px-5 justify-between md:px-40 md:min-h-[500px] rounded-xl"
      style={{ backgroundColor: color }}
    >
      {/* Text Section */}
      <div className="text-white">
        <h1 className="md:text-6xl text-xl font-semibold md:font-bold md:mb-8">
          {headerText}
        </h1>
        <p className="md:text-xl text-sm uppercase md:mb-8 ">{titleText}</p>
        <a
          href={buttonLink}
          className=" text-white cursor-pointer md:py-2 px-2 mt-2 md:px-6 text-sm md:text-base md:font-medium  border-white border md:border-[4px]  transition"
        >
          {buttonText}
        </a>
      </div>

      {/* Image Section */}
      <div>
        <img
          src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${image}`}
          alt="Promo"
          className="md:w-64 h-auto rounded-md"
        />
      </div>
    </div>
  );
};

export default PromotionalBanner;
