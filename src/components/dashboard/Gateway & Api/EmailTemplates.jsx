import { useState } from "react";

export default function EmailTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState("Classic");

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">
          Choose Your Default Order Placed Mail Template
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {/* Regular Template */}
          <div
            className={`border-2 rounded-md overflow-hidden cursor-pointer ${
              selectedTemplate === "Regular"
                ? "border-[#087D6D]"
                : "border-gray-200"
            }`}
            onClick={() => handleTemplateSelect("Regular")}
          >
            <div className="p-4 flex justify-between items-center bg-gray-100">
              <div className="">Regular</div>
              <div>
                <input
                  type="checkbox"
                  checked={selectedTemplate === "Regular"}
                  onChange={() => handleTemplateSelect("Regular")}
                  className="toggle-checkbox"
                />
              </div>
            </div>
            <img
              width={400}
              height={400}
              src="/images/regular-template.png" // This is a placeholder. You can replace this with your actual template image
              alt="Regular Template"
              className="w-full h-auto"
            />
            <div className="p-4 bg-gray-50">
              <p>Your order has been received!</p>
            </div>
          </div>

          {/* Classic Template */}
          <div
            className={`border-2 rounded-md overflow-hidden cursor-pointer ${
              selectedTemplate === "Classic"
                ? "border-[#087D6D]"
                : "border-gray-200"
            }`}
            onClick={() => handleTemplateSelect("Classic")}
          >
            <div className="p-4 flex justify-between items-center bg-gray-100">
              <div className="">Classic</div>
              <div>
                <input
                  type="checkbox"
                  checked={selectedTemplate === "Classic"}
                  onChange={() => handleTemplateSelect("Classic")}
                  className="toggle-checkbox"
                />
              </div>
            </div>
            <img
              width={400}
              height={400}
              src="/images/classic-template.png" // This is a placeholder. You can replace this with your actual template image
              alt="Classic Template"
              className="w-full h-auto"
            />
            <div className="p-4 bg-gray-50">
              <p>Your order has been received!</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() =>
              alert(`You have selected the ${selectedTemplate} template.`)
            }
            className="customSaveButton"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}
