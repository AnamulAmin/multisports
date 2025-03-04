import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../../providers/AuthProvider";

export default function Login() {
  const { setUser } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [recaptcha, setRecaptcha] = useState("");
  const pathName = useLocation().pathname;
  const axiosPublic = useAxiosPublic();
  const [site_key, setSite_key] = useState("");
  const [isRecaptcha, setIsRecaptcha] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const submitData = { email, password };
    setLoading(true);

    try {
      const res = await axiosPublic.post("/users/login", submitData);
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("user", JSON.stringify(res?.data?.user));

        setUser(res?.data?.user);

        toast.success("User Logged In successfully!", {
          duration: 2000,
          position: "top-right",
        });

        if (res?.data?.user?.role === "user") {
          navigate("/", { scroll: true, replace: true });
        } else {
          navigate("/dashboard", { scroll: true, replace: true });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: error?.response?.data?.message || error?.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCaptcha = async (value) => {
    const submitData = {
      token: value,
    };

    try {
      const res = await axiosPublic.post("/users/verify-recaptcha", submitData);
      if (res.status === 200 || res.status === 201) {
        setRecaptcha(value);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosPublic.get("/google-recaptcha");
      const data = response?.data?.data;

      setSite_key(data[0]?.site_key);
      setIsRecaptcha(data[0]?.isRecaptcha);
    };

    fetchShippingPolicy();
  }, [axiosPublic]);

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

      <div className="w-full py-5 flex justify-center items-center gap-3 md:mt-6">
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
        onSubmit={handleSignUp}
        className="md:mt-6 bg-white md:shadow-lg p-3 w-[94%] mx-auto rounded-lg"
      >
        {/* Email Input */}
        <div className="md:mb-4  border-gray-200 md:pb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 md:py-3 py-1 md:text-xl"
          >
            Email
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

        {/* Password Input */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 py-1 md:py-3 md:text-xl"
          >
            Password
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            placeholder="password"
            className="mt-1 block w-full p-2 border border-gray-400 bg-white rounded-lg md:text-xl outline-none md:py-3 px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Toggle Password Visibility */}
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 md:right-2 top-12 md:top-[68px] text-3xl"
          >
            {passwordVisible ? (
              <IoEyeOffOutline className="text-xl" />
            ) : (
              <IoEyeOutline className="text-xl" />
            )}
          </button>
        </div>
        <div className="flex items-center justify-end  md:mt-6  text-lg ">
          <Link to="/forgot-password">
            <button className="text-black text-sm md:text-xl font-semibold hover:underline">
              Forgot Password?
            </button>
          </Link>
        </div>

        {/* {isRecaptcha && site_key && (
          <ReCAPTCHA sitekey={site_key} onChange={handleCaptcha} />
        )} */}
        <div className="md:mt-4 text-center text-sm text-gray-500  w-full flex flex-col gap-4 py-4 pb-10">
          <button
            type="submit"
            // disabled={recaptcha === "" && isRecaptcha && site_key}
            className="flex gap-3 items-center justify-center bg-black text-white text-center md:text-2xl py-2 md:py-3 rounded-lg font-semibold mb-4 hover:scale-[0.95] transition-all duration-300 w-[94%] mx-auto disabled:opacity-20"
            disabled={loading}
          >
            {loading && (
              <span className="loading loading-spinner mr-2  loading-xs"></span>
            )}
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
