import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../Hook/useAxiosSecure";

export default function EditBlogCategoryForm({
  targetId,
  setIsShowModal,
  isShowModal,
}) {
  const [blogCategoryName, setBlogCategoryName] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchblogCategoryNameData() {
      try {
        const res = await axiosSecure.get(`/blog-category/${targetId}`);
        const blogCategoryNameData = res?.data?.data;

        // Populate form fields with existing data
        setBlogCategoryName(blogCategoryNameData.name);
      } catch (error) {
        console.error("Error fetching blogCategoryName data:", error);
      }
    }

    if (targetId) {
      fetchblogCategoryNameData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", blogCategoryName);

    try {
      const res = await axiosSecure.put(`/blog-category/${targetId}`, formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "blogCategory Name updated successfully",
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
    setBlogCategoryName("");
  };

  return (
    <div className="w-full bg-gray-100 pb-8 rounded-2xl p-10">
      <div className="">
        <h1 className="text-2xl font-semibold mb-5">
          Edit blog Category Name Form
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Blog Category Name</label>
            <input
              type="text"
              value={blogCategoryName}
              onChange={(e) => setBlogCategoryName(e.target.value)}
              className="customInput"
              placeholder="Model Name"
              required
            />
          </div>

          <div className="flex justify-end mt-7 gap-4">
            <button
              type="button"
              className="customCancelButton"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button type="submit" className="w-full customSaveButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
