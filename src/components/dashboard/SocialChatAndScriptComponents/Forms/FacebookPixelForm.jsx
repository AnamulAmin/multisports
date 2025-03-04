import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function FacebookPixelForm({ isShow }) {
  const [pixelId, setPixelId] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [targetId, setTargetId] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosSecure.get("/facebook-pixel");
      const data = response?.data?.data;

      setTargetId(data[0]?._id);
      setIsEnabled(data[0]?.isEnabled);
      setPixelId(data[0]?.pixelId);
    };

    fetchShippingPolicy();
  }, [axiosSecure, isShow]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (targetId) {
        response = await axiosSecure.put(`/facebook-pixel/${targetId}`, {
          isEnabled,
          pixelId,
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Facebook Pixel updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        response = await axiosSecure.post(`/facebook-pixel`, {
          isEnabled,
          pixelId,
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Facebook Pixel created successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
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
    }
  };

  return (
    <div className="w-full rounded-2xl bg-gray-100 p-10">
      <div className="w-full mx-auto ">
        <h1 className="text-2xl text-center text-gray-700 font-semibold mb-9">
          Facebook Pixel
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700  ">
              Allow Facebook Pixel
            </label>
            <select
              className="customInput select"
              value={isEnabled}
              onChange={(e) =>
                setIsEnabled(e.target.value === "true" ? true : false)
              }
            >
              <option value={false}>Disable Facebook Pixel</option>
              <option value={true}>Enable Facebook Pixel</option>
            </select>
          </div>

          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              {/* Size Name */}
            </label>
            <input
              type="text"
              value={pixelId}
              onChange={(e) => setPixelId(e.target.value)}
              className="customInput"
              placeholder="Facebook Pixel ID"
              required
            />
          </div>
          <button type="submit" className="customSaveButton w-full">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
