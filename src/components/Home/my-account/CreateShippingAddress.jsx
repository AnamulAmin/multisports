import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { AiOutlineLoading } from "react-icons/ai";
import { useAuth } from "../../../providers/AuthProvider";
import { IoIosClose } from "react-icons/io";

const CreateShippingAddress = ({
  isShowModal,
  setIsShowModal,
  addressData,
}) => {
  const { user } = useAuth();
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [zoneLoading, setZoneLoading] = useState(false);
  const [areaLoading, setAreaLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [formData, setFormData] = useState({
    recipient_name: "",
    contact_number: "",
    city_id: "",
    city_name: "",
    zone_name: "",
    area_name: "",
    zone_id: "",
    area_id: "",
    address: "",
    postCode: "",
    special_instruction: "",
  });

  const [errors, setErrors] = useState({});

  const axiosSecure = useAxiosSecure();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "city_id") {
      const filter_name = cities.find(
        (city) => city.city_id == value
      ).city_name;

      setFormData({
        ...formData,
        city_name: filter_name,
        city_id: value,
      });

      return;
    } else if (name === "zone_id") {
      const filter_name = zones.find(
        (zone) => zone.zone_id == value
      )?.zone_name;

      setFormData({
        ...formData,
        zone_name: Array.isArray(filter_name) ? filter_name[0] : filter_name,
        zone_id: value,
      });
      return;
    } else if (name === "area_id") {
      const filter_name = areas.find((area) => area.area_id == value).area_name;

      setFormData({
        ...formData,
        area_name: filter_name,
        area_id: value,
      });

      return;
    }

    if (name === "contact_number") {
      value === formData.secondaryContactNumber &&
        setErrors((prev) => ({
          ...prev,
          contact_number:
            "Secondary Contact Number should not be same as Primary Contact Number",
        }));
    } else if (name === "secondaryContactNumber") {
      value === formData.contact_number &&
        setErrors((prev) => ({
          ...prev,
          secondaryContactNumber:
            "Secondary Contact Number should not be same as Primary Contact Number",
        }));
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.recipientName)
      formErrors.recipientName = "Recipient Name is required";
    if (!formData.contact_number)
      formErrors.contact_number = "Contact Number is required";
    if (!formData.city_id) formErrors.city_id = "City selection is required";
    if (!formData.zone_id) formErrors.zone_id = "City selection is required";
    if (!formData.address) formErrors.address = "Address is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      formData.email = user.email;
      formData.userId = user._id;
      formData.address = formData.address + ", " + formData.postCode;

      try {
        if (addressData) {
          const response = await axiosSecure.put(
            `/shipping/${addressData._id}`,
            formData
          );
          console.log(response, "response");
          if (response.status === 200 || response.status === 201) {
            setIsPending(false);
            Swal.fire({
              title: "Success!",
              text: "Address Created Successfully!",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
          setIsPending(false);
        } else {
          const response = await axiosSecure.post(`/shipping`, formData);
          console.log(response, "response");
          if (response.status === 200 || response.status === 201) {
            setIsPending(false);
            Swal.fire({
              title: "Success!",
              text: "Address Created Successfully!",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
          setIsPending(false);
        }
      } catch (error) {
        console.log(error, "error");
        Swal.fire({
          title: "Oops...",
          text: error?.response?.data?.message || error?.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        setIsPending(false);
      }

      setFormData({
        ...formData,
        recipientName: "",
        contactNumber: "",
        district: "",
        area: "",
        address: "",
        postCode: "",
        deliveryType: "",
      });

      setIsShowModal(false);
      return;

      // formData.userId = user._id;
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axiosSecure.get("/district");
        // const res = await axiosSecure.get("/courier/cities");
        if (res.status === 200 || res.status === 201) {
          setCities(res.data);
          // setCities(res.data?.data?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [axiosSecure, isShowModal]);

  useEffect(() => {
    const fetchZones = async () => {
      if (!formData.city_id) return;
      try {
        setZoneLoading(true);
        // const res = await axiosSecure.get(`/courier/zones/${formData.city_id}`);
        const res = await axiosSecure.get(`/zones/by_city/${formData.city_id}`);
        if (res.status === 200 || res.status === 201) {
          setZones(res.data);
          // setZones(res.data?.data?.data?.data);
          setZoneLoading(false);
        }
        setZoneLoading(false);
      } catch (error) {
        setZoneLoading(false);
      }
    };

    fetchZones();
  }, [axiosSecure, formData.city_id]);

  useEffect(() => {
    const fetchAreas = async () => {
      if (!formData.zone_id) return;
      try {
        setAreaLoading(true);
        // const res = await axiosSecure.get(`/courier/area/${formData.zone_id}`);
        const res = await axiosSecure.get(`/areas/by_zone/${formData.zone_id}`);
        if (res.status === 200 || res.status === 201) {
          setAreas(res.data?.data?.data?.data);
          setAreas(res.data);
          setAreaLoading(false);
        }
        setAreaLoading(false);
      } catch (error) {
        setAreaLoading(false);
      }
    };

    fetchAreas();
  }, [axiosSecure, formData.zone_id]);

  useEffect(() => {
    if (isShowModal && addressData) {
      console.log(addressData, "addressData");
      setFormData(addressData);
    }
  }, [isShowModal, addressData]);

  return (
    <div className="w-full  mx-auto p-6 rounded-md mb-12 bg-white relative">
      <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
      <button
        className="absolute top-4 right-4  text-gray-500 hover:text-gray-700 focus:outline-none border rounded-full"
        onClick={() => setIsShowModal(false)}
      >
        <IoIosClose size={28} />
      </button>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recipient Name */}
          <div>
            <label className="block font-semibold mb-1">Recipient Name *</label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border p-2 w-full rounded"
            />
            {errors.recipientName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.recipientName}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block font-semibold mb-1">Contact Number *</label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="border p-2 w-full rounded"
            />
            {errors.contact_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact_number}
              </p>
            )}
          </div>
          {/* <div>
            <label className="block font-semibold mb-1">
              Secondary Contact Number *
            </label>
            <input
              type="text"
              name="secondaryContactNumber"
              value={formData.secondaryContactNumber}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="border p-2 w-full rounded"
            />
            {errors.secondaryContactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.secondaryContactNumber}
              </p>
            )}
          </div> */}

          {/* District/City */}
          <div>
            <label className="block font-semibold mb-1">District/City *</label>
            <select
              name="city_id"
              value={formData.city_id}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Select District/City Name</option>
              {cities?.length > 0 &&
                cities.map((item, index) => (
                  <option key={index} value={item.city_id}>
                    {item.city_name}
                  </option>
                ))}
              {/* Add more options as necessary */}
            </select>
            {errors.city_id && (
              <p className="text-red-500 text-sm mt-1">{errors.city_id}</p>
            )}
          </div>

          {/* Area/Thana/Upazilla */}
          <div
            className={`${
              zones.length === 0 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <label className="block font-semibold mb-1">Zone *</label>
            {!zoneLoading ? (
              <select
                name="zone_id"
                value={formData.zone_id}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              >
                <option value="">Select Zone</option>
                {zones?.length > 0 &&
                  zones.map((item, index) => (
                    <option key={index} value={item.zone_id}>
                      {item?.zone_name}
                    </option>
                  ))}
                {/* Add more options as necessary */}
              </select>
            ) : (
              <div className="flex justify-center items-center border py-2">
                <AiOutlineLoading className="animate-spin text-gray-500" />
              </div>
            )}
            {errors.zone_id && (
              <p className="text-red-500 text-sm mt-1">{errors.zone_id}</p>
            )}
          </div>
          {/* Area/Thana/Upazilla */}
          <div
            className={`${
              areas.length === 0 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <label className="block font-semibold mb-1">Area *</label>

            {!areaLoading ? (
              <select
                name="area_id"
                value={formData.area_id}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              >
                <option value="">Select Area</option>
                {areas?.length > 0 &&
                  areas.map((item, index) => (
                    <option key={index} value={item.area_id}>
                      {item?.area_name}
                    </option>
                  ))}
                {/* Add more options as necessary */}
              </select>
            ) : (
              <div className="flex justify-center items-center border py-2">
                <AiOutlineLoading className="animate-spin text-gray-500" />
              </div>
            )}
            {areas.length === 0 && formData.zone_id && (
              <p className="text-blue-500 text-sm mt-1 text-right">
                No Area Found
              </p>
            )}
          </div>

          {/* Post Code */}
          <div>
            <label className="block font-semibold mb-1">Post Code </label>
            <input
              type="text"
              name="postCode"
              value={formData.postCode}
              onChange={handleInputChange}
              placeholder="Post Code"
              className="border p-2 w-full rounded"
            />
            {errors.postCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="House / Building / Street"
              className="border p-2 w-full rounded"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">
              Special Instruction *
            </label>
            <textarea
              type="text"
              name="special_instruction"
              value={formData.special_instruction}
              onChange={handleInputChange}
              placeholder=" Special Instruction"
              className="border p-2 w-full rounded min-h-[150px]"
            />
            {errors.special_instruction && (
              <p className="text-red-500 text-sm mt-1">
                {errors.special_instruction}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 mr-5"
        >
          Submit
        </button>
        <button
          type="button"
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          onClick={() => setIsShowModal(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateShippingAddress;
