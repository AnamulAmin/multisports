import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosSecure } from "../../../Hook/useAxiosSecure";
import useAxiosCourier from "../../../Hook/useAxiosCourier";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
import RelatedProducts from "../../../components/partial/RelatedProducts/RelatedProducts";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import toast from "react-hot-toast";
import MetaTags from "../../../components/Home/MetaTags/MetaTags";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const product_id = useParams().id;
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/products/${product_id}`);
        setProduct(res.data.data);
      } catch (error) {
        error;
      } finally {
        // ("done");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [product_id, axiosPublic]);

  const {
    brandValue,
    category,
    childCategory,
    discountPrice,
    fullDescription,
    gallery,
    hasVariants,
    isNew,
    isRecommended,
    metaDescription,
    metaKeywords,
    metaTitle,
    price,
    productCode,
    productColorValue,
    productFlagValue,
    productSizeValue,
    productTitle,
    returnPolicy,
    rewardPoints,
    shortDescription,
    specialOffer,
    specification,
    subcategory,
    thumbnail,
    updatedAt,
    wishCount,
    colorAndSize,
  } = product;

  category, "category";

  const [trackingProduct, setTrackingProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  // const [sizes, setSizes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(product?.thumbnail || "");
  const [currentStock, setCurrentStock] = useState(0);

  const {
    cartItems,
    removeFromCart,
    addToCart,
    updateCartQuantity,
    totalPrice,
    setCartItems,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeDescription, setActiveDescription] = useState("full_desc");

  const [selectedColor, setSelectedColor] = useState({});
  const [sizeArray, setSizeArray] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [stock, setStock] = useState(0);

  // useEffect(() => {
  //   setQuantity(
  //     cartItems.find((item) => item._id === product_id)?.quantity || 0
  //   );

  //   if (colorAndSize && quantity == 0 && cartItems.length == 0) {
  //     setSelectedColor(colorAndSize[0]?.color || {});
  //     setSelectedSize(colorAndSize[0]?.size[0] || {});
  //     setSizeArray(colorAndSize[0]?.size || []);
  //   }
  // }, [cartItems, product_id, colorAndSize]);

  // useEffect(() => {
  //   const currentItem = cartItems.find(
  //     (item) =>
  //       item._id === product_id &&
  //       item.color === selectedColor?.value &&
  //       item.size === selectedSize?.value
  //   );
  //   (currentItem, "currentItem");
  //   if (currentItem) {
  //     setTrackingProduct(currentItem);
  //     setQuantity(currentItem.quantity);
  //   } else {
  //     const copy_product = {
  //       ...product,
  //       quantity: trackingProduct.quantity || 1,
  //     };
  //     copy_product.color = selectedColor?.value;
  //     copy_product.size = selectedSize?.value;
  //     setTrackingProduct(copy_product);
  //     setQuantity(0);
  //   }
  //   (currentItem, "copy_product");
  // }, [selectedSize, selectedColor, product, cartItems]);

  // useEffect(() => {
  //   const currentColorItems = cartItems.filter(
  //     (item) => item.color === selectedColor?.value && item._id === product_id
  //   );

  //   const currentItemStock = currentColorItems.reduce(
  //     (acc, item) => acc + item.quantity,
  //     0
  //   );

  //   (
  //     currentItemStock,
  //     "currentStock",
  //     stock - currentItemStock == 0,
  //     currentItemStock
  //   );
  //   if (currentColorItems.length > 0) {
  //     setCurrentStock(currentItemStock);
  //   } else {
  //     setCurrentStock(0);
  //   }
  // }, [selectedColor, cartItems, quantity, stock]);

  //   (colorAndSize[0]?.size[0], "colorAndSize[0]?.size[0]");

  // Determine grid columns based on the total number of images
  const getGridCols = (totalImages) => {
    if (totalImages <= 4) return "grid-cols-4"; // 4 items or less
    if (totalImages <= 6) return "grid-cols-6"; // Up to 6 items
    return "grid-cols-8"; // More than 6 items
  };

  // useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         setLoading(true);
  //         const res = await axiosSecure.get(`/products?${query}`);

  //         if (res.status === 200 || res.status === 201) {
  //           setProducts(res.data.data);
  //           setLoading(false);
  //           setTotalItems(res.data.totalItems);
  //           setTotalPages(res.data.totalPages);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching Products:", error);
  //         setLoading(false);
  //         throw new Error("Failed to fetch Products");
  //       }
  //     };

  //     fetchProducts();
  //   }, [axiosSecure, isDeleted, isEdited, isShowModal, query]);

  useEffect(() => {
    if (selectedColor && selectedSize && cartItems.length > 0) {
      const currentColorItem = cartItems.find(
        (item) =>
          item.color === selectedColor.value && item.size === selectedSize.value
      );

      selectedColor, selectedSize, "currentColorItem", currentColorItem;
      // (currentColorItem, "currentColorItem");
      setQuantity(currentColorItem?.quantity || 0);
    }
  }, [cartItems, selectedColor, selectedSize]);

  const iantity = ({ isIncrement }) => {
    if (isIncrement) {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <MetaTags
        metaTitle={product?.metaTitle}
        metaDescription={product?.metaDescription}
        metaOgTitle={product?.metaOgTitle}
        metaOgDescription={product?.metaOgDescription}
        metaOgImage={product?.metaOgImage}
        metaKeywords={product?.metaKeywords}
      />
      <div className="w-[95%] md:max-w-[1440px] mx-auto pt-5 py-9">
        {/* If product exists */}
        {loading && <ProductDetailsSkeleton />}
        {!loading && product && (
          <section className="flex flex-col  md:flex-row">
            {/* image div */}
            <div className="w-full p-10">
              {/* Main Image */}
              <img
                src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${
                  currentImage || thumbnail
                }`}
                alt="Product"
                className="w-full rounded-lg"
              />

              {/* Thumbnails */}

              {gallery && (
                <div
                  className={`grid  ${getGridCols(
                    gallery.length + 1
                  )}  gap-3 mt-5`}
                >
                  {gallery.map((item, index) => (
                    <img
                      key={index}
                      src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${item.image}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-24 object-cover cursor-pointer rounded-lg hover:ring-2 hover:ring-gray-400 transition duration-200"
                      onClick={() => setCurrentImage(item.image)}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* content div */}
            <div className=" w-full p-10">
              <h1 className="text-3xl font-bold tracking-wider mb-2 md:mb-3 text-gray-700">
                {productTitle}
              </h1>
              <p className="text-lg tracking-wider text-gray-600 ">
                <HtmlText htmlContent={fullDescription} />
              </p>
              {/* price */}
              <div className="flex items-center gap-6 my-5">
                <p className="font-semibold text-3xl">
                  BDT{" "}
                  {discountPrice
                    ? parseInt(price) - parseInt(discountPrice)
                    : price}
                  .00
                </p>
                {/* if dicount available */}
                {parseInt(discountPrice) > 0 && (
                  <p className="line-through opacity-50 font-semibold  text-xl md:text-2xl">
                    BDT {price}.00
                  </p>
                )}
              </div>
              <div className="border-b w-full" /> {/* horizontal ruler */}
              {/* color */}
              <div className="mt-5">
                <p className="font-semibold text-xl">Color :</p>
                <div className="flex gap-2 mt-4">
                  {colorAndSize?.length > 0 &&
                    colorAndSize?.map((color, index) => (
                      <div
                        key={index}
                        className={`border flex items-center border-gray-100 duration-300 ease-in-out  hover:border-gray-400 justify-center p-[3px] md:p-1 rounded-full ${
                          selectedColor?.value === color?.color?.value
                            ? "border-neutral-400 text-white shadow-md"
                            : ""
                        }`}
                      >
                        <button
                          style={{ backgroundColor: color?.color?.value }}
                          className={`md:w-6 md:h-6 w-7 h-7 rounded-full`}
                          onClick={() => {
                            setSelectedColor(color.color);
                            setSizeArray(color.size);
                            setSelectedSize(color.size[0]);
                            setStock(color.quantity);
                          }}
                        ></button>
                      </div>
                    ))}
                </div>
              </div>
              {/* size */}
              <div className="mt-5">
                {sizeArray?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Size :</h3>
                    <div className="flex gap-2">
                      {sizeArray.map((size) => (
                        <button
                          key={size}
                          className={`border text-xs md:text-sm shadow-sm w-7 h-7 md:w-10 md:h-10 hover:border-gray-500 duration-300 ease-in-out rounded-lg disabled:opacity-50  disabled:cursor-not-allowed ${
                            size.value === selectedSize.value
                              ? "shadow-lg shadow-green-500"
                              : ""
                          }`}
                          onClick={() => setSelectedSize(size)}
                          disabled={stock - currentStock == 0}
                        >
                          {size?.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <h3 className="font-semibold mb-2 text-gray-400">
                In Stock : {product.stock}
              </h3>
              <div className="border-b w-full my-6" /> {/* horizontal ruler */}
              {/* quantity and add to cart */}
              <div className="flex md:block ">
                {/* Quantity and Actions */}
                <div className="flex flex-row items-center gap-4 mb-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      className="w-16 text-center text-xl py-3 md:h-12"
                      // onClick={() =>
                      //   updateCartQuantity(
                      //     trackingProduct._id,
                      //     quantity - 1,
                      //     selectedColor.value,
                      //     selectedSize.value
                      //   )
                      // }
                      onClick={() =>
                        // updateCartQuantity(
                        //   trackingProduct._id,
                        //   quantity - 1,
                        //   selectedColor.value,
                        //   selectedSize.value
                        // )
                        incrementAndDecrementQuantity({ isIncrement: false })
                      }
                      disabled={
                        product?.stock <= 0 || quantity == 0

                        // product?.quantity >= product?.stock ||
                      }
                    >
                      -
                    </button>
                    <span className="w-20 border-x text-xl text-center">
                      {quantity}
                    </span>
                    <button
                      className="w-16 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      // onClick={() => {
                      //   if (quantity > 1) {
                      //     updateCartQuantity(
                      //       product._id,
                      //       quantity + 1,
                      //       selectedColor?.value,
                      //       selectedSize?.value
                      //     );
                      //   } else {
                      //     addToCart(
                      //       product,
                      //       selectedColor.value,
                      //       selectedSize.value
                      //     );
                      //     if (selectedSize.value) {
                      //       toast.success("Product Added to Cart!");
                      //     }
                      //   }
                      // }}
                      onClick={() => {
                        // if (quantity > 1) {
                        //   updateCartQuantity(
                        //     product._id,
                        //     quantity + 1,
                        //     selectedColor?.value,
                        //     selectedSize?.value
                        //   );
                        // } else {
                        //   addToCart(
                        //     product,
                        //     selectedColor.value,
                        //     selectedSize.value,
                        //     selectedColor.label
                        //   );
                        //   if (selectedSize.value) {
                        //     toast.success("Product Added to Cart!");
                        //   }
                        // }

                        incrementAndDecrementQuantity({ isIncrement: true });
                      }}
                      disabled={stock - currentStock == 0}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="md:py-3 flex  items-center gap-4 max-w-fit px-3 md:px-28 py-2 rounded-lg text-sm md:text-base font-semibold bg-black text-white w-auto md:flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    // onClick={() => {
                    //   addToCart(
                    //     product,
                    //     selectedColor.value,
                    //     selectedSize.value
                    //   );
                    //   if (selectedSize.value) {
                    //     toast.success("Product Added to Cart!");
                    //   }
                    // }}
                    onClick={() => {
                      const isExist = cartItems.find(
                        (item) =>
                          item._id === product._id &&
                          item.color === selectedColor?.value &&
                          item.size === selectedSize?.value
                      );
                      if (isExist) {
                        updateCartQuantity(
                          product._id,
                          quantity,
                          selectedColor?.value,
                          selectedSize?.value
                        );
                      } else {
                        addToCart(
                          product,
                          selectedColor.value,
                          selectedSize.value,
                          selectedColor.label,
                          quantity
                        );
                      }
                      if (selectedSize.value) {
                        toast.success("Product Added to Cart!");
                      }
                    }}
                    disabled={stock - currentStock == 0}
                  >
                    <FaShoppingCart /> Add To Cart
                  </button>
                </div>
              </div>
              <div className="border-b w-full my-6" /> {/* horizontal ruler */}
              {/* info */}
              <div>
                <p className="font-medium mb-3 uppercase">
                  Sub Category :{" "}
                  <span className="font-light uppercase"> {subcategory}</span>
                </p>
                <p className="font-medium uppercase">
                  Category : <span className="font-light"> {category}</span>
                </p>
                <p></p>
              </div>
              {/* accordian */}
              <section className="my-5  space-y-3">
                <div className="collapse collapse-plus border-b rounded-none">
                  <input type="radio" name="my-accordion-3" defaultChecked />
                  <div className="collapse-title  px-0 text-xl font-medium">
                    Product Description
                  </div>
                  <div className="collapse-content  px-0 mt-2 tracking-wider">
                    <p className="mb-2">
                      <HtmlText htmlContent={shortDescription} />
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-plus border-b rounded-none">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title px-0 text-xl font-medium">
                    Specification
                  </div>
                  <div className="collapse-content px-0 mt-2 tracking-wider">
                    <p className="mb-2">
                      <HtmlText htmlContent={specification} />
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-plus border-b rounded-none">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-xl  px-0 font-medium">
                    Return Policy
                  </div>
                  <div className="collapse-content mt-2  px-0 tracking-wider">
                    <p className="mb-2">
                      <HtmlText htmlContent={returnPolicy} />
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        )}
        <RelatedProducts category={category && category} />
      </div>
    </>
  );
};

const HtmlText = ({ htmlContent }) => {
  htmlContent, "htmlContent";
  return htmlContent == "undefined" || htmlContent == undefined ? (
    <div></div>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};
export default ProductDetails;
