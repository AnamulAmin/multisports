import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import CustomImage from "../../../shared/ImageComponents/CustomImage";
import GlobalLoading from "../../../components library/GlobalLoading";
import toast from "react-hot-toast";

export default function OrderDetail({
  id,
  isShow,
  setIsShow,
  isStatus = true,
}) {
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [orderDetail, setOrderDetail] = useState([]);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosSecure.get(`/orders/single/${id}`);
        setOrder(res?.data?.data);
        setStatus(res?.data?.data?.status);
      } catch (error) {
        toast.error("Failed to fetch order details. Please try again later.");
        console.error("Error fetching order:", error);
      }
    };

    if (id) fetchOrder();
  }, [id, isShow]);

  // Update order status
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await axiosSecure.put(`/orders/${id}`, { status: newStatus });
      toast.success("Order status updated successfully!");
      setIsShow(false);
    } catch (error) {
      toast.error("Failed to update order status. Please try again.");
      console.error("Error updating status:", error);
    }
  };

  // Process order details for rendering
  useEffect(() => {
    if (!order) return;

    const details = Object.entries(order)
      .filter(
        ([key]) =>
          !["_id", "__v", "items", "city_id", "zone_id", "area_id"].includes(
            key
          )
      )
      .map(([key, value]) => ({
        name: key,
        value,
      }));
    setOrderDetail(details);
  }, [order]);

  // Render Loading Spinner
  if (!order) {
    return <GlobalLoading />;
  }

  // Render the UI
  return (
    <div className="w-full h-[85vh] overflow-auto mt-6 mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Order Details
      </h2>

      {/* Order Info */}
      <div className="p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col gap-2">
        {orderDetail.map((item, index) => (
          <p
            className={`flex justify-between items-center gap-3 text-gray-700 ${
              ["status", "courier_status"].includes(item.name)
                ? "bg-green-100"
                : "bg-gray-100"
            } hover:bg-gray-200 px-2 py-1 rounded-md`}
            key={index}
          >
            <strong className="capitalize">{formatLabel(item.name)}:</strong>
            <span
              className={`${
                ["status", "courier_status"].includes(item.name)
                  ? "font-bold text-yellow-600"
                  : "bg-gray-100"
              }`}
            >
              {["createdAt", "updatedAt"].includes(item.name)
                ? moment(item.value).format("MMMM Do YYYY, h:mm:ss a")
                : formatCurrency(item.name, item.value)}
            </span>
          </p>
        ))}

        {/* {isStatus && (
          <div className="flex justify-between items-center mt-4">
            <strong>Status:</strong>
            <select
              value={status}
              onChange={handleStatusChange}
              className="ml-4 border-gray-300 rounded-md p-1 text-sm outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        )} */}
      </div>

      {/* Products */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Products</h3>
        <div className="grid gap-6">
          {order.items.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper to format labels
const formatLabel = (label) =>
  label
    .replace(/([A-Z])/g, " $1")
    .replaceAll("_", " ")
    .toLowerCase();

// Helper to format currency values
const formatCurrency = (key, value) => {
  const currencyFields = [
    "deliveryCharge",
    "itemPerDiscount",
    "discount",
    "total",
  ];
  return currencyFields.includes(key) ? `৳${value}` : value;
};

// Product Card Component
const ProductCard = ({ product }) => (
  <div className="border rounded-lg p-4 flex gap-4 items-start shadow-sm bg-white hover:shadow-md transition-shadow">
    <div className="relative w-[100px] h-[100px] rounded-md overflow-hidden">
      <CustomImage
        imageKey={product?.thumbnail}
        alt="Product Image"
        className="object-cover w-full h-full"
        width={200}
        height={200}
      />
    </div>
    <div className="flex-1">
      <p className="mb-2 text-gray-800">
        <strong>Product Name:</strong> {product?.productTitle}
      </p>
      <p className="mb-2 text-gray-600">
        <strong>Color:</strong>{" "}
        <span
          className="inline-block w-6 h-4 rounded-sm"
          style={{ background: product?.color }}
        ></span>
      </p>
      <p className="mb-2 text-gray-600">
        <strong>Size:</strong> {product?.size || "N/A"}
      </p>
      <p className="mb-2 text-gray-600">
        <strong>Quantity:</strong> {product?.quantity}
      </p>
      <p className="text-gray-700 font-semibold">
        <strong>Price:</strong> ৳{product?.price}
      </p>
      <p className="text-gray-700 font-semibold">
        <strong>Discount Price:</strong> ৳{product?.discountPrice}
      </p>
      <p className="text-gray-700 font-bold">
        <strong>Subtotal:</strong> ৳{product?.price * product?.quantity}
      </p>
    </div>
  </div>
);
