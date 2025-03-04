import { useState } from "react";

export default function RemoveDemoProducts() {
  const handleRemove = () => {
    alert("All demo products have been removed!");
    // Add your remove logic here (API calls, etc.)
  };

  return (
    <div className="py-6 pt-0">
      <div className=" flex items-center justify-between">
        {/* Image Section */}
        <div className="w-1/2">
          <img
            width={400}
            height={400}
            src="/path-to-your-image.png" // Replace with your image path
            alt="Remove Demo Products"
            className="w-full h-auto"
          />
        </div>

        {/* Text and Button Section */}
        <div className="w-1/2 pl-6">
          <h2 className="text-3xl font-semibold mb-4">Remove Demo Products</h2>
          <p className="mb-6 text-gray-600">
            Demo products involve showcasing the features, benefits, and
            functionality of the products in a way that helps stakeholders
            understand the system better. But remember, you shouldn’t take
            actual orders based on these products as they are not actually real.
            To remove all the demo products, please click the button below.
          </p>

          <button
            onClick={handleRemove}
            className="customCancelButton flex  items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-7 7-7-7"
              />
            </svg>
            Remove Demo Products
          </button>
        </div>
      </div>
    </div>
  );
}
