import { useEffect, useState } from "react";
import useGetAllDistrict from "../../../Hook/GetDataHook/useGetAllDistrict";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import AddDistrict from "./Forms/AddDistrict";
import EditDistrict from "./Forms/EditDistrict";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";

export default function UpazilaThanaList() {
  const axiosSecure = useAxiosSecure();

  const [isAddModel, setIsAddModel] = useState(false);
  const [isEditModel, setIsEditModel] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const district = useGetAllDistrict({
    isShowModal: isAddModel,
    isEdited: isEditModel,
    isDeleted,
  });

  const [data, setData] = useState(district);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  const [targetId, setTargetId] = useState("");

  // Pagination Logic

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = district.filter(
      (item) =>
        item.upazilaEnglish
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.upazilaBangla.includes(e.target.value)
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleEdit = (id) => {
    setTargetId(id);
    setIsEditModel(true);
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
            const res = await axiosSecure.delete(`/district/${id}`);

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

  useEffect(() => {
    setData(district);
  }, [district]);

  return (
    <>
      <div className="p-6 pt-0">
        <div className="">
          <div className="flex justify-between mb-9 items-center">
            <h1 className="text-3xl font-semibold ">Districts List</h1>
            <button
              className="customSaveButton"
              onClick={() => setIsAddModel(true)}
            >
              + Add District
            </button>
          </div>
          {/* Search Input */}
          <div className="">
            <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
              <input
                type="text"
                className="outline-none w-full bg-white"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by District ..."
              />
              <IoIosSearch className="text-2xl text-gray-400" />
            </div>
          </div>

          {/* Upazila Thana Table */}
          <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
            <thead>
              <tr className="bg-gray-200 text-center">
                <td className="p-2 border">SL</td>
                <td className="p-2 border">District</td>
                <td className="p-2 border">Subdistricts</td>
                <td className="p-2 border">Action</td>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item.id} className="border-b text-center">
                    <td className="p-2 border">{startIdx + index + 1}</td>
                    <td className="p-2 border">{item.district}</td>
                    <td className="p-2 border">
                      {item.subdistricts.join(",").length > 50
                        ? item?.subdistricts.join(",").slice(0, 50) + "..."
                        : item.subdistricts.join(",")}
                    </td>

                    <td className="p-2 border space-x-2 py-4">
                      <EditButton onClick={() => handleEdit(item._id)} />
                      <DeleteButton onClick={() => handleDelete(item._id)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No data available in the table
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <BgBlurModal isShowModal={isAddModel} setIsShowModal={setIsAddModel}>
        <AddDistrict setIsShowModal={setIsAddModel} isShowModal={isAddModel} />
      </BgBlurModal>
      <BgBlurModal isShowModal={isEditModel} setIsShowModal={setIsEditModel}>
        <EditDistrict
          setIsShowModal={setIsEditModel}
          isShowModal={isEditModel}
          targetId={targetId}
        />
      </BgBlurModal>
    </>
  );
}
