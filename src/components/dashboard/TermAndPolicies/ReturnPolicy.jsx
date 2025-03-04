// components/ReturnPolicy.js
import React, { useEffect, useState } from "react";
import CustomEditor from "../../../shared/CustomEditor/CustomEditor";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ReturnPolicy = () => {
  const [content, setContent] = useState("");
  const [targetId, setTargetId] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosSecure.get("/return_policy");
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
      const res = await axiosSecure.post(`/return_policy`, {
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
        <div className=" mb-9 flex justify-between">
          <h1 className="text-3xl font-semibold w-full border-l-[5px] border-blue-400 pl-3">Return Policy Update Form</h1>
          <div className="min-w-max">
            <button type="submit" className="customSaveButton">
              Update Terms And Condition
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="">
            <label className="block font-semibold text-gray-600  text-lg  mb-4">
              Write Return Policy Here:
            </label>

            <CustomEditor value={content} setValue={setContent} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReturnPolicy;
