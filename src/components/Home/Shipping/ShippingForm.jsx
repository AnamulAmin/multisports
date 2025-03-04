import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { AiOutlineLoading } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";

const ShippingForm = ({
  setShippingAddress,
  shippingAddress,
  isShowModal,
  setIsShowModal,
}) => {
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [zoneLoading, setZoneLoading] = useState(false);
  const [areaLoading, setAreaLoading] = useState(false);

  // Individual states for each input field
  const [city_id, setCityId] = useState("");
  const [city_name, setCityName] = useState("");
  const [zone_id, setZoneId] = useState("");
  const [zone_name, setZoneName] = useState("");
  const [area_id, setAreaId] = useState("");
  const [area_name, setAreaName] = useState("");
  const [recipientName, setRecipientName] = useState(
    shippingAddress?.recipientName || ""
  );
  const [contact_number, setContactNumber] = useState(
    shippingAddress?.contact_number || ""
  );
  const [district, setDistrict] = useState(shippingAddress?.district || "");
  const [area, setArea] = useState(shippingAddress?.area || "");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [postCode, setPostCode] = useState(shippingAddress?.postCode || "");

  const [special_instruction, setSpecialInstruction] = useState("");

  const [errors, setErrors] = useState({});
  const axiosSecure = useAxiosSecure();

  const validateForm = () => {
    let formErrors = {};
    if (!recipientName) formErrors.recipientName = "Recipient Name is required";
    if (!contact_number)
      formErrors.contact_number = "Contact Number is required";
    if (!city_id) formErrors.cityId = "City selection is required";
    if (!zone_id) formErrors.zoneId = "Zone selection is required";
    if (!address) formErrors.address = "Address is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        city_id,
        city_name,
        zone_id,
        zone_name,
        area_id,
        area_name,
        recipientName,
        contact_number,
        district,
        area,
        address: address + ", " + postCode,
        postCode,
        special_instruction,
      };

      localStorage.setItem("shippingAddress", JSON.stringify(formData));
      setShippingAddress(formData);
      setIsShowModal(false);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axiosSecure.get("/district");
        if (res.status === 200 || res.status === 201) {
          setCities(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCities();
  }, [axiosSecure]);

  useEffect(() => {
    const fetchZones = async () => {
      if (!city_id) return;
      try {
        setZoneLoading(true);
        const res = await axiosSecure.get(`/zones/by_city/${city_id}`);
        if (res.status === 200 || res.status === 201) {
          setZones(res.data);
        }
        setZoneLoading(false);
      } catch (error) {
        setZoneLoading(false);
      }
    };

    fetchZones();
  }, [axiosSecure, city_id]);

  useEffect(() => {
    const fetchAreas = async () => {
      if (!zone_id) return;
      try {
        setAreaLoading(true);
        const res = await axiosSecure.get(`/areas/by_zone/${zone_id}`);
        if (res.status === 200 || res.status === 201) {
          setAreas(res.data);
        }
        setAreaLoading(false);
      } catch (error) {
        setAreaLoading(false);
      }
    };

    fetchAreas();
  }, [axiosSecure, zone_id]);

  useEffect(() => {
    if (isShowModal) {
      setRecipientName(shippingAddress.recipientName);
      setContactNumber(shippingAddress.contact_number);
      setAddress(shippingAddress.address);
      setCityId(shippingAddress.city_id);
      setCityName(shippingAddress.city_name);
      setZoneId(shippingAddress.zone_id);
      setZoneName(shippingAddress.zone_name);
      setAreaId(shippingAddress.area_id);
      setAreaName(shippingAddress.area_name);
    }
  }, [isShowModal, shippingAddress]);

  return (
    <div className="w-full mx-auto mt-6 md:mt-0 p-6 border rounded-md mb-12 bg-white shadow-lg relative">
      <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>

      {isShowModal && (
        <button
          className="absolute top-4 right-4  text-gray-500 hover:text-gray-700 focus:outline-none border rounded-full"
          onClick={() => setIsShowModal(false)}
        >
          <IoIosClose size={28} />
        </button>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recipient Name */}
          <div>
            <label className="block font-semibold mb-1">Recipient Name *</label>
            <input
              type="text"
              name="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Full Name"
              className="border outline-none mt-2 p-2 w-full rounded-lg"
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
              value={contact_number}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Mobile Number"
              className="border outline-none mt-2 p-2 w-full rounded-lg"
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
                    value={secondaryContactNumber}
                    onChange={handleInputChange}
                    placeholder="Mobile Number"
                    className="border outline-none mt-2 p-2 w-full rounded-lg"
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
              value={city_id}
              onChange={(e) => {
                const filter_name = cities.find(
                  (city) => city.city_id == e.target.value
                ).city_name;

                setCityId(e.target.value);
                setCityName(filter_name);
              }}
              className="border outline-none mt-2 p-2 w-full rounded-lg"
            >
              <option value="">Select District/City Name</option>
              {cities.length > 0 &&
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
          <div>
            <label className="block font-semibold mb-1">Zone *</label>
            {!zoneLoading ? (
              <select
                name="zone_id"
                value={zone_id}
                onChange={(e) => {
                  const filter_name = zones.find(
                    (zone) => zone.zone_id == e.target.value
                  ).zone_name;
                  setZoneName(filter_name);
                  setZoneId(e.target.value);
                }}
                className="border outline-none mt-2 p-2 w-full rounded-lg"
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
              <div className="flex justify-center items-center mt-3 rounded-lg border py-3">
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
            // {!areaLoading && areas?.length > 0 ? (
              <select
                name="area_id"
                value={area_id}
                onChange={(e) => {
                  const filter_name = areas.find(
                    (area) => area.area_id == e.target.value
                  ).area_name;
                  setAreaId(e.target.value);
                  setAreaName(filter_name);
                }}
                className="border outline-none mt-2 p-2 w-full rounded-lg"
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
              <div className="flex justify-center items-center border py-3 mt-3 rounded-lg">
                <AiOutlineLoading className="animate-spin text-gray-500" />
              </div>
            )}
            {areas.length === 0 && zone_id && (
              <p className="text-blue-500 text-sm mt-1 text-right">
                No Area Found
              </p>
            )}
            {errors.area_id && (
              <p className="text-red-500 text-sm mt-1">{errors.area_id}</p>
            )}
          </div>

          {/* Post Code */}
          <div>
            <label className="block font-semibold mb-1">Post Code *</label>
            <input
              type="text"
              name="postCode"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
              placeholder="Post Code"
              className="border outline-none mt-2 p-2 w-full rounded-lg"
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House / Building / Street"
              className="border outline-none mt-2 p-2 w-full rounded-lg"
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
              value={special_instruction}
              onChange={(e) => setSpecialInstruction(e.target.value)}
              placeholder=" Special Instruction"
              className="border outline-none mt-2 p-2 w-full rounded-lg min-h-[150px]"
            />
            {errors.special_instruction && (
              <p className="text-red-500 text-sm mt-1">
                {errors.special_instruction}
              </p>
            )}
          </div>

          {/* Delivery Type */}
          {/* <div className="md:col-span-2">
                  <label className="block font-semibold mb-1">Select Effective Delivery *</label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="Home"
                        checked={formData.deliveryType === 'Home'}
                        onChange={handleInputChange}
                        className="form-radio text-indigo-600"
                      />
                      <span className="ml-2">Home</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="Office"
                        checked={formData.deliveryType === 'Office'}
                        onChange={handleInputChange}
                        className="form-radio text-indigo-600"
                      />
                      <span className="ml-2">Office</span>
                    </label>
                  </div>
                </div> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
