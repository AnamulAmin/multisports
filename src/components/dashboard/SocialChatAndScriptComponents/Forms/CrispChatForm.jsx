import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const CrispChatForm = ({ isShow }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [code, setCode] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosSecure.get("/crisp-live-chat");
      const data = response?.data?.data;

      setTargetId(data[0]?._id);
      setIsEnabled(data[0]?.isEnabled);
      setCode(data[0]?.code);
    };

    fetchShippingPolicy();
  }, [axiosSecure, isShow]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (targetId) {
        response = await axiosSecure.put(`/crisp-live-chat/${targetId}`, {
          isEnabled,
          code,
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Crisp Live Chat updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        response = await axiosSecure.post(`/crisp-live-chat`, {
          isEnabled,
          code,
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Crisp Live Chat created successfully",
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
      <h3 className="text-2xl text-gray-700 mb-6">Crisp Live Chat</h3>

      <div className="mb-6">
        <label className="block text-gray-700  ">Allow Crisp Live Chat</label>
        <select
          className="customInput select"
          value={isEnabled}
          onChange={(e) =>
            setIsEnabled(e.target.value === "true" ? true : false)
          }
        >
          <option value={false}>Disable Crisp Live Chat</option>
          <option value={true}>Enable Crisp Live Chat</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700  ">Crisp Code</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="customInput min-h-[300px]"
          placeholder="Enter Crisp Live Chat ID"
        />
      </div>

      <button type="submit" className="customSaveButton w-full">
        Update
      </button>
    </form>
  );
};

export default CrispChatForm;
