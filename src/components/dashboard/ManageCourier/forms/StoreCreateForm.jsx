import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function StoreCreateForm() {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [contact_name, setContact_name] = useState("");
  const [contact_number, setContact_number] = useState("");
  const [secondary_contact, setSecondary_contact] = useState("");
  const [address, setAddress] = useState("");
  const [city_id, setCity_id] = useState("");
  const [zone_id, setZone_id] = useState("");
  const [area_id, setArea_id] = useState("");
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [errors, setErrors] = useState({});

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!contact_number.trim())
      newErrors.contact_number = "Contact number is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!city_id.trim()) newErrors.city_id = "Please select a city.";
    if (!zone_id.trim()) newErrors.zone_id = "Please select a zone.";
    if (!area_id.trim()) newErrors.area_id = "Please select an area.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire({
        title: "Error!",
        text: "Please fix the validation errors.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      setLoading(false);
      return;
    }

    const submitData = {
      name,
      contact_name,
      contact_number,
      secondary_contact,
      address,
      city_id,
      zone_id,
      area_id,
    };

    try {
      const res = await axiosSecure.post("/courier/store", submitData);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Category created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        // Reset form
        setName("");
        setContact_name("");
        setContact_number("");
        setSecondary_contact("");
        setAddress("");
        setCity_id("");
        setZone_id("");
        setArea_id("");
        setErrors({});
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axiosSecure.get("/courier/cities");
        if (res.status === 200 || res.status === 201) {
          setCities(res.data?.data?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [axiosSecure]);

  useEffect(() => {
    const fetchZones = async () => {
      if (!city_id) return;
      try {
        const res = await axiosSecure.get(`/courier/zones/${city_id}`);
        if (res.status === 200 || res.status === 201) {
          setZones(res.data?.data?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };

    fetchZones();
  }, [axiosSecure, city_id]);

  useEffect(() => {
    const fetchAreas = async () => {
      if (!zone_id) return;
      try {
        const res = await axiosSecure.get(`/courier/area/${zone_id}`);
        if (res.status === 200 || res.status === 201) {
          setAreas(res.data?.data?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, [axiosSecure, zone_id]);

  return (
    <div className="w-full p-6 pt-0">
      <div>
        <h1 className="text-3xl font-semibold mb-9">Store Create Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="customInput"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Contact Name
            </label>
            <input
              type="text"
              value={contact_name}
              onChange={(e) => setContact_name(e.target.value)}
              className="customInput"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Contact Number
            </label>
            <input
              type="text"
              value={contact_number}
              onChange={(e) => setContact_number(e.target.value)}
              className="customInput"
              placeholder="Contact Number"
            />
            {errors.contact_number && (
              <p className="text-red-500 text-sm">{errors.contact_number}</p>
            )}
          </div>
          {/* Contact Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Secondary Contact Number
            </label>
            <input
              type="text"
              value={secondary_contact}
              onChange={(e) => setSecondary_contact(e.target.value)}
              className="customInput"
              placeholder="Contact Number"
            />
            {errors.contact_number && (
              <p className="text-red-500 text-sm">{errors.contact_number}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="customInput"
              placeholder="Address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* Cities */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">City</label>
            <select
              value={city_id}
              onChange={(e) => setCity_id(e.target.value)}
              className="customInput"
            >
              <option value="">Select One</option>
              {cities.length > 0 &&
                cities.map((city) => (
                  <option value={city?.city_id} key={city?.city_id}>
                    {city?.city_name}
                  </option>
                ))}
            </select>
            {errors.city_id && (
              <p className="text-red-500 text-sm">{errors.city_id}</p>
            )}
          </div>

          {/* Zones */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Zone</label>
            <select
              value={zone_id}
              onChange={(e) => setZone_id(e.target.value)}
              className="customInput"
            >
              <option value="">Select One</option>
              {zones.length > 0 &&
                zones.map((zone) => (
                  <option value={zone?.zone_id} key={zone?.zone_id}>
                    {zone?.zone_name}
                  </option>
                ))}
            </select>
            {errors.zone_id && (
              <p className="text-red-500 text-sm">{errors.zone_id}</p>
            )}
          </div>

          {/* Areas */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Area</label>
            <select
              value={area_id}
              onChange={(e) => setArea_id(e.target.value)}
              className="customInput"
            >
              <option value="">Select One</option>
              {areas.length > 0 &&
                areas.map((area) => (
                  <option value={area?.area_id} key={area?.area_id}>
                    {area?.area_name}
                  </option>
                ))}
            </select>
            {errors.area_id && (
              <p className="text-red-500 text-sm">{errors.area_id}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className="customSaveButton"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner mr-2 loading-xs"></span>
                  Creating...
                </>
              ) : (
                "Create Store"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
