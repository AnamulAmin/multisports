import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { IoMdCloseCircle } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

const Modal = ({
  id,
  title,
  object_id,
  price,
  description,
  image,
  colors,
  isShowModal,
  setIsShowModal,
  product,
}) => {
  const [trackingProduct, setTrackingProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState(0);

  const {
    cartItems,
    removeFromCart,
    addToCart,
    updateCartQuantity,
    totalPrice,
    setCartItems,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState({});
  const [sizeArray, setSizeArray] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [currentStock, setCurrentStock] = useState(0);

  // useEffect(() => {
  //   setQuantity(
  //     cartItems.find((item) => item._id === object_id)?.quantity || 0
  //   );

  //   if (isShowModal === false) {
  //     setSelectedColor({});
  //     setSelectedSize({});
  //   }
  //   if (isShowModal === true && cartItems.length == 0) {
  //     setSelectedColor(colors[0]?.color || {});
  //     setSelectedSize(colors[0]?.size[0] || {});
  //     setSizeArray(colors[0]?.size || []);
  //   }
  // }, [cartItems, object_id, isShowModal, colors]);

  // useEffect(() => {
  //   const currentItem = cartItems.find(
  //     (item) =>
  //       item._id === object_id &&
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
  //     copy_product.colorName = selectedColor?.label;
  //     copy_product.size = selectedSize?.value;
  //     setTrackingProduct(copy_product);
  //     setQuantity(0);
  //   }
  //   (currentItem, "copy_product");
  // }, [selectedSize, selectedColor, product, cartItems]);

  "current stock",
    cartItems.filter((item) => item.color === selectedColor?.value);

  // useEffect(() => {
  //   const currentColorItems = cartItems.filter(
  //     (item) => item.color === selectedColor?.value && item._id === object_id
  //   );

  //   const currentItemStock = currentColorItems.reduce(
  //     (acc, item) => acc + item.quantity,
  //     0
  //   );

  //   (
  //     currentItemStock,
  //   tock",
  //     stock - currentItemStock == 0,
  //     currentItemStock
  //   );
  //   if (currentColorItems.length > 0) {
  //     setCurrentStock(currentItemStock);
  //   } else {
  //     setCurrentStock(0);
  //   }
  // }, [selectedColor, cartItems, quantity, stock]);

  useEffect(() => {
    if (selectedColor && selectedSize && cartItems.length > 0) {
      const currentColorItem = cartItems.find(
        (item) =>
          item.color === selectedColor.value && item.size === selectedSize.value
      );

      // (currentColorItem, "currentColorItem");
      setQuantity(currentColorItem?.quantity || 0);
    }
  }, [cartItems, selectedColor, selectedSize]);
  selectedColor, selectedSize, "currentColorItem";

  const incrementAndDecrementQuantity = ({ isIncrement }) => {
    isIncrement, "isIncrement";

    if (quantity === Number(selectedSize.quantity)) {
      toast.error("Out of Stock");
    }
    if (isIncrement) {
      setQuantity((prev) => {
        prev < Number(selectedSize.quantity),
          prev === Number(selectedSize.quantity),
          "prev < quantity",
          prev,
          Number(selectedSize.quantity);
        if (prev < Number(selectedSize.quantity)) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    } else {
      setQuantity((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else if (prev === 1) {
          return -1;
        } else {
          return prev;
        }
      });
    }
  };

  return (
    <dialog id={id} className={`modal`}>
      <div className=" modal-box p-0 rounded max-w-4xl w-[90%] mx-auto md:w-full flex flex-col md:flex-row">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute focus:outline-none right-2 top-2">
            <IoMdCloseCircle className="text-xl" />
          </button>
        </form>

        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 px-4 py-4 md:p-6 flex flex-col justify-between">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-500 mb-2 text-xs md:text-sm">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </p>

          <div className="text-xl md:text-2xl font-semibold mb-4">
            BDT {price}.00
          </div>

          {product.stock > 0 ? (
            <>
              {/* Color Options */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Color:</h3>
                <div className="flex gap-2">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className={`border flex items-center border-gray-100 duration-300 ease-in-out  hover:border-gray-400 justify-center p-[3px] md:p-1 rounded-md ${
                        selectedColor?.value === color?.color?.value
                          ? "bg-neutral-500 text-white"
                          : ""
                      }`}
                    >
                      <button
                        style={{ backgroundColor: color?.color?.value }}
                        className={`md:w-8 md:h-8 w-7 h-7 rounded-md`}
                        onClick={() => {
                          setSelectedColor(color.color);
                          setSizeArray(color.size);
                          setSelectedSize(color.size[0]);
                          setStock(color.quantity);
                          setQuantity(0);
                        }}
                      ></button>
                    </div>
                  ))}
                </div>
              </div>
              {sizeArray?.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Size:</h3>
                  <div className="flex gap-2">
                    {sizeArray.map((size) => (
                      <button
                        key={size}
                        className={`border text-xs md:text-sm shadow-sm w-7 h-7 md:w-10 md:h-10 hover:border-gray-500 duration-300 ease-in-out rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${
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
              <h3 className="font-semibold mb-2 text-gray-400">
                In Stock : {product.stock}
              </h3>
              <div className="flex md:block ">
                {/* Quantity and Actions */}
                <div className="flex flex-row w-full items-center gap-4 mb-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      className="w-7 text-center py-2 md:h-11"
                      onClick={() =>
                        // updateCartQuantity(
                        //   trackingProduct._id,
                        //   quantity - 1,
                        //   selectedColor.value,
                        //   selectedSize.value
                        // )
                        incrementAndDecrementQuantity({ isIncrement: false })
                      }
                      disabled={quantity == 1}
                    >
                      -
                    </button>
                    <span className="w-10 border-x text-center">
                      {quantity}
                    </span>
                    <button
                      className="w-7 disabled:opacity-50 disabled:cursor-not-allowed"
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

                  <form method="dialog" className="w-full md:hidden block ">
                    <button
                      className="md:py-3 py-2 rounded-lg text-sm md:text-base font-semibold bg-black text-white w-full md:flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          setIsShowModal(false);
                          toast.success("Product Added to Cart!");
                        }
                      }}
                      disabled={stock - currentStock == 0 || quantity == 0}
                    >
                      Add To Cartt
                    </button>
                  </form>
                  <button
                    className="md:py-3 hidden md:flex justify-center items-center gap-3 py-2 rounded-lg text-sm md:text-base font-semibold bg-black text-white w-full md:flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={stock - currentStock == 0 || quantity == 0}
                  >
                    <FaShoppingCart /> Add To Cart
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h3 className="font-semibold mb-2">Out of Stock</h3>
          )}

          <Link to={`/product_details/${object_id}`}>
            <button className="md:py-3 font-semibold text-sm py-2 md:text-base rounded-lg text-white w-full  bg-black">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
