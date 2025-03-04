import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function EditProductColorForm({
  targetId,
  setIsShowModal,
  isShowModal,
}) {
  const [productColor, setProductColor] = useState("");
  const [productColorName, setProductColorName] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchproductColorData() {
      try {
        const res = await axiosSecure.get(`/product-color/${targetId}`);
        const productColorData = res?.data?.data;

        // Populate form fields with existing data
        setProductColor(productColorData.productColor);
        setProductColorName(productColorData.productColorName);
      } catch (error) {
        console.error("Error fetching productColor data:", error);
      }
    }

    if (targetId) {
      fetchproductColorData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productColor", productColor);
    formData.append("productColorName", productColorName);

    try {
      const res = await axiosSecure.put(`/product-color/${targetId}`, formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Product Color updated successfully",
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
    setProductColor("");
  };

  return (
    <div className="w-full mt-20 rounded-2xl bg-gray-100 p-10">
      <div className="w-full mx-auto ">
        <h1 className="text-2xl font-semibold mb-9">Edit Product Color Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm ">
              Product Color Code
            </label>
            <input
              type="text"
              value={productColor}
              onChange={(e) => setProductColor(e.target.value)}
              className="customInput"
              placeholder="Model Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm ">
              Product Color Name
            </label>
            <input
              type="text"
              value={productColorName}
              onChange={(e) => setProductColorName(e.target.value)}
              className="customInput"
              placeholder="Model Name"
              required
            />
          </div>

          <div className="flex mt-6 gap-3">
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
