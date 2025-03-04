import DragEditUploadImageInput from "../../../shared/DragEditUploadImageInput";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function SeoForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [targetId, setTargetId] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDropThumbnail = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setThumbnailPreview(previewUrl);
    setThumbnail(acceptedFiles[0]);
  };

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    onDrop: onDropThumbnail,
    accept: "image/*",
    multiple: false,
  });

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("metaTitle", data.metaTitle);
    formData.append("metaDescription", data.metaDescription);
    formData.append("metaKeywords", data.metaKeywords);
    formData.append("metaOgTitle", data.metaOgTitle);
    formData.append("metaOgDescription", data.metaOgDescription);
    formData.append("metaOgImage", thumbnail);
    try {
      if (targetId) {
        const res = await axiosSecure.put(`/website-seo/${targetId}`, formData);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Meta updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        const res = await axiosSecure.post(`/website-seo`, formData);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Meta Created successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      }
    } catch (err) {
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
        const firstResData = await axiosSecure.get(`/website-seo`);
        const res = await axiosSecure.get(
          `/website-seo/${firstResData?.data?.data[0]?._id}`
        );

        if (res.status === 200 || res.status === 201) {
          const data = res?.data?.data;

          // Set form values with the testimonial data
          for (let key in data) {
            setValue(key, data[key]);
          }
          setThumbnailPreview(data?.metaOgImage);
          setTargetId(data?._id);
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();
  }, [axiosSecure, setValue]);

  return (
    <div className="w-full ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-6 pt-0 rounded-lg space-y-6"
      >
        {/* Meta SEO Section */}
        <div className="space-y-4">
          <h2 className="text-3xl mb-9 header font-semibold">
            Search Engine Optimization for HomePage
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Meta Title
              </label>
              <input
                type="text"
                {...register("metaTitle")}
                className="customInput"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Meta Keywords
              </label>
              <input
                type="text"
                {...register("metaKeywords")}
                className="customInput"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <textarea
                {...register("metaDescription")}
                className="customInput resize-none"
                rows="4"
              />
            </div>
          </div>
        </div>

        {/* Meta Open Graph Section */}
        <div className="space-y-4">
          {/* <h2 className="text-2xl font-semibold text-gray-800">Meta Open Graph for HomePage</h2> */}

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Meta Open Graph Title
              </label>
              <input
                type="text"
                {...register("metaOgTitle")}
                className="customInput"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Meta Open Graph Description
              </label>
              <textarea
                {...register("metaOgDescription")}
                className="customInput resize-none"
                rows="4"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Meta Open Graph Image
              </label>
              <DragEditUploadImageInput
                getRootProps={getBannerRootProps}
                getInputProps={getBannerInputProps}
                image={thumbnail}
                imagePreview={thumbnailPreview}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-6 mt-6">
          <button type="button" className="customCancelButton">
            Cancel
          </button>
          <button disabled={loading} type="submit" className="customSaveButton">
            {loading ? (
              <>
                <span className="loading loading-spinner mr-2 loading-xs"></span>
                Updating..
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
