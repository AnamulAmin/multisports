import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import ProductSkeleton from "../ProductCard/ProductSkeleton";
import ProductCard from "../ProductCard/ProductCard";

const RelatedProducts = ({ limit = 4, category }) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/products/related/${category}`);

        if (res.status === 200 || res.status === 201) {
          setProducts(res.data.products.slice(0, limit)); // Limit the products to 4
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [axiosPublic, category, limit]);

  const handleProductClick = (product) => {
    setCurrentProduct(product);
    document
      .getElementById(`modal_${product.productTitle.replace(/\s+/g, "_")}`)
      .showModal();
  };

  return (
    <section className="w-[90%] md:w-full mx-auto py-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">You may like</h2>
      </div>

      {loading ? (
        <ProductSkeleton skeletons={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg md:p-4">
              <ProductCard
                product={product}
                showNewArrival={true}
                showDiscount={true}
                handleProductClick={handleProductClick}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RelatedProducts;
