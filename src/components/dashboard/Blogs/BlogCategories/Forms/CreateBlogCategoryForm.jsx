import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../Hook/useAxiosSecure";

export default function CreateBlogCategoryForm({
  isShowModal,
  setIsShowModal,
}) {
  const [blogCategory, setBlogCategory] = useState("");

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blogCategory) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", blogCategory);

    try {
      const res = await axiosSecure.post("/blog-category", formData);

      if (res.status === 200 || res.status === 201) {
        handleCloseModal();
        Swal.fire({
          title: "Success!",
          text: "blogCategory created successfully",
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
    setBlogCategory("");
  };

  return (
    <div className="w-full rounded-2xl bg-gray-100 pb-8 p-10">
      <div className="">
        <h1 className="text-2xl font-semibold mb-5">
          Create blog Category Form
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              value={blogCategory}
              onChange={(e) => setBlogCategory(e.target.value)}
              className="customInput"
              placeholder="Model Name"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4  mt-7">
            <button
              type="button"
              className="customCancelButton"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>

            <button type="submit" className="customSaveButton w-full">
              Save blogCategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
