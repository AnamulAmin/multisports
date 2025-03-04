import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

// Zod schema for form validation
const schema = z.object({
  baseUrl: z.string().nonempty(" Base Url is required"),
  apiKey: z.string().nonempty(" Api Key is required"),
  secretKey: z.string().nonempty(" Secret Key is required"),
});

const CourierSteadFastSettings = () => {
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
        const res = await axiosSecure.put(
          `/courier/stead_fast/${targetId}`,
          data
        );
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "General info updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        const res = await axiosSecure.post(`/courier/stead_fast`, data);
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
        const res = await axiosSecure.get(`/courier/stead_fast`);

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
            Api Key:
          </label>
          <input type="text" {...register("apiKey")} className="customInput" />
          {errors.apiKey && (
            <span className="text-red-600 text-sm">
              {errors.apiKey.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Secret Key:
          </label>
          <input
            type="text"
            {...register("secretKey")}
            className="customInput"
          />
          {errors.secretKey && (
            <span className="text-red-600 text-sm">
              {errors.secretKey.message}
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

export default CourierSteadFastSettings;
