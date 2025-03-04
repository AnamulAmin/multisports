import { lazy, Suspense, useState } from "react";
// import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Error404 from "../pages/default/Error404";

import HomePage from "../pages/OtherPage/Home/HomePage";
import DashboardChildrenRoutes from "./src/DashboardChildrenRoutes";
import PrivateRoute from "./src/routes/PrivateRoute";
import CartPage from "../components/Home/cart/CartPage";
import CheckoutPage from "../components/Home/checkout/CheckoutPage";
import Success from "../components/Home/success/Success";
import Cancel from "../components/Home/cancel/Cancel";
import ProductPage from "../components/Home/Products/ProductPage";

// Continue for other components...

const Root_Dashboard = lazy(() => import("../pages/Dashboard/Root"));
import SignUpPage from "../pages/authentication/signup/Signup";
import Login from "../pages/authentication/login/Login";
import ForgotPassword from "../pages/authentication/forgot-password/ForgotPassword";
import VerifyOTP from "../pages/authentication/verify-otp/VerifyOTP";
import SendOTP from "../pages/authentication/send-otp/SendOTP";

import GlobalLoading from "../components library/GlobalLoading";
import AllBrands from "../components/Home/Brands/AllBrands";
import TermsCondition from "../components/Home/(policy)/terms-and-condition/page";
import ShippingPublicPolicy from "../components/Home/(policy)/shipping-policy/page";
import ReturnPolicy from "../components/Home/(policy)/return-policy/page";
import PrivacyPolicy from "../components/Home/(policy)/privacy-policy/page";
import Blogs from "../components/Home/Blogs/Blogs";
import About from "../components/Home/About/About";
import TailoredPages from "../components/Home/TailoredPages/TailoredPages";
import Faqs from "../components/Home/faqs/Faqs";
import PublicRoute from "./src/routes/PublicRoute";
import AccountLayout from "../components/Home/my-account/account-layout";
import AccountDetails from "../components/Home/my-account/account-details";
import OrdersTable from "../components/Home/my-account/orders-table";
import ChangePassword from "../components/Home/my-account/change-password";
import AccountDashboard from "../components/Home/my-account/AccountDashboard";
import AccountAddress from "../components/Home/my-account/AccountAddress";
import ProductDetails from "../pages/OtherPage/product-details/page";
import NewArrivals from "../components/Home/NewArrivals/NewArrivals";
import MyOrder from "../components/Home/my-account/MyOrder";
import BrandProductPage from "../components/Home/Brands/BrandProductPage";
import SeeAll from "../pages/SeeAll/SeeAll";
import Career from "../pages/OtherPage/career/Career";
import ContactUs from "../pages/OtherPage/contact_us/ContactUs";
import Shop_address from "../pages/OtherPage/Shop_adress/Shop_address";
import OrderSummeryPage from "../components/Home/checkout/OrderSummeryPage";
import BlogDetails from "../pages/OtherPage/blog-details/BlogDetails";
import MyWishlist from "../components/Home/my-account/MyWishlist";
import PaymentPage from "../components/Home/checkout/PaymentPage";

