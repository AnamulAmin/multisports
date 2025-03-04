"use client"
import ProductCard from "../../../../../shared/Cards/ProductCard/ProductCard";
import useGetAllProducts from "../../../../../Hook/GetDataHook/useGetAllProducts";
import React from "react";

function TrendyBagsProductsArea(props) {
  // const products = [
  //   {
  //     id: 1,
  //     title: "Womens Chino Pant",
  //     price: 1250,
  //     discount: 0,
  //     old_price: 1250,
  //     image:
  //       "https://i.pinimg.com/236x/e5/82/5e/e5825e63e4c98339c3c7c8969453e5dc.jpg",
  //     is_new: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Womens Pajama",
  //     price: 693,
  //     discount: 1297,
  //     old_price: 1990,
  //     image:
  //       "https://i.pinimg.com/564x/e8/88/47/e88847758de35e5e12d5ccafcebcde12.jpg",
  //     is_new: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Womens Pajama",
  //     price: 693,
  //     discount: 1297,
  //     old_price: 1990,
  //     image:
  //       "https://i.pinimg.com/564x/73/74/9c/73749ce4bee4cf4a5c3855e4729fd634.jpg",
  //     is_new: false,
  //   },
  //   {
  //     id: 4,
  //     title: "Womens Chino Pant",
  //     price: 1250,
  //     discount: 0,
  //     old_price: 1250,
  //     image:
  //       "https://i.pinimg.com/236x/e5/82/5e/e5825e63e4c98339c3c7c8969453e5dc.jpg",
  //     is_new: true,
  //   },
  //   {
  //     id: 5,
  //     title: "Womens Ethnic 3pcs",
  //     price: 2555,
  //     discount: 1025,
  //     old_price: 3580,
  //     image:
  //       "https://i.pinimg.com/564x/15/45/b6/1545b6826cec5db0b35387d0b3e2594d.jpg",
  //     is_new: false,
  //   },
  //   {
  //     id: 6,
  //     title: "Womens Kaftan",
  //     price: 1813,
  //     discount: 7777,
  //     old_price: 9590,
  //     image:
  //       "https://i.pinimg.com/564x/e8/88/47/e88847758de35e5e12d5ccafcebcde12.jpg",
  //     is_new: false,
  //   },
  //   {
  //     id: 7,
  //     title: "Womens Ethnic 3pcs",
  //     price: 2555,
  //     discount: 1025,
  //     old_price: 3580,
  //     image:
  //       "https://i.pinimg.com/236x/e5/82/5e/e5825e63e4c98339c3c7c8969453e5dc.jpg",
  //     is_new: false,
  //   },
  // ];
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
        {products?.length > 0 && products.slice(0, 6).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default TrendyBagsProductsArea;
