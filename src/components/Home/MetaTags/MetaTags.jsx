import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTags = ({
  metaTitle = "Online Ecommerce Shopping",
  metaKeywords = "ecommerce, shopping, online",
  metaDescription = "Shop the latest trends at Fejmo, your go-to destination for online fashion and lifestyle shopping...",
  metaOgTitle = "Online Ecommerce Shopping",
  metaOgDescription = "",
  metaOgImage = "",
}) => {

    (`${import.meta.env.VITE_APP_SPACES_URL}multi-sports/` + metaOgImage, "`${import.meta.env.VITE_APP_SPACES_URL}/multi-sports/` + metaOgImage")
  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="keywords" content={metaKeywords} />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaOgTitle} />
      <meta property="og:description" content={metaOgDescription} />
      {metaOgImage && <meta property="og:image" content={`${import.meta.env.VITE_APP_SPACES_URL}multi-sports/` + metaOgImage} />}
      <link rel="icon" type="image/svg+xml" href={`${import.meta.env.VITE_APP_SPACES_URL}multi-sports/` + metaOgImage}/> 
    </Helmet>
  );
};

export default MetaTags;
