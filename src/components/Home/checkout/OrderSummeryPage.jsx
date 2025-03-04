import { useState, useEffect, useContext } from "react";
import moment from "moment";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import CustomImage from "../../../shared/ImageComponents/CustomImage";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import Category from "../Category/Category";

export default function OrderSummeryPage() {
  const axiosSecure = useAxiosSecure();
  const id = useParams()?.id;
  const location = useLocation();
  const router = useNavigate();
  const {
    cartItems,
    setCartItems,
    totalPrice,
    totalCartDiscount,
    user,
    totalItems,
  } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);

  location, "location in ordersummery";

  useEffect(() => {
    // const fetchOrder = async () => {
    //   try {
    //     const res = await axiosSecure.get(`/orders/single/${id}`);
    //     setOrder(res?.data?.data);
    //     setStatus(res?.data?.data?.status);
    //   } catch (error) {
    //     console.error("Error fetching order:", error);
    //   }
    // };

    // if (id) {
    //   fetchOrder();
    // }

    setOrder(location?.state?.order);
  }, [axiosSecure, id, location]);

  const handlePropertyName = (name) => {
    switch (name) {
      case "deliveryCharge":
        return "Delivery Charge";
      case "itemPerDiscount":
        return "Item Discount";
      case "createdAt":
        return "Order Placed";
      case "totalItems":
        return "Total Items";
      case "updatedAt":
        return "Last Updated";
      default:
        return name.replaceAll("_", " ");
    }
  };

  const handleSetCurrencySymbol = (name) => {
    switch (name) {
      case "deliveryCharge":
      case "itemPerDiscount":
      case "discount":
      case "total":
        return "৳";
      default:
        return "";
    }
  };

  // useEffect(() => {
  //   if (!order) return;
  //   const newArrayData = Object.entries(order).map(([key, value]) => ({
  //     name: key,
  //     value,
  //   }));
  //   const itemIndex = newArrayData.findIndex((item) => item.name === "items");
  //   const _idIndex = newArrayData.findIndex((item) => item.name === "_id");
  //   const _vIndex = newArrayData.findIndex((item) => item.name === "__v");

  //   delete newArrayData[itemIndex];
  //   delete newArrayData[_idIndex];
  //   delete newArrayData[_vIndex];

  //   setOrderDetail(newArrayData);
  // }, [order]);

  useEffect(() => {
    if (!order) return;

    const filteredOrderData = Object.entries(order)
      .filter(
        ([key]) =>
          ![
            "items",
            "_id",
            "__v",
            "city_id",
            "zone_id",
            "area_id",
            "userId",
          ].includes(key)
      ) // Filter out unwanted keys
      .map(([key, value]) => ({ name: key, value })); // Map the remaining key-value pairs to the desired structure

    setOrderDetail(filteredOrderData);
  }, [order]);

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

    try {
      const response = await axiosSecure.post(
        "/orders",
        location?.state?.order
      );
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
        return router(`/success`, {
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
    }
  };

  return (
    <div className="w-full mx-auto mt-8 max-w-5xl p-6 bg-gray-50 shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-9">
        <h2 className="text-4xl font-bold text-center text-gray-800 ">
          🛒 Order Summary
        </h2>
        <button
          disabled={!order}
          onClick={submitOrder}
          className="bg-black text-white text-sm font-bold py-2 mt-4 px-10 rounded-lg hover:bg-white hover:text-black border-black border transition duration-300"
        >
          Place Order
        </button>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">
        {orderDetail.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b gap-4 pb-3 mb-3"
          >
            <span className="text-gray-600 capitalize font-bold ">
              {handlePropertyName(item.name)}
            </span>

            <span
              className={`font-bold ${
                item.name === "status"
                  ? "text-blue-600 uppercase"
                  : "text-gray-800"
              }`}
            >
              {handleSetCurrencySymbol(item.name)}
              {item.name === "createdAt" || item.name === "updatedAt"
                ? moment(item.value).format("MMMM Do YYYY, h:mm:ss a")
                : item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Products */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          🛍️ Ordered Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {order?.items.map((product, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-xl transition-shadow flex flex-col"
            >
              {/* Product Image */}
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <CustomImage
                  imageKey={product?.thumbnail}
                  alt="Product image"
                  className="object-cover w-full h-full"
                  width={300}
                  height={300}
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">
                  {product?.productTitle}
                </p>
                <p className="text-sm text-gray-500">
                  Color:{" "}
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ background: product?.color }}
                  ></span>{" "}
                  ({product?.colorName || "N/A"})
                </p>
                <p className="text-sm text-gray-500">
                  Size: {product?.size || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {product?.quantity}
                </p>
                <p className="text-lg text-green-600 font-bold mt-2">
                  Price: ৳{product?.price}
                </p>
                <p className="text-sm text-gray-500">
                  Discounted Price: ৳{product?.discountPrice}
                </p>
                <p className="text-lg text-gray-700 font-bold mt-1">
                  Subtotal: ৳{product?.price * product?.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
