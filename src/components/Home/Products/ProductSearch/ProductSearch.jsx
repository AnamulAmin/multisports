import { useState, useCallback, useEffect, useRef } from "react";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

import { useAuth } from "../../../../providers/AuthProvider";
import CustomImage from "../../../../shared/ImageComponents/CustomImage";
import { useNavigate } from "react-router-dom";

// Debounce function to delay API calls until the user stops typing
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ProductSearch = ({ setIsShow, isShow }) => {
  const searchInput = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { branch } = useAuth();
  const navigate = useNavigate();

  // Handle search with debouncing to avoid frequent API calls
  const handleSearch = useCallback(
    debounce(async (value) => {
      try {
        const res = await axiosSecure.get(
          `/products?search=${value}&branch=${branch}`
        );
        setSearchData(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }, 300),
    [axiosSecure]
  );

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      handleSearch("a"); // Fetch default users if no search term is provided
    }
  }, [searchTerm, handleSearch]);

  useEffect(() => {
    if (isShow) {
      searchInput.current.focus();
    }
    document.body.style.overflow = isShow ? "hidden" : "auto";
  }, [isShow]);

  const handleNavigate = (id) => {
    setIsShow(false);
    navigate(`product_details/${id}`);
    setSearchTerm("");
  };

  isShow, "isShow";

  return (
    <div className="p-6 px-4 pt-4 md:pt-7 bg-white rounded-lg">
      <input
        type="text"
        placeholder="Search Product ..."
        className="focus:border-gray-300 appearance-none text-gray-700 border shadow-sm rounded-full w-full md:w-[95%] mx-auto block py-3 px-3 pl-5 leading-tight focus:outline-none focus:shadow-outline mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        // autoFocus={true}
        ref={searchInput}
        name="search"
      />

      <div
        className="flex flex-col gap-4 max-h-[80dvh] overflow-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        {searchData.length > 0 ? (
          searchData.map((product) => (
            <button
              onClick={() => handleNavigate(product._id)}
              key={product._id}
              className="hover:bg-slate-100 w-full cursor-pointer grid grid-cols-1 md:grid-cols-3 justify-center gap-1 md:gap-4 items-center border-b"
            >
              <div className="py-2 px-4 mx-auto">
                <CustomImage
                  imageKey={product.thumbnail}
                  alt={product.productTitle}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="py-2 px-4 ">{product.productTitle}</div>
              <div className="py-2 px-4 hidden md:block">${product.price}</div>
            </button>
          ))
        ) : (
          <h3 colSpan="4" className="text-center py-20">
            No results found
          </h3>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
