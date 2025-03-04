import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import BgBlurModal from "../../Modal/BgBlurModal";
import PaymentMethodModal from "./PaymentMethodModal";
import calculateDiscounts from "../../../helpers/calculateDiscount";
import toast from "react-hot-toast";
import moment from "moment";

export default function Summary({ isCart = false, shippingAddress = null }) {
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    totalPrice,
    totalCartDiscount,
    user,
    totalItems,
  } = useContext(AuthContext);

  const [discounts, setDiscounts] = useState({});
  const router = useNavigate();
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);
  const [isShowCourier, setIsShowCourier] = useState(false);
  const [courierMethod, setSetCourierMethod] = useState("");
  const [userCouponCode, setUserCouponCode] = useState("");

  const [deliveryCharge, setDeliveryCharge] = useState(null);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchDeliveryCharge = async () => {
      try {
        const res = await axiosPublic.get(
          `/delivery-charge/by_district_id/${Number(shippingAddress?.city_id)}`
        );
        res, "shippingAddress";
        if (res.status === 200 || res.status === 201) {
          setDeliveryCharge(res.data);
        }
      } catch (error) {
        console.error("Error fetching delivery charge:", error);
      }
    };

    if (shippingAddress) {
      fetchDeliveryCharge();
    }
  }, [axiosPublic, shippingAddress]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await axiosPublic.get("discount");

      if (response?.data) {
        setDiscounts(response?.data?.data[0]);
      }
    };
    fetchDiscounts();
  }, [axiosPublic]);

  const discount = calculateDiscounts(
    cartItems,
    discounts,
    discounts?.promoCode === userCouponCode
  )?.totalDiscount;

  // store_id: item.store_id,
  //     merchant_order_id: generateInvoiceId(),
  //     recipient_name: data.name,
  //     recipient_phone: data.contact_number,
  //     recipient_secondary_phone: data.secondary_contact,
  //     recipient_address: data.address,
  //     recipient_city: data.city_id,
  //     recipient_zone: data.zone_id,
  //     recipient_area: data.area_id,
  //     delivery_type: 48,
  //     is_point_delivery: false,
  //     item_type: 2,
  //     special_instruction: data.special_instruction,
  //     item_quantity: item.itemCount,
  //     item_weight: item.weight,
  //     item_description: item.itemDescription,
  //     amount_to_collect: item.total,

  // const submitOrder = async () => {
  //   const submitOrderData = {
  //     recipient_name: shippingAddress.name,
  //     recipient_phone: shippingAddress.contact_number,
  //     recipient_secondary_phone: shippingAddress.secondary_contact,
  //     recipient_address: shippingAddress.address,
  //     recipient_city: shippingAddress.city_id,
  //     recipient_zone: shippingAddress.zone_id,
  //     recipient_area: shippingAddress.area_id,
  //     special_instruction: shippingAddress.special_instruction,
  //     items: items,
  //     payment_method: "cash",
  //     total: totalPrice,
  //   };
  //   try {
  //     const response = await axiosSecure.post("/orders", submitOrderData);
  //     (response);

  //     if (response.data.success) {
  //       return router("/success");
  //     }

  //     Swal.fire({
  //       title: "Error",
  //       text: response.data.message,
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   } catch (error) {
  //     (error);
  //     Swal.fire({
  //       title: "Error",
  //       text: error.message,
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   }
  // };

  useEffect(() => {
    if (discounts?.promoCode === userCouponCode) {
      toast.success("Coupon Code Applied");
    }
  }, [discounts?.promoCode, userCouponCode]);

  const submitOrder = async () => {
    totalPrice, deliveryCharge?.charge, discount, "submitOrder";
    const deliveryChargeNum = deliveryCharge?.charge | 0;
    const discountNum = discount | 0;
    const submitOrderData = {
      name: shippingAddress?.recipientName,
      phone: shippingAddress?.contact_number,
      // secondary_phone: shippingAddress.secondaryContactNumber,
      address: shippingAddress?.address,
      city_id: shippingAddress?.city_id,
      city_name: shippingAddress?.city_name,
      zone_id: shippingAddress?.zone_id,
      area_id: shippingAddress?.area_id,
      area_name: shippingAddress?.area_name,
      special_instruction: shippingAddress?.special_instruction,
      items: cartItems,
      payment_method: "cash",
      total:
        Number(totalPrice) + Number(deliveryChargeNum) - Number(discountNum),
      // courierMethod: courierMethod,
      itemCount: cartItems?.length,
      discount: discount,
      itemPerDiscount: totalCartDiscount,
      deliveryCharge: deliveryChargeNum || 0,
      coupon: discounts?.promoCode,
      userId: user?._id || "",
      totalItems: totalItems,
      order_date: moment().format("DD/MM/YYYY"),
      email: user?.email || "",
    };

    router("/payment_page", {
      state: {
        order: submitOrderData,
      },
    });
  };

  deliveryCharge, shippingAddress, "deliveryCharge";
  return (
    <>
      <div className="border p-6 md:mt-auto rounded-md shadow-lg w-full mt-6  md:max-w-[350px]">
        <h2 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-300 text-nowrap">
          Order Summary
        </h2>

        {discounts.promoCodeActive && (
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <input
              type="text"
              className="input input-bordered w-full"
              value={userCouponCode}
              onChange={(e) => setUserCouponCode(e.target.value)}
              placeholder="Enter Coupon Code"
            />
          </div>
        )}
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Per-Product Total Discount</span>
          <span className="font-medium text-red-400">-{totalCartDiscount}</span>
        </div>
        <div className="flex mt-2 justify-between text-sm text-gray-500 mt-2">
          <p className="">Discounts</p>
          <span className=" text-red-400">-{discount}</span>
        </div>
        <div className="flex mt-2 justify-between text-sm text-gray-500 mt-2">
          <p className="">Shipping</p>
          <span className="">৳{deliveryCharge?.charge || 0}</span>
        </div>
        <div className="flex mt-3  items-center justify-between text-sm text-gray-500">
          <b className="font-bold text-lg">Total</b>
          <span className="font-medium">
            ৳
            {deliveryCharge?.charge
              ? totalPrice + Number(deliveryCharge?.charge) - discount
              : totalPrice - discount}
          </span>
        </div>

        {isCart ? (
          <Link to="/checkout">
            <button className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-md mt-4 w-full">
              Proceed to Checkout
            </button>
          </Link>
        ) : (
          <button
            // onClick={() => setIsShowPaymentMethod(true)}
            onClick={submitOrder}
            className="bg-green-500 text-white text-sm py-2 px-4 rounded-md mt-4 disabled:bg-gray-200 disabled:text-black w-full"
            disabled={shippingAddress && cartItems.length > 0 ? false : true}
          >
            Go To Payment
          </button>
        )}
      </div>

      <BgBlurModal
        isShowModal={isShowPaymentMethod}
        setIsShowModal={setIsShowPaymentMethod}
      >
        <PaymentMethodModal
          setIsShowPaymentMethod={setIsShowPaymentMethod}
          isShowPaymentMethod={isShowPaymentMethod}
          courierMethod={courierMethod}
          shippingAddress={shippingAddress}
          cartItems={cartItems}
          discount={discount}
          itemPerDiscount={totalCartDiscount}
          totalPrice={totalPrice}
          deliveryCharge={deliveryCharge}
          coupon={discounts?.promoCode}
        />
      </BgBlurModal>
    </>
  );
}
