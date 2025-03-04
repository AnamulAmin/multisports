import moment from "moment/moment";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaPinterest,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";
import useGetSocialLink from "../Hook/GetPublicDataHook/useGetSocialLink";
import useGetGeneralInfo from "../Hook/GetPublicDataHook/useGetGeneralInfo";

const Footer = () => {
  const currentYear = moment().format("YYYY"); // Using moment.js
  const footerContainerVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
        duration: 0.5,
        ease: "linear",
      },
    },
  };

  const footerItem = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
  };

  const [socialLinks, setSocialLinks] = useState([]);

  const content = useGetSocialLink({});
  const info = useGetGeneralInfo({});

  useEffect(() => {
    let initialData = [];
    if (content) {
      for (let key in content) {
        const newObj = {};

        if (key === "_id") continue;
        if (key === "__v") continue;
        if (key === "updatedAt") continue;
        if (key === "createdAt") continue;
        if (content[key] === "") continue;

        newObj.link = content[key];
        newObj.name = key;

        initialData.push(newObj);
      }
      setSocialLinks(initialData);
    }
  }, [content]);

  return (
    <div className="poppins mt-12">
      <footer className=" md:p-10 md:py-20 p-5 pr-0  w-[96%] mx-auto gap-x-6 md:gap-x-6 grid grid-cols-2 gap-y-16 md:grid-cols-6  md:gap-20 text-left">
        <aside>
          <div>
            <h6 className="footer-title text-base md:text-lg font-bold mb-1 md:mb-4 text-black">
              CONTACT US
            </h6>
            <div className="flex flex-col gap-1 md:gap-3 ">
              <div className="flex text-sm md:text-base gap-2 items-center">
                {/* <FaPhoneAlt className="text-slate-600" /> */}
                <h2 className="font-normal flex gap-3 ">
                  <p>{info?.phone}</p>
                </h2>
              </div>
              <div className="flex text-sm md:text-base gap-2 items-center">
                {/* <FaPhoneAlt className="text-slate-600" /> */}
                <h2 className="font-normal flex gap-3 ">
                  <p>{info?.address}</p>
                </h2>
              </div>
              <div className="flex text-sm md:text-base gap-2 items-center">
                {/* <FaPhoneAlt className="text-slate-600" /> */}
                <h2 className="font-normal flex gap-3 ">
                  <p>{info?.email}</p>
                </h2>
              </div>
            </div>

            {/* icons */}
            <nav className="flex gap-1 md:gap-3 mt-3 md:mt-6">
              <Link
                to={content?.facebook}
                target="_blank"
                className=""
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className="text-sm md:text-lg" />
              </Link>
              <Link
                to={content?.instagram}
                target="_blank"
                className=""
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="text-sm md:text-lg" />
              </Link>
              <Link
                to={content?.linkedin}
                target="_blank"
                className=""
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-sm md:text-lg" />
              </Link>
              <Link
                to={content?.pinterest}
                target="_blank"
                className=""
                rel="noopener noreferrer"
                aria-label="Pinterest"
              >
                <FaPinterest className="text-sm md:text-lg" />
              </Link>
              <Link
                to={content?.tiktok}
                target="_blank"
                className=""
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok className="text-sm md:text-lg" />
              </Link>
              <Link
                to={content?.youtube}
                target="_blank"
                className=""
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube className="text-sm md:text-lg" />
              </Link>
            </nav>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title text-base md:text-lg font-bold md:mb-4 text-black">
            Company
          </h6>
          <div className="text-slate-600 flex flex-col gap-1 md:gap-3 text-sm md:text-base">
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              to="/about"
            >
              About us
            </Link>

            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              to="/contactus"
            >
              Contact
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              to="/shop_adress"
            >
              Shop Address
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              to="/blogs"
            >
              Blogs
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              to="/career"
            >
              Career
            </Link>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title text-base md:text-lg font-bold md:mb-4 text-black">
            Categories
          </h6>
          <div className="text-slate-600 flex flex-col gap-1 md:gap-3 text-sm md:text-base">
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              to="/products/mens-wear"
            >
              Mens wear
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              to="/products/womens-wear"
            >
              Womens wear
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              to="/products/kids-wear"
            >
              kids wear
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              to="/products/sports-wear"
            >
              Sports wear
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              to="/products/swim-wear"
            >
              Swim wear
            </Link>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title text-base md:text-lg font-bold mb-1 md:mb-4 text-black">
            Social Media
          </h6>
          <div className="text-slate-600 flex flex-col gap-1 md:gap-3 text-sm md:text-base">
            {socialLinks
              ? socialLinks.slice(0, 5).map((social) => (
                  <Link
                    key={social.name}
                    to={social.link}
                    target="_blank"
                    className="hover:text-blue-800 capitalize hover:translate-x-3 transition-all duration-300"
                  >
                    {social.name}
                  </Link>
                ))
              : Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-slate-200 h-4 rounded-md w-32 md:w-40 animate-pulse"
                    ></div>
                  ))}
          </div>
        </nav>

        <nav>
          <h6 className="footer-title  text-base md:text-lg font-bold mb-1 md:mb-4 text-black">
            Brands
          </h6>
          <div className="text-slate-600 flex flex-col gap-1 md:gap-3 text-sm md:text-base">
            <Link
              to={"/products/brands"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Gucci
            </Link>
            <Link
              to={"/products/brands"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Besiktas
            </Link>
            <Link
              to={"/products/brands"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Caixa
            </Link>
            <Link
              to={"/products/brands"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Apinestarsl
            </Link>
            <Link
              to={"/products/brands"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Lazada
            </Link>
          </div>
        </nav>

        {/* <nav>
          <h6 className="footer-title text-lg font-bold mb-4 text-black">
            Social
          </h6>
            <div className="flex flex-col gap-3 text-slate-600 text-md">
                {socialLinks.length > 0 &&
                  socialLinks.map((item, index) => {
                    return (
                      <Link
                        href={`${item.link}`}
                        className=" hover:translate-x-3 hover:text-blue-500 transition-all duration-300 flex gap-2 items-center capitalize"
                        key={index}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
              </div>
          
        </nav> */}
        <nav>
          <h6 className="footer-title text-base md:text-lg font-bold md:mb-4 text-black">
            Help
          </h6>
          <div className="text-slate-600 flex flex-col gap-1 md:gap-3 text-sm md:text-base">
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer"
              to="/faqs"
            >
              Frequently Asked Questions
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer"
              to="/terms-and-condition"
            >
              Terms & Conditions
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer"
              to="/shipping-policy"
            >
              Shipping Policy
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer"
              to="/return-policy"
            >
              Return Policy
            </Link>
          </div>
          {/* <Link className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer" to="/webadmin">
            Admin Login
          </Link> */}
        </nav>
      </footer>

      <div className="mx-auto w-[95%]">
        <footer className="footer flex py-4  border-t px-5 text-center text-xl justify-center md:justify-between">
          <p className="md:text-lg text-sm">
            Copyright {info?.footer_copyright}
          </p>
          <div className="hidden md:flex items-center gap-6">
            <div>
              <img
                src="https://chawkbazar.vercel.app/assets/images/payment/mastercard.svg"
                alt=""
                className="cursor-pointer"
              />
            </div>
            <div>
              <img
                src="https://chawkbazar.vercel.app/assets/images/payment/visa.svg"
                alt=""
                className="cursor-pointer"
              />
            </div>
            <div>
              <img
                src="https://chawkbazar.vercel.app/assets/images/payment/paypal.svg"
                alt=""
                className="cursor-pointer"
              />
            </div>
            <div>
              <img
                src="https://chawkbazar.vercel.app/assets/images/payment/jcb.svg"
                alt=""
                className="cursor-pointer"
              />
            </div>
            <div>
              <img
                src="https://chawkbazar.vercel.app/assets/images/payment/skrill.svg"
                alt=""
                className="cursor-pointer"
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
