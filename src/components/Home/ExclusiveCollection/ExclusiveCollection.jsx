
import useGetAllBagBanners from "../../../Hook/GetPublicDataHook/useGetAllBagBanners";
import RecommendedProductsArea from "../RecomendedProductsArea/RecommendedProductsArea";
import ExclusiveSliders from "./components/ExclusiveSliders";


export default function ExclusiveCollection() {

  const banners = useGetAllBagBanners({})
  return (
    <>
      <div className="w-full">

        {
          banners?.length > 0 &&
        
         <ExclusiveSliders data={banners} />
        }
      </div>

      <RecommendedProductsArea />
    </>
  );
}
