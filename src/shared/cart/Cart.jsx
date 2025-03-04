import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import CartItemComponent from "./CartItemComponent";
import { useNavigate } from "react-router-dom";
import calculateDiscounts from "../../helpers/calculateDiscount";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { IoMdCloseCircle } from "react-icons/io";

const Cart = ({ isShow, setIsShow }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    totalPrice,
    totalCartDiscount,
  } = useContext(AuthContext);

  const [discounts, setDiscounts] = useState({});
  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await axiosPublic.get("discount");

      if (response?.data) {
        setDiscounts(response?.data?.data[0]);
      }
    };
    fetchDiscounts();
  }, [axiosPublic]);

  const discount = calculateDiscounts(cartItems, discounts)?.totalDiscount;

  return (
    <div className="drawer rounded-none drawer-end z-[99]">
      <input id="my-cart" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label
          htmlFor="my-cart"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div
          className={`md:min-w-[400px] rounded-none bg-white h-screen p-4 absolute top-0 right-0 z-50 transition-all duration-500 px-5 flex flex-col`}
        >
          <div className="flex mb-6  py-3 items-center justify-between pr-2 border-b pb-5 border-gray-200">
            <p className="text-2xl  font-semibold">Shopping cart</p>
            <form method="dialog">
              <button
                type="button"
                onClick={() => {
                  document.getElementById("my-cart").checked = false;
                  setIsShow(false);
                }}
                className="mt-3"
              >
                <IoMdCloseCircle className="text-xl" />
              </button>
            </form>
          </div>
          <div
            className=" pb-4 h-full overflow-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            {cartItems?.length > 0 ? (
              cartItems?.map((item, index) => (
                <CartItemComponent
                  item={item}
                  updateCartQuantity={updateCartQuantity}
                  removeFromCart={removeFromCart}
                  key={index}
                  isCartArea={true}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-5 h-full w-full">
                <h3>Empty Cart</h3>
                <p>Please Add Product to View</p>
              </div>
            )}
          </div>

          {/* <div className="border-b pb-4 mt-auto pt-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>subtotal</span>
              <span className="font-medium">৳{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Per-Product Total Discount</span>
              <span className="font-medium">-৳{totalCartDiscount}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>discounts</span>
              <span className="font-medium">-৳{Number(discount)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>shipping</span>
              <span className="font-medium">free</span>
            </div>
          </div> */}

          {/* <div className="border-b pb-4 mt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>your total</span>
              <span>৳{totalPrice - Number(discount)}</span>
            </div>
          </div> */}

          <div className="flex gap-3">
            <label
              className="cursor-pointer py-2 border text-center border-black rounded-md md:px-4 md:py-3 min-w-max px-4"
              onClick={() => {
                setIsShow(false);
                navigate("/cart");
              }}
              htmlFor="my-cart"
            >
              View Cart
            </label>

            <label
              type="button"
              className="md:px-4 md:py-3 py-2 px-2 cursor-pointer bg-black text-center text-white rounded-lg w-full"
              onClick={() => {
                setIsShow(false);
                navigate("/checkout");
              }}
              htmlFor="my-cart"
            >
              Checkout <span className="text-xl ml-2"> ৳</span>{" "}
              {totalPrice - Number(discount)}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
