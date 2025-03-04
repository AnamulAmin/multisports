import { useState, useEffect, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "../../../shared/Modal/Modal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import CreateProductColorForm from "./Forms/CreateProductColorForm";
import EditProductColorForm from "./Forms/EditProductColorForm";
import useGetAllProductColors from "../../../Hook/GetDataHook/useGetAllProductColors";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import TableSkeleton from "../../../components library/TableSkeleton";
import { IoAddCircle } from "react-icons/io5";
import { FaRetweet } from "react-icons/fa6";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";
import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";
import Mpagination from "../../../shared/Mpagination";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";

const ProductColors = () => {
  // State management

  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [targetId, setTargetId] = useState("");
  const itemsPerPage = 10;

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const axiosSecure = useAxiosSecure();

  // Sort configuration
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  // Fetch product brands with custom hook
  const productColors = useGetAllProductColors({
    isEdited,
    isDeleted,
    setLoading,
    isShowModal,
  });

  const { paginatedData, paginationControls } = Mpagination({
    totalData: productColors,
  });

  // Paginated data
  // const paginatedData = useCallback(() => {
  //   const offset = currentPage * itemsPerPage;
  //   return productColors.slice(offset, offset + itemsPerPage);
  // }, [currentPage, itemsPerPage, productColors]);

  // Sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sorted data based on configuration
  const sortedCategories = useCallback(() => {
    const sortedData = [...productColors];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortedData;
  }, [productColors, sortConfig]);

  const handleEdit = (id) => {
    setTargetId(id);
    setIsEdited(true);
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
            const res = await axiosSecure.delete(`/product-color/${id}`);

            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);

              toast.success("Item deleted successfully!");
            }
          } catch (error) {
            toast.error("Error deleting user!");
          }
        }
      });
    } catch (error) {
      toast.error("Error deleting Item!");
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 pt-0">
        <div className="flex justify-between items-center mb-9">
          <h1 className="text-3xl header font-semibold">Color List</h1>
          <div className="flex gap-4">
            <button
              className="customSaveButton"
              onClick={() => setIsShowModal(true)}
            >
              <span className="flex items-center gap-1">
                <IoAddCircle /> Add New Color
              </span>
            </button>
            {/* <button className="customCancelButton">
              <span className="flex items-center gap-1">
                <FaRetweet /> Rearrange Brand
              </span>
            </button> */}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto relative shadow sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-100">
                <tr className="text-lg">
                  <td
                    className="border flex justify-center items-center gap-2 text-lg p-2 text-center cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    SL{"  "}
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "asc" ? (
                        <HiArrowCircleUp className="text-[#087D6D] " />
                      ) : (
                        <HiArrowCircleDown className="text-[#E68923]" />
                      ))}
                  </td>
                  <td
                    className="border p-2 text-center cursor-pointer"
                    onClick={() => handleSort("productColor")}
                  >
                    Color Code {"  "}
                    {sortConfig.key === "productColor" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </td>
                  <td
                    className="border p-2 text-center cursor-pointer"
                    onClick={() => handleSort("productColorName")}
                  >
                    Color Name
                    {sortConfig.key === "productColorName" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </td>

                  <td className="border p-2 text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.length > 0 &&
                  paginatedData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="border text-center p-2">
                        {index + 1 + currentPage * itemsPerPage}
                      </td>
                      <td className="border text-center p-2">
                        {item.productColor}{" "}
                        <span
                          className={` min-w-14 h-3 rounded inline-block`}
                          style={{ backgroundColor: item.productColor }}
                        ></span>
                      </td>
                      <td className="border p-2  text-center">
                        {item.productColorName}
                      </td>
                      <td className="border p-2">
                        <div className="flex justify-center space-x-2">
                          <EditButton
                            onClick={() => handleEdit(item._id)}
                          ></EditButton>
                          <DeleteButton
                            onClick={() => handleDelete(item._id)}
                          ></DeleteButton>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination
        <div className="mt-5 flex justify-center space-x-2">
          {Array.from({
            length: Math.ceil(productColors.length / itemsPerPage),
          }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageClick(pageIndex)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === pageIndex
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div> */}

        {paginationControls}
      </div>

      {/* Modal for Adding/Editing Brand */}
      <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <CreateProductColorForm
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />
      </BgBlurModal>

      <BgBlurModal isShowModal={isEdited} setIsShowModal={setIsEdited}>
        <EditProductColorForm
          isShowModal={isEdited}
          setIsShowModal={setIsEdited}
          targetId={targetId}
        />
      </BgBlurModal>
    </>
  );
};

export default ProductColors;
