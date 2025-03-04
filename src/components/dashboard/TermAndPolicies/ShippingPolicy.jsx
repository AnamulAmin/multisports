// components/ShippingPolicy.js
import React, { useEffect, useState } from "react";
import CustomEditor from "../../../shared/CustomEditor/CustomEditor";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ShippingPolicy = () => {
  const [content, setContent] = useState("");
  const [targetId, setTargetId] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosSecure.get("/shipping_policy");
      const data = response?.data?.data;

      setContent(data[0]?.content);
      setTargetId(data[0]?._id);
    };

    fetchShippingPolicy();
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to backend)
    try {
      const res = await axiosSecure.post(`/shipping_policy`, {
        content,
        id: targetId,
      });

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Product created successfully",
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

  return (
    <div className="p-6 pt-0">
      <form onSubmit={handleSubmit} className="">
        <h2 className="text-3xl font-semibold mb-9">Shipping Update Form</h2>

        <div className="mb-6">
          <div className="">
            <label className="block text-gray-500 text-lg mb-4">
              Write Shipping Policy Here:
            </label>

            <CustomEditor value={content} setValue={setContent} />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button type="submit" className="customSaveButton">
            Update Terms And Condition
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingPolicy;
