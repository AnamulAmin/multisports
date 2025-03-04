import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { baseImageUrl } from "../../../apis/apis";
import { Link } from "react-router-dom";
const Featured = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/products/featured`);

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
  const handleProductClick = (product) => {
    setCurrentProduct(product);
    document
      .getElementById(`modal_${product.productTitle.replace(/\s+/g, "_")}`)
      .showModal();
  };

  return (
    <div className=" py-6 px-5  md:w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-7">Featured Products</h2>
      <div className="grid bg-slate-50 grid-cols-1 md:grid-cols-2 gap-3">
        {/* First Product: Larger, occupies the full height of the left column */}
        <div className="p-4 flex flex-col justify-between rounded-lg relative bg-slate-50">
          {products?.length > 0 && products[0]?.discount && (
            <span className="absolute left-3 top-3  md:top-4 md:left-4 bg-gray-900 text-white text-[10px] md:text-sm py-1 px-2 md:px-3 rounded-md">
              {products[0]?.discount}%
            </span>
          )}
          <img
            src={`${baseImageUrl}/${products[0]?.thumbnail}`}
            alt={products[0]?.productTitle}
            className="w-full cursor-pointer rounded-lg h-auto md:max-h-[600px] object-cover transition-transform duration-300 mb-4"
          />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div className="flex flex-col justify-end">
              <h3 className="font-semibold md:text-base text-sm mb-2 hidden lg:block">
                {products[0]?.productTitle}
              </h3>
              <h3 className="font-semibold md:text-base text-sm md:mb-2 block md:hidden">
                {products[0]?.productTitle.length > 12
                  ? `${products[0]?.productTitle?.slice(0, 12)}...`
                  : products[0]?.productTitle}{" "}
              </h3>
              <p
                className="text-gray-500 md:text-sm text-xs hidden md:block line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html:
                    products[0]?.shortDescription?.length > 70
                      ? `${products[0]?.shortDescription?.slice(0, 70)}...`
                      : products[0]?.shortDescription,
                }}
              />
              <p
                className="text-gray-500 md:text-sm text-xs  md:hidden block line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html:
                    products[0]?.shortDescription?.length > 30
                      ? `${products[0]?.shortDescription?.slice(0, 30)}...`
                      : products[0]?.shortDescription,
                }}
              />
            </div>
            <div className="flex items-end justify-between flex-row-reverse md:flex-col mt-2 md:mt-0 gap-2 md:gap-1">
              <span className="text-gray-400 text-sm md:text-base   line-through">
                BDT {products[0]?.price}
              </span>
              <span className="md:text-lg text-sm font-semibold md:font-bold">
                BDT{" "}
                {products[0]?.oldPrice
                  ? products[0]?.oldPrice
                  : products[0]?.price + 200}
              </span>
            </div>
          </div>
        </div>

        {/* Other Products: Arranged in a two-row grid */}
        <div className="grid grid-cols-2 gap-2  md:gap-3">
          {products?.length > 0 &&
            products?.slice(1, 5).map((product, index) => (
              <div
                key={index}
                className=" md:p-4 p-2 flex flex-col bg-slate-50 justify-between  rounded-lg relative"
              >
                <div></div>
                {product.discount ? (
                  <span className="absolute left-3 top-3  md:top-4 md:left-4 bg-gray-900 text-white text-[10px] md:text-sm py-1 px-2 md:px-3 rounded-md">
                    {product?.discount} %
                  </span>
                ) : (
                  <p></p>
                )}
                <img
                  src={`${baseImageUrl}/${product?.thumbnail}`}
                  alt={product.productTitle}
                  className=" cursor-pointer rounded-lg w-full max-h-32 md:max-h-72 object-cover  transition-transform duration-300 mb-4"
                />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                  <div className="flex flex-col justify-end">
                    <h3 className="font-semibold md:text-base text-sm mb-2 hidden md:block">
                      {product.productTitle.length > 25
                        ? `${product.productTitle?.slice(0, 25)}...`
                        : product.productTitle}
                    </h3>
                    <h3 className="font-semibold md:text-base text-sm md:mb-2 block md:hidden">
                      {product.productTitle?.slice(0, 15)}..
                    </h3>
                    <p
                      className="text-gray-500 md:text-sm text-xs hidden md:block line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html:
                          product?.shortDescription?.length > 30
                            ? `${product?.shortDescription?.slice(0, 30)}...`
                            : product?.shortDescription,
                      }}
                    />
                    <p
                      className="text-gray-500 md:text-sm text-xs  md:hidden block line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html:
                          product?.shortDescription?.length > 24
                            ? `${product?.shortDescription?.slice(0, 24)}...`
                            : product?.shortDescription,
                      }}
                    />
                  </div>
                  <div className="flex items-end justify-between flex-row-reverse md:flex-col mt-2 md:mt-0 gap-2 md:gap-1">
                    {product.discountPrice && (
                      <span className="text-gray-400 text-sm md:text-base   line-through">
                        BDT {product.price}
                      </span>
                    )}
                    <span className="md:text-lg text-sm font-semibold md:font-bold">
                      BDT{" "}
                      {product.discountPrice
                        ? product.price - product.discountPrice
                        : product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
