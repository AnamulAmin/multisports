import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { set } from "react-hook-form";

const GoogleRecaptcha = ({ isShow }) => {
  const [site_key, setSite_key] = useState("");
  const [secret_key, setSecret_key] = useState("");
  const [targetId, setTargetId] = useState("");
  const [isRecaptcha, setIsRecaptcha] = useState(false);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosSecure.get("/google-recaptcha");
      const data = response?.data?.data;

      setSecret_key(data[0]?.secret_key);
      setSite_key(data[0]?.site_key);
      setTargetId(data[0]?._id);
      setIsRecaptcha(data[0]?.isRecaptcha);
    };

    fetchShippingPolicy();
  }, [axiosSecure, isShow]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (targetId) {
        response = await axiosSecure.put(`/google-recaptcha/${targetId}`, {
          secret_key,
          site_key,
          isRecaptcha,
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Recaptcha updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        response = await axiosSecure.post(`/google-recaptcha`, {
          secret_key,
          site_key,
          isRecaptcha,
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Recaptcha created successfully",
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
      <h3 className="text-2xl text-gray-700 mb-6">Google Analytic</h3>

      <div className="mb-6">
        <label className="block text-gray-700  ">Allow Google Recaptcha</label>
        <select
          className="customInput select"
          value={isRecaptcha}
          onChange={(e) =>
            setIsRecaptcha(e.target.value === "true" ? true : false)
          }
        >
          <option value={false}>Disable Google Recaptcha</option>
          <option value={true}>Enable Google Recaptcha</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700  ">Site Key</label>
        <input
          type="text"
          value={site_key}
          onChange={(e) => setSite_key(e.target.value)}
          className="customInput"
          placeholder="Enter Site Key"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700  ">Secret Key</label>
        <input
          type="text"
          value={secret_key}
          onChange={(e) => setSecret_key(e.target.value)}
          className="customInput"
          placeholder="Enter Secret Key"
        />
      </div>

      <button type="submit" className="customSaveButton w-full">
        Update
      </button>
    </form>
  );
};

export default GoogleRecaptcha;
