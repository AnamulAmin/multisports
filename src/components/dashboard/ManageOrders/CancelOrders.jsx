import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useGetAllOrders from "../../../Hook/GetDataHook/useGetAllOrders";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import OrderDetail from "./OrderDetail";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { IoIosSearch } from "react-icons/io";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";
import Pagination from "../../partial/Pagination/Pagination";
import ShowDetailButton from "../../../components library/ShowDetailButton";

// Sample pending orders data (could be fetched from API)
const initialData = [
  {
    id: 1,
    orderNo: "ORD12345",
    orderDate: "2024-09-25",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    status: "Pending",
    payment: "Unpaid",
    total: 1500,
  },
  {
    id: 2,
    orderNo: "ORD12346",
    orderDate: "2024-09-26",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "0987654321",
    status: "Pending",
    payment: "Unpaid",
    total: 2500,
  },
  // Add more pending order data if needed
];

export default function CancelOrders() {
  // const [orders, setOrders] = useState(initialData);
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const [isShowDetail, setIsShowDetail] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const { orders, totalItems, isLoading } = useGetAllOrders({
    query: `status=Cancelled&currentPage=${currentPage}&limit=${itemsPerPage}`,
    isDeleted,
    isShowModal: isShowDetail,
  });

  // Filter orders based on the search term
  let filteredOrders = orders;

  useEffect(() => {
    if (searchTerm === "") {
      // setOrders(orders);
      return;
    }
    filteredOrders = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // setData(filteredOrders);
  }, [orders, searchTerm]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  return (
    <div className="p-6 pt-0">
      <div className="max-w-7xl mx-auto min-h-[800px]">
        <h1 className="text-3xl font-semibold mb-9">Canceled Orders</h1>

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
        <table className="min-w-full  table-auto border-collapse bg-white shadow-md rounded-md">
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
            {orders?.length > 0 &&
              !isLoading &&
              orders?.map((order, index) => (
                <tr key={order._id} className="border-b text-center">
                  <td className="p-2 border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-2 border">{order.createdAt}</td>
                  <td className="p-2 border">{order?.name}</td>
                  <td className="p-2 border">{order?.phone}</td>
                  <td className="p-2 border">{order?.totalItems}</td>
                  <td className="p-2 border">{order?.status}</td>
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
      </div>
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
