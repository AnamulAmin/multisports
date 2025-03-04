import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useGetAllProductBrands from "../../../../Hook/GetDataHook/useGetAllProductBrands";
import SwitchInput from "../../../../shared/SwitchInput";

export default function EditModelBrandForm({
  targetId,
  setIsShowModal,
  isShowModal,
}) {
  const [brand, setBrand] = useState("");
  const [modelName, setModelName] = useState("");
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [code, setCode] = useState("");
  const axiosSecure = useAxiosSecure();
  const productBrands = useGetAllProductBrands({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBrandData() {
      try {
        const res = await axiosSecure.get(`/model-brands/${targetId}`);
        const brandData = res?.data?.data;

        // Populate form fields with existing data
        setBrand(brandData.brand);
        setModelName(brandData.modelName);
        setSlug(brandData.slug);
        setIsActive(brandData.isActive);
        setCode(brandData.code);
      } catch (error) {
        console.error("Error fetching brand data:", error);
      }
    }

    if (targetId) {
      fetchBrandData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("modelName", modelName);
    formData.append("code", code);

    setLoading(true);

    try {
      const res = await axiosSecure.put(`/model-brands/${targetId}`, formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Model of Brand updated successfully",
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

  const handleCloseModal = () => {
    setIsShowModal(false);
    setBrand("");
    setModelName("");
    setSlug("");
    setIsActive(false);
    setCode("");
  };

  const handleModelNameInput = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setModelName(input);
  };

  return (
    <div className="w-full mt-20 rounded-2xl bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Edit Model Of Brand Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Brand */}
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
              onChange={(e) => handleModelNameInput(e.target.value)}
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

          <div className="flex justify-end mt-4 gap-6">
            <button
              type="button"
              className="w-full p-3 bg-gray-500 text-white font-bold rounded-md"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-bold rounded-md"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner mr-2  loading-xs"></span>
              )}
              Update Model Of Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
