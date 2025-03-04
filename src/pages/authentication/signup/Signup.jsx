import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useAuth } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

export default function SignUpPage() {
  const { setUser } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [recaptcha, setRecaptcha] = useState("");
  const [loading, setLoading] = useState(false);

  const [site_key, setSite_key] = useState("");
  const [isRecaptcha, setIsRecaptcha] = useState(false);
  const axiosPublic = useAxiosPublic();
  const router = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (confirmPassword.length === 0) {
      setConfirmPasswordError("Please confirm your password");
      return;
    }

    const submitData = {
      username,
      email,
      password,
      subscribe,
      recaptcha,
    };
    setLoading(true);

    try {
      const res = await axiosPublic.post("/users/signup", submitData);

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setUser(res?.data?.user);

        if (res?.data?.user?.role === "user") {
          router("/", { scroll: true, replace: true });
        } else {
          router("/dashboard", { scroll: true, replace: true });
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

  useEffect(() => {
    // utils/validatePassword.js

    const validatePassword = () => {
      const lengthCriteria = password.length >= 8;
      const uppercaseCriteria = /[A-Z]/.test(password);
      const lowercaseCriteria = /[a-z]/.test(password);
      const numberCriteria = /[0-9]/.test(password);
      const specialCharacterCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const isValid =
        lengthCriteria &&
        uppercaseCriteria &&
        lowercaseCriteria &&
        numberCriteria &&
        specialCharacterCriteria;

      if (!lengthCriteria)
        setPasswordError("Password must be at least 8 characters long");
      if (!specialCharacterCriteria)
        setPasswordError(
          "Password must contain at least one special character"
        );
      if (!numberCriteria)
        setPasswordError("Password must contain at least one number");
      if (!lowercaseCriteria)
        setPasswordError("Password must contain at least one lowercase letter");
      if (!uppercaseCriteria)
        setPasswordError("Password must contain at least one uppercase letter");

      if (isValid) setPasswordError("");
    };

    const mathConfirmPassword = () => {
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    };

    if (confirmPassword.length > 0) {
      mathConfirmPassword();
    }

    validatePassword();
  }, [password, confirmPassword]);

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
    const userEmailData = sessionStorage.getItem("userEmail");
    setEmail(userEmailData);
  }, [axiosPublic]);

  return (
    <div className="min-h-screen flex flex-col items-center w-[750px] relative mx-auto  ">
      {/* Back Arrow */}
      <div className="  w-full">
        <img
          src={"/logo.png"}
          width={300}
          height={300}
          alt="dot"
          className="mx-auto"
        />

        <div className="w-full py-5 absolute top-5 left-8">
          <Link to="/">
            <button className="flex items-center justify-center rounded-full shadow-lg w-[50px] h-[50px] bg-white ml-10">
              <MdOutlineKeyboardBackspace size={30} />
            </button>
          </Link>
        </div>

        <div className=" rounded-lg p-8  h-full mt-4 mx-auto ">
          <form className="mt-6 bg-white p-3 w-[94%] mx-auto">
            {/* Email Input */}
            <div className="mb-4 border-b border-gray-200 pb-5">
              <label
                htmlFor="username"
                className="block text-gray-700 py-3 text-xl"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                placeholder="User Name"
                className="mt-1 block w-full p-2 border border-black rounded-lg text-xl py-3 px-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {/* Email Input */}
            {/* <div className="mb-4 border-b border-gray-200 pb-5">
              <label
                htmlFor="email"
                className="block text-gray-700 py-3 text-xl"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                className="mt-1 block w-full p-2 border border-black rounded-lg text-xl py-3 px-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div> */}

            {/* Password Input */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 py-3 text-xl"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="password"
                className="mt-1 block w-full p-2 border border-black rounded-lg text-xl py-3 px-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError.length > 0 && (
                <p className="text-red-500 text-md mt-4">{passwordError}</p>
              )}
              {/* Toggle Password Visibility */}
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-2 top-[68px] text-3xl"
              >
                {passwordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>

            {/* Password Input */}
            <div className="mb-4 relative">
              <label
                htmlFor="confirm_password"
                className="block text-gray-700 py-3 text-xl"
              >
                Confirm Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="confirm_password"
                placeholder="Confirm Password"
                className="mt-1 block w-full p-2 border border-black rounded-lg text-xl py-3 px-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPasswordError.length > 0 && (
                <p className="text-red-500 text-md mt-4">
                  {confirmPasswordError}
                </p>
              )}
              {/* Toggle Password Visibility */}
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-2 top-[68px] text-3xl"
              >
                {passwordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            {isRecaptcha && site_key && (
              <ReCAPTCHA sitekey={site_key} onChange={handleCaptcha} />
            )}
          </form>
          {/* Subscribe Checkbox */}
          {/* <div className="flex items-center mt-6 pl-8 text-lg ">
            <input
              type="checkbox"
              id="subscribe"
              className="checkbox w-5 h-5  text-black focus:ring-0  rounded"
              checked={subscribe}
              onChange={() => setSubscribe(!subscribe)}
            />
            <label htmlFor="subscribe" className="ml-2 text-gray-500">
              {`Yes, I'd like to get updates and news from`}
              <strong> dot.cards</strong> in my inbox.
            </label>
          </div> */}

          <div className="mt-4 text-center text-sm text-gray-500 w-full flex flex-col gap-4 py-4 pb-10">
            <button
              type="submit"
              className="block bg-black text-white text-center text-2xl py-3 rounded-lg font-semibold mb-4 hover:scale-[0.95] transition-all duration-300 w-[90%] mx-auto disabled:opacity-20 disabled:cursor-not-allowed"
              onClick={handleSignUp}
              disabled={
                (isRecaptcha && site_key && recaptcha === "") || loading
              }
            >
              {loading && (
                <span className="loading loading-spinner mr-2  loading-xs"></span>
              )}
              Sign Up
            </button>
            <p>
              <p className="text-center text-xl text-gray-500 mt-2">
                {`By clicking “Sign Up” you agree with our`}
              </p>
            </p>
            <Link to="/terms">
              <button className="text-black text-xl font-semibold hover:underline">
                Terms and Conditions
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
