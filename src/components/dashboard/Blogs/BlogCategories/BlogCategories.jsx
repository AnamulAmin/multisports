import { useState, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "../../../../shared/Modal/Modal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaRetweet } from "react-icons/fa";

import CreateBlogCategoryForm from "./Forms/CreateBlogCategoryForm";
import EditBlogCategoryForm from "./Forms/EditBlogCategoryForm";
import useGetAllBlogCategories from "../../../../Hook/GetDataHook/useGetAllBlogCategories";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { IoMdAddCircle } from "react-icons/io";
import DeleteButton from "../../../../components library/DeleteButton";
import EditButton from "../../../../components library/EditButton";
import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";
import TableSkeleton from "../../../../components library/TableSkeleton";
import Mpagination from "../../../../shared/Mpagination";
import BgBlurModal from "../../../../shared/Modal/BgBlurModal";

const BlogCategories = () => {
  // State management

  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [targetId, setTargetId] = useState("");
  const itemsPerPage = 10;

  const axiosSecure = useAxiosSecure();

  // Sort configuration
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  // Fetch product brands with custom hook
  const BlogCategories = useGetAllBlogCategories({
    isEdited,
    isDeleted,
    setLoading,
    isShowModal,
  });

  const { paginatedData, paginationControls } = Mpagination({
    totalData: BlogCategories,
  });

  // Paginated data

  // Sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

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
            const res = await axiosSecure.delete(`/blog-category/${id}`);

            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);

              toast.success("Blog  deleted successfully!");
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
      <div className="p-6 pt-0">
        <div className="flex justify-between items-center mb-9">
          <h1 className="text-3xl font-semibold">Blog Category List</h1>
          <div className="flex gap-4">
            <button
              className="customSaveButton"
              onClick={() => setIsShowModal(true)}
            >
              <span className="flex items-center gap-1">
                <IoMdAddCircle /> Add New Size
              </span>
            </button>
            <button className="customCancelButton">
              <span className="flex items-center gap-1">
                <FaRetweet /> Rearrange Brand
              </span>
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <TableSkeleton></TableSkeleton>
        ) : (
          <div className="overflow-x-auto relative shadow sm:rounded-lg">
            <table className="w-full text-sm text-gray-500">
              <thead className="bg-gray-100 text-center">
                <tr>
                  <td
                    className="border flex justify-center items-center gap-2 text-lg p-2 text-center cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    SL{" "}
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "asc" ? (
                        <HiArrowCircleUp className="text-[#087D6D] " />
                      ) : (
                        <HiArrowCircleDown className="text-[#E68923]" />
                      ))}
                  </td>
                  <td
                    className="border p-2 cursor-pointer"
                    onClick={() => handleSort("brandName")}
                  >
                    Name
                    {sortConfig.key === "Blog CategoryName" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </td>

                  <td className="border p-2 cursor-pointer">Created At</td>
                  <td className="border p-2 ">Action</td>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.length > 0 &&
                  paginatedData.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="border p-2">
                        {index + 1 + currentPage * itemsPerPage}
                      </td>
                      <td className="border p-2">{item.name}</td>
                      <td className="border p-2">{item.createdAt}</td>
                      <td className="border p-2 py-4">
                        <div className="flex justify-center">
                          <EditButton
                            onClick={() => handleEdit(item._id)}
                          ></EditButton>
                          <DeleteButton
                            onClick={() => handleDelete(item._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {paginationControls}
      </div>

      {/* Modal for Adding/Editing Brand */}
      <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <CreateBlogCategoryForm
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />
      </BgBlurModal>

      <BgBlurModal isShowModal={isEdited} setIsShowModal={setIsEdited}>
        <EditBlogCategoryForm
          isShowModal={isEdited}
          setIsShowModal={setIsEdited}
          targetId={targetId}
        />
      </BgBlurModal>
    </>
  );
};

export default BlogCategories;
