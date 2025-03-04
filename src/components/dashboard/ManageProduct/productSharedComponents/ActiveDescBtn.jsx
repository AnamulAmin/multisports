import React from "react";

function ActiveDescBtn({
  activeDescription,
  setActiveDescription,
  desc_name,
  btnName,
}) {
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-2xl 
       duration-300 ease-in-out border font-semibold
      ${activeDescription === desc_name
          ? "bg-[#087D6D]  text-white border-transparent"
          : "bg-transparent text-gray-600 border hover:bg-[#087D6D] hover:text-white"
        }`}
      onClick={() => setActiveDescription(desc_name)}
    >
      {btnName}
    </button>

  );
}

export default ActiveDescBtn;
