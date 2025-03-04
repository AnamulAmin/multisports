import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function CreateSizeForm({ isShowModal, setIsShowModal }) {
  const [sizeName, setSizeName] = useState("");

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    sizeName, "sizeName";

    if (!sizeName) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formData = new FormData();
    formData.append("sizeName", sizeName);

    try {
      const res = await axiosSecure.post("/product-size", formData);

      if (res.status === 200 || res.status === 201) {
        handleCloseModal();
        Swal.fire({
          title: "Success!",
          text: "Size created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      console.error(err);
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
    <div className="w-full bg-gray-100 p-10 rounded-2xl mt-20">
      <div className="w-full mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-9">
          New Size
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">
              {/* Size Name * */}
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

          {/* Submit Button */}
          <div className="flex gap-4 justify-end mt-4">
            <button
              type="button"
              className="customCancelButton"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>

            <button type="submit" className="customSaveButton w-full">
              Save Size Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
