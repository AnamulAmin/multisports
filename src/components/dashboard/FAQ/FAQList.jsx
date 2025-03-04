import { useState, useEffect, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "../../../shared/Modal/Modal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import CreateFAQForm from "./Forms/CreateFAQForm";
import EditFAQForm from "./Forms/EditFAQForm";
import useGetAllFaq from "../../../Hook/GetDataHook/useGetAllFaq";
import { IoMdAddCircle } from "react-icons/io";
import { FaRetweet } from "react-icons/fa";
import TableSkeleton from "../../../components library/TableSkeleton";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";

const FAQList = () => {
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
  const content = useGetAllFaq({
    isEdited,
    isDeleted,
    setLoading,
    isShowModal,
  });

  // Paginated data
  const paginatedData = useCallback(() => {
    const offset = currentPage * itemsPerPage;
    return content.slice(offset, offset + itemsPerPage);
  }, [currentPage, itemsPerPage, content]);

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
    const sortedData = [...content];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortedData;
  }, [content, sortConfig]);

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
            const res = await axiosSecure.delete(`/faq/${id}`);

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
      <div className="p-6 pt-0">
        <div className="flex justify-between  items-center mb-9">
          <h1 className="text-3xl font-semibold">Faq List</h1>
          <div className="flex gap-4">
            <button
              className="customSaveButton"
              onClick={() => setIsShowModal(true)}
            >
              <span className="flex items-center gap-1">
                <IoMdAddCircle /> Add New Size
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
          <TableSkeleton></TableSkeleton>
        ) : (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-100">
                <tr>
                  <td
                    className="border p-2 text-center cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    SL{" "}
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </td>
                  <td
                    className="border p-2 text-center cursor-pointer"
                    onClick={() => handleSort("question")}
                  >
                    Question
                    {sortConfig.key === "question" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </td>
                  <td
                    className="border p-2 text-center cursor-pointer"
                    onClick={() => handleSort("answer")}
                  >
                    Answer
                    {sortConfig.key === "answer" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </td>

                  <td className="border p-2 text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                {paginatedData()?.length > 0 &&
                  paginatedData().map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="border p-2">
                        {index + 1 + currentPage * itemsPerPage}
                      </td>
                      <td className="border p-2">{item.question} </td>
                      <td className="border p-2">{item.answer}</td>
                      <td className="border p-2 py-4">
                        <div className="flex justify-center space-x-2">
                          <EditButton onClick={() => handleEdit(item._id)} />
                          <DeleteButton
                            onClick={() => handleDelete(item._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}

                {paginatedData().length == 0 && (
                  <tr>
                    <td className="border p-2 py-4" colSpan={5}>
                      <p className="text-center text-xl font-bold">
                        No FAQs Found
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Adding/Editing Brand */}
      <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <CreateFAQForm
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />
      </BgBlurModal>

      <BgBlurModal isShowModal={isEdited} setIsShowModal={setIsEdited}>
        <EditFAQForm
          isShowModal={isEdited}
          setIsShowModal={setIsEdited}
          targetId={targetId}
        />
      </BgBlurModal>
    </>
  );
};

export default FAQList;
