import React from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      className="text-red-500 border p-2 rounded-xl transition ease-in-out duration-300 hover:text-white hover:bg-red-500"
      onClick={onClick}
    >
      <FiTrash2 className="text-lg" />
    </button>
  );
};

export default DeleteButton;
