import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function SendOTP() {
  const [email, setEmail] = useState("");
  const pathName = useLocation().pathname;
  const axiosPublic = useAxiosPublic();
  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosPublic.post("/users/send-otp", { email });

      if (res.status === 200 || res.status === 201) {
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("otp_expiry", res?.data?.otp_expiry);
        sessionStorage.setItem(
          "otp_limit_time",
          res?.data?.otp_limitation_time
        );
        router("/verify-otp");
        toast.success("OTP sent successfully!", {
          duration: 2000,
          position: "top-right",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error?.response?.data?.error || error?.message || error}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="mt-5 md:mt-20 flex flex-col items-center md:w-[750px] relative mx-auto  ">
      {/* Back Arrow */}
      <img
        src={"/logo.png"}
        // width={300}
        // height={300}
        alt="dot"
        className="mx-auto md:w-96 w-40"
      />

      <div className="w-full py-5 absolute md:top-5 left-8">
        <Link to="/">
          <button className="flex items-center justify-center rounded-full shadow-lg md:w-[50px] w-[20px] h-[20px] md:h-[50px] bg-white mdml-10">
            <MdOutlineKeyboardBackspace />
          </button>
        </Link>
      </div>

      {/* Sign Up Section */}

      <div className="w-full py-5 flex justify-center items-center md:mt-6 gap-3">
        <Link to="/login">
          <button
            className={`flex items-center justify-center md:px-8 px-3 py-1 md:py-2 shadow-lg rounded-md border-2 border-black md:text-2xl  md:ml-10 ${
              pathName === "/login"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Log In
          </button>
        </Link>
        <Link to="/send-otp">
          <button
            className={`flex items-center justify-center md:px-8 px-3 py-1 md:py-2 shadow-lg rounded-md border-2 border-black md:text-2xl  md:ml-10 ${
              pathName === "/send-otp"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Register
          </button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="md:mt-6 bg-white md:shadow-lg p-3 w-[94%] mx-auto rounded-lg"
      >
        {/* Email Input */}
        <div className="md:mb-4 border-gray-200 md:pb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 py-1 md:py-3 md:text-xl"
          >
            Email/Phone No
          </label>
          <input
            type="email"
            id="email"
            placeholder="email"
            className="mt-1 block w-full p-2 border border-gray-400 bg-white rounded-lg md:text-xl outline-none md:py-3 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div
          type="submit"
          className="md:mt-4 text-center text-sm text-gray-500  w-full flex flex-col gap-4 py-4 pb-10"
        >
          <button
            type="submit"
            className="block bg-black text-white text-center md:text-2xl py-3 rounded-lg font-semibold mb-4 hover:scale-[0.95] transition-all duration-300 w-full md:w-[94%] mx-auto"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
