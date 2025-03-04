import { useState, useEffect, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import CellImage from "../../../../shared/ImageComponents/CellImage";
import toast from "react-hot-toast";
import BlogEditForm from "./BlogEditForm";
import Swal from "sweetalert2";
import BgBlurModal from "../../../../shared/Modal/BgBlurModal";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import EditButton from "../../../../components library/EditButton";
import DeleteButton from "../../../../components library/DeleteButton";
import Mpagination from "../../../../shared/Mpagination";

export default function ViewAllBlogs() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [blogs, setBlogs] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const axiosSecure = useAxiosSecure();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [BlogId, setBlogId] = useState("");

  const { paginatedData, paginationControls } = Mpagination({
    totalData: blogs,
  });

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
    setBlogId(id);
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
            const res = await axiosSecure.delete(`/blog/${id}`);

            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);
              toast.success("Blog deleted successfully!");
            }
          } catch (error) {
            toast.error("Error deleting Item!");
          }
        }
      });
    } catch (error) {
      toast.error("Error deleting Blog!");
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosSecure.get("/blog");

        if (res.status === 200 || res.status === 201) {
          setBlogs(res.data.data);
        }
      } catch (error) {
        throw new Error("Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, [axiosSecure, isDeleted, isEdited]);

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">Blog List</h1>
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-center">
            <tr>
              <td
                className="border p-2  cursor-pointer"
                onClick={() => handleSort("id")}
              >
                SL{" "}
                {sortConfig.key === "_id" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td
                className="border p-2  cursor-pointer"
                onClick={() => handleSort("writer")}
              >
                Name{" "}
                {sortConfig.key === "writer" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td
                className="border p-2  cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title{" "}
                {sortConfig.key === "title" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td className="border p-2 ">Image</td>

              <td className="border p-2 ">Action</td>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.length > 0 &&
              paginatedData.map((item, index) => (
                <tr key={item.id} className="border-b text-center">
                  <td className="border p-2">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="border p-2">{item.writer}</td>
                  <td className="border p-2">{item.title}</td>
                  <td className="border p-2">
                    <div className="flex justify-center">
                      <div>
                        <CellImage
                          width={400}
                          height={400}
                          src={item.image}
                          alt="icon"
                        />
                      </div>
                    </div>
                  </td>

                  <td className="border p-2">
                    <div className="flex justify-center gap-2">
                      <EditButton onClick={() => handleEdit(item._id)} />
                      <DeleteButton onClick={() => handleDelete(item._id)} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {paginationControls}
      <BgBlurModal isShowModal={isEdited} setIsShowModal={setIsEdited}>
        <BlogEditForm
          BlogId={BlogId}
          setIsShowModal={setIsEdited}
          isShowModal={isEdited}
        />
      </BgBlurModal>
    </div>
  );
}
