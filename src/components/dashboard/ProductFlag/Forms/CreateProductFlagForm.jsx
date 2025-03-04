import DragUploadImageInput from "../../../../shared/DragUploadImageInput";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function CreateProductFlagForm({ isShowModal, setIsShowModal }) {
  const [flagName, setFlagName] = useState("");
  const [flagIcon, setFlagIcon] = useState(null);
  const [flagIconPreview, setFlagIconPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    flagName, "flagName";

    if (!flagName) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formData = new FormData();
    formData.append("flagName", flagName);

    if (!flagName) {
      Swal.fire({
        title: "Error!",
        text: "Please fill the flag field",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (flagIcon) {
      formData.append("flagIcon", flagIcon);
    }

    setLoading(true);

    try {
      const res = await axiosSecure.post("/product-flag", formData);

      if (res.status === 200 || res.status === 201) {
        handleCloseModal();
        Swal.fire({
          title: "Success!",
          text: "flagName created successfully",
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
    } finally {
      setLoading(false);
    }
  };

  const onDropIcon = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);
    // Set the state with the URL
    setFlagIconPreview(previewUrl);
    setFlagIcon(acceptedFiles[0]);
  };

  const { getRootProps: getIconRootProps, getInputProps: getIconInputProps } =
    useDropzone({
      onDrop: onDropIcon,
      accept: "image/*",
      multiple: false,
    });

  const handleCloseModal = () => {
    setIsShowModal(false);
    setFlagName("");
    setFlagIcon(null);
    setFlagIconPreview("");
  };

  return (
    <div className="w-full bg-gray-100 p-10 rounded-2xl mt-20">
      <div className="w-full mx-auto ">
        <h1 className="text-2xl font-semibold mb-7">Create Flag Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Flag Name</label>
            <input
              type="text"
              value={flagName}
              onChange={(e) => setFlagName(e.target.value)}
              className="customInput"
              // placeholder="Model Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Icon</label>

            <DragUploadImageInput
              getRootProps={getIconRootProps}
              getInputProps={getIconInputProps}
              image={flagIcon}
              imagePreview={flagIconPreview}
            />
          </div>

          {/* Submit Button */}
          <div className="flex  gap-4 mt-7">
            <button
              type="button"
              className="customCancelButton"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="customSaveButton w-full"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner mr-2  loading-xs"></span>
              )}
              Save flag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
