import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import SwitchInput from "../../../shared/SwitchInput";
export default function SetupConfig() {
  const [isProductSize, setIsProductSize] = useState(false);
  const [modelOfBrand, setModelOfBrand] = useState(false);
  const [productColor, setProductColor] = useState(false);
  const [measurementUnit, setMeasurementUnit] = useState(false);
  const [seoInformation, setSeoInformation] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [productCode, setProductCode] = useState(false);
  const [productFlags, setProductFlags] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      productSize: isProductSize,
      modelOfBrand,
      productColor,
      measurementUnit,
      seoInformation,
      rewardPoints,
      productCode,
      productFlags,
    };

    try {
      if (targetId) {
        const res = await axiosSecure.put(`/setup-config/${targetId}`, data);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Config updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        const res = await axiosSecure.post(`/setup-config`, data);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Config Created successfully",
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
        const firstResData = await axiosSecure.get(`/setup-config`);

        firstResData, "res ljlj";

        if (firstResData.status === 200 || firstResData.status === 201) {
          const data = firstResData?.data?.data[0];

          // Set form values with the testimonial data

          setIsProductSize(data.productSize);
          setModelOfBrand(data.modelOfBrand);
          setProductColor(data.productColor);
          setMeasurementUnit(data.measurementUnit);
          setSeoInformation(data.seoInformation);
          setRewardPoints(data.rewardPoints);
          setProductCode(data.productCode);
          setProductFlags(data.productFlags);

          data?._id, "targetId useEffect";

          setTargetId(data?._id);
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();
  }, [axiosSecure]);

  return (
    <div className="bg-white p-5">
      <div className="p-6 pt-0">
        <h1 className="text-3xl font-semibold header mb-8">
          Setup Your Config
        </h1>
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4 flex gap-14 flex-wrap">
            <SwitchInput
              label="Product Size"
              checked={isProductSize}
              setChecked={setIsProductSize}
              offColor="#ccc"
              onColor="#00b894"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={25}
              height={30}
              width={70}
            />
            <SwitchInput
              label="Model of Brand"
              checked={modelOfBrand}
              setChecked={setModelOfBrand}
              offColor="#ccc"
              onColor="#00b894"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={25}
              height={30}
              width={70}
            />
            <SwitchInput
              label="Product Color"
              checked={productColor}
              setChecked={setProductColor}
              offColor="#ccc"
              onColor="#00b894"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={25}
              height={30}
              width={70}
            />

            <SwitchInput
              label="Measurement Unit"
              checked={measurementUnit}
              setChecked={setMeasurementUnit}
              offColor="#ccc"
              onColor="#00b894"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={25}
              height={30}
              width={70}
            />

            <SwitchInput
              label="Seo Information"
              checked={seoInformation}
              setChecked={setSeoInformation}
              offColor="#ccc"
              onColor="#00b894"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={25}
              height={30}
              width={70}
            />

            <SwitchInput
              label="reward Points"
              checked={rewardPoints}
              setChecked={setRewardPoints}
              offColor="#ccc"
              onColor="#00b894"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={25}
              height={30}
              width={70}
            />

            <SwitchInput
              label="Product Code"
              checked={productCode}
              setChecked={setProductCode}
              offColor="#ccc"
              onColor="#00b894"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={25}
              height={30}
              width={70}
            />

            <SwitchInput
              label="Product Flags"
              checked={productFlags}
              setChecked={setProductFlags}
              offColor="#ccc"
              onColor="#00b894"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={25}
              height={30}
              width={70}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-5">
            <button
              type="submit"
              disabled={loading}
              className={`customSaveButton`}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner mr-2  loading-xs"></span>
                  Saving Config ..
                </>
              ) : (
                "Save Config"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