const AllRoutes = () => {
  // const [permissionData, setPermissionData] = useState([]);
  const dashboardChildrenRoutes = DashboardChildrenRoutes();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        // <Root />
        <Root />
      ),
      // errorElement: <Error404 />,
      children: [
        {
          path: "",
          element: (
            // <PublicRoute>
            // </PublicRoute>
            // <Login />
            // <PublicRoute>
            // </PublicRoute>
            <HomePage />
          ),
        },
        {
          path: "new_arrivals",
          element: (
            // <PublicRoute>
            // </PublicRoute>
            // <Login />
            // <PublicRoute>
            // </PublicRoute>
            <NewArrivals limit={40} isShowSeeAll={false} />
            // <ViewAllProduct/>
          ),
        },
        {
          path: "brand_products/:id",
          element: <BrandProductPage />,
        },
        {
          // path: "addworkout",
          path: "signup",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>

            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          ),
        },
        {
          // path: "addworkout",
          path: "login",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        {
          // path: "addworkout",
          path: "forgot-password",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>

            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          ),
        },
        {
          // path: "addworkout",
          path: "verify-otp",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            <PublicRoute>
              <VerifyOTP />
            </PublicRoute>
          ),
        },
        {
          // path: "addworkout",
          path: "send-otp",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            <PublicRoute>
              <SendOTP />
            </PublicRoute>
          ),
        },
        {
          // path: "addworkout",
          path: "checkout",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            <CheckoutPage />
          ),
        },
        {
          // path: "addworkout",
          path: "payment_page",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            <PaymentPage />
          ),
        },
        {
          // path: "addworkout",
          path: "order_summary",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            <OrderSummeryPage />
          ),
        },
        {
          // path: "addworkout",
          path: "cart",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>

            <CartPage />
          ),
        },
        {
          // path: "addworkout",
          path: "products/:id",
          // path: isPermittedRoute("addworkout"),
          element: <ProductPage />,
        },
        {
          // path: "addworkout",
          path: "product_details/:id",
          // path: isPermittedRoute("addworkout"),
          element: <ProductDetails />,
        },
        {
          path: "see_all/:id",
          element: <SeeAll />,
        },
        {
          // path: "addworkout",
          path: "success",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            <Success />
          ),
        },
        {
          // path: "addworkout",
          path: "cancel",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            <Cancel />
          ),
        },
        {
          path: "all-brands",
          element: <AllBrands />,
        },
        {
          // path: "userpermission",
          path: "terms-and-condition",
          // path: isPermittedRoute("userpermission"),
          element: (
            // <PrivateRoute>
            //   <SmsGroup />
            // </PrivateRoute>

            <TermsCondition />
          ),
        },
        {
          // path: "userpermission",
          path: "shipping-policy",
          // path: isPermittedRoute("userpermission"),
          element: (
            // <PrivateRoute>
            //   <SmsGroup />
            // </PrivateRoute>

            <ShippingPublicPolicy />
          ),
        },
        {
          // path: "userpermission",
          path: "return-policy",
          // path: isPermittedRoute("userpermission"),
          element: (
            // <PrivateRoute>
            //   <SmsGroup />
            // </PrivateRoute>

            <ReturnPolicy />
          ),
        },
        {
          // path: "userpermission",
          path: "privacy-policy",
          // path: isPermittedRoute("userpermission"),
          element: <PrivacyPolicy />,
        },
        {
          // path: "userpermission",
          path: "blogs",
          // path: isPermittedRoute("userpermission"),
          element: <Blogs />,
        },
        {
          path: "blog/:id",
          element: <BlogDetails />,
        },
        {
          path: "contactus",
          element: <ContactUs />,
        },
        {
          // path: "userpermission",
          path: "faqs",
          // path: isPermittedRoute("userpermission"),
          element: <Faqs />,
        },
        {
          // path: "userpermission",
          path: "about",
          // path: isPermittedRoute("userpermission"),
          element: <About />,
        },
        {
          path: "career",
          element: <Career />,
        },
        {
          path: "shop_adress",
          element: <Shop_address />,
        },
        {
          // path: "userpermission",
          path: "tailored-page/:slug",
          // path: isPermittedRoute("userpermission"),
          element: <TailoredPages />,
        },
        {
          path: "my-account/orders/:id",
          element: <MyOrder />,
        },
      ],
    },
    // {
    //   // path: "addworkout",
    //   path: "login",
    //   // path: isPermittedRoute("addworkout"),
    //   element: (
    //     // <PrivateRoute>
    //     //   <Addworkout />
    //     // </PrivateRoute>
    //     <PublicRoute>
    //       <Login />
    //     </PublicRoute>
    //   ),
    // },
    // {
    //   // path: "addworkout",
    //   path: "send-otp",
    //   // path: isPermittedRoute("addworkout"),
    //   element: (
    //     // <PrivateRoute>
    //     //   <Addworkout />
    //     // </PrivateRoute>
    //     <PublicRoute>
    //       <SendOTP />
    //     </PublicRoute>
    //   ),
    // },
    {
      path: "dashboard",
      element: (
        // <PrivateRoute>
        //   <Rootdashboard></Rootdashboard>
        // </PrivateRoute>

        // <Rootdashboard />

        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <Root_Dashboard />
          </PrivateRoute>
        </Suspense>
      ),

      // errorElement: <Error404></Error404>,
      children: dashboardChildrenRoutes,
    },
    {
      path: "account",
      element: <AccountLayout />,

      // errorElement: <Error404></Error404>,
      children: [
        {
          path: "dashboard",
          element: <AccountDashboard />,
        },
        {
          path: "details",
          element: <AccountDetails />,
        },
        {
          path: "orders",
          element: <OrdersTable />,
        },

        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "address",
          element: <AccountAddress />,
        },
        {
          path: "wishlist",
          element: <MyWishlist />,
        },
      ],
    },
  ]);

  return routes;
};

const router = AllRoutes();

export default router;
