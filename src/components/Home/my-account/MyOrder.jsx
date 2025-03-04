import { useState, useEffect } from "react";
import moment from "moment";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import CustomImage from "../../../shared/ImageComponents/CustomImage";
import GlobalLoading from "../../../components library/GlobalLoading";

import { useParams } from "react-router-dom";

export default function MyOrder() {
  const axiosSecure = useAxiosSecure();
  const id = useParams()?.id;

  const [order, setOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosSecure.get(`/orders/single/${id}`);
        setOrder(res?.data?.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (id) fetchOrder();
  }, [axiosSecure, id]);

  useEffect(() => {
    if (!order) return;
    const newArrayData = Object.entries(order).map(([key, value]) => ({
      name: key,
      value: value == "DeliveredToCourier" ? "Delivered to Courier" : value,
    }));
    const excludedFields = ["items", "_id", "__v"];
    setOrderDetail(
      newArrayData.filter((item) => !excludedFields.includes(item.name))
    );
  }, [order]);

  const formatPropertyName = (name) => {
    return name
      .replace(/([A-Z])/g, " $1")
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatCurrency = (name, value) => {
    const currencyFields = [
      "deliveryCharge",
      "itemPerDiscount",
      "discount",
      "total",
    ];
    const symbol = currencyFields.includes(name) ? "৳" : "";
    return `${symbol}${value}`;
  };

  if (!order) return <GlobalLoading />;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Page Header */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Order Summary
      </h2>

      {/* Order Details */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
          Order Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderDetail.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col  p-4 rounded-lg shadow-sm ${
                item.name == "status" ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <strong className="text-sm text-gray-500 uppercase">
                {formatPropertyName(item.name)}
              </strong>
              <span
                className={`text-lg font-medium  ${
                  item.name == "status" ? "text-green-700" : "text-gray-700"
                }`}
              >
                {item.name.includes("At")
                  ? moment(item.value).format("MMMM Do YYYY, h:mm:ss a")
                  : formatCurrency(item.name, item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
          Ordered Products
        </h3>
        {order?.items.map((product, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <div className="w-full sm:w-1/4 h-48 bg-gray-100 rounded-lg overflow-hidden">
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
              <p className="text-lg font-medium text-gray-800 mb-2">
                {product?.productTitle}
              </p>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Color:</strong>{" "}
                  <span
                    className="inline-block w-5 h-5 rounded-full"
                    style={{ backgroundColor: product?.color }}
                  ></span>{" "}
                  {product?.colorName || "N/A"}
                </p>
                <p>
                  <strong>Size:</strong> {product?.size || "N/A"}
                </p>
                <p>
                  <strong>Quantity:</strong> {product?.quantity}
                </p>
                <p>
                  <strong>Price:</strong> ৳{product?.price}
                </p>
                <p>
                  <strong>Discount Price:</strong> ৳{product?.discountPrice}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  <strong>Subtotal:</strong> ৳
                  {product?.price * product?.quantity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
