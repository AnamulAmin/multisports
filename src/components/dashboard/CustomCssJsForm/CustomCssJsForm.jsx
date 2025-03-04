import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function CustomCSSJSForm() {
  const [customCSS, setCustomCSS] = useState("");
  const [headerScript, setHeaderScript] = useState("");
  const [footerScript, setFooterScript] = useState("");
  const [targetId, setTargetId] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      css: customCSS,
      headerJs: headerScript,
      footerJs: footerScript,
    };

    try {
      if (targetId) {
        const res = await axiosSecure.put(`/custom-css-js/${targetId}`, data);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Script updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        const res = await axiosSecure.post(`/custom-css-js`, data);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Script Created successfully",
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
        const firstResData = await axiosSecure.get(`/custom-css-js`);
        const res = await axiosSecure.get(
          `/custom-css-js/${firstResData?.data?.data[0]?._id}`
        );

        if (res.status === 200 || res.status === 201) {
          const data = res?.data?.data;

          // Set form values with the testimonial data

          setCustomCSS(data.css);
          setHeaderScript(data.headerJs);
          setFooterScript(data.footerJs);

          setTargetId(data?._id);
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();
  }, [axiosSecure]);

  return (
    <div className="">
      <div className="p-6 pt-0">
        <h1 className="text-3xl font-semibold header mb-8">
          Custom CSS & JS Form
        </h1>
        <form onSubmit={handleSubmit} className="">
          <div className=" grid grid-cols-3 gap-6 justify-between items-center ">
            {/* Custom CSS */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Write Custom CSS
              </label>
              <textarea
                className="w-full  p-4 resize-none border rounded-lg bg-gray-800 text-white min-h-[600px]"
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
              ></textarea>
            </div>

            {/* Header Custom Script */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 ">
                Header Custom Script
              </label>
              <textarea
                className="w-full  p-4 resize-none border rounded-lg bg-gray-800 text-white min-h-[600px]"
                value={headerScript}
                onChange={(e) => setHeaderScript(e.target.value)}
              ></textarea>
            </div>

            {/* Footer Custom Script */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Footer Custom Script
              </label>
              <textarea
                className="w-full h-40 p-4 resize-none border rounded-lg bg-gray-800 text-white min-h-[600px]"
                value={footerScript}
                onChange={(e) => setFooterScript(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-3">
            <div className="flex gap-4 justify-end">
              <button
                type="submit"
                disabled={loading}
                className="customSaveButton"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner mr-2  loading-xs"></span>
                    Updating ..
                  </>
                ) : (
                  "Update Code"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
