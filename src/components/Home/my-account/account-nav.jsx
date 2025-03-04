import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  IoHomeOutline,
  IoCartOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import toast from "react-hot-toast";
import { useAuth } from "../../../providers/AuthProvider";
import { FaRegAddressCard, FaRegHeart } from "react-icons/fa";

const ROUTES = {
  ACCOUNT: "/account/dashboard",
  ORDERS: "/account/orders",
  ACCOUNT_DETAILS: "/account/details",
  ADDRESS: "/account/address",
  CHANGE_PASSWORD: "/account/change-password",
  WISHLIST: "/account/wishlist",
};

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT,
    name: "Dashboard",
    icon: <IoHomeOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ORDERS,
    name: "Orders",
    icon: <IoCartOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ACCOUNT_DETAILS,
    name: "Details",
    icon: <IoPersonOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ADDRESS,
    name: "Address",
    icon: <FaRegAddressCard className="w-5 h-5" />,
  },
  {
    slug: ROUTES.CHANGE_PASSWORD,
    name: "Password",
    icon: <IoSettingsOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.WISHLIST,
    name: "Wishlist",
    icon: <FaRegHeart className="w-5 h-5" />,
  },
];

export default function AccountNav() {
  const location = useLocation();
  const { logOut, setUser } = useAuth();

  const navigate = useNavigate();

  // Extract the main path (2nd segment of URL)
  const mainPath = `/${location.pathname.split("/")[2] || ""}`;

  const handleLogout = () => {
    const isSuccess = logOut();
    if (isSuccess) {
      toast.success("User logged out successfully");

      setUser(null);
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="flex flex-col pb-2 md:w-2/6 2xl:w-4/12 ltr:md:pr-8 rtl:md:pl-8 ltr:lg:pr-12 rtl:lg:pl-12 ltr:xl:pr-16 rtl:xl:pl-16 ltr:2xl:pr-20 rtl:2xl:pl-20 md:pb-0">
      {accountMenu.map((item) => {
        const menuPath = `/${item.slug.split("/")[2]}`;

        return (
          <NavLink
            key={item.slug}
            to={item.slug}
            className={({ isActive }) =>
              isActive || mainPath === menuPath
                ? "bg-gray-100 font-semibold flex gap-3 items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2"
                : "flex items-center cursor-pointer gap-3 text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 rounded mb-2"
            }
          >
            {item.icon}
            <span className="ltr:pl-2 rtl:pr-2">{`${item.name}`}</span>
          </NavLink>
        );
      })}

      <button
        className="flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 focus:outline-none"
        onClick={handleLogout}
      >
        <IoLogOutOutline className="w-5 h-5" />
        <span className="ltr:pl-2 rtl:pr-2">Logout</span>
      </button>
    </nav>
  );
}
