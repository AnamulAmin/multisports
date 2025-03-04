import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useTimer } from "react-timer-hook";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAllowSetPassword, setIsAllowSetPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isSetOTP, setIsSetOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const [isActiveOtpInput, setIsActiveOtpInput] = useState(false);

  const [otp_expiry, setOtp_expiry] = useState(new Date().getTime());
  const [otp_expiryDate, setOtp_expiryDate] = useState(new Date());

  const router = useNavigate();

  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    "Email:", email;

    try {
      if (!isAllowSetPassword) {
        const res = await axiosPublic.get(`/users/is_user_exist/${email}`);
        res?.data?.user, "res jkjkjkkkllk";
        if (res?.data?.isExist) {
          // setIsAllowSetPassword(true);
          setIsSetOTP(true);
          setOtp_expiry(res?.data?.otp_expiry);

          setOtp("");
          setIsActiveOtpInput(false);
          restart(new Date(res?.data?.otp_expiry).getTime());

          toast.success("OTP sent successfully!", {
            duration: 2000,
            position: "top-right",
          });
        }
      } else {
        if (password !== confirmPassword) {
          setConfirmPasswordError("password did not match");
          return;
        }
        const res = await axiosPublic.post(`/users/forgot-password`, {
          password,
          email,
        });
        res, "res jkjkjkkkllk";
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Password updated successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          });

          router("/login");
        }
      }
    } catch (error) {
      error;
      Swal.fire({
        title: "Oops...",
        text: "Something went wrong!",
        icon: "error",
      });
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

    validatePassword();
  }, [password]);

  // let expiryTimestamp = null;

  // if (!isNaN(new Date(otp_expiry).getTime())) {
  //   expiryTimestamp =
  //     new Date().getTime() < new Date(otp_expiry).getTime()
  //       ? new Date(otp_expiry).getTime()
  //       : new Date().getTime();
  //   (
  //     expiryTimestamp,
  //     "expiryTimestamp",
  //     new Date(otp_expiry).getTime(),
  //     new Date() > new Date(otp_expiry),
  //     isNaN(new Date(otp_expiry).getTime())
  //   );
  // }

  const {
    // totalSeconds,
    seconds,
    minutes,
    // hours,
    // days,
    // isRunning,
    // start,
    // pause,
    // resume,
    restart,
  } = useTimer({
    expiryTimestamp: otp_expiry,
    // otp_expiry,
    onExpire: () => {
      console.warn("onExpire called");

      if (new Date().getTime() < new Date(otp_expiryDate).getTime()) {
        setOtp_expiry(new Date(otp_expiryDate).getTime());
        restart(new Date(otp_expiryDate).getTime());
        ("restart");
      } else {
        setOtp_expiry(new Date().getTime());
        ("end");
      }
    },
  });

  useEffect(() => {
    const validatePassword = async () => {
      try {
        const res = await axiosPublic.post("/users/verify-otp", {
          otp,
          email,
        });

        if (res.status === 200 || res.status === 201) {
          setIsAllowSetPassword(true);
        }
      } catch (error) {
        error;
        Swal.fire({
          title: "Oops...",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    };

    if (otp.length === 6) {
      validatePassword();
    }
  }, [otp]);

  return (
    <div className="min-h-screen flex flex-col items-center md:w-[750px] relative mx-auto ">
      {/* Back Arrow */}
      <img
        src={"/logo.png"}
        // width={300}
        // height={300}
        alt="dot"
        className="mx-auto md:w-96 mt-4 w-40"
      />

      <div className="w-full py-5 absolute md:top-5 left-8">
        <Link to="/">
          <button className="flex items-center justify-center rounded-full shadow-lg md:w-[50px] w-[20px] h-[20px] md:h-[50px] bg-white mdml-10">
            <MdOutlineKeyboardBackspace />
          </button>
        </Link>
      </div>
      {/* Sign Up Section */}
      <h1 className="md:text-4xl mt-5 md:mt-0 font-semibold text-center">
        Forgot Password
      </h1>
      <p className="text-center text-gray-500 mt-2 md:text-xl md:mb-5">
        Enter your Email to reset your password.
      </p>
      <form
        onSubmit={handleSubmit}
        className="md:mt-6 bg-white md:shadow-lg p-3 w-[94%] mx-auto rounded-lg"
      >
        {!isAllowSetPassword && (
          <>
            {isSetOTP ? (
              <div className="md:w-full md:p-10 rounded-lg  mx-auto">
                <h2 className="md:text-2xl text-center md:font-bold mb-4">
                  Enter Verification Code
                </h2>
                <form className="flex flex-col items-center gap-4">
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className="px-2 md:px-4"></span>}
                    inputStyle={{
                      width: "25px",
                      height: "30px",
                      borderRadius: "6px",
                      // color: "black",
                      // fontWeight: "bold",
                      border: "2px solid gray",
                      // boxShadow: "0 0 10px 0px rgba(0,0,0,0.4)",
                    }}
                    renderInput={(props) => (
                      <input
                        type="text"
                        placeholder="Enter your code"
                        className="w-full h-32 rounded-lg p-4 text-black font-bold border-2 border-black"
                        disabled={isActiveOtpInput}
                        {...props}
                      />
                    )}
                  />
                  <div className="grid md:grid-cols-3 gap-2 mt-4 justify-between w-full  items-center">
                    <p className="col-span-2">
                      OTP Expires in
                      <span
                        className={`countdown font-mono text-2xl px-2 ${
                          minutes > 3 ? "text-blue-500" : "text-red-500"
                        } font-bold`}
                      >
                        {/* <span style={{ "--value": 10 }}></span>h */}
                        <span style={{ "--value": minutes }}></span>:
                        <span style={{ "--value": `${seconds}` }}></span>
                      </span>
                      min
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="mb-4 md:border-b border-gray-200 pb-5">
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
                  className="mt-1 block w-full p-2 border border-gray-400 bg-white rounded-lg md:text-xl outline-none md:py-3 px-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="mt-4 text-center text-sm text-gray-500  w-full flex flex-col gap-4 md:py-4 ">
                  <button
                    type="submit"
                    className="block bg-black text-white text-center md:text-2xl py-3 rounded-lg font-semibold md:mb-4 hover:scale-[0.95] transition-all duration-300 w-full md:w-[94%] mx-auto"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {isAllowSetPassword && (
          <>
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
                htmlFor="password"
                className="block text-gray-700 py-3 text-xl"
              >
                Confirm Password
              </label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="password"
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
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute right-2 top-[68px] text-3xl"
              >
                {passwordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500  w-full flex flex-col gap-4 py-4 ">
              <button
                type="submit"
                className="block bg-black text-white text-center text-2xl py-3 rounded-lg font-semibold mb-4 hover:scale-[0.95] transition-all duration-300 w-[94%] mx-auto"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
