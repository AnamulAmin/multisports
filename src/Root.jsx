import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer";
import HorizontalMenu from "./shared/HorizontalMenu/HorizontalMenu";
import MetaTags from "./components/Home/MetaTags/MetaTags";
import useGetSeo from "./Hook/GetPublicDataHook/useGetSeo";
import useAxiosPublic from "./Hook/useAxiosPublic";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import TopBar from "./components/Home/TopBar";

//This is Login Page Root only and 404 page Root use for Outlet Component
const Root = () => {
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

  useEffect(() => {
    const applyCustomCode = async () => {
      const response = await axiosPublic.get("/custom-css-js");
      if (response.status === 200 || response.status === 201) {
        const data = await response.data.data[0];

        if (data) {
          // Apply Custom CSS
          const style = document.createElement("style");
          style.id = "custom-css";
          style.innerHTML = data.css;
          document.head.appendChild(style);

          // Apply Header Script
          const headerScript = document.createElement("script");
          headerScript.id = "header-script";
          headerScript.innerHTML = data.headerJs;
          document.head.appendChild(headerScript);

          // Apply Footer Script
          const footerScript = document.createElement("script");
          footerScript.id = "footer-script";
          footerScript.innerHTML = data.footerJs;
          document.body.appendChild(footerScript);
        }
      }
    };

    applyCustomCode();

    return () => {
      // Clean up old scripts/styles on re-render
      document.getElementById("custom-css")?.remove();
      document.getElementById("header-script")?.remove();
      document.getElementById("footer-script")?.remove();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the Pixel ID dynamically (from backend or settings)

      const res = await axiosPublic.get("/facebook-pixel");
      const facebookData = res?.data?.data[0];
      // const pixelId = localStorage.getItem('facebookPixelId');
      if (facebookData?.pixelId && facebookData?.isEnabled) {
        ReactPixel.init(facebookData?.pixelId);
        ReactPixel.pageView(); // Track a page view
      }

      // const googleAnalytic = localStorage.getItem("googleAnalytic");
      // const googleAnalyticData = JSON.parse(googleAnalytic);

      const response = await axiosPublic.get("/google-analytic");
      const googleAnalyticData = response?.data?.data[0];

      if (googleAnalyticData?.isEnabled && googleAnalyticData?.trackingID) {
        ReactGA.initialize(googleAnalyticData?.trackingID);

        const scriptElem = document.createElement("script");
        let scriptSrcElem = document.createElement("script");
        scriptSrcElem.src = `src="https://www.googletagmanager.com/gtag/js?id=G-2P4DFL43YR`;
        scriptSrcElem.async = true;
        //  `<script async src="https://www.googletagmanager.com/gtag/js?id=G-2P4DFL43YR"></script>`;
        scriptElem.innerHTML = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-2P4DFL43YR');`;

        document.body.appendChild(scriptElem);
        document.body.appendChild(scriptSrcElem);
      }

      // ReactGA.initialize(googleAnalyticData?.trackingID);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTwakData = async () => {
      const response = await axiosPublic.get("/tawk-live-chat");
      const data = response?.data?.data[0];

      // setTargetId(data[0]?._id);
      // setIsEnabled(data[0]?.isEnabled);

      if (data?.isEnabled === "true") {
        const scriptElem = document.createElement("script");
        scriptElem.innerHTML = data?.code
          .replaceAll(`<script type="text/javascript">`, "")
          .replaceAll(`</script>`, "");

        document.body.appendChild(scriptElem);
      }
    };

    const fetchCrispData = async () => {
      const response = await axiosPublic.get("/crisp-live-chat");
      const data = response?.data?.data[0];

      // setTargetId(data[0]?._id);
      // setIsEnabled(data[0]?.isEnabled);

      if (data?.isEnabled === "true") {
        const scriptElem = document.createElement("script");
        scriptElem.innerHTML = data?.code
          .replaceAll(`<script type="text/javascript">`, "")
          .replaceAll(`</script>`, "");

        document.body.appendChild(scriptElem);
      }
    };

    fetchTwakData();
    fetchCrispData();
  }, [axiosPublic]);

  const content = useGetSeo({});
  return (
    <>
      <MetaTags
        metaTitle={content?.metaTitle}
        metaDescription={content?.metaDescription}
        metaOgTitle={content?.metaOgTitle}
        metaOgDescription={content?.metaOgDescription}
        metaOgImage={content?.metaOgImage}
        metaKeywords={content?.metaKeywords}
      />
      <TopBar />
      <Navbar />
      <div className="border-b hidden md:block">
        <HorizontalMenu />
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
