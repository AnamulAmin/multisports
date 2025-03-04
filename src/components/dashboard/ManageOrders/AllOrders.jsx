import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import useGetAllOrders from "../../../Hook/GetDataHook/useGetAllOrders";
import { useEffect, useState } from "react";
import OrderDetail from "./OrderDetail";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import DeleteButton from "../../../components library/DeleteButton";
import CourierMethodModal from "../../../shared/cart/viewCart/CourierMethodModal";
import Pagination from "../../partial/Pagination/Pagination";
import SelectInput from "../../partial/Headers/FilterHeader/SelectInput/SelectInput";
import moment from "moment";
import useDebounce from "../../../Hook/useDebounce";
import ShowDetailButton from "../../../components library/ShowDetailButton";
import { Loader2 } from "lucide-react";

export default function AllOrders() {
  // const [orders, setOrders] = useState(initialData);
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);
  const [isShowCourier, setIsShowCourier] = useState(false);
  const [courierMethod, setSetCourierMethod] = useState("");
  const [date, setDate] = useState("");
  const itemsPerPage = 15;
  const [status, setStatus] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const debouncedValue = useDebounce(searchTerm, 200);
  const [orderData, setOrderData] = useState([]);

  const { orders, totalItems, totalPricesByStatus, isLoading } =
    useGetAllOrders({
      isDeleted,
      isShowModal: isShowDetail,
      isEdited: isEdited,
      query: `currentPage=${currentPage}&status=${status}&limit=${itemsPerPage}&search=${debouncedValue}&date=${
        date ? moment(date).format("DD-MM-YYYY") : ""
      }`,
      currentPage,
    });

  useEffect(() => {
    setOrderData(orders);
  }, [orders]);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure you want to delete this?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axiosSecure.delete(`/orders/${id}`);

            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);
              toast.success("Order deleted successfully!");
            }
          } catch (error) {
            toast.error("Error deleting Item!");
          }
        }
      });
    } catch (error) {
      toast.error("Error deleting category!");
    }
  };

  const handleAccept = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to accept this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#087D6D",
      cancelButtonColor: "#E68923",
      confirmButtonText: "Yes, Accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.put(`/orders/update/${id}`, {
            status: "Packaging",
          });
          toast.success("Order status updated successfully!");
          setIsEdited((prev) => !prev);
        } catch (error) {
          console.error("Error updating status:", error);
        }
      }
    });
  };

  const handleReset = () => {
    setDate("");
    setStatus("");
    setSearchTerm("");
  };

  return (
    <div className="p-6 pt-0">
      <div className="max-w-7xl mx-auto min-h-[800px]">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#087D6D] p-6 text-white font-semibold  rounded-2xl">
            <h3 className="text-xl ">Total Delivered Orders</h3>
            <p className="text-2xl mt-2">
              ৳ {totalPricesByStatus?.DeliveredToCourier}
            </p>
            {/* <p className="text-2xl mt-2">৳ 0</p> */}
          </div>

          <div className="bg-[#E68923] p-6 text-white font-semibold  rounded-2xl">
            <h3 className="text-xl ">Total Pending Orders</h3>
            <p className="text-2xl mt-2">৳ {totalPricesByStatus?.Pending}</p>
            {/* <p className="text-2xl mt-2">৳ 0</p> */}
          </div>

          <div className="bg-[#31B349] p-6 text-white font-semibold  rounded-2xl">
            <h3 className="text-xl ">Total Approved Orders</h3>
            <p className="text-2xl mt-2">৳ {totalPricesByStatus?.Packaging}</p>
            {/* <p className="text-2xl mt-2">৳ 0</p> */}
          </div>

          <div className="bg-[#EB1C24] p-6 text-white font-semibold  rounded-2xl">
            <h3 className="text-xl ">Total Cancelled Orders</h3>
            <p className="text-2xl mt-2">৳ {totalPricesByStatus?.Cancelled}</p>
            {/* <p className="text-2xl mt-2">৳ 0</p> */}
          </div>
        </div>

        {/* Search Input */}
        <div className="grid grid-cols-3  items-stretch gap-4 mb-5">
          <div className="bg-white border rounded-full px-3  md:gap-2 gap-1 flex-row-reverse justify-between flex items-center">
            <input
              type="text"
              className="outline-none w-full bg-white"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Name/Phone/Order No"
            />
            <IoIosSearch className="text-2xl text-gray-400" />
          </div>
          <div>
            <SelectInput onChange={(e) => setStatus(e.target.value)}>
              <option value="" className="text-gray-400">
                Select Order Status
              </option>
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Packaging">Packaging</option>
              <option value="Packed">Send To Courier</option>
              <option value="DeliveredToCourier">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </SelectInput>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="date"
              placeholder="Date"
              className="input input-bordered w-full"
              onChange={(e) => setDate(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <table className="min-w-full table-auto border-collapse bg-white  rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Order Date</td>
              <td className="p-2 border">Name</td>
              <td className="p-2 border">Phone</td>
              <td className="p-2 border">Quantity</td>
              <td className="p-2 border">Status</td>
              <td className="p-2 border">Payment</td>
              <td className="p-2 border">Total</td>
              <td className="p-2 border">Action</td>
            </tr>
          </thead>
          <tbody>
            {orderData?.length > 0 &&
              !isLoading &&
              orderData.map((order, index) => {
                let statusColor = "";
                switch (order.status) {
                  case "Pending":
                    statusColor = "bg-yellow-500";
                    break;
                  case "Packaging":
                    statusColor = "bg-green-500";
                    break;
                  case "Packed":
                    statusColor = "bg-red-500";
                    break;
                  case "DeliveredToCourier":
                    statusColor = "bg-gray-500";
                    break;

                  case "Delivered":
                    statusColor = "bg-blue-500";
                    break;

                  case "completed":
                    statusColor = "bg-green-500";
                    break;

                  case "Cancelled":
                    statusColor = "bg-gray-500";
                    break;

                  default:
                    break;
                }

                return (
                  <tr key={order._id} className="border-b text-center">
                    <td className="p-2 border">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>

                    <td className="p-2 border">
                      {moment(order.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="p-2 border">{order?.name}</td>
                    <td className="p-2 border">{order?.phone}</td>
                    <td className="p-2 border">{order?.totalItems}</td>
                    <td className="p-2 border ">
                      {order?.status ? (
                        <span
                          className={`${statusColor} text-white  px-3 rounded-lg  py-1`}
                        >
                          {order?.status}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-2 border">{order?.payment_method}</td>
                    <td className="p-2 border">৳ {order?.total}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center space-x-2">
                        {(order?.status === "Pending" ||
                          order?.status === "") && (
                          <button
                            onClick={() => handleAccept(order._id)}
                            className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold"
                          >
                            Accept Order
                          </button>
                        )}
                        <ShowDetailButton
                          onClick={() => {
                            setIsShowDetail(true);
                            setTargetId(order._id);
                          }}
                        />

                        <DeleteButton onClick={() => handleDelete(order._id)} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            {!isLoading && orderData?.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
            <div className="h-4 bg-gray-300 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-300 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-4 bg-gray-200 mb-6 rounded"></div>
          </div>
        ) : null}

        {/* Pagination */}
        {/* <div className="mt-4 flex justify-between">
          <span>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
            {filteredOrders.length} entries
          </span>
          <div className="flex space-x-2">
            {Array.from(
              { length: Math.ceil(filteredOrders.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div> */}
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          limit={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <BgBlurModal isShowModal={isShowDetail} setIsShowModal={setIsShowDetail}>
        <OrderDetail
          id={targetId}
          isShow={isShowDetail}
          setIsShow={setIsShowDetail}
          isStatus={false}
        />
      </BgBlurModal>

      <BgBlurModal
        isShowModal={isShowCourier}
        setIsShowModal={setIsShowCourier}
      >
        <CourierMethodModal
          setCourierMethod={setSetCourierMethod}
          setIsShowPaymentMethod={setIsShowPaymentMethod}
          setIsShow={setIsShowCourier}
          targetId={targetId}
        />
      </BgBlurModal>
    </div>
  );
}
