import React, { useEffect } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const TopBar = () => {
  const [data, setData] = React.useState(null);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await axiosPublic.get("discount");

      if (response?.data) {
        setData(response?.data?.data[0]);
      }
    };
    fetchDiscounts();
  }, [axiosPublic]);
  return (
    <>
      {data?.discountTextActive && (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white h-6  md:h-10 flex items-center justify-center text-sm font-bold shadow-lg relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-25 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
          <span className="relative z-10 md:block hidden text-xs md:text-sm">
            {data?.discountText}
          </span>
        </div>
      )}
      {/* <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white h-6  md:h-10 flex items-center justify-center text-sm font-bold shadow-lg relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-25 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        <span className="relative z-10 md:block hidden text-xs md:text-sm">
          {data?.discountText}
        </span>
      </div> */}
    </>
  );
};

export default TopBar;
