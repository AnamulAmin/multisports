import { useLocation } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";

const ViewAllProduct = () => {
  const location = useLocation();
  const products = location.state || [];

  products;
  return (
    <section className="max-w-[1440px] mx-auto mt-20">
      {/* {products.length > 0 && <p>hi</p>} */}
      {/* itmes */}
      <div className="grid grid-cols-2 md:gap-y-8 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {products &&
          products.map((item, index) => {
            return <ProductCard product={item} />;
          })}
      </div>
    </section>
  );
};

export default ViewAllProduct;
