import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function CreateProductColorForm({
  isShowModal,
  setIsShowModal,
}) {
  const [productColor, setProductColor] = useState("");
  const [productColorName, setProductColorName] = useState("");

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    productColor, "productColor";

    if (!productColor) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formData = new FormData();
    formData.append("productColor", productColor);
    formData.append("productColorName", productColorName);

    try {
      const res = await axiosSecure.post("/product-color", formData);

      if (res.status === 200 || res.status === 201) {
        handleCloseModal();
        Swal.fire({
          title: "Success!",
          text: "Product color created successfully",
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
    setProductColor("");
  };

  return (
    <div className="w-full mt-20 rounded-2xl bg-gray-100 p-10">
      <div className="w-full mx-auto ">
        <h1 className="text-2xl font-semibold text-center mb-9">
          Create Product Color{" "}
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">
              Product Color Code
            </label>
            <input
              type="text"
              value={productColor}
              onChange={(e) => setProductColor(e.target.value)}
              className="customInput"
              // placeholder="Product Color Code "
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">
              Product Color Name
            </label>
            <input
              type="text"
              value={productColorName}
              onChange={(e) => setProductColorName(e.target.value)}
              className="customInput"
              // placeholder="Product Color Name "
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6 gap-3">
            <button
              type="button"
              className="customCancelButton"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>

            <button type="submit" className="customSaveButton w-full">
              Save Product Color
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
