import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { PiSlidersHorizontal } from "react-icons/pi";

const DrawerComponent = ({ children, setSelectedItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer = () => setIsOpen(true);
  const handleCloseDrawer = () => setIsOpen(false);

  return (
    <div className="drawer">
      <input
        id="my-filter"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={handleOpenDrawer}
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-filter"
          className="border border-gray-300 ml-4 rounded-lg flex items-center max-w-min gap-2 px-4 py-1 font-semibold drawer-button"
          onClick={handleOpenDrawer}
        >
          <PiSlidersHorizontal />
          Filters
        </label>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-filter"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={handleCloseDrawer}
        ></label>
        <ul className="menu bg-base-200 text-base-content w-full p-4 relative">
          {/* Close Button */}
          <div className="flex justify-between items-center">
            <p className="text-2xl gap-3 font-normal flex items-center">
              <IoMdArrowBack onClick={handleCloseDrawer} className="text-2xl" />{" "}
              Filters
            </p>
            <p
              onClick={() => {
                setSelectedItems([]);
              }}
              className="text-sm cursor-pointer"
            >
              Clear All
            </p>
          </div>
          {/* Sidebar content here */}
          {children}
        </ul>
      </div>
    </div>
  );
};

export default DrawerComponent;
