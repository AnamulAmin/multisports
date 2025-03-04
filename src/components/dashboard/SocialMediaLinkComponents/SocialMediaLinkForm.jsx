import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaFacebookMessenger, FaViber } from "react-icons/fa6";
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";
import { TfiLinkedin, TfiPinterest } from "react-icons/tfi";
import { LiaTelegramPlane } from "react-icons/lia";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FaTiktok } from "react-icons/fa";

export default function SocialMediaLinksForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [targetId, setTargetId] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      if (targetId) {
        const res = await axiosSecure.put(`/social-link/${targetId}`, data);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Social media links updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        const res = await axiosSecure.post(`/social-link`, data);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Social media links Created successfully",
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
        const firstResData = await axiosSecure.get(`/social-link`);
        const res = await axiosSecure.get(
          `/social-link/${firstResData?.data?.data[0]?._id}`
        );

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
  }, [axiosSecure, setValue]);

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-6 pt-0 rounded-lg"
      >
        <h2 className="text-3xl font-semibold header mb-9">
          Update Social Media Links
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:gap-5">
          {/* Facebook */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <BsFacebook />
                Facebook Page Link
              </span>
            </label>
            <input
              type="text"
              {...register("facebook")}
              className="customInput"
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <BsTwitterX />
                Twitter Link
              </span>
            </label>
            <input
              type="text"
              {...register("twitter")}
              className="customInput"
            />
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <BsInstagram />
                Instagram Link
              </span>
            </label>
            <input
              type="text"
              {...register("instagram")}
              className="customInput"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <TfiLinkedin />
                LinkedIn Profile
              </span>
            </label>
            <input
              type="text"
              {...register("linkedin")}
              className="customInput"
            />
          </div>

          {/* Messenger */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <FaFacebookMessenger />
                Messenger
              </span>
            </label>
            <input
              type="text"
              {...register("messenger")}
              className="customInput"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <BsWhatsapp />
                WhatsApp
              </span>
            </label>
            <input
              type="text"
              {...register("whatsapp")}
              className="customInput"
            />
          </div>

          {/* Telegram */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <LiaTelegramPlane />
                Telegram
              </span>
            </label>
            <input
              type="text"
              {...register("telegram")}
              className="customInput"
            />
          </div>

          {/* YouTube */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <TbBrandYoutubeFilled />
                YouTube Channel Link
              </span>
            </label>
            <input
              type="text"
              {...register("youtube")}
              className="customInput"
            />
          </div>

          {/* TikTok */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <FaTiktok />
                TikTok
              </span>
            </label>
            <input
              type="text"
              {...register("tiktok")}
              className="customInput"
            />
          </div>

          {/* Pinterest */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <TfiPinterest />
                Pinterest Link
              </span>
            </label>
            <input
              type="text"
              {...register("pinterest")}
              className="customInput"
            />
          </div>

          {/* Viber */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <FaViber />
                Viber
              </span>
            </label>
            <input type="text" {...register("viber")} className="customInput" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-5 mt-8">
          <button type="button" className="customCancelButton">
            Cancel
          </button>
          <button disabled={loading} type="submit" className="customSaveButton">
            {loading ? (
              <>
                <span className="loading loading-spinner mr-2 loading-xs"></span>
                Updating ..
              </>
            ) : (
              "Update Links"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
