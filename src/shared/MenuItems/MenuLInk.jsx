import {Link} from "react-router-dom";

import React from "react";

const MenuLink = ({ item, location, isCollapsed }) => {
  const isActive = location === item.path;

  const isActiveLink = (pathName, currentPath) => {
    const splitPath = currentPath.split("/")[2];

    if (pathName === splitPath) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Link
      to={"/dashboard/" + item.path}
      className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
        isActiveLink(item.path, location)
          ? "bg-[#eba21c] text-white shadow"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {/* {item.icon} */}
      {item.icon}
      {!isCollapsed && <span>{item.title}</span>}
    </Link>
  );
};

export default MenuLink;
