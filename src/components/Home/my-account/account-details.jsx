import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInTop } from "../../utils/motion/fade-in-top";
import Swal from "sweetalert2";
import { useAuth } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const AccountDetails = () => {
  const { user, setUser } = useAuth();
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    displayName: "",
    phoneNumber: "",
    email: "",
    gender: "",
  });

  const [isPending, setIsPending] = useState(false);
  const axiosSecure = useAxiosSecure();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    name, "name", value, "value";
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.first_name) {
      newErrors.firstName = "First name is required";
    }
    if (!formValues.last_name) {
      newErrors.lastName = "Last name is required";
    }
    if (!formValues.displayName) {
      newErrors.displayName = "Display name is required";
    }
    if (!formValues.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formValues.email
      )
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!formValues.gender) {
      newErrors.gender = "Gender is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      "Form submitted:", formValues;
      setErrors({});
      try {
        const response = await axiosSecure.post(
          `/users/update-user/${user?.email}`,
          formValues
        );

        if (response.status === 200 || response.status === 201) {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setIsPending(false);
          Swal.fire({
            title: "Success!",
            text: "Password changed successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        setIsPending(false);
      } catch (error) {
        Swal.fire({
          title: "Oops...",
          text: error?.response?.data?.message || error?.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        setIsPending(false);
      }
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    setFormValues({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      displayName: user?.username || "",
      phoneNumber: user?.phoneNumber || "",
      email: user?.email || "",
      gender: user?.gender || "",
    });
  }, [user]);

  formValues,
    "formValues",
    formValues.gender === "female",
    "formValues.gender === female",
    formValues.gender === "male",
    "formValues.gender === female";

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInTop(0.35)}
      className="w-full flex flex-col px-5"
    >
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        Account Details
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto  flex flex-col justify-center space-y-6 bg-white  rounded-lg p-6"
        noValidate
      >
        {/* First Name and Last Name */}
        <div className="flex flex-col sm:flex-row sm:gap-x-4 space-y-4 sm:space-y-0">
          <div className="w-full sm:w-1/2">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              name="first_name"
              value={formValues.first_name}
              onChange={handleChange}
              placeholder="Enter First Name"
              className="input input-bordered w-full"
            />
            {errors.firstName && (
              <span className="text-error text-sm">{errors.first_name}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              name="last_name"
              value={formValues.last_name}
              onChange={handleChange}
              placeholder="Enter Last Name"
              className="input input-bordered w-full"
            />
            {errors.lastName && (
              <span className="text-error text-sm">{errors.last_name}</span>
            )}
          </div>
        </div>

        {/* Display Name */}
        <div>
          <label className="label">
            <span className="label-text">Display Name</span>
          </label>
          <input
            name="displayName"
            value={formValues.displayName}
            onChange={handleChange}
            placeholder="Enter Display Name"
            className="input input-bordered w-full"
          />
          {errors.displayName && (
            <span className="text-error text-sm">{errors.displayName}</span>
          )}
        </div>

        {/* Phone Number and Email */}
        <div className="flex flex-col sm:flex-row sm:gap-x-4 space-y-4 sm:space-y-0">
          <div className="w-full sm:w-1/2">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="input input-bordered w-full"
            />
            {errors.phoneNumber && (
              <span className="text-error text-sm">{errors.phoneNumber}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <span className="text-error text-sm">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <div className="flex items-center gap-x-6">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formValues.gender === "male"}
                onChange={handleChange}
                className="radio"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formValues.gender === "female"}
                onChange={handleChange}
                className="radio"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
          {errors.gender && (
            <span className="text-error text-sm">{errors.gender}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="btn  w-full sm:w-32"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AccountDetails;
