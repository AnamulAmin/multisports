import { useState } from "react";
import useGetAllProducts from "../../../Hook/GetPublicDataHook/useGetAllProducts";
import { ThreeDots } from "react-loader-spinner";
import Modal from "../../../shared/Modal/Modal";
import ProductCard from "../../partial/ProductCard/ProductCard";

function ProductsArea({
  slug,
  sizeFilter,
  colorFilter,
  brandFilter,
  query,
  subcategoryFilter,
  categoryFilter,
  priceRange,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [singleData, setSingleData] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  const { products, totalItems, loading } = useGetAllProducts({
    query: `slug=${slug}&color=${colorFilter.join(",")}&size=${sizeFilter.join(
      ","
    )}&brand=${brandFilter.join(",")}&subcategory=${subcategoryFilter.join(
      ","
    )}&category=${categoryFilter.join(
      ","
    )}&currentPage=${currentPage}&limit=${itemsPerPage}&priceRange=${priceRange}`,
  });

  products, "products", totalItems, "totalItems";

  const handleProductClick = (product) => {
    setSingleData(product);
    setIsShowModal(true);
    document
      .getElementById(`modal_${product.productTitle.replace(/\s+/g, "_")}`)
      .showModal();
  };

  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:gap-4 gap-3 items-start min-h-screen">
        {products && products?.length > 0 ? (
          products.map((product, index) => (
            // <ProductCardWithGallery
            //   key={index}
            //   product={product}
            //   setTargetId={setTargetId}
            //   setIsShowDetail={setIsShowDetail}
            //   handleProductClick={handleProductClick}
            // />

            // key={index}
            //       product={product}
            //       handleProductClick={handleProductClick}
            //       showNewArrival={true}
            //       showDiscount={true}
            <div className="md:border rounded-lg" key={index}>
              <ProductCard
                key={index}
                product={product}
                showDiscount={true}
                isPopular={true}
                handleProductClick={handleProductClick}
              />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-screen col-span-full">
            <h1 className="text-2xl font-bold">No Products Found</h1>
          </div>
        )}
      </div>
      {totalItems > currentPage * itemsPerPage && (
        <button
          className="w-full border rounded-2xl py-4 font-semibold bg-gray-700 text-white flex justify-center items-center mt-10"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {loading ? (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="gray"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Load More"
          )}
        </button>
      )}
      {/* <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        limit={itemsPerPage}
        setCurrentPage={setCurrentPage}
      /> */}
      {/* <BgBlurModal isShowModal={isShowDetail} setIsShowModal={setIsShowDetail}>
        <ProductDetail
          targetId={targetId}
          setIsShowDetail={setIsShowDetail}
          isShowDetail={isShowDetail}
        />
      </BgBlurModal> */}

      {singleData && (
        <Modal
          id={`modal_${singleData.productTitle.replace(/\s+/g, "_")}`}
          object_id={singleData._id}
          title={singleData.productTitle}
          sizes={singleData.productSizeValue}
          image={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${singleData.thumbnail}`}
          description={singleData.fullDescription}
          colors={singleData.colorAndSize}
          price={singleData.price}
          setIsShowModal={setIsShowModal}
          isShowModal={isShowModal}
          product={singleData}
        />
      )}
    </>
  );
}

export default ProductsArea;
