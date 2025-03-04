import DragEditUploadImageInput from "../../../../shared/DragEditUploadImageInput";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function EditProductFlagForm({
  targetId,
  setIsShowModal,
  isShowModal,
}) {
  const [flagName, setFlagName] = useState("");
  const [flagIcon, setFlagIcon] = useState(null);
  const [flagIconPreview, setFlagIconPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchProductFlagData() {
      try {
        const res = await axiosSecure.get(`/product-flag/${targetId}`);
        const ProductFlagData = res?.data?.data;

        // Populate form fields with existing data
        setFlagName(ProductFlagData.flagName);
        setFlagIconPreview(ProductFlagData.flagIcon);
      } catch (error) {
        console.error("Error fetching sizeName data:", error);
      }
    }

    if (targetId) {
      fetchProductFlagData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const res = await axiosSecure.put(`/product-flag/${targetId}`, formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Product flag updated successfully",
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
    <div className="w-full mt-20 rounded-2xl bg-gray-100 p-10">
      <div className="w-full mx-auto ">
        <h1 className="text-2xl font-semibold mb-7">Edit Flag Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Flag Name</label>
            <input
              type="text"
              value={flagName}
              onChange={(e) => setFlagName(e.target.value)}
              className="customInput"
              placeholder="Model Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Icon </label>

            <DragEditUploadImageInput
              getRootProps={getIconRootProps}
              getInputProps={getIconInputProps}
              image={flagIcon}
              imagePreview={flagIconPreview}
            />
          </div>

          <div className="flex mt-7 gap-4">
            <button
              type="button"
              className="customCancelButton"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full customSaveButton"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner mr-2  loading-xs"></span>
              )}
              Update Flag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
