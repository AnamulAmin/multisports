import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const MessengerForm = ({ isShow }) => {
  const [pageId, setPageId] = useState("");
  const [appId, setAppId] = useState("");
  const [targetId, setTargetId] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosSecure.get("/messenger");
      const data = response?.data?.data;

      setAppId(data[0]?.appId);
      setPageId(data[0]?.pageId);
      setTargetId(data[0]?._id);
      setIsEnabled(data[0]?.isEnabled);
    };

    fetchShippingPolicy();
  }, [axiosSecure, isShow]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (targetId) {
        response = await axiosSecure.put(`/messenger/${targetId}`, {
          appId,
          pageId,
          isEnabled,
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Messenger updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        response = await axiosSecure.post(`/messenger`, {
          appId,
          pageId,
          isEnabled,
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Messenger created successfully",
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
      <h3 className="text-2xl text-gray-700 mb-6">Messenger</h3>

      <div className="mb-6">
        <label className="block text-gray-700  ">Allow Messenger</label>
        <select
          className="customInput select"
          value={isEnabled}
          onChange={(e) =>
            setIsEnabled(e.target.value === "true" ? true : false)
          }
        >
          <option value={false}>Disable Messenger</option>
          <option value={true}>Enable Messenger</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700  ">Page Id</label>
        <input
          type="text"
          value={pageId}
          onChange={(e) => setPageId(e.target.value)}
          className="customInput"
          placeholder="Enter Page Id"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700  ">App Id</label>
        <input
          type="text"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          className="customInput"
          placeholder="Enter App Id"
        />
      </div>

      <button type="submit" className="customSaveButton w-full">
        Update
      </button>
    </form>
  );
};

export default MessengerForm;
