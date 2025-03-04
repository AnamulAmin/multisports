import React from "react";
import { Link } from "react-router-dom";

const MenuLink = ({ item, location, isCollapsed }) => {
  const isActive = location.pathname === item.path;

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
      className={`flex items-center gap-2 p-2 pl-5 rounded-xl transition-colors ${
        isActiveLink(item.path, location.pathname)
          ? "bg-[#087D6D] text-white shadow"
          : "text-gray-700 hover:bg-[#087d6d13] hover:text-gray-900"
      }`}
    >
      {item.icon}
      {!isCollapsed && <span>{item.title}</span>}
    </Link>
  );
};

export default MenuLink;
