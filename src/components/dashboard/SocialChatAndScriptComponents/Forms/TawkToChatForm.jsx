import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const TawkToChatForm = ({ isShow }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [code, setCode] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosSecure.get("/tawk-live-chat");
      const data = response?.data?.data;

      setTargetId(data[0]?._id);
      setIsEnabled(data[0]?.isEnabled);
      setCode(data[0]?.code);
      data, "a";
    };

    fetchShippingPolicy();
  }, [axiosSecure, isShow]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (targetId) {
        response = await axiosSecure.put(`/tawk-live-chat/${targetId}`, {
          isEnabled,
          code,
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Tawk.to updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        response = await axiosSecure.post(`/tawk-live-chat`, {
          isEnabled,
          code,
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Tawk.to created successfully",
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
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl text-gray-700 mb-6">Tawk.to Live Chat</h3>

      <div className="mb-6">
        <label className="block text-gray-700  ">Allow Tawk.to Live Chat</label>
        <select
          className="customInput select"
          value={isEnabled}
          onChange={(e) =>
            setIsEnabled(e.target.value === "true" ? true : false)
          }
        >
          <option value={false}>Disable Tawk.to Live Chat</option>
          <option value={true}>Enable Tawk.to Live Chat</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700  ">Tawk.to Code</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="customInput min-h-[300px]"
          placeholder="Enter Tawk.to Live Chat ID"
        />
      </div>

      <button type="submit" className="customSaveButton w-full">
        Update
      </button>
    </form>
  );
};

export default TawkToChatForm;
