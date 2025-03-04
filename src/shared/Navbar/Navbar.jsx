import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCart } from "react-icons/bs";

import {
  FaFacebook,
  FaInstagram,
  FaRegHeart,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdMenu, MdOutlineStore } from "react-icons/md";
import Wishlist from "../Cards/Wishlist/Wishlist";
import BgBlurModal from "../Modal/BgBlurModal";
import Cart from "../cart/Cart";
import { Link, useNavigate } from "react-router-dom";
import ProductSearch from "../../components/Home/Products/ProductSearch/ProductSearch";
import SidebarContainer from "../SidebarContainer";

import {
  IoCartOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import CustomImage from "../ImageComponents/CustomImage";
import SearchArea from "./SearchArea";
import useGetSocialLink from "../../Hook/GetPublicDataHook/useGetSocialLink";
const Navbar = () => {
  const content = useGetSocialLink({});
  const { userRole, logOut, totalItems, user, wishlist } =
    useContext(AuthContext);
  const placeholders = ["Shorts", "Watch", "Shirt"];

  const [isFocused, setIsFocused] = useState(false);
  const router = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowWishlist, setIsShowWishlist] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogOut = () => {
    const isLogOut = logOut();
    if (isLogOut) {
      toast.success("User logged out successfully!", {
        duration: 3000,
        position: "top-right",
      });

      router("/", { scroll: false });
    }
  };

  // useEffect(() => {
  //   const header = document.getElementById("header");
  //   window.addEventListener("scroll", () => {
  //     const scrolling = window.scrollY;
  //     if (scrolling > 300) {
  //       // navbar style
  //       header?.classList.add("sticky", "top-0");
  //       header?.classList.remove("relative");
  //     } else {
  //       header?.classList.add("relative");
  //       header?.classList.remove("sticky", "top-0");
  //     }
  //   });
  // }, []);

  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Check scroll direction
      if (scrollY < lastScrollY) {
        // Scrolling up
        setIsSticky(true);
      } else {
        // Scrolling down
        setIsSticky(false);
      }

      // Update last scroll position
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const ROUTES = {
    ACCOUNT: "/account/dashboard",
    ORDERS: "/account/orders",
    ACCOUNT_DETAILS: "/account/details",
    CHANGE_PASSWORD: "/account/change-password",
    WISHLIST: "/account/wishlist",
  };

  const accountMenu = [
    {
      slug: ROUTES.ACCOUNT,
      name: "Account",
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
  return (
    <>
      <header
        id="header"
        className={`transition-all duration-1000 ease-in-out z-50 ${
          isSticky ? "sticky top-0 bg-white" : "relative -top-full"
        }`}
      >
        <header className="flex flex-wrap lg:justify-start lg:flex-nowrap w-full items-center  text-sm  bg-white border-b ">
          <div className="navbar w-[94%] mx-auto ">
            <div className="navbar-start">
              <div className="flex items-center gap-3">
                <div role="button" className="">
                  <div className="drawer z-10">
                    <input
                      id="sidebar-drawer"
                      type="checkbox"
                      className="drawer-toggle"
                    />
                    <div className="drawer-content">
                      {/* Page content here */}
                      <label
                        htmlFor="sidebar-drawer"
                        className=" drawer-button"
                      >
                        <MdMenu
                          onClick={() => {
                            toggleSidebar();
                          }}
                          className="text-2xl cursor-pointer"
                        />
                      </label>
                    </div>
                    <div className="drawer-side">
                      <label
                        htmlFor="sidebar-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                      ></label>
                      <ul className="menu flex flex-col justify-between bg-white text-base-content min-h-full w-96">
                        <SidebarContainer isSidebarOpen={isSidebarOpen} />
                        <div className="border-t py-3 pt-4 text-gray-500">
                          <div className="flex justify-center gap-10 text-base">
                            <Link to={content?.facebook}>
                              <FaFacebook />
                            </Link>
                            <Link to={content?.twitter}>
                              <FaTwitter />
                            </Link>
                            <Link to={content?.instagram}>
                              <FaInstagram />
                            </Link>
                            <Link to={content?.youtube}>
                              <FaYoutube />
                            </Link>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <Link to="/" className="flex justify-center items-center ">
                    <img
                      className="w-28 mix-blend-multiply dark:mix-blend-normal"
                      width={400}
                      height={400}
                      src={"/logo.png"}
                      alt="logo"
                    />{" "}
                  </Link>
                </div>
              </div>
            </div>

            {/* <label class="input input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              class=""
              placeholder="I'm in the market for..."
            />
            <button className="hover:bg-gray-300 p-1 rounded">
              <CiSearch size={30} />
            </button>
          </label> */}

            <SearchArea
              setIsShowSearch={setIsShowSearch}
              placeholders={placeholders}
              setIsFocused={setIsFocused}
            />

            {/* Menu */}
            <div className="navbar-end w-fit md:w-[50%] flex items-center gap-4 md:gap-3">
              {/* Wishlist */}
              <button
                className=" md:p-3 p-1 rounded relative"
                onClick={() => setIsShowWishlist(true)}
              >
                <label
                  htmlFor="my-wishlist"
                  className=" drawer-button flex items-center justify-center flex-col gap-1"
                >
                  <FaRegHeart className="text-2xl  text-gray-600 hover:text-pink-500 hover:scale-110 cursor-pointer transition-all" />
                  <span className="hidden md:block">Wishlist</span>
                </label>
                <div className="bg-gray-800 text-white rounded-full px-1 md:px-2 absolute md:top-1 md:right-2 top-0 -right-2">
                  {wishlist.length}
                </div>
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsShowModal(true)}
                className=" md:p-3 p-1 rounded relative"
              >
                <label
                  htmlFor="my-cart"
                  className=" drawer-button flex items-center justify-center flex-col gap-1"
                >
                  <BsCart className="text-2xl text-gray-600 hover:text-orange-500 hover:scale-110 cursor-pointer transition-all" />
                  <span className="hidden md:block">Cart</span>
                </label>
                <div className="bg-gray-800 text-white rounded-full px-1 top-0 -right-2 md:px-2 absolute md:top-1 md:-right-1">
                  {totalItems}
                </div>
              </button>

              {/* Sign In */}
              {user ? (
                <details className="dropdown">
                  <summary className="avatar w-16 m-1">
                    <div className="bg-neutral text-neutral-content w-12 md:w-16 rounded-full !flex justify-center items-center mx-auto">
                      {user?.photourl ? (
                        <CustomImage imageKey={user?.photourl} />
                      ) : (
                        <span className="text-3xl">{user?.username[0]}</span>
                      )}
                    </div>
                  </summary>
                  <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow right-0 gap-1">
                    {accountMenu.map((item, index) => (
                      <li key={item.slug}>
                        <Link
                          to={item.slug}
                          className="flex items-center text-[13px] gap-2 p-2 rounded-lg transition-colors  "
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </li>
                    ))}

                    <li>
                      <button
                        className="btn bg-gray-400 mt-3"
                        onClick={handleLogOut}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </details>
              ) : (
                <Link to="/login">
                  <div className="flex items-center justify-center flex-col gap-1 md:p-3 p-1 rounded">
                    <FaRegUser className="md:text-2xl text-base text-gray-600 hover:text-blue-500 hover:scale-110 cursor-pointer transition-all" />
                    <span className="hidden md:block">Sign In</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </header>
      </header>
      {/* <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
      </BgBlurModal> */}
      <Cart isShow={isShowModal} setIsShow={setIsShowModal} />
      <Wishlist isShow={isShowWishlist} setIsShow={setIsShowWishlist} />
      {/* <BgBlurModal
        isShowModal={isShowWishlist}
        setIsShowModal={setIsShowWishlist}
      >
      </BgBlurModal> */}
      <BgBlurModal isShowModal={isShowSearch} setIsShowModal={setIsShowSearch}>
        <ProductSearch
          isShow={isShowSearch}
          setIsShow={setIsShowSearch}
          isFocused={isFocused}
        />
      </BgBlurModal>
    </>
  );
};

export default Navbar;
