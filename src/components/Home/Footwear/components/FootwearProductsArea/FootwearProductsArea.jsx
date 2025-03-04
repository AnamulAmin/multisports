"use client"
import ProductCard from "../../../../../shared/Cards/ProductCard/ProductCard";
import useGetAllProducts from "../../../../../Hook/GetDataHook/useGetAllProducts";


function FootwearProductsArea(props) {
  // const products = [
  //   {
  //     id: 1,
  //     title: "Womens Chino Pant",
  //     price: 1250,
  //     discount: 0,
  //     old_price: 1250,
  //     image:
  //       "https://i.pinimg.com/564x/c3/f2/52/c3f252c55cfb7e1b50de7d8a9a593e55.jpg",
  //     is_new: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Womens Pajama",
  //     price: 693,
  //     discount: 1297,
  //     old_price: 1990,
  //     image:
  //       "https://i.pinimg.com/564x/28/95/00/28950024fe8c875e5615d02a9439f33e.jpg",
  //     is_new: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Womens Pajama",
  //     price: 693,
  //     discount: 1297,
  //     old_price: 1990,
  //     image:
  //       "https://i.pinimg.com/564x/c3/f2/52/c3f252c55cfb7e1b50de7d8a9a593e55.jpg",
  //     is_new: false,
  //   },
  //   {
  //     id: 4,
  //     title: "Womens Chino Pant",
  //     price: 1250,
  //     discount: 0,
  //     old_price: 1250,
  //     image:
  //       "https://i.pinimg.com/564x/bc/cf/7a/bccf7a7d2b1ceeb9c7a23d394fb34bb3.jpg",
  //     is_new: true,
  //   },
  //   {
  //     id: 5,
  //     title: "Womens Ethnic 3pcs",
  //     price: 2555,
  //     discount: 1025,
  //     old_price: 3580,
  //     image:
  //       "https://i.pinimg.com/564x/60/da/3d/60da3d0b0448a6286240364af8479db2.jpg",
  //     is_new: false,
  //   },
  //   {
  //     id: 6,
  //     title: "Womens Kaftan",
  //     price: 1813,
  //     discount: 7777,
  //     old_price: 9590,
  //     image:
  //       "https://i.pinimg.com/564x/28/95/00/28950024fe8c875e5615d02a9439f33e.jpg",
  //     is_new: false,
  //   },
  //   {
  //     id: 7,
  //     title: "Womens Ethnic 3pcs",
  //     price: 2555,
  //     discount: 1025,
  //     old_price: 3580,
  //     image:
  //       "https://i.pinimg.com/564x/c3/f2/52/c3f252c55cfb7e1b50de7d8a9a593e55.jpg",
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

export default FootwearProductsArea;
