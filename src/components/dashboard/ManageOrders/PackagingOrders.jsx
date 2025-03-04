import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useGetAllOrders from "../../../Hook/GetDataHook/useGetAllOrders";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import OrderDetail from "./OrderDetail";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { IoIosSearch, IoMdPrint } from "react-icons/io";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";
import Pagination from "../../partial/Pagination/Pagination";
import CourierMethodModal from "../../../shared/cart/viewCart/CourierMethodModal";
import useDebounce from "../../../Hook/useDebounce";
import moment from "moment";
import ShowDetailButton from "../../../components library/ShowDetailButton";
import PrintTemplate from "../../../config/PrintTemplate/PrintTemplate";
import PrintA4Template from "../../../config/PrintTemplate/PrintA4Template";
import { FaPrint } from "react-icons/fa";

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

export default function ApprovedOrders() {
  // const [orders, setOrders] = useState(initialData);
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 15;

  const [isShowDetail, setIsShowDetail] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowCourier, setIsShowCourier] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const debouncedValue = useDebounce(searchTerm, 200);
  const [isShowPrint, setIsShowPrint] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [isShowPrintA4, setIsShowPrintA4] = useState(false);

  const { orders, totalItems, isLoading } = useGetAllOrders({
    query: `status=Packaging&currentPage=${currentPage}&limit=${itemsPerPage}&search=${debouncedValue}`,
    isDeleted,
    isShowModal: isShowDetail,
    isEdited: isEdited,
  });

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

  const handleAccept = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Send this order to courier?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#087D6D",
      cancelButtonColor: "#E68923",
      confirmButtonText: "Yes, Send it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTargetId(id);
        setIsShowCourier(true);
      }
    });
  };
  const addWeight = (id) => {
    Swal.fire({
      title: "Enter Total Weight (Kg)",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
        type: "number",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: async (value) => {
        try {
          const res = await axiosSecure.put(`/orders/add_weight/${id}`, {
            totalWeight: value,
          });
          if (res.status === 200 || res.status === 201) {
            toast.success("Order Weight added successfully!");
            setIsEdited((prev) => !prev);
            return { value, isConfirmed: true };
          } else {
            toast.error("Error adding weight!");
            return { value, isConfirmed: false };
          }
        } catch (error) {
          console.error("Error updating status:", error);
          toast.error("Error adding weight!");
          return { value, isConfirmed: false };
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Modified Weight to (${result.value.value}) Kg`,
          // imageUrl: result.value.avatar_url,
        });
      }
    });
  };

  return (
    <div className="p-6 pt-0">
      <div className="max-w-7xl mx-auto min-h-[800px]">
        <h1 className="text-3xl font-semibold mb-9">Packaging Orders</h1>
        <div className="bg-white border mb-4 rounded-full px-3 col-span-3  md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            className="outline-none w-full bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search here ..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>

        {/* Search Input */}

        {/* Orders Table */}
        <table className="min-w-full  table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Order Date</td>
              <td className="p-2 border">Name</td>
              <td className="p-2 border">Phone</td>
              <td className="p-2 border">Quantity</td>
              <td className="p-2 border">Payment</td>
              <td className="p-2 border">Total Weight</td>
              <td className="p-2 border">Total</td>
              <td className="p-2 border">Action</td>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 &&
              !isLoading &&
              orders?.map((order, index) => (
                <tr key={order._id} className="text-center border-b">
                  <td className="p-2 border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-2 border">
                    {moment(order.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="p-2 border">{order?.name}</td>
                  <td className="p-2 border">{order?.phone}</td>
                  <td className="p-2 border">{order?.totalItems}</td>

                  <td className="p-2 border">{order?.payment_method}</td>
                  <td className="p-2 border">{order?.totalWeight || 0} Kg</td>
                  <td className="p-2 border">৳ {order?.total}</td>
                  <td className="p-2 border">
                    <div className="flex justify-center space-x-2">
                      <ShowDetailButton
                        onClick={() => {
                          setIsShowDetail(true);
                          setTargetId(order._id);
                        }}
                      ></ShowDetailButton>
                      <DeleteButton onClick={() => handleDelete(order._id)}>
                        {" "}
                      </DeleteButton>
                      <button
                        onClick={() => {
                          setIsShowPrint(true);
                          setSingleData(order);
                        }}
                        className="customAddButton rounded-lg px-4 py-2 font-semibold "
                      >
                        <FaPrint />
                      </button>
                      <button
                        onClick={() => {
                          setIsShowPrintA4(true);
                          setSingleData(order);
                        }}
                        className="customAddButton rounded-lg px-4 py-2 font-semibold "
                      >
                        <IoMdPrint />
                      </button>
                      <button
                        onClick={() => addWeight(order._id)}
                        className="customAddButton rounded-lg px-4 py-2 font-semibold "
                      >
                        Add Weight
                      </button>
                      <button
                        onClick={() => handleAccept(order._id)}
                        className="bg-green-600 text-white rounded-lg px-4 py-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!order?.totalWeight}
                      >
                        Send To Courier
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
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          limit={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <BgBlurModal isShowModal={isShowPrint} setIsShowModal={setIsShowPrint}>
        <PrintTemplate setIsShowPrint={setIsShowPrint} data={singleData} />
      </BgBlurModal>

      <BgBlurModal
        isShowModal={isShowPrintA4}
        setIsShowModal={setIsShowPrintA4}
      >
        <PrintA4Template setIsShowPrint={setIsShowPrintA4} data={singleData} />
      </BgBlurModal>
      <BgBlurModal isShowModal={isShowDetail} setIsShowModal={setIsShowDetail}>
        <OrderDetail
          id={targetId}
          isShow={isShowDetail}
          setIsShow={setIsShowDetail}
        />
      </BgBlurModal>
      <BgBlurModal
        isShowModal={isShowCourier}
        setIsShowModal={setIsShowCourier}
      >
        <CourierMethodModal
          setIsShow={setIsShowCourier}
          targetId={targetId}
          setIsEdited={setIsEdited}
        />
      </BgBlurModal>
    </div>
  );
}
