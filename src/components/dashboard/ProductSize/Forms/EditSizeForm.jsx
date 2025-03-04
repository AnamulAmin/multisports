import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function EditSizeForm({
  targetId,
  setIsShowModal,
  isShowModal,
}) {
  const [sizeName, setSizeName] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchSizeNameData() {
      try {
        const res = await axiosSecure.get(`/product-size/${targetId}`);
        const sizeNameData = res?.data?.data;

        // Populate form fields with existing data
        setSizeName(sizeNameData.sizeName);
      } catch (error) {
        console.error("Error fetching sizeName data:", error);
      }
    }

    if (targetId) {
      fetchSizeNameData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("sizeName", sizeName);

    try {
      const res = await axiosSecure.put(`/product-size/${targetId}`, formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Size updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      setIsShowModal(false);
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setSizeName("");
  };

  return (
    <div className="w-full mt-20 rounded-2xl bg-gray-100 p-10">
      <div className="w-full mx-auto ">
        <h1 className="text-2xl text-center text-gray-700 font-semibold mb-9">
          Edit Size Name
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              {/* Size Name */}
            </label>
            <input
              type="text"
              value={sizeName}
              onChange={(e) => setSizeName(e.target.value)}
              className="customInput"
              placeholder="Size Name"
              required
            />
          </div>

          <div className="flex justify-end mt-5 gap-4">
            <button
              type="button"
              className="customCancelButton"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button type="submit" className="customSaveButton w-full">
              Update Size Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
