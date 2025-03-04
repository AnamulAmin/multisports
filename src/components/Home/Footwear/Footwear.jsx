
import React from "react";
import FootwearProductsArea from "./components/FootwearProductsArea/FootwearProductsArea";
import FootwearSliders from "./components/FootwearSliders";
import useGetAllShoesBanners from "../../../Hook/GetPublicDataHook/useGetAllShoesBanners";

function Footwear(props) {
  const shoes = useGetAllShoesBanners({});
  return (
    <>
      <div className="w-full">
        {
          shoes?.length > 0 && 
        <FootwearSliders data={shoes} />
        }
      </div>

      <FootwearProductsArea />
    </>
  );
}

export default Footwear;
