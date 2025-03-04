import { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import OTPInput from "react-otp-input";
import { useTimer } from "react-timer-hook";
import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const axiosPublic = useAxiosPublic();
  const [isActiveOtpInput, setIsActiveOtpInput] = useState(false);
  const router = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const [otp_expiry, setOtp_expiry] = useState(new Date().getTime());
  const [otp_expiryDate, setOtp_expiryDate] = useState(new Date());
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

  const ResendOtp = async (e) => {
    "Email:", userEmail;

    try {
      const res = await axiosPublic.post("/users/send-otp", {
        email: userEmail,
      });

      if (res.status === 200 || res.status === 201) {
        sessionStorage.setItem("otp_expiry", res?.data?.otp_expiry);
        sessionStorage.setItem(
          "otp_limit_time",
          res?.data?.otp_limitation_time
        );

        // setOtp_limit_time(res?.data?.otp_limitation_time);
        setOtp_expiry(res?.data?.otp_expiry);

        setOtp("");
        setIsActiveOtpInput(false);
        restart(new Date(res?.data?.otp_expiry).getTime());

        toast.success("OTP sent successfully!", {
          duration: 2000,
          position: "top-right",
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    // utils/validatePassword.js

    const validatePassword = async () => {
      try {
        const res = await axiosPublic.post("/users/verify-otp", {
          otp,
          email: userEmail,
        });

        if (res.status === 200 || res.status === 201) {
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          return router("/signup");
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

    const userEmailData = sessionStorage.getItem("userEmail");
    setUserEmail(userEmailData);
    const otp_expiryDateData = sessionStorage.getItem("otp_expiry") || "";
    // const otp_limitation_timeData =
    //   sessionStorage.getItem("otp_limit_time") || "";

    setOtp_expiryDate(new Date(otp_expiryDateData));

    if (new Date().getTime() < new Date(otp_expiryDateData).getTime()) {
      setOtp_expiry(new Date(otp_expiryDateData).getTime());
      restart(new Date(otp_expiryDateData).getTime());
    } else {
      setOtp_expiry(new Date().getTime());
    }
  }, [axiosPublic, router, otp, userEmail]);

  return (
    <div className="min-h-screen flex flex-col items-center md:w-[750px] relative mx-auto ">
      {/* Back Arrow */}
      <div className="  w-full">
        <img
          src={"/logo.png"}
          // width={300}
          // height={300}
          alt="dot"
          className="mx-auto md:w-96 w-40 mt-5"
        />

        {/* <div className="w-full py-5">
          <Link to="/">
            <button className="flex items-center justify-center rounded-full shadow-lg w-[50px] h-[50px] bg-white ml-10">
              <MdOutlineKeyboardBackspace size={30} />
            </button>
          </Link>
        </div> */}
        <div className="w-full py-5">
          <Link to="/">
            <button className="flex items-center justify-center rounded-full shadow-lg md:w-[50px] w-[20px] h-[20px] md:h-[50px] bg-white ml-10">
              <MdOutlineKeyboardBackspace />
            </button>
          </Link>
        </div>

        {/* Sign Up Section */}
        <h1 className="text-xl md:text-4xl font-semibold text-center">
          Verify OTP
        </h1>
        <p className="text-center text-gray-500 mt-2 md:text-xl mb-3 md:mb-5">
          Enter your OTP to continue.
        </p>
        <div className="backdrop-blur md:min-w-[600px] md:p-10 rounded-lg bg-white w-[95%] mx-auto md:shadow-lg">
          <h2 className="md:text-2xl text-center font-semibold md:font-bold mb-4">
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
            <div className="grid md:grid-cols-3  gap-2 mt-4 justify-center md:justify-between w-full  items-center">
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

              <button
                className=" text-blue-500 rounded-lg md:px-4 py-2 md:font-bold hover:underline"
                onClick={ResendOtp}
                type="button"
              >
                {" "}
                Resend OTP{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
