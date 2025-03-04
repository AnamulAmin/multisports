import CustomEditor from "../../../../shared/CustomEditor/CustomEditor";
import DragEditUploadImageInput from "../../../../shared/DragEditUploadImageInput";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function VisionSection() {
  // State management for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [targetId, setTargetId] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  // Fetch existing testimonial for editing
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await axiosSecure.get(`/about-vision`);

        if (res.status === 200 || res.status === 201) {
          const data = res?.data?.data[0];

          // Set form values with the testimonial data
          setTitle(data?.title);
          setDescription(data?.description);
          setThumbnailPreview(data?.image); // Show the existing image
          setTargetId(data?._id);
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();
  }, [axiosSecure]);

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", thumbnail);

    setLoading(true);

    try {
      if (targetId) {
        const res = await axiosSecure.put(
          `/about-vision/${targetId}`,
          formData
        );
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "About Vision updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        const res = await axiosSecure.post(`/about-vision`, formData);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "About Vision Created successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setThumbnailPreview(null);
          setThumbnail(null);
        }
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
    <div className="border-b-2 border-gray-300 border-dashed  pb-5 mb-9">
      {/* Testimonial Edit Form */}
      {/* <h1 className="text-3xl font-semibold mb-9">Vision Section</h1> */}

      <form onSubmit={handleSubmit}>
        <div className=" mb-9 flex">
          <h1 className="text-3xl font-semibold w-full border-l-[5px] border-blue-400 pl-3">
            Vision Section
          </h1>
          <div className="flex justify-end w-full">
            <button type="submit" className="customSaveButton ">
              Save Changes
            </button>
          </div>
        </div>
        <div className="">
          {/* Left Column - Image Upload */}
          <div className="relative">
            <label className="block font-semibold text-gray-600 mb-2">
              Image{" "}
            </label>
            <DragEditUploadImageInput
              getRootProps={getThumbnailRootProps}
              getInputProps={getThumbnailInputProps}
              image={thumbnail}
              imagePreview={thumbnailPreview}
            />
          </div>

          {/* Right Column - Form Inputs */}
          <div className="space-y-4 mb-6 mt-4">
            <div>
              <label className="block font-semibold text-gray-600">
                Title{" "}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="customInput"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block font-semibold text-gray-600 mb-2">
                Description{" "}
              </label>
              <CustomEditor
                value={description}
                setValue={setDescription}
                className="customInput min-h-[250px]"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <button type="submit" className="customSaveButton" disabled={loading}>
            {loading && (
              <>
                <span className="loading loading-spinner mr-2  loading-xs"></span>
              </>
            )}
            Save Changes
          </button>
        </div>
        {/* Save Button */}
      </form>
    </div>
  );
}
