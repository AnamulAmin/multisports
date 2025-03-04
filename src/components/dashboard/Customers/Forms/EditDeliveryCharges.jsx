import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../../../providers/AuthProvider";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useGetAllDistrict from "../../../../Hook/GetDataHook/useGetAllDistrict";

function EditDeliveryCharges({ setIsShowModal, isShowModal, targetId }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [districtName, setDistrictName] = useState("");
  const [charge, setCharge] = useState("");
  const [courierCities, setCourierCities] = useState([]);
  const [cityId, setCityId] = useState("");

  useEffect(() => {
    const fetchPaymentMethodData = async () => {
      try {
        const response = await axiosSecure.get(
          `/delivery-charge/${targetId}?branch=${user?.branch}`
        );
        setDistrictName(response.data?.district);
        setCharge(response.data?.charge);
        setCityId(response.data?.district_id);
      } catch (error) {
        console.error("Error fetching payment method data:", error);
      }
    };

    fetchPaymentMethodData();
  }, [axiosSecure, isShowModal, targetId]);

  const handleSubmit = async () => {
    try {
      const response = await axiosSecure.put(`/delivery-charge/${targetId}`, {
        district: districtName,
        district_id: cityId,
        charge: charge,

        branch: user?.branch || "shia",
      });
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Delivery Charge Updated Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setIsShowModal(false);

        setDistrictName("");
        setCharge("");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Something went wrong`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    const fetchCourierCities = async () => {
      try {
        const res = await axiosSecure.get("/courier/cities");

        if (res.status === 200 || res.status === 201) {
          setCourierCities(res.data?.data?.data?.data);
        }
      } catch (error) {
        throw new Error("Failed to fetch courierCities");
      }
    };

    fetchCourierCities();
  }, [axiosSecure]);

  useEffect(() => {
    if (cityId) {
      setDistrictName(
        courierCities.find((item) => item.city_id == cityId)?.city_name
      );
    }
  }, [cityId, courierCities]);

  return (
    <div className="bg-white p-5  md:p-8 rounded-xl mt-36 w-full">
      <h3 className="text-2xl font-semibold mb-7 mt-3 text-nowrap">
        Add Question
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1">District/City </label>
          <select
            name="district"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="customInput select"
          >
            <option value="">Select District</option>
            {courierCities.length > 0 &&
              courierCities.map((item, index) => (
                <option key={index} value={item.city_id}>
                  {item.city_name}
                </option>
              ))}
            {/* Add more options as necessary */}
          </select>
        </div>

        <div className="w-full ">
          <label className="block mb-1">Charge </label>
          <input
            type="number"
            name="charge"
            id="charge"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
            className="customInput"
          />
        </div>
      </div>
      <button className="w-full customSaveButton mt-10" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
}

export default EditDeliveryCharges;
