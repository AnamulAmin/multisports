
import React from "react";
import TrendyBagsProductsArea from "./components/TrendyBagsProductsArea/TrendyBagsProductsArea";
import useGetAllBagBanners from "../../../Hook/GetPublicDataHook/useGetAllBagBanners";
import BagSliders from "./components/BagSliders";

function TrendyBags() {
  const banners = useGetAllBagBanners({})
  return (
    <>
      <div className="w-full">
      {
          banners?.length > 0 &&
        
         <BagSliders data={banners} />
        }
      </div>

      <TrendyBagsProductsArea />
    </>
  );
}

export default TrendyBags;
