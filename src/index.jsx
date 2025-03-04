import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import AuthProvider from "./providers/AuthProvider.jsx";
import "./index.css";
import router from "./routes/routes.jsx";
import ReactPixel from "react-facebook-pixel";

// Fetch the Pixel ID dynamically (from backend or settings)
const pixelId = localStorage.getItem("facebookPixelId"); // Example

// Replace 'YOUR_PIXEL_ID' with your Facebook Pixel ID
const options = {
  autoConfig: true, // Enables automatic configuration
  debug: false, // Set to true to see debugging information
};

ReactPixel.init(pixelId, {}, options);

// Track a default event (PageView)
ReactPixel.pageView();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </HelmetProvider>
  // <React.StrictMode>
  // </React.StrictMode>
);
