import BgBlurModal from "../../../../shared/Modal/BgBlurModal";
import { useState } from "react";

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import CellImage from "../../../../shared/ImageComponents/CellImage";
import CreateShoesBannerForm from "./forms/CreateShoesBannerForm";
import UpdateShoesBannerForm from "./forms/UpdateShoesBannerForm";
import useGetAllShoesBanners from "../../../../Hook/GetDataHook/useGetAllShoesBanners";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import EditButton from "../../../../components library/EditButton";
import DeleteButton from "../../../../components library/DeleteButton";
import Mpagination from "../../../../shared/Mpagination";

const ShoesBanners = () => {
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [isDeleted, setIsDeleted] = useState(false);
  const axiosSecure = useAxiosSecure();

  const banners = useGetAllShoesBanners({
    isShowModal: showModal,
    isDeleted,
    isEdited: isEdit,
  });

  const { paginatedData, paginationControls } = Mpagination({
    totalData: banners,
  });

  // Simulate fetching data

  const handleEdit = (id) => {
    setTargetId(id);
    setIsEdit(true);
  };

  const handleDelete = async (id, file_key) => {
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
            const res = await axiosSecure.delete(`/shoes-banners/${id}`);

            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);

              toast.success("Banner deleted successfully!");
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
    <div className="p-6 pt-0">
      <div className="flex justify-between items-center mb-9">
        <h1 className="text-3xl font-semibold">Shoes Banner List</h1>
        <div>
          <button
            className="customSaveButton"
            onClick={() => setShowModal(true)}
          >
            + Add Shoes Banner
          </button>
        </div>
      </div>

      <div className="overflow-x-auto relative shadow sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="bg-gray-200 text-center">
              <td scope="col" className="py-3 px-6">
                SL
              </td>
              <td scope="col" className="py-3 px-6">
                Image
              </td>
              <td scope="col" className="py-3 px-6">
                Title
              </td>
              <td scope="col" className="py-3 px-6">
                Subtitle
              </td>
              <td scope="col" className="py-3 px-6">
                Action
              </td>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No data available in table
                </td>
              </tr>
            ) : (
              paginatedData.map((slider, index) => (
                <tr key={index} className="bg-white border-b text-center">
                  <td className="py-3 border px-6">{index + 1}</td>
                  <td className="py-3 border px-6">
                    <div className="flex justify-center">
                      <div className="flex justify-center">
                        <CellImage
                          width={400}
                          height={400}
                          src={slider?.image}
                          alt={slider?.title}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 border px-6">{slider.title}</td>
                  <td className="py-3 border px-6">{slider.subtitle}</td>
                  <td className="py-3 border px-6 space-x-2">
                    <EditButton onClick={() => handleEdit(slider._id)}>
                      {" "}
                    </EditButton>
                    <DeleteButton
                      onClick={() => handleDelete(slider._id, slider.key)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {paginationControls}

      <BgBlurModal isShowModal={showModal} setIsShowModal={setShowModal}>
        <CreateShoesBannerForm setIsShow={setShowModal} />
      </BgBlurModal>
      <BgBlurModal isShowModal={isEdit} setIsShowModal={setIsEdit}>
        <UpdateShoesBannerForm
          targetId={targetId}
          isShow={isEdit}
          setIsShow={setIsEdit}
        />
      </BgBlurModal>
    </div>
  );
};

export default ShoesBanners;
