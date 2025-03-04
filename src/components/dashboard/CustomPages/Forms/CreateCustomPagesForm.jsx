import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import DragEditUploadImageInput from "../../../../shared/DragEditUploadImageInput";
import CustomEditor from "../../../../shared/CustomEditor/CustomEditor";

export default function CreateCustomPagesForm({ isShow, setIsShow }) {
  // State management for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [slug, setSlug] = useState("");

  const axiosSecure = useAxiosSecure();

  // Dropzone for thumbnail upload
  const onDropimage = (acceptedFiles) => {
    // Set the state with the URL

    const imagePreview = URL.createObjectURL(acceptedFiles[0]);

    setImagePreview(imagePreview);

    setImage(acceptedFiles[0]);
  };

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
    useDropzone({
      onDrop: onDropimage,
      accept: "image/*",
      multiple: false,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", description);
    formData.append("image", image);

    try {
      const res = await axiosSecure.post(`/custom-pages`, formData);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "About Us Created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setIsShow(false);
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

  const handleSlug = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setTitle(input);
  };

  return (
    <div className="bg-white p-6 pt-4 w-full  rounded-lg">
      {/* Testimonial Edit Form */}
      <h1 className="text-2xl font-semibold mb-7">Edit Custom Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* Left Column - Image Upload */}
          <div className="relative">
            <label className="block text-gray-700 mb-2 mt-3">Image </label>
            <DragEditUploadImageInput
              getRootProps={getImageRootProps}
              getInputProps={getImageInputProps}
              image={image}
              imagePreview={imagePreview}
            />
          </div>
          {/* Right Column - Form Inputs */}
          <div className="space-y-4 mb-6 col-span-full">
            <div>
              <label className="block text-gray-700 mt-3">Title </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleSlug(e.target.value)}
                className="customInput"
                required
              />
            </div>
          </div>
          <div className="space-y-4 mb-6 col-span-full">
            <div>
              <label className="block text-gray-700 mt-3">Slug </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="customInput"
                required
              />
            </div>
          </div>
          <div className="mb-8 col-span-full">
            <label className="block text-gray-700 mb-2">Content</label>
            <CustomEditor
              value={description}
              setValue={setDescription}
              className="customInput min-h-[250px]"
              required
            />
          </div>
        </div>
        <div className="flex justify-end w-full gap-5">
          <button
            type="button"
            className="customSaveButton"
            style={{ backgroundColor: "#E68923" }}
            onClick={() => setIsShow(false)}
          >
            Cancel
          </button>
          <button type="submit" className="customSaveButton">
            Save
          </button>
        </div>
        {/* Save Button */}
      </form>
    </div>
  );
}
