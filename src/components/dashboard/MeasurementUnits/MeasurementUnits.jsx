import { useState, useEffect, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "../../../shared/Modal/Modal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import CreateunitForm from "./Forms/CreateMeasurementUnitsForm";
import EditunitForm from "./Forms/EditMeasurementUnitsForm";
import useGetAllMeasurementUnits from "../../../Hook/GetDataHook/useGetAllMeasurementUnits";
import CreateMeasurementUnitsForm from "./Forms/CreateMeasurementUnitsForm";
import EditMeasurementUnitsForm from "./Forms/EditMeasurementUnitsForm";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Mpagination from "../../../shared/Mpagination";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import moment from "moment";

const MeasurementUnits = () => {
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
  const measurementUnits = useGetAllMeasurementUnits({
    isEdited,
    isDeleted,
    setLoading,
    isShowModal,
  });

  const { paginatedData, paginationControls } = Mpagination({
    totalData: measurementUnits,
  });

  // // Paginated data
  // const paginatedData = useCallback(() => {
  //   const offset = currentPage * itemsPerPage;
  //   return measurementUnits.slice(offset, offset + itemsPerPage);
  // }, [currentPage, itemsPerPage, measurementUnits]);

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
    const sortedData = [...measurementUnits];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortedData;
  }, [measurementUnits, sortConfig]);

  const handleEdit = (id) => {
    setTargetId(id);
    setIsEdited(true);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure you want to delete this ?",
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
            const res = await axiosSecure.delete(`/measurement-units/${id}`);

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
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Unit List</h1>
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
              onClick={() => setIsShowModal(true)}
            >
              Add New Unit
            </button>
            {/* <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Rearrange Brand
            </button> */}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    className="border p-2 text-left cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    SL{" "}
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th
                    className="border p-2 text-left cursor-pointer"
                    onClick={() => handleSort("brandName")}
                  >
                    Name
                    {sortConfig.key === "unitName" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </th>

                  <th className="border p-2 text-left cursor-pointer">
                    Created At
                  </th>
                  <th className="border p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.length > 0 &&
                  paginatedData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="border p-2">
                        {index + 1 + currentPage * itemsPerPage}
                      </td>
                      <td className="border p-2">{item.unitName}</td>
                      <td className="border p-2">
                        {moment(item.createdAt).format("YYYY-MM-DD")}
                      </td>
                      <td className="border p-2">
                        <div className="flex space-x-2">
                          <button
                            className="text-yellow-500 hover:text-yellow-700"
                            onClick={() => handleEdit(item._id)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(item._id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {paginationControls}
          </div>
        )}
      </div>

      {/* Modal for Adding/Editing Brand */}
      <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <CreateMeasurementUnitsForm
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />
      </BgBlurModal>

      <BgBlurModal isShowModal={isEdited} setIsShowModal={setIsEdited}>
        <EditMeasurementUnitsForm
          isShowModal={isEdited}
          setIsShowModal={setIsEdited}
          targetId={targetId}
        />
      </BgBlurModal>
    </>
  );
};

export default MeasurementUnits;
