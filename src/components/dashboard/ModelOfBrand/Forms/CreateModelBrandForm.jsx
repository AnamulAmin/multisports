import { useState } from "react";
import Swal from "sweetalert2";
import useGetAllProductBrands from "../../../../Hook/GetDataHook/useGetAllProductBrands";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function CreateModelBrandForm({ isShowModal, setIsShowModal }) {
  const [brand, setBrand] = useState("");
  const [modelName, setModelName] = useState("");
  const [code, setCode] = useState("");
  const productBrands = useGetAllProductBrands({ isShowModal });
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!brand || !modelName || !code) {
    //   Swal.fire({
    //     title: "Error!",
    //     text: "Please fill all the fields",
    //     icon: "error",
    //     confirmButtonText: "Ok",
    //   });
    //   return;
    // }

    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("modelName", modelName);
    formData.append("code", code);

    setLoading(true);

    try {
      const res = await axiosSecure.post("/model-brands", formData);

      if (res.status === 200 || res.status === 201) {
        handleCloseModal();
        Swal.fire({
          title: "Success!",
          text: "Model of Brand created successfully",
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

  const handleCloseModal = () => {
    setIsShowModal(false);
    setBrand("");
    setModelName("");
    setCode("");
  };

  return (
    <div className="w-full bg-gray-100 p-10 rounded-2xl mt-20">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Create Brand Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Brand Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Brand *
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Brand</option>
              {productBrands.map((brand) => (
                <option key={brand._id} value={brand.slug}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>

          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Model Name *
            </label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Model Name"
              required
            />
          </div>

          {/* Code */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Code *</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Code"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-4"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner mr-2  loading-xs"></span>
              )}
              Save Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
