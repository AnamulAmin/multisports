import React, { useEffect, useState } from "react";
// import Header from './../../components/Header/header';
import Sidebar from "./../../components/Sidebar/Sidebar";
import { ChevronRight } from "lucide-react";
import ToggleSidebarBtn from "../../components/Sidebar/ToggleSidebarBtn/ToggleSidebarBtn";
import { Outlet } from "react-router-dom";
import MetaTags from "../../components/Home/MetaTags/MetaTags";
import useGetSeo from "../../Hook/GetPublicDataHook/useGetSeo";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Root_Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const content = useGetSeo({});

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // Simulate fetching theme from API
    const fetchTheme = async () => {
      const res = await axiosPublic.get("/website-theme-color");

      const theme = res?.data?.data[0];

      const root = document.documentElement;
      root.style.setProperty(
        "--primary-color",
        theme?.primaryColor || "#3490dc"
      );
      root.style.setProperty(
        "--secondary-color",
        theme?.secondaryColor || "#ffed4a"
      );
      root.style.setProperty(
        "--tertiary-color",
        theme?.tertiaryColor || "#e3342f"
      );
      root.style.setProperty("--title-color", theme?.titleColor || "#1a202c");
      root.style.setProperty(
        "--paragraph-color",
        theme?.paragraphColor || "#2d3748"
      );
      root.style.setProperty("--border-color", theme?.borderColor || "#cbd5e0");
    };

    fetchTheme();
  }, [axiosPublic]);

  return (
    <div className="grid grid-cols-[auto_1fr]">
      <MetaTags
        metaTitle={content?.metaTitle}
        metaDescription={content?.metaDescription}
        metaOgTitle={content?.metaOgTitle}
        metaOgDescription={content?.metaOgDescription}
        metaOgImage={content?.metaOgImage}
        metaKeywords={content?.metaKeywords}
      />

      <Sidebar isCollapsed={isCollapsed} />
      {/* <Header/> */}
      <div className="md:p-8 bg-slate-50 h-dvh overflow-auto relative">
        <ToggleSidebarBtn
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Root_Dashboard;
