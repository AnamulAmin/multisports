import { useState } from "react";

import useGetAllOrders from "../../../Hook/GetDataHook/useGetAllOrders";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import OrderDetail from "./OrderDetail";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { IoIosSearch } from "react-icons/io";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";
import Pagination from "../../partial/Pagination/Pagination";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useDebounce from "../../../Hook/useDebounce";
import ShowDetailButton from "../../../components library/ShowDetailButton";
import moment from "moment";

export default function PersonalizedOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const debouncedValue = useDebounce(searchTerm, 200);
  const itemsPerPage = 15;

  const { orders, totalItems, isLoading } = useGetAllOrders({
    query: `status=Packed&currentPage=${currentPage}&limit=${itemsPerPage}&search=${debouncedValue}`,
    isDeleted,
    isShowModal: isShowDetail,
    isEdited: isEdited,
  });
  const axiosSecure = useAxiosSecure();

  // Filter orders based on the search term

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
      text: "You want to Deliver this order to courier?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#087D6D",
      cancelButtonColor: "#E68923",
      confirmButtonText: "Yes, Deliver it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.put(`/orders/update/${id}`, {
            status: "DeliveredToCourier",
          });
          toast.success("Order status updated successfully!");
          setIsEdited((prev) => !prev);
        } catch (error) {
          console.error("Error updating status:", error);
        }
      }
    });
  };

  return (
    <div className="p-6 pt-0 ">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl font-semibold mb-9">Ready To Courier </h1>

        {/* Orders Table */}
        {/* Search Input */}
        <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            className="outline-none w-full bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search here ..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>

        {/* Orders Table */}
        <table className="min-w-full  table-auto border-collapse bg-white  rounded-md">
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
            {orders.length > 0 &&
              !isLoading &&
              orders.map((order, index) => (
                <tr key={order._id} className="border-b text-center">
                  <td className="p-2 border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-2 border">
                    {moment(order?.createdAt).format("DD-MM-YYYY")}
                  </td>
                  <td className="p-2 border">{order?.name}</td>
                  <td className="p-2 border">{order?.phone}</td>
                  <td className="p-2 border">{order?.totalItems}</td>
                  <td className="p-2 border ">
                    <span className="bg-red-500 text-white  px-3 rounded-lg  py-1">
                      {order?.status}
                    </span>
                  </td>
                  <td className="p-2 border">{order?.payment_method}</td>
                  <td className="p-2 border">৳ {order?.total}</td>
                  <td className="p-2 border">
                    <div className="flex justify-center space-x-2">
                      <ShowDetailButton
                        onClick={() => {
                          setIsShowDetail(true);
                          setTargetId(order._id);
                        }}
                      ></ShowDetailButton>
                      <DeleteButton
                        onClick={() => handleDelete(order._id)}
                      ></DeleteButton>
                      <button
                        onClick={() => handleAccept(order._id)}
                        className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold"
                      >
                        Delivery To Courier
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {!isLoading && orders?.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        limit={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <BgBlurModal isShowModal={isShowDetail} setIsShowModal={setIsShowDetail}>
        <OrderDetail
          id={targetId}
          isShow={isShowDetail}
          setIsShow={setIsShowDetail}
        />
      </BgBlurModal>
    </div>
  );
}
