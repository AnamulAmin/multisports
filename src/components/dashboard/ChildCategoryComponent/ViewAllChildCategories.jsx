import { useState, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import CellImage from "../../../shared/ImageComponents/CellImage";
import toast from "react-hot-toast";
import Modal from "../../../shared/Modal/Modal";
import Swal from "sweetalert2";
import ChildCategoryEditForm from "./ChildCategoryEditForm";
import useGetAllChildCategories from "../../../Hook/GetDataHook/useGetAllChildCategories";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";
import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";

export default function ChildCategoryList() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const axiosSecure = useAxiosSecure();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [targetId, setTargetId] = useState("");
  const childCategories = useGetAllChildCategories({ isEdited, isDeleted });

  const sortedchildCategories = useCallback(() => {
    const sortedData = [...childCategories];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  }, [childCategories, sortConfig]);

  const paginatedData = useCallback(() => {
    const offset = currentPage * itemsPerPage;

    return sortedchildCategories().slice(offset, offset + itemsPerPage);
  }, [currentPage, itemsPerPage, sortedchildCategories]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            const res = await axiosSecure.delete(`/child-categories/${id}`);

            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);

              toast.success("Child category deleted successfully!");
            }
          } catch (error) {
            toast.error("Error deleting user!");
          }
        }
      });
    } catch (error) {
      toast.error("Error deleting category!");
    }
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold header mb-9">
          Child Category List
        </h1>
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
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
              <td className="border p-2 text-center text-lg">Icon</td>
              <td
                className="border p-2 text-center text-lg cursor-pointer"
                onClick={() => handleSort("childCategoryName")}
              >
                Name{" "}
                {sortConfig.key === "childCategoryName" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>

              <td
                className="border p-2 text-center text-lg"
                onClick={() => handleSort("category")}
              >
                Category
                {sortConfig.key === "category" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td
                className="border p-2 text-center text-lg"
                onClick={() => handleSort("subcategory")}
              >
                Subcategory
                {sortConfig.key === "subcategory" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>

              <td
                className="border p-2 text-center text-lg cursor-pointer"
                onClick={() => handleSort("slug")}
              >
                Slug{" "}
                {sortConfig.key === "slug" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>

              <td className="border p-2 text-center text-lg">Action</td>
            </tr>
          </thead>
          <tbody>
            {paginatedData()?.length > 0 &&
              paginatedData().map((category, index) => (
                <tr key={category.id} className="border-b text-center">
                  <td className="border p-2">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="border p-2">
                    <div className="flex justify-center ">
                      <div className="rounded-full overflow-hidden border">
                        <CellImage
                          width={400}
                          height={400}
                          src={category.childCategoryIcon}
                          alt="icon"
                        />
                      </div>
                    </div>
                  </td>

                  <td className="border p-2">{category.childCategoryName}</td>

                  <td className="border p-2">{category.category}</td>
                  <td className="border p-2">{category.subcategory}</td>
                  <td className="border p-2">{category.slug}</td>

                  <td className="border p-2">
                    <div className="flex justify-center space-x-2">
                      <EditButton onClick={() => handleEdit(category._id)} />
                      <DeleteButton
                        onClick={() => handleDelete(category._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}

            {paginatedData()?.length == 0 && (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-5 flex justify-center space-x-2">
          {Array.from({
            length: Math.ceil(childCategories.length / itemsPerPage),
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
        </div>
      </div>
      <BgBlurModal isShowModal={isEdited} setIsShowModal={setIsEdited}>
        <ChildCategoryEditForm
          targetId={targetId}
          setIsShowModal={setIsEdited}
          isShowModal={isEdited}
        />
      </BgBlurModal>
    </div>
  );
}
