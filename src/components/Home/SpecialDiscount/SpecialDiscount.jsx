import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ProductSkeleton from "../../partial/ProductCard/ProductSkeleton";
import ProductCard from "../../partial/ProductCard/ProductCard";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const SpecialDiscount = ({ limit = 8, isShowSeeAll = true }) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [query, setQuery] = useState("page=1&limit=10"); // Example query parameters
  const [products, setProducts] = useState([]);
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

  products;

  const handleProductClick = (product) => {
    setCurrentProduct(product);
    document
      .getElementById(`modal_${product.productTitle.replace(/\s+/g, "_")}`)
      .showModal();
  };

  return (
    <section className="w-[90%] md:w-full mx-auto py-6">
      <div className="flex justify-between items-center my-9">
        <h2 className="text-2xl font-semibold ">Special Discount</h2>
        {isShowSeeAll && (
          <Link
            to={{
              pathname: "/see_all/discount",
            }}
            state={{ products }}
            className="flex text-black rounded-lg justify-between items-center gap-2 ease-in-out transition-all  font-semibold"
          >
            <span className="">See All</span> <FaArrowRight />
          </Link>
        )}
      </div>
      {loading ? (
        <ProductSkeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products?.length > 0 &&
            products.slice(0, limit).map((product, index) => (
              <ProductCard
                showDiscount={true}
                isSpecial={true}
                border={true}
                key={index}
                product={product}
                handleProductClick={handleProductClick}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default SpecialDiscount;
