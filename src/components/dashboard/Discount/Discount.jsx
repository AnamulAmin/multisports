import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const DiscountForm = () => {
  const [loading, setLoading] = useState(false);
  const [targetData, setTargetData] = useState(null);
  const [discounts, setDiscounts] = useState({
    percentageDiscountActive: false,
    percentageDiscount: 0,
    orderAboveForPercentageDiscount: 0,

    flatDiscountActive: false,
    flatDiscount: 0,
    orderAboveForFlatDiscount: 0,

    itemDiscountsActive: false,
    itemDiscounts: [{ id: "item1", buy: 2, free: 1 }],

    happyHourActive: false,
    happyHourStart: "17:00",
    happyHourEnd: "19:00",
    happyHourDiscount: 0,

    loyaltyDiscountActive: false,
    loyaltyDiscount: 0,

    promoCodeActive: false,
    promoCode: "",
    promoCodeDiscount: 0,
    discountText: "",
    discountTextActive: false,
  });

  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDiscounts((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleItemDiscountChange = (index, field, value) => {
    setDiscounts((prev) => {
      const updatedItemDiscounts = [...prev.itemDiscounts];
      updatedItemDiscounts[index][field] = value;
      return { ...prev, itemDiscounts: updatedItemDiscounts };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (targetData) {
        const response = await axiosSecure.put(
          `/discount/${targetData._id}`,
          discounts
        );

        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          Swal.fire({
            title: "Success!",
            text: "Discount Updated Successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        setLoading(false);
      } else {
        const response = await axiosSecure.post(`/discount`, discounts);

        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          Swal.fire({
            title: "Success!",
            text: "Discount Created Successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        setLoading(false);
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: error?.response?.data?.message || error?.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await axiosSecure.get("discount");

      if (response?.data) {
        setDiscounts(response?.data?.data[0]);
        setTargetData(response?.data?.data[0] || null);
      }
    };
    fetchDiscounts();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">Manage Discounts</h1>

      {/* Percentage Discount */}
      <div className="mb-8 border-b pb-5">
        <h2 className="text-lg font-semibold text-black">Discount Text</h2>
        <div className="flex items-center gap-4">
          <label className="text-black flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="discountTextActive"
              checked={discounts?.discountTextActive}
              onChange={handleChange}
            />
            Show On Home Page
          </label>
          <input
            type="text"
            name="discountText"
            className="input input-bordered w-full "
            value={discounts?.discountText}
            onChange={handleChange}
            maxLength={170}
            placeholder="Max 170 Characters"
          />
        </div>
      </div>

      {/* Percentage Discount */}
      <div className="mb-8 border-b pb-5">
        <h2 className="text-lg font-semibold text-black">
          Percentage Discount
        </h2>
        <p className="mb-3 text-black text-sm">
          Set a percentage discount for orders above a certain value.
        </p>
        <div className="flex items-center gap-4">
          <label className="text-black flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="percentageDiscountActive"
              checked={discounts?.percentageDiscountActive}
              onChange={handleChange}
            />
            Enable
          </label>
          <input
            type="number"
            name="percentageDiscount"
            className="input input-bordered w-full max-w-xs"
            value={discounts?.percentageDiscount}
            onChange={handleChange}
            placeholder="Percentage (%)"
          />
          <input
            type="number"
            name="orderAboveForPercentageDiscount"
            className="input input-bordered w-full max-w-xs"
            value={discounts?.orderAboveForPercentageDiscount}
            onChange={handleChange}
            placeholder="Order Above ($)"
          />
        </div>
      </div>

      {/* Flat Discount */}
      <div className="mb-8 border-b pb-5">
        <h2 className="text-lg font-semibold text-black">Flat Discount</h2>
        <p className="mb-3 text-black text-sm">
          Set a flat discount for orders above a certain value.
        </p>
        <div className="flex items-center gap-4">
          <label className="text-black flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="flatDiscountActive"
              checked={discounts?.flatDiscountActive}
              onChange={handleChange}
            />
            Enable
          </label>
          <input
            type="number"
            name="flatDiscount"
            className="input input-bordered w-full max-w-xs"
            value={discounts?.flatDiscount}
            onChange={handleChange}
            placeholder="Flat Discount ($)"
          />
          <input
            type="number"
            name="orderAboveForFlatDiscount"
            className="input input-bordered w-full max-w-xs"
            value={discounts?.orderAboveForFlatDiscount}
            onChange={handleChange}
            placeholder="Order Above ($)"
          />
        </div>
      </div>

      {/* Time-based Discount */}
      <div className="mb-8 border-b pb-5">
        <h2 className="text-lg font-semibold text-black">
          Happy Hour Discount
        </h2>
        <p className="mb-3 text-black text-sm">
          Set a discount for specific times (e.g., 5 PM to 7 PM).
        </p>
        <div className="flex items-center gap-4">
          <label className="text-black flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="happyHourActive"
              checked={discounts?.happyHourActive}
              onChange={handleChange}
            />
            Enable
          </label>
          <input
            type="time"
            name="happyHourStart"
            className="input input-bordered w-full max-w-xs"
            value={discounts?.happyHourStart}
            onChange={handleChange}
          />
          <input
            type="time"
            name="happyHourEnd"
            className="input input-bordered w-full max-w-xs"
            value={discounts?.happyHourEnd}
            onChange={handleChange}
          />
          <input
            type="number"
            name="happyHourDiscount"
            className="input input-bordered w-full max-w-xs"
            value={discounts?.happyHourDiscount}
            onChange={handleChange}
            placeholder="Percentage (%)"
          />
        </div>
      </div>

      {/* Loyalty Discount */}
      <div className="mb-8 border-b pb-5">
        <h2 className="text-lg font-semibold text-black">Loyalty Discount</h2>
        <p className="mb-3 text-black text-sm">
          Set a percentage discount for repeat customers.
        </p>
        <div className="flex items-center gap-4">
          <label className="text-black flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="loyaltyDiscountActive"
              checked={discounts?.loyaltyDiscountActive}
              onChange={handleChange}
            />
            Enable
          </label>
          <input
            type="number"
            name="loyaltyDiscount"
            className="input input-bordered w-full max-w-xs"
            value={discounts?.loyaltyDiscount}
            onChange={handleChange}
            placeholder="Percentage (%)"
          />
        </div>
      </div>

      {/* Promo Code Discount */}
      <div className="mb-8 border-b pb-5">
        <h2 className="text-lg font-semibold text-black">Promo Code</h2>
        <div className="flex flex-col gap-4">
          <label className="text-black flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="promoCodeActive"
              checked={discounts?.promoCodeActive}
              onChange={handleChange}
            />
            Enable
          </label>
          <div className="grid grid-cols-2 w-full gap-3">
            <input
              type="text"
              name="promoCode"
              className="input input-bordered w-full"
              value={discounts?.promoCode}
              onChange={handleChange}
              placeholder="Promo Code"
            />
            <input
              type="number"
              name="promoCodeDiscount"
              className="input input-bordered w-full"
              value={discounts?.promoCodeDiscount}
              onChange={handleChange}
              placeholder="Promo Code Discount"
            />
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary block ml-auto"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading && (
          <span className="loading loading-spinner mr-2  loading-xs"></span>
        )}
        Save
      </button>
    </div>
  );
};

export default DiscountForm;
