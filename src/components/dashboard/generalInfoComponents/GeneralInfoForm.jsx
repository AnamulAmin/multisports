import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

// Zod schema for form validation
const schema = z.object({
  company_name: z.string().nonempty("Company Name is required"),
  phone: z.string().nonempty("Phone Number is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  description: z.string().nonempty("Short Description is required"),
  address: z.string().nonempty("Company Address is required"),
  google_map_link: z.string().optional(),
  play_store_link: z.string().optional(),
  app_store_link: z.string().optional(),
  trade_license: z.string().nonempty("Trade License No is required"),
  tin_no: z.string().nonempty("TIN No is required"),
  bin_no: z.string().nonempty("BIN No is required"),
  footer_copyright: z.string().nonempty("Footer Text is required"),
});

const GeneralInfoForm = () => {
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
        const res = await axiosSecure.put(`/general-info/${targetId}`, data);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "General info updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        const res = await axiosSecure.post(`/general-info`, data);
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
        const res1 = await axiosSecure.get(`/general-info`);
        const existingData = res1?.data?.data[0];
        const res = await axiosSecure.get(`/general-info/${existingData._id}`);

        if (res.status === 200 || res.status === 201) {
          const data = res?.data?.data;

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Section 1: General Information */}
      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-5 md:grid-cols-2">
        {/* Basic Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            {...register("company_name")}
            className="customInput"
          />
          {errors.company_name && (
            <span className="text-red-600 text-sm">
              {errors.company_name.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input type="text" {...register("phone")} className="customInput" />
          {errors.phone && (
            <span className="text-red-600 text-sm">{errors.phone.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Email
          </label>
          <input type="email" {...register("email")} className="customInput" />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <input
            type="text"
            {...register("description")}
            className="customInput"
          />
          {errors.description && (
            <span className="text-red-600 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Address
          </label>
          <input type="text" {...register("address")} className="customInput" />
          {errors.address && (
            <span className="text-red-600 text-sm">
              {errors.address.message}
            </span>
          )}
        </div>

        {/* Links */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Google Map Link
          </label>
          <input
            type="text"
            {...register("google_map_link")}
            className="customInput"
          />
          {errors.google_map_link && (
            <span className="text-red-600 text-sm">
              {errors.google_map_link.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Play Store Link
          </label>
          <input
            type="text"
            {...register("play_store_link")}
            className="customInput"
          />
          {errors.play_store_link && (
            <span className="text-red-600 text-sm">
              {errors.play_store_link.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            App Store Link
          </label>
          <input
            type="text"
            {...register("app_store_link")}
            className="customInput"
          />
          {errors.app_store_link && (
            <span className="text-red-600 text-sm">
              {errors.app_store_link.message}
            </span>
          )}
        </div>

        {/* Official Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Trade License No
          </label>
          <input
            type="text"
            {...register("trade_license")}
            className="customInput"
          />
          {errors.trade_license && (
            <span className="text-red-600 text-sm">
              {errors.trade_license.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            TIN No
          </label>
          <input type="text" {...register("tin_no")} className="customInput" />
          {errors.tin_no && (
            <span className="text-red-600 text-sm">
              {errors.tin_no.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            BIN No
          </label>
          <input type="text" {...register("bin_no")} className="customInput" />
          {errors.bin_no && (
            <span className="text-red-600 text-sm">
              {errors.bin_no.message}
            </span>
          )}
        </div>

        {/* Footer */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Footer Copyright Text
          </label>
          <input
            type="text"
            {...register("footer_copyright")}
            className="customInput"
          />
          {errors.footer_copyright && (
            <span className="text-red-600 text-sm">
              {errors.footer_copyright.message}
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

export default GeneralInfoForm;
