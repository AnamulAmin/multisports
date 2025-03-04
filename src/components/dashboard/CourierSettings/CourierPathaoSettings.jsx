import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

// Zod schema for form validation
const schema = z.object({
  baseUrl: z.string().nonempty(" base Url is required"),
  clientId: z.string().nonempty(" Client Id is required"),
  storeId: z.string().nonempty(" Store Id is required"),
  clientSecret: z.string().nonempty(" Client Secret is required"),
  clientEmail: z.string().nonempty(" Client Email is required"),
  clientPassword: z.string().nonempty(" Client Password is required"),
});

const CourierPathaoSettings = () => {
  const axiosSecure = useAxiosSecure();
  const [targetId, setTargetId] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (targetId) {
        const res = await axiosSecure.put(`/courier/pathao/${targetId}`, data);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "General info updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        const res = await axiosSecure.post(`/courier/pathao`, data);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "General info Created successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await axiosSecure.get(`/courier/pathao`);

        if (res.status === 200 || res.status === 201) {
          const data = res?.data?.data[0];

          // Set form values with the testimonial data
          for (let key in data) {
            setValue(key, data[key]);
          }
          setTargetId(data?._id);
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();
  }, [axiosSecure]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-10">
      {/* Section 1: General Information */}
      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-5 md:grid-cols-2">
        {/* Basic Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Base Url:
          </label>
          <input type="text" {...register("baseUrl")} className="customInput" />
          {errors.baseUrl && (
            <span className="text-red-600 text-sm">
              {errors.baseUrl.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Client Id:
          </label>
          <input
            type="text"
            {...register("clientId")}
            className="customInput"
          />
          {errors.clientId && (
            <span className="text-red-600 text-sm">
              {errors.clientId.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Store Id:
          </label>
          <input type="text" {...register("storeId")} className="customInput" />
          {errors.storeId && (
            <span className="text-red-600 text-sm">
              {errors.storeId.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Client Secret:
          </label>
          <input
            type="text"
            {...register("clientSecret")}
            className="customInput"
          />
          {errors.clientSecret && (
            <span className="text-red-600 text-sm">
              {errors.clientSecret.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Client Email:
          </label>
          <input
            type="email"
            {...register("clientEmail")}
            className="customInput"
          />
          {errors.clientEmail && (
            <span className="text-red-600 text-sm">
              {errors.clientEmail.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Client Password:
          </label>
          <input
            type="password"
            {...register("clientPassword")}
            className="customInput"
          />
          {errors.clientPassword && (
            <span className="text-red-600 text-sm">
              {errors.clientPassword.message}
            </span>
          )}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end ">
        <div className="flex  flex-row-reverse gap-5">
          <button
            type="submit"
            disabled={loading}
            className="customSaveButton shadow-xl flex items-center"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner mr-2  loading-xs"></span>
                Updating ..
              </>
            ) : (
              "Update Info"
            )}
          </button>
          <button type="button" className="customCancelButton">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default CourierPathaoSettings;
