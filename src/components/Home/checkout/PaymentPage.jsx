import { useContext, useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { AuthContext, useAuth } from "../../../providers/AuthProvider";
import Container from "../../../shared/Container";
import ShippingForm from "../Shipping/ShippingForm";
import ViewCart from "../../../shared/cart/viewCart/ViewCart";
import Summary from "../../../shared/cart/viewCart/Summary";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import AccountAddress from "../my-account/AccountAddress";
import PromotionalBanner from "../../UI/PromotionalBanner";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import generateOrderOverview from "../../../helpers/generateOrderOverview";
import { Oval } from "react-loader-spinner";

export default function PaymentPage() {
  const { cartItems, setCartItems } = useContext(AuthContext);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [totalCartDiscount, setTotalCartDiscount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const [shippingAddress, setShippingAddress] = useState(null);
  const [isShippingEdit, setIsShippingEdit] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");

  useEffect(() => {
    setTotalPrice(location?.state?.order?.total);
    setTotalCartDiscount(location?.state?.order?.itemPerDiscount);
    setDiscount(location?.state?.order?.discount);
    setDeliveryCharge(location?.state?.order?.deliveryCharge);
  }, [location]);

  //   const submitOrder = async () => {
  //     navigate(`/order_summary`, {
  //       state: {
  //         order: location?.state?.order,
  //       },
  //     });
  //   };

  const submitOrder = async () => {
    // const submitOrderData = {
    //   name: shippingAddress.recipientName,
    //   phone: shippingAddress.contact_number,
    //   secondary_phone: shippingAddress.secondaryContactNumber,
    //   address: shippingAddress.address,
    //   city_id: shippingAddress.city_id,
    //   city_name: shippingAddress.city_name,
    //   zone_id: shippingAddress.zone_id,
    //   area_id: shippingAddress.area_id,
    //   area_name: shippingAddress.area_name,
    //   special_instruction: shippingAddress.special_instruction,
    //   items: items,
    //   payment_method: "cash",
    //   total: totalPrice + deliveryCharge?.charge - discount,
    //   // courierMethod: courierMethod,
    //   itemCount: items.length,
    //   discount: discount,
    //   itemPerDiscount: totalCartDiscount,
    //   deliveryCharge: deliveryCharge?.charge,
    //   coupon: coupon,
    //   userId: user._id,
    //   totalItems: totalItems,
    // };

    setLoading(true);

    const orderOverview =
      location?.state?.order && generateOrderOverview(location?.state?.order);

    const submitData = {
      ...location?.state?.order,
      orderOverview,
    };

    ("orderData");

    try {
      const response = await axiosPublic.post("/orders", submitData);
      response, "response order";

      if (response.data.success) {
        setCartItems([]);
        localStorage.removeItem("cartItems");
        Swal.fire({
          title: "Success!",
          text: "Order placed successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        // return router(`/my-account/orders/${response.data?.data?._id}`);
        return navigate(`/success`, {
          state: {
            orderId: response.data?.data?._id,
            category: location.state.order?.items[0]?.category,
          },
        });
      }

      Swal.fire({
        title: "Error",
        text: response.data.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } catch (error) {
      error;
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <div className="text-base text-gray-500 md:mb-8 border-b border-gray-300 flex gap-3 items-center mt-10 pb-4 ">
          <IoHome /> Multisports {`>`} Payment
        </div>
        <div className="w-full md:max-w-[75%] inline-block ">
          <div className="w-full shadow-lg p-6 rounded-md mb-4 bg-white">
            <h2 className="text-xl font-bold mb-4 pb-4 border-b border-black text-nowrap">
              Select Payment Method
            </h2>
            <div className="space-y-4">
              <div
                className="w-full"
                onClick={() => setSelectedPaymentMethod("cash")}
              >
                <button
                  className="p-8 rounded-md border border-gray-200 bg-white hover:bg-gray-100 w-full flex gap-5 items-center"
                  //   onClick={submitOrder}
                >
                  <span
                    className={`w-5 h-5 rounded-full border border-black ${
                      selectedPaymentMethod === "cash" ? "bg-black" : ""
                    }`}
                  ></span>
                  <img src="tk.png" alt="bkash" className="w-16 border" /> Cash
                  On Delivery
                </button>
                {/* <button
          className="p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100"
          onClick={submitBkash}
        >
          <img src="bkash.webp" alt="bkash" className="w-16" />
        </button> */}
              </div>
              {/* <div
                className="w-full"
                onClick={() => setSelectedPaymentMethod("bkash")}
              >
                <button
                  className="p-8 rounded-md border border-gray-200 bg-white hover:bg-gray-100 w-full flex gap-5 items-center"
                  //   onClick={submitOrder}
                >
                  <span
                    className={`w-5 h-5 rounded-full border border-black ${
                      selectedPaymentMethod === "bkash" ? "bg-black" : ""
                    }`}
                  ></span>
                  <img src="bkash.webp" alt="bkash" className="w-16 border" />{" "}
                  Bkash
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="w-full md:max-w-[23%] md:sticky md:top-[150px]  md:inline-block md:float-right">
          <div className="border p-6 md:mt-auto rounded-md shadow-lg w-full mt-6  md:max-w-[350px]">
            <h2 className="text-xl font-bold mb-4 pb-4 border-b border-black text-nowrap">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Per-Product Total Discount</span>
              <span className="font-medium text-red-400">
                -{totalCartDiscount}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <b className="font-bold text-lg">Discounts</b>
              <span className="font-medium text-red-400">-{discount}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <b className="font-bold text-lg">Shipping</b>
              <span className="font-medium">৳{deliveryCharge || 0}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <b className="font-bold text-lg">Total</b>
              <span className="font-medium">৳{totalPrice - discount}</span>
            </div>
            <button
              // onClick={() => setIsShowPaymentMethod(true)}
              onClick={submitOrder}
              disabled={loading || cartItems.length === 0}
              className="bg-green-500 text-white text-sm py-2 px-4 rounded-md mt-4 disabled:bg-gray-400 disabled:text-black  w-full flex justify-center gap-4 items-center"
            >
              {loading && (
                <Oval
                  visible={true}
                  color="#000"
                  height={30}
                  width={30}
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
              Place Order
            </button>
          </div>
        </div>
      </div>

      <BgBlurModal
        isShowModal={isShippingEdit}
        setIsShowModal={setIsShippingEdit}
      >
        {user ? (
          <AccountAddress setIsShow={setIsShippingEdit} />
        ) : (
          <ShippingForm
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            setIsShowModal={setIsShippingEdit}
            isShowModal={isShippingEdit}
          />
        )}
      </BgBlurModal>
    </Container>
  );
}
