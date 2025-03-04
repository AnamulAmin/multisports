import { useState, useEffect } from "react";
import moment from "moment";
import { baseImageUrl } from "../../../../apis/apis";

export default function CustomerDetail({
  id,
  isShow,
  setIsShow,
  isStatus = true,
  singleData,
}) {
  // const axiosSecure = useAxiosSecure();
  const [customer, setCustomer] = useState(null);
  const [status, setStatus] = useState("");
  const [customerDetail, setCustomerDetail] = useState([]);

  // Fetch customer details
  useEffect(() => {
    // const fetchcustomer = async () => {
    //   try {
    //     const res = await axiosSecure.get(`/users/system-user/${id}`);
    //     setCustomer(res?.data?.data);
    //     setStatus(res?.data?.data?.status);
    //   } catch (error) {
    //     toast.error(
    //       "Failed to fetch customer details. Please try again later."
    //     );
    //     console.error("Error fetching customer:", error);
    //   }
    // };

    // if (id) fetchcustomer();

    setCustomer(singleData);
  }, [id, isShow, singleData]);

  // Process customer details for rendering
  useEffect(() => {
    if (!customer) return;

    const details = Object.entries(customer)
      .filter(
        ([key]) => !["_id", "__v", "register_date", "password"].includes(key)
      )
      .map(([key, value]) => ({
        name: key,
        value,
      }));
    setCustomerDetail(details);
  }, [customer]);

  // Render the UI
  return (
    <div className="w-full  overflow-auto mt-6 mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Customer Details
      </h2>

      <div className="avatar w-full flex items-center justify-center mb-5 ">
        <div className="w-24 rounded border-2 ">
          <img
            src={
              customer?.photourl
                ? `${baseImageUrl}/${customer.photourl}`
                : "/no-image.png"
            }
          />
        </div>
      </div>

      {/* customer Info */}
      <div className="p-4 bcustomer rounded-lg shadow-sm bg-gray-50 flex flex-col gap-2">
        {customerDetail.map((item, index) => (
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
              className="ml-4 bcustomer-gray-300 rounded-md p-1 text-sm outline-none"
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
