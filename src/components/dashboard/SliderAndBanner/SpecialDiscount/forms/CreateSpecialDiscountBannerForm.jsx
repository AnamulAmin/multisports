import DragUploadImageInput from "../../../../../shared/DragUploadImageInput";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../Hook/useAxiosSecure";

export default function CreateSpecialDiscountBannerForm({ setIsShow }) {
  // State management for form fields
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  // Dropzone for thumbnail upload
  const onDropThumbnail = (acceptedFiles) => {
    // Set the state with the URL

    const thumbnailPreview = URL.createObjectURL(acceptedFiles[0]);

    setThumbnailPreview(thumbnailPreview);

    setThumbnail(acceptedFiles[0]);
  };

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onDropThumbnail,
    accept: "image/*",
    multiple: false,
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("shortDescription", shortDescription);
    formData.append("image", thumbnail);
    try {
      const res = await axiosSecure.post("/special-discount-banners", formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Product created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        localStorage.removeItem("file_key");

        setIsShow(false);
        setThumbnail(null);
        setThumbnailPreview(null);
        setTitle("");
        setSubtitle("");
        setShortDescription("");
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

  return (
    <div className="container mx-auto p-8 mt-9 bg-white rounded-lg shadow-md">
      {/* Banner Entry Form */}
      <h1 className="text-2xl font-semibold mb-7">Create Banner Form</h1>
      <form className="" onSubmit={handleSubmit}>
        {/* Left Column - Image Upload */}
        <div className="relative">
          <label className="block text-gray-700 mb-2">Banner Image</label>
          <DragUploadImageInput
            getRootProps={getThumbnailRootProps}
            getInputProps={getThumbnailInputProps}
            image={thumbnail}
            imagePreview={thumbnailPreview}
          />
        </div>

        {/* Right Column - Form Inputs */}
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-gray-700">Title </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="customInput"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Subtitle </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="customInput"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Short Description </label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="customInput resize-none"
              required
            ></textarea>
          </div>
        </div>

        {/* Save Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="customSaveButton w-full mt-5 flex justify-center items-center gap-3"
            disabled={loading}
          >
            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
