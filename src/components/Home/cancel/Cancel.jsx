
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className=" text-red-400  border-solid rounded-full h-16 w-16 ">
          <MdCancel size={60} />
        </div>
        <p className="mt-4 text-gray-600 text-sm">Your Purchases Failed</p>
        <Link to="/products/all">
          <button className="mt-4 bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Go to Shop
          </button>
        </Link>
      </div>
    </div>
  );
}
