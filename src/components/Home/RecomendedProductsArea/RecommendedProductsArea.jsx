
import RecommendedProductCard from "../../../shared/Cards/RecomendedCard/RecommendedProductCard";
import useGetAllProducts from "../../../Hook/GetDataHook/useGetAllProducts";

function RecommendedProductsArea() {
  const products = useGetAllProducts({ });
  return (
    <div className="container mx-auto mt-2 mb-10">
      <h2 className=" text-2xl font-bold text-gray-800 mb-3">
        Recommended Products
      </h2>
      <h4 className="px-6 py-2 text-3xl uppercase inline-block font-bold">
        {" "}
        For You
      </h4>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-4 ">
        {products?.length > 0 && products.slice(0, 6)?.map((product, index) => (
          <RecommendedProductCard key={index} item={product} />
        ))}
      </div>
    </div>
  );
}

export default RecommendedProductsArea;
