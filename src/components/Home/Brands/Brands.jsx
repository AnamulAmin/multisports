import LogoArea from "./LogoArea";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Brands() {
  return (
    <div className=" mx-auto md:bg-gray-100 pt-3 md:pt-9 md:px-16 w-full rounded-md">
      <div className="flex px-4 md:px-0 justify-between mb-6">
        <p className="md:text-xl text-gray-500">Shop With Brands</p>
        <Link
          to="/all-brands"
          className="flex hover:underline justify-between items-center gap-2 text-blue-500 font-semibold"
        >
          <span className="text-sm md:text-base">See More</span> <FaArrowRight className="text-sm md:text-base" />
        </Link>
      </div>
      <div className="mt-9">
        <LogoArea />
      </div>
    </div>
  );
}

export default Brands;
