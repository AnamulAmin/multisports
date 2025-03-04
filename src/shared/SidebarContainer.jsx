import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { FaCross } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
const SidebarContainer = ({ isSidebarOpen }) => {
  const [categories, setCategories] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosSecure.get("/categories");
        if (res.status === 200 || res.status === 201) {
          setCategories(res.data.data);
        }
      } catch (error) {}
    };
    fetchCategories();
  }, [axiosSecure]);
  const closeDrawer = () => {
    document.getElementById("my-drawer").checked = false;
  };

  useEffect(() => {
    setTimeout(() => {
      closeDrawer();
    }, 5000);
  }, [isSidebarOpen]);

  return (
    <div className="text-base">
      <div className="flex border-b justify-between items-center pr-3 md:pr-6">
        <div className="px-7 py-4 text-lg ">
          <p>MultiSports</p>
        </div>
        <label
          htmlFor="sidebar-drawer"
          className="text-lg cursor-pointer"
          aria-label="Close sidebar"
        >
          <IoMdClose />
        </label>
      </div>

      {/* Collapsible Menu */}
      <div className="p-4">
        {/* Categories */}
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title">Categories</div>
          <div className="collapse-content space-y-2">
            {categories &&
              categories.map((item, index) => {
                return (
                  <p key={index}>
                    <Link onClick={closeDrawer} to={`/products/${item.slug}`}>
                      - {item.categoryName}
                    </Link>
                  </p>
                );
              })}
          </div>
        </div>

        {/* Additional Links */}
        <div className="flex flex-col px-4 gap-4">
          <Link onClick={closeDrawer} to="/shop_adress">
            Shops
          </Link>
          <Link onClick={closeDrawer} to="/see_all/new_arrivals">
            New Arrivals
          </Link>
          <Link onClick={closeDrawer} to="/see_all/popular">
            Popular
          </Link>
          <Link onClick={closeDrawer} to="/see_all/best_selling">
            Best Selling
          </Link>
        </div>

        {/* More Links */}
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title">More</div>
          <div className="collapse-content space-y-5">
            <p>
              <Link onClick={closeDrawer} to="/about">
                - About Us
              </Link>
            </p>
            <p>
              <Link onClick={closeDrawer} to="/contactus">
                - Contact
              </Link>
            </p>
            <p>
              <Link onClick={closeDrawer} to="/blogs">
                - Blogs
              </Link>
            </p>
            <p>
              <Link onClick={closeDrawer} to="/career">
                - Career
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
