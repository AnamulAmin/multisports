import { AuthContext } from "../../../providers/AuthProvider";
import { useContext, useState } from "react";
import WishlistItemComponent from "./WishlistItemComponent";
import { IoMdCloseCircle } from "react-icons/io";

const Wishlist = ({ isShow }) => {
  const { wishlist, removeFromWishlist } = useContext(AuthContext);

  return (
    <div className="drawer drawer-end z-[999]">
      <input id="my-wishlist" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label
          htmlFor="my-wishlist"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div
          className={`md:w-[450px] rounded-none h-screen bg-white shadow-lg p-4 absolute top-0 right-0 z-50 transition-all duration-500 pr-10 pl-5 flex flex-col `}
        >
          <h2 className=" flex items-center justify-between py-3 mb-4 border-b border-gray-300">
            <p className="text-2xl font-semibold ">
              Your Wishlist
            </p>
            <button
              type="button"
              onClick={() => {
                document.getElementById("my-wishlist").checked = false;
                setIsShow(false);
              }}
              className=""
            >
              <IoMdCloseCircle className="text-2xl" />
            </button>
          </h2>

          <div
            className="border-b pb-4 h-full overflow-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            {wishlist?.length > 0 &&
              wishlist?.map((item, index) => (
                <WishlistItemComponent
                  item={item}
                  key={index}
                  removeFromWishlist={removeFromWishlist}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
