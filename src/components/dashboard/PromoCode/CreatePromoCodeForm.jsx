import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function CreatePromoCodeForm() {
  const [promoIcon, setPromoIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPromoIcon(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(!loading);

    // Handle form submission logic here (e.g., API call to save the promo code)
    const promoData = {
      promoIcon,
      title,
      description,
      effectiveDate,
      expiryDate,
      type,
      value,
      minOrderAmount,
      code,
    };

    "Promo Data:", promoData;
    setMessage("Promo Code Saved Successfully!");
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <p className="text-3xl header font-semibold mb-9">
          Promo Code Entry Form
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            {/* Promo Icon Upload */}
            <div>
              <label className="block font-semibold mb-2">Promo Icon</label>
              <div
                {...getRootProps()}
                className="w-full p-4 border-dashed border-2 border-gray-300 rounded-md text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {promoIcon ? (
                  <p>{promoIcon.name}</p>
                ) : (
                  <p>Drag and drop a file here or click</p>
                )}
              </div>
            </div>

            {/* Title Input */}
            <div className="col-span-2">
              <label className="block font-semibold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="customInput"
                placeholder="Enter Promo Title"
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-3">
              <label className="block font-semibold ">Short Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="customInput resize-none"
                rows="3"
                placeholder="Enter Promo Description"
              />
            </div>

            {/* Effective Date */}
            <div>
              <label className="block font-semibold ">Effective Date </label>
              <input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="customInput"
                required
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block font-semibold ">Expiry Date </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="customInput"
                required
              />
            </div>

            {/* Promo Type */}
            <div>
              <label className="block font-semibold ">Type </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="customInput"
                required
              >
                <option value="">Select Type</option>
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>

            {/* Promo Value */}
            <div>
              <label className="block font-semibold ">Value </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="customInput"
                placeholder="Enter Promo Value"
                required
              />
            </div>

            {/* Minimum Order Amount */}
            <div>
              <label className="block font-semibold ">
                Minimum Order Amount
              </label>
              <input
                type="number"
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(e.target.value)}
                className="customInput"
                placeholder="Enter Minimum Order Amount"
              />
            </div>

            {/* Promo Code */}
            <div>
              <label className="block font-semibold ">Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="customInput"
                placeholder="Enter Promo Code"
                required
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button type="submit" className="customSaveButton">
              {loading ? (
                <>
                  <span className="loading loading-spinner mr-2  loading-xs"></span>
                  Saving Promo Code ..
                </>
              ) : (
                "Save Promo Code"
              )}
            </button>
          </div>

          {/* Success Message */}
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
      </div>
    </div>
  );
}
