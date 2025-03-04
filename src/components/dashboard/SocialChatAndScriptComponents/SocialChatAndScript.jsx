import { useState } from "react";
import FacebookPixelForm from "./Forms/FacebookPixelForm";
import GoogleAnalyticForm from "./Forms/GoogleAnalyticForm";
import GoogleRecaptcha from "./Forms/GoogleRecaptcha";
import SocialLoginForm from "./Forms/SocialLoginForm";
import TawkToChatForm from "./Forms/TawkToChatForm";
import CrispChatForm from "./Forms/CrispChatForm";
import MessengerForm from "./Forms/MessengerForm";

export default function SocialChatAndScript() {
  const [selectedTab, setSelectedTab] = useState("Google Analytic");
  const [analyticID, setAnalyticID] = useState("");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className=" p-6 pt-0">
      <div className="w-full">
        <h2 className="text-3xl header font-semibold mb-9">
          Social Login & Chat Scripts
        </h2>
        <div className="flex">
          {/* Left-side Tabs */}
          <div className="w-1/4 pr-5 border-r border-gray-300">
            <ul>
              {[
                "Google Analytic",
                "Facebook Pixel",
                "Google Recaptcha",
                "Social Login",
                "Messenger",
                "Tawk.to Live Chat",
                "Crisp Live Chat",
              ].map((tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer p-3 rounded-2xl text-gray-700 transition-colors duration-200 ${
                    selectedTab === tab
                      ? "bg-[#087D6D] text-white font-semibold"
                      : "hover:bg-[#087d6d1a]"
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>

          {/* Right-side Form */}
          <div className="w-3/4 pl-8 pt-0">
            {selectedTab === "Google Analytic" && (
              <GoogleAnalyticForm isShow={selectedTab === "Google Analytic"} />
            )}

            {selectedTab === "Facebook Pixel" && <FacebookPixelForm />}

            {selectedTab === "Google Recaptcha" && (
              <GoogleRecaptcha isShow={selectedTab === "Google Recaptcha"} />
            )}

            {selectedTab === "Social Login" && (
              <SocialLoginForm isShow={selectedTab === "Social Login"} />
            )}

            {selectedTab === "Tawk.to Live Chat" && (
              <TawkToChatForm isShow={selectedTab === "Tawk.to Live Chat"} />
            )}
            {selectedTab === "Crisp Live Chat" && (
              <CrispChatForm isShow={selectedTab === "Crisp Live Chat"} />
            )}
            {selectedTab === "Messenger" && (
              <MessengerForm isShow={selectedTab === "Messenger"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
