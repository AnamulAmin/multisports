import { useEffect } from "react";
import Banner from "../../../components/Home/Banner/Banner";
import Brands from "../../../components/Home/Brands/Brands";
import MetaTags from "../../../components/Home/MetaTags/MetaTags";
import NewArrivals from "../../../components/Home/NewArrivals/NewArrivals";
import useGetSeo from "../../../Hook/GetPublicDataHook/useGetSeo";
import ReactGA from "react-ga4";
import FacebookChat from "../../../components/Home/FacebookChat/FacebookChat";
import Featured from "../../../components/Home/Featured/Featured";
import FlashSale from "../../../components/Home/FlashSale/FlashSale";
import Banner2 from "../../../components/Home/Banner/Bannner2";
import PromotionalBanner from "../../../components/Home/Banner/PromotionalBanner";
import Testimonials from "../../../components/Home/Testimonials/Testimonials";
import Category from "../../../components/Home/Category/Category";
import MostPopular from "../../../components/Home/MostPopular/MostPopular";
import BestSelling from "../../../components/Home/BestSelling/BestSelling";
import SpecialDiscount from "../../../components/Home/SpecialDiscount/SpecialDiscount";
import Banner4 from "../../../components/Home/Banner/Banner4";
import IntroVideo from "../../../components/Home/IntroVideo/IntroVideo";
export const metadata = {
  title: "Universal Survey - Home",
  description:
    "Discover a vast collection of surveys on countless topics or create your own and gather valuable insights. Universal Survey is your one-stop platform for exploring, participating in, and creating impactful surveys.",
};
const HomePage = () => {
  const content = useGetSeo({});

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "HomePage.jsx",
    });

    ReactGA.event({
      category: "content Visiting",
      action: "Home ",
    });
  }, []);
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

      <Banner />
      <div className="max-w-[1440px] mx-auto">
        <NewArrivals />
        <Category />
        <Featured />
        <Banner4 />
        <MostPopular />
        <PromotionalBanner />
        <BestSelling />
        <FlashSale />
        {/* <PopularProducts /> */}
        <Banner2 />
        {/* <ExclusiveCollection /> */}
        {/* <Footwear /> */}
        <SpecialDiscount />
        <Testimonials />
        <IntroVideo />
        {/* <TrendyBags /> */}
        <Brands />
        <FacebookChat />
      </div>
    </>
  );
};

export default HomePage;
