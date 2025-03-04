import { useState, useEffect, useCallback } from "react";

import CellImage from "../../../shared/ImageComponents/CellImage";
import toast from "react-hot-toast";
import CategoryEditForm from "./CategoryEditForm";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";

export default function CategoryList() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [categories, setCategories] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const axiosSecure = useAxiosSecure();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const sortedCategories = useCallback(() => {
    const sortedData = [...categories];
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
  }, [categories, sortConfig]);

  const paginatedData = useCallback(() => {
    const offset = currentPage * itemsPerPage;
    return sortedCategories().slice(offset, offset + itemsPerPage);
  }, [currentPage, itemsPerPage, categories, sortedCategories]);

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
    setCategoryId(id);
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
            const res = await axiosSecure.delete(`/categories/${id}`);

            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);
              toast.success("Category deleted successfully!");
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosSecure.get("/categories");

        if (res.status === 200 || res.status === 201) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [axiosSecure, isDeleted, isEdited]);

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl header font-semibold mb-9">Category List</h1>
        <table className="min-w-full shadow table-auto border-collapse">
          <thead className="text-lg">
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
                onClick={() => handleSort("categoryName")}
              >
                Name{" "}
                {sortConfig.key === "categoryName" &&
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
                  <td className="border p-2 ">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="border p-2">{category.categoryName}</td>
                  <td className="border p-2 flex justify-center">
                    <div className="max-w-20 border rounded-full overflow-hidden">
                      <CellImage
                        width={400}
                        height={400}
                        src={category.categoryIcon}
                        alt="icon"
                      />
                    </div>
                  </td>
                  <td className="border p-2">
                    <div>
                      <div className="flex justify-center">
                        <CellImage
                          width={400}
                          height={400}
                          src={category.categoryBanner}
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
                    <div className="flex justify-center space-x-2">
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
            length: Math.ceil(categories.length / itemsPerPage),
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
        <CategoryEditForm
          categoryId={categoryId}
          setIsShowModal={setIsEdited}
          isShowModal={isEdited}
        />
      </BgBlurModal>
    </div>
  );
}
