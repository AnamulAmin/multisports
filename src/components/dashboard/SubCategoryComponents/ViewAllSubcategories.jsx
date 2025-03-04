import { useState, useEffect, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";
import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";
import CellImage from "../../../shared/ImageComponents/CellImage";
import toast from "react-hot-toast";
import Modal from "../../../shared/Modal/Modal";
import SubcategoryEditForm from "./SubcategoryEditForm";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";

export default function SubcategoryList() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [subcategories, setSubCategories] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const axiosSecure = useAxiosSecure();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [subcategoryId, setSubCategoryId] = useState("");

  const sortedsubCategories = useCallback(() => {
    const sortedData = [...subcategories];
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
  }, [subcategories, sortConfig]);

  const paginatedData = useCallback(() => {
    const offset = currentPage * itemsPerPage;
    return sortedsubCategories().slice(offset, offset + itemsPerPage);
  }, [currentPage, itemsPerPage, sortedsubCategories]);

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
    setSubCategoryId(id);
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
            const res = await axiosSecure.delete(`/subcategories/${id}`);

            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);

              toast.success("Order deleted successfully!");
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

  useEffect(() => {
    const fetchsubCategories = async () => {
      try {
        const res = await axiosSecure.get("/subcategories");

        if (res.status === 200 || res.status === 201) {
          setSubCategories(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        throw new Error("Failed to fetch subcategories");
      }
    };

    fetchsubCategories();
  }, [axiosSecure, isDeleted, isEdited]);

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">Category List</h1>
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-lg">
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
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("subcategoryName")}
              >
                Name{" "}
                {sortConfig.key === "subcategoryName" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td className="border p-2 text-center">Icon</td>
              <td className="border p-2 text-center">Banner Image</td>
              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("slug")}
              >
                Slug{" "}
                {sortConfig.key === "slug" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("featureCategory")}
              >
                Featured{" "}
                {sortConfig.key === "featureCategory" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td className="border p-2 text-center">Show On Navbar</td>
              <td className="border p-2 text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {paginatedData()?.length > 0 &&
              paginatedData().map((category, index) => (
                <tr key={category.id} className="border-b text-center">
                  <td className="border p-2">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="border p-2">{category.subcategoryName}</td>
                  <td className="border p-2">
                    <div>
                      <div className="border rounded-full overflow-hidden">
                        <CellImage
                          width={400}
                          height={400}
                          src={category.subcategoryIcon}
                          alt="icon"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border p-2">
                    <div className="flex justify-center">
                      <div>
                        <CellImage
                          width={400}
                          height={400}
                          src={category.subcategoryImage}
                          alt="banner"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border p-2">{category.slug}</td>
                  <td className="border p-2">
                    {category.featureCategory === "Yes" ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                        Featured
                      </span>
                    ) : (
                      <span>No</span>
                    )}
                  </td>
                  <td className="border p-2">
                    {category.showOnNavbar ? "Yes" : "No"}
                  </td>
                  <td className="border p-2">
                    <div className="flex  justify-center space-x-2">
                      <EditButton onClick={() => handleEdit(category._id)} />
                      <DeleteButton
                        onClick={() => handleDelete(category._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-5 flex justify-center space-x-2">
          {Array.from({
            length: Math.ceil(subcategories.length / itemsPerPage),
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
        <SubcategoryEditForm
          subcategoryId={subcategoryId}
          setIsShowModal={setIsEdited}
          isShowModal={isEdited}
        />
      </BgBlurModal>
    </div>
  );
}
