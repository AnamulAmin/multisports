import { lazy, Suspense } from "react";
import GlobalLoading from "../../components library/GlobalLoading";
import TermsCondition from "../../components/Home/(policy)/terms-and-condition/page";
import ShippingPublicPolicy from "../../components/Home/(policy)/shipping-policy/page";
const PersonalizedOrders = lazy(() =>
  import("../../components/dashboard/ManageOrders/ReadyToCourierOrders")
);
const DeliveredOrders = lazy(() =>
  import("../../components/dashboard/ManageOrders/DeliveredOrders")
);
const Transactions = lazy(() =>
  import("../../components/dashboard/GenerateReports/Transactions/Transactions")
);
const SpecialDiscountBanner = lazy(() =>
  import(
    "../../components/dashboard/SliderAndBanner/SpecialDiscount/SpecialDiscountBanner"
  )
);
const BestSellingBanner = lazy(() =>
  import(
    "../../components/dashboard/SliderAndBanner/BestSellingBanner/BestSellingBanner"
  )
);
const NewArrivalBanner = lazy(() =>
  import(
    "../../components/dashboard/SliderAndBanner/NewArrivalBanner/NewArrivalBanner"
  )
);
const PopularBanner = lazy(() =>
  import(
    "../../components/dashboard/SliderAndBanner/PopularBanner/PopularBanner"
  )
);
const DiscountForm = lazy(() =>
  import("../../components/dashboard/Discount/Discount")
);
const CustomPages = lazy(() =>
  import("../../components/dashboard/CustomPages/CustomPages")
);
const CompletedOrders = lazy(() =>
  import("../../components/dashboard/ManageOrders/CompletedOrders")
);
const CourierSteadFastSettings = lazy(() =>
  import("../../components/dashboard/CourierSettings/CourierSteadFastSettings")
);
const CourierPathaoSettings = lazy(() =>
  import("../../components/dashboard/CourierSettings/CourierPathaoSettings")
);
const ModelOfBrand = lazy(() =>
  import("../../components/dashboard/ModelOfBrand/ModelOfBrand")
);
const ViewAllStores = lazy(() =>
  import("../../components/dashboard/ManageCourier/ViewAllStore")
);
const StoreCreateForm = lazy(() =>
  import("../../components/dashboard/ManageCourier/forms/StoreCreateForm")
);
const ViewAllCities = lazy(() =>
  import("../../components/dashboard/ManageCourier/ViewAllCities")
);
const ViewAllZones = lazy(() =>
  import("../../components/dashboard/ManageCourier/ViewAllZones")
);
const ViewAllArea = lazy(() =>
  import("../../components/dashboard/ManageCourier/ViewAllArea")
);
const UserPermission = lazy(() =>
  import("../../components/dashboard/UserPermission/Userpermission")
);
const StaffRole = lazy(() =>
  import("../../components/dashboard/UserPermission/StaffRole")
);

const PrivateRoute = lazy(() => import("./routes/PrivateRoute"));
const CancelOrders = lazy(() =>
  import("../../components/dashboard/ManageOrders/CancelOrders")
);
const Change_Password = lazy(() =>
  import("../../pages/User_Dashboard/Change_Password")
);

const ViewAllBlogs = lazy(() =>
  import("../../components/dashboard/Blogs/ViewAllBlogs/ViewAllBlogs")
);
const ViewAllProducts = lazy(() =>
  import("../../components/dashboard/ManageProduct/ViewAllProducts")
);
const AllOrders = lazy(() =>
  import("../../components/dashboard/ManageOrders/AllOrders")
);
const AboutAdmin = lazy(() => import("../../pages/OtherPage/about-us/page"));
const CreateTestimonials = lazy(() =>
  import("../../pages/OtherPage/add-new-testimonial/page")
);
const AllCustomers = lazy(() =>
  import("../../pages/OtherPage/all-custormers/page")
);
const ApprovedOrders = lazy(() =>
  import("../../components/dashboard/ManageOrders/PackagingOrders")
);
const AssignUserRolePermission = lazy(() =>
  import("../../components/dashboard/SystemUsers/AssignUserRolePermission")
);
const BannerImagesBackup = lazy(() =>
  import("../../pages/OtherPage/banner-images-backup/page")
);
const BlogCategories = lazy(() =>
  import("../../components/dashboard/Blogs/BlogCategories/BlogCategories")
);
const BlogFilesBackup = lazy(() =>
  import("../../pages/OtherPage/blog-files-backup/page")
);
const BulkUpload = lazy(() =>
  import("../../components/dashboard/ManageProduct/BulkUpload")
);
const CategoryIconBackup = lazy(() =>
  import("../../pages/OtherPage/category-icon-backup/page")
);
const ContactRequestsList = lazy(() =>
  import("../../components/dashboard/ContactRequest/ContactUsers")
);
const CategoryCreateForm = lazy(() =>
  import("../../components/dashboard/CategoryComponents/CategoryCreateForm")
);
const ChildCategoryCreateForm = lazy(() =>
  import(
    "../../components/dashboard/ChildCategoryComponent/ChildCategoryCreateForm"
  )
);
const ProductCreateForm = lazy(() =>
  import("../../components/dashboard/ManageProduct/CreateProductForm")
);
const CreatePromoCodeForm = lazy(() =>
  import("../../components/dashboard/PromoCode/CreatePromoCodeForm")
);
const SubcategoryCreateForm = lazy(() =>
  import(
    "../../components/dashboard/SubCategoryComponents/CreateSubCategoryFrom"
  )
);
const CustomCSSJSForm = lazy(() =>
  import("../../components/dashboard/CustomCssJsForm/CustomCssJsForm")
);
const CustomerWishlist = lazy(() =>
  import("../../components/dashboard/Customers/CustomerWishlist")
);
const DatabaseBackup = lazy(() =>
  import("../../pages/OtherPage/database-backup/DatabaseBackup")
);
const DeliveryCharges = lazy(() =>
  import("../../components/dashboard/Customers/DeliveryCharges")
);
const EmailConfigurations = lazy(() =>
  import("../../components/dashboard/Gateway & Api/EmailConfigaration")
);
const EmailTemplates = lazy(() =>
  import("../../components/dashboard/Gateway & Api/EmailTemplates")
);
const FAQList = lazy(() => import("../../components/dashboard/FAQ/FAQList"));
const FlagIconBackup = lazy(() =>
  import("../../pages/OtherPage/flag-icon-backup/page")
);
const CompanyInformation = lazy(() =>
  import("../../pages/OtherPage/general-info/page")
);
const GenerateDemoProducts = lazy(() =>
  import("../../components/dashboard/DemoProduct/GenerateDemoProducts")
);
const SeoPage = lazy(() => import("../../pages/OtherPage/home-page-seo/page"));
const MeasurementUnits = lazy(() =>
  import("../../components/dashboard/MeasurementUnits/MeasurementUnits")
);
const OnHoldSupport = lazy(() =>
  import("../../components/dashboard/SupportTicket/OnHoldSupport")
);
const OtherImagesBackup = lazy(() =>
  import("../../pages/OtherPage/other-images-backup/page")
);
const PaymentGateways = lazy(() =>
  import("../../components/dashboard/Gateway & Api/PaymentGateway")
);
const PaymentHistory = lazy(() =>
  import("../../components/dashboard/Customers/PaymentHistory")
);
const PendingOrders = lazy(() =>
  import("../../components/dashboard/ManageOrders/PendingOrders")
);
const PendingSupport = lazy(() =>
  import("../../components/dashboard/SupportTicket/PendingSupport")
);
const PreviousNotifications = lazy(() =>
  import("../../components/dashboard/Push Notification/PreviousNotification")
);
const PrivacyPolicy = lazy(() =>
  import("../../components/dashboard/TermAndPolicies/PrivacyPolicy")
);
const ProductBrands = lazy(() =>
  import("../../components/dashboard/Brands/ProductBrands")
);
const ProductColors = lazy(() =>
  import("../../components/dashboard/ProductColor/ProductColors")
);
const ProductFlag = lazy(() =>
  import("../../components/dashboard/ProductFlag/ProductFlag")
);
const ProductImageBackup = lazy(() =>
  import("../../pages/OtherPage/product-images-backup/page")
);
const ProductQuestionAnswer = lazy(() =>
  import("../../components/dashboard/ManageProduct/ProductQuestionAnswer")
);
const ProductSize = lazy(() =>
  import("../../components/dashboard/ProductSize/ProductSize")
);
const PromotionalBanner = lazy(() =>
  import("../../components/dashboard/SliderAndBanner/PromotionalBanner")
);
const RatingsReview = lazy(() =>
  import("../../components/dashboard/ManageProduct/RatingsReview")
);
const RejectedSupport = lazy(() =>
  import("../../components/dashboard/SupportTicket/RejectedSupport")
);
const RemoveDemoProducts = lazy(() =>
  import("../../components/dashboard/DemoProduct/RemoveDemoProduct")
);
const ReturnPolicy = lazy(() =>
  import("../../components/dashboard/TermAndPolicies/ReturnPolicy")
);
const SendNotification = lazy(() =>
  import("../../components/dashboard/Push Notification/SendNotification")
);
const SendSMS = lazy(() =>
  import("../../components/dashboard/SMS Service/SendSms")
);
const SetupConfigPage = lazy(() =>
  import("../../pages/OtherPage/setup-your-config/page")
);
const ShippingPolicy = lazy(() =>
  import("../../components/dashboard/TermAndPolicies/ShippingPolicy")
);
const SmsGateways = lazy(() =>
  import("../../components/dashboard/Gateway & Api/SMS_Gateway")
);
const SmsHistory = lazy(() =>
  import("../../components/dashboard/SMS Service/SMS_History")
);
const SMSTemplates = lazy(() =>
  import("../../components/dashboard/SMS Service/SMSTemplates")
);
const SocialChatAndScript = lazy(() =>
  import(
    "../../components/dashboard/SocialChatAndScriptComponents/SocialChatAndScript"
  )
);
const SocialMedia = lazy(() =>
  import("../../pages/OtherPage/social-media-links/page")
);
const SolvedSupport = lazy(() =>
  import("../../components/dashboard/SupportTicket/SolvedSupport")
);
const SubcategoryBackup = lazy(() =>
  import("../../pages/OtherPage/subcategory-backup/page")
);
const SubscribedUsersList = lazy(() =>
  import("../../components/dashboard/ContactRequest/SubscribeUsers")
);
const SystemUsers = lazy(() =>
  import("../../components/dashboard/SystemUsers/SystemUsers")
);
const TermsConditionForm = lazy(() =>
  import("../../components/dashboard/TermAndPolicies/TermsConditionForm")
);
const TicketFilesBackup = lazy(() =>
  import("../../pages/OtherPage/ticket-files-backup/page")
);
const UpazilaThanaList = lazy(() =>
  import("../../components/dashboard/Customers/UpazilaThana")
);
const UserImagesBackup = lazy(() =>
  import("../../pages/OtherPage/user-images-backup/page")
);
const BagBanners = lazy(() =>
  import("../../components/dashboard/SliderAndBanner/BagBanner/BagBanners")
);
const AllBanners = lazy(() =>
  import("../../pages/OtherPage/view-all-banners/page")
);
const CategoryList = lazy(() =>
  import("../../components/dashboard/CategoryComponents/ViewAllCategory")
);
const ChildCategoryList = lazy(() =>
  import(
    "../../components/dashboard/ChildCategoryComponent/ViewAllChildCategories"
  )
);
const ViewAllPromoCode = lazy(() =>
  import("../../components/dashboard/PromoCode/ViewAllPromoCode")
);
const ShoesBanners = lazy(() =>
  import("../../components/dashboard/SliderAndBanner/ShoesBanner/ShoesBanners")
);
const SliderList = lazy(() =>
  import("../../components/dashboard/SliderAndBanner/Sliders")
);
const SubcategoryList = lazy(() =>
  import(
    "../../components/dashboard/SubCategoryComponents/ViewAllSubcategories"
  )
);
const ViewAllTestimonials = lazy(() =>
  import("../../components/dashboard/Testimonials/ViewAllTestimonials")
);
const WebsiteThemeColorForm = lazy(() =>
  import("../../components/dashboard/websiteThemeColor/WebsiteThemeColorForm")
);
const BlogCreateForm = lazy(() =>
  import("../../components/dashboard/Blogs/ViewAllBlogs/BlogCreateForm")
);

function DashboardChildrenRoutes() {
  // const axiosSecure = useAxiosSecure();

  const user = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser == "undefined" || storedUser == null
      ? null
      : JSON.parse(storedUser);
  };

  const role = user()?.role || "";
  // const role = "Front Desk Officer"; // add later
  // const role = "admin"; // add later
  // const role = "Coffee Shtaff";
  // const role = "Operation Manager";

  // fetchPermissions();

  // const permissionRoutesArray = fetchPermissions();

  const isPermittedRoute = (pathName) => {
    // const isPermittedRoute = (pathName) => {
    const permissionRoutesArray = () => {
      const storedUser = localStorage.getItem("permissionRoutes");

      return storedUser == "undefined" || storedUser == null
        ? []
        : JSON.parse(storedUser);
    };

    const isAllowed = permissionRoutesArray()
      ? permissionRoutesArray().includes(pathName)
      : false;

    if (role === "admin") {
      return pathName;
    }

    // return pathName;
    return isAllowed ? pathName : "";
  };

  // console.log("filterRouteItems", filterRouteItems);
  const dashboardChildrenRoutes = [
    // errorElement: <PrivateRoute> <Error404></Error404></PrivateRoute>,
    // {
    //   path: "",
    //   element: (
    //     // <PrivateRoute>
    //     //   <Panel></Panel>
    //     // </PrivateRoute>
    //     // <InitialPage />
    //     <Suspense fallback={<GlobalLoading />}>
    //       <PrivateRoute>
    //         <HomePage />
    //       </PrivateRoute>
    //     </Suspense>
    //   ),
    // },
    {
      // path: "about-us",
      path: isPermittedRoute("about-us"),
      element: (
        // <PrivateRoute>
        //   <Panel></Panel>
        // </PrivateRoute>
        // <InitialPage />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <AboutAdmin />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "add-new-testimonial",
      path: isPermittedRoute("add-new-testimonial"),
      element: (
        // <PrivateRoute>
        //   <Panel></Panel>
        // </PrivateRoute>
        // <InitialPage />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CreateTestimonials />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "visitor",
      // path: "all-customers",
      path: isPermittedRoute("all-customers"),

      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        // <Visitor />

        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <AllCustomers />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "workout-routine",
      // path: "all-orders",
      path: isPermittedRoute("all-orders"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        // <Workout_routine />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <AllOrders />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "workout-routine",
      // path: "approved-orders",
      path: isPermittedRoute("approved-orders"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        // <Workout_routine />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ApprovedOrders />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "workout-routine",
      // path: "completed-orders",
      path: isPermittedRoute("completed-orders"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        // <Workout_routine />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CompletedOrders />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "workout-routine",
      // path: "cancelled-orders",
      path: isPermittedRoute("cancelled-orders"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        // <Workout_routine />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CancelOrders />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "workout-routine",
      // path: "assign-role-permission",
      path: isPermittedRoute("assign-role-permission"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        // <Workout_routine />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <AssignUserRolePermission />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "diet-plan",
      // path: "banner-images-backup",
      path: isPermittedRoute("banner-images-backup"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BannerImagesBackup />
          </PrivateRoute>
        </Suspense>
        // <p>Hellow</p>
      ),
    },
    {
      // path: "user_profile",
      // path: "blog-categories",
      path: isPermittedRoute("blog-categories"),
      element: (
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BlogCategories />
          </PrivateRoute>
        </Suspense>
      ),
    },

    {
      // path: "shedule_classes",
      // path: "blog-files-backup",
      path: isPermittedRoute("blog-files-backup"),
      element: (
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BlogFilesBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },

    {
      // path: "change_password",
      // path: "change_password",
      path: isPermittedRoute("change_password"),
      element: (
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <Change_Password />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "diet-plan",
      // path: "bulk-product",
      path: isPermittedRoute("bulk-product"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BulkUpload />
          </PrivateRoute>
        </Suspense>
        // <p>Hellow</p>
      ),
    },
    {
      // path: "add-new-user",
      // path: "category-icon-backup",
      path: isPermittedRoute("category-icon-backup"),
      element: (
        // <PrivateRoute>
        //   <AddNewUser />
        // </PrivateRoute>
        // <AddNewUser />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CategoryIconBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "members",
      // path: "contact-request",
      path: isPermittedRoute("contact-request"),
      element: (
        // <PrivateRoute>
        //   <Members />
        // </PrivateRoute>
        // <Members />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ContactRequestsList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "create-categories",
      // path: "add_package/:id",
      path: isPermittedRoute("create-categories"),
      element: (
        // <PrivateRoute>
        //   <Members />
        // </PrivateRoute>
        // <AddPackagePage />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CategoryCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "gym-staff",
      // path: "create-child-categories",
      path: isPermittedRoute("create-child-categories"),

      element: (
        // <PrivateRoute>
        //   <GymStaff />
        // </PrivateRoute>
        // <GymStaff />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ChildCategoryCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "manage-lockers",
      // path: "create-product",
      path: isPermittedRoute("create-product"),
      element: (
        // <PrivateRoute>
        //   <ManageLockers />
        // </PrivateRoute>
        // <ManageLockers />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "locker-payments",
      // path: "create-promo-code",
      path: isPermittedRoute("create-promo-code"),
      element: (
        // <PrivateRoute>
        //   <LockerPayments />
        // </PrivateRoute>
        // <LockerPayments />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CreatePromoCodeForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "invoices-billing",
      // path: "create-subcategories",
      path: isPermittedRoute("create-subcategories"),
      element: (
        // <PrivateRoute>
        //   <InvoicesBilling />
        // </PrivateRoute>
        // <InvoicesBilling />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SubcategoryCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "reports",
      // path: "custom-css-js",
      path: isPermittedRoute("custom-css-js"),
      element: (
        // <PrivateRoute>
        //   <InvoicesBilling />
        // </PrivateRoute>
        // <Report />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CustomCSSJSForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "expense-tracking",
      // path: "customers-wishlist",
      path: isPermittedRoute("customers-wishlist"),
      element: (
        // <PrivateRoute>
        //   <ExpenseTracking />
        // </PrivateRoute>
        // <ExpenseTracking />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CustomerWishlist />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "tax-management",
      // path: "database-backup",
      path: isPermittedRoute("database-backup"),
      element: (
        // <PrivateRoute>
        //   <TaxManagement />
        // </PrivateRoute>
        // <TaxManagement />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <DatabaseBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "automated-reminders",
      // path: "delivery-charges",
      path: isPermittedRoute("delivery-charges"),
      element: (
        // <PrivateRoute>
        //   <AutomatedReminders />
        // </PrivateRoute>
        // <AutomatedReminders />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <DeliveryCharges />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "feedback-surveys",
      // path: "email-configurations",
      path: isPermittedRoute("email-configurations"),
      element: (
        // <PrivateRoute>
        //   <FeedbackSurveys />
        // </PrivateRoute>
        // <FeedbackSurveys />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <EmailConfigurations />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "follow-up-scheduling",
      // path: "email-templates",
      path: isPermittedRoute("email-templates"),

      element: (
        // <PrivateRoute>
        //   <FollowUpScheduling />
        // </PrivateRoute>
        // <FollowUpScheduling />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <EmailTemplates />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "due-finder",
      // path: "faqs",
      path: isPermittedRoute("faqs"),
      element: (
        // <PrivateRoute>
        //   <DueFinder />
        // </PrivateRoute>
        // <DueFinder />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <FAQList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "routine-library",
      // path: "flag-icon-backup",
      path: isPermittedRoute("flag-icon-backup"),

      element: (
        // <PrivateRoute>
        //   <RoutineLibrary />
        // </PrivateRoute>
        // <RoutineLibrary />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <FlagIconBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "create-routine",
      // path: "general-info",
      path: isPermittedRoute("general-info"),
      element: (
        // <PrivateRoute>
        //   <CreateRoutine />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CompanyInformation />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "assign-routine",
      // path: "generate-products",
      path: isPermittedRoute("generate-products"),
      element: (
        // <PrivateRoute>
        //   <AssignRoutine />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <GenerateDemoProducts />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "track-progress",
      // path: "home-page-seo",
      path: isPermittedRoute("home-page-seo"),
      element: (
        // <PrivateRoute>
        //   <TrackProgress />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SeoPage />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "diet-library",
      // path: "measurement-units",
      path: isPermittedRoute("measurement-units"),
      element: (
        // <PrivateRoute>
        //   <DietLibrary />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <MeasurementUnits />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "request-diet-plan",
      // path: "on-hold-supports",
      path: isPermittedRoute("on-hold-supports"),
      element: (
        // <PrivateRoute>
        //   <CreateDietPlan />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <OnHoldSupport />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "assign-diet-plan",
      // path: "other-images-backup",
      path: isPermittedRoute("other-images-backup"),
      element: (
        // <PrivateRoute>
        //   <AssignDietPlan />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <OtherImagesBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "track-diet-progress",
      // path: "payment-gateway",
      path: isPermittedRoute("payment-gateway"),
      element: (
        // <PrivateRoute>
        //   <TrackDietProgress />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PaymentGateways />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "track-diet-progress",
      // path: "permission-routes",
      path: isPermittedRoute("permission-routes"),
      element: (
        // <PrivateRoute>
        //   <TrackDietProgress />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <UserPermission />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "schedule-classes",
      // path: "payment-history",
      path: isPermittedRoute("payment-history"),
      element: (
        // <PrivateRoute>
        //   <ScheduleClasses />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "manage-classes",
      // path: "pending-orders",
      path: isPermittedRoute("pending-orders"),
      element: (
        // <PrivateRoute>
        //   <ManageClasses />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PendingOrders />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "manage-classes",
      // path: "pending-orders",
      path: isPermittedRoute("delivered-orders"),
      element: (
        // <PrivateRoute>
        //   <ManageClasses />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <DeliveredOrders />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "manage-classes",
      // path: "pending-orders",
      path: isPermittedRoute("personalized-orders"),
      element: (
        // <PrivateRoute>
        //   <ManageClasses />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PersonalizedOrders />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "register-classes",
      // path: "pending-supports",
      path: isPermittedRoute("pending-supports"),
      element: (
        // <PrivateRoute>
        //   <RegisterClasses />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PendingSupport />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "class-attendance",
      // path: "previous-notification",
      path: isPermittedRoute("previous-notification"),

      element: (
        // <PrivateRoute>
        //   <ClassAttendance />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PreviousNotifications />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "member-package",
      // path: "privacy-policy",
      path: isPermittedRoute("privacy-policy"),

      element: (
        // <PrivateRoute>
        //   <MemberPackage />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PrivacyPolicy />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "staff-role",
      // path: "product-brands",
      path: isPermittedRoute("product-brands"),
      element: (
        // <PrivateRoute>
        //   <StaffRole />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductBrands />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "staff-role",
      // path: "product-colors",
      path: isPermittedRoute("product-colors"),
      element: (
        // <PrivateRoute>
        //   <StaffRole />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductColors />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "staff-role",
      // path: "product-flags",
      path: isPermittedRoute("product-flags"),
      element: (
        // <PrivateRoute>
        //   <StaffRole />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductFlag />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "change-password",
      // path: "product-images-backup",
      path: isPermittedRoute("product-images-backup"),
      element: (
        // <PrivateRoute>
        //   <ChangePassword />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductImageBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "user-migration",
      // path: "product-question-answer",
      path: isPermittedRoute("product-question-answer"),

      element: (
        // <PrivateRoute>
        //   <Usermigration />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductQuestionAnswer />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "addworkout",
      // path: "product-sizes",
      path: isPermittedRoute("product-sizes"),
      element: (
        // <PrivateRoute>
        //   <Addworkout />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductSize />
          </PrivateRoute>
        </Suspense>
      ),
    },

    {
      // path: "smscampaign",
      // path: "promotional-banner",
      path: isPermittedRoute("promotional-banner"),
      element: (
        // <PrivateRoute>
        //   <SmsCampaign />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PromotionalBanner />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "smslogs",
      // path: "ratings-review",
      path: isPermittedRoute("ratings-review"),
      element: (
        // <PrivateRoute>
        //   <SMSLogs />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <RatingsReview />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "sendsinglesms",
      // path: "rejected-supports",
      path: isPermittedRoute("rejected-supports"),
      element: (
        // <PrivateRoute>
        //   <Sendsinglesms />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <RejectedSupport />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "sendgroupsms",
      // path: "remove-demo-products",
      path: isPermittedRoute("remove-demo-products"),
      element: (
        // <PrivateRoute>
        //   <Sendgroupsms />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <RemoveDemoProducts />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userprofile",
      // path: "return-policy",
      path: isPermittedRoute("return-policy"),
      element: (
        // <PrivateRoute>
        //   <UserProfile />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ReturnPolicy />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "companyprofile",
      // path: "send-notification",
      path: isPermittedRoute("send-notification"),
      element: (
        // <PrivateRoute>
        //   <CompanyProfile />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SendNotification />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "smstemplates",
      // path: "send-sms",
      path: isPermittedRoute("send-sms"),
      element: (
        // <PrivateRoute>
        //   <Smstemplates />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SendSMS />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "smsgroup",
      // path: "setup-your-config",
      path: isPermittedRoute("setup-your-config"),

      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SetupConfigPage />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "doorreport",
      // path: "shipping-policy",
      path: isPermittedRoute("shipping-policy"),

      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ShippingPolicy />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "monthlydoor",
      // path: "sms-gateway",
      path: isPermittedRoute("sms-gateway"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SmsGateways />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "doorhistory",
      // path: "sms-history",
      path: isPermittedRoute("sms-history"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SmsHistory />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "doorhistory",
      // path: "sms-templates",
      path: isPermittedRoute("sms-templates"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SMSTemplates />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "doorhistory",
      // path: "social-chat-scripts",
      path: isPermittedRoute("social-chat-scripts"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SocialChatAndScript />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "dailydoor",
      // path: "social-media-links",
      path: isPermittedRoute("social-media-links"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SocialMedia />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "senderid",
      // path: "solved-supports",
      path: isPermittedRoute("solved-supports"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SolvedSupport />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "senderid",
      // path: "models-of-brand",
      path: isPermittedRoute("models-of-brand"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ModelOfBrand />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "doorhistory",
      // path: "subcategory-backup",
      path: isPermittedRoute("subcategory-backup"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SubcategoryBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },

    {
      // path: "userpermission",
      // path: "subscribed-users",
      path: isPermittedRoute("subscribed-users"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SubscribedUsersList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "system-users",
      path: isPermittedRoute("system-users"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SystemUsers />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "terms-condition",
      path: isPermittedRoute("terms-condition"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <TermsConditionForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "ticket-files-backup",
      path: isPermittedRoute("ticket-files-backup"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <TicketFilesBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "upazila-thana",
      path: isPermittedRoute("upazila-thana"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <UpazilaThanaList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "user-images-backup",
      path: isPermittedRoute("user-images-backup"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <UserImagesBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "user-roles",
      path: isPermittedRoute("user-roles"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            {/* <UserRoleList /> */}
            <StaffRole />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-bag-banners",
      path: isPermittedRoute("view-all-bag-banners"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BagBanners />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-bag-banners",
      path: isPermittedRoute("view-all-popular-banners"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PopularBanner />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-bag-banners",
      path: isPermittedRoute("view-all-best-selling-banners"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BestSellingBanner />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-bag-banners",
      path: isPermittedRoute("view-all-special-discount-banners"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SpecialDiscountBanner />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-banners",
      path: isPermittedRoute("view-all-banners"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <AllBanners />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-blogs",
      path: isPermittedRoute("view-all-blogs"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllBlogs />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-categories",
      path: isPermittedRoute("view-all-categories"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CategoryList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-child-categories",
      path: isPermittedRoute("view-all-child-categories"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ChildCategoryList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-pages",
      path: isPermittedRoute("view-all-pages"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CustomPages />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-products",
      path: isPermittedRoute("view-all-products"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllProducts />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-promo-code",
      path: isPermittedRoute("view-all-promo-code"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllPromoCode />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-shoes-banners",
      path: isPermittedRoute("view-all-shoes-banners"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ShoesBanners />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-sliders",
      path: isPermittedRoute("view-all-sliders"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SliderList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-subcategories",
      path: isPermittedRoute("view-all-subcategories"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SubcategoryList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-testimonials",
      path: isPermittedRoute("view-all-testimonials"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllTestimonials />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "website-theme-color",
      path: isPermittedRoute("website-theme-color"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <WebsiteThemeColorForm />
          </PrivateRoute>
        </Suspense>
        // <WebsiteThemeColorForm />
      ),
    },
    {
      // path: "userpermission",
      // path: "write-blog",
      path: isPermittedRoute("write-blog"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BlogCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-stores",
      path: isPermittedRoute("view-all-stores"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllStores />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "view-all-cities",
      path: isPermittedRoute("view-all-cities"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllCities />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "zones/:city_id",
      path: isPermittedRoute("zones/:city_id"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllZones />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "area/:zone_id",
      path: isPermittedRoute("area/:zone_id"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllArea />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "courier-steadfast-settings",
      path: isPermittedRoute("courier-steadfast-settings"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CourierSteadFastSettings />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "courier-pathao-settings",
      path: isPermittedRoute("courier-pathao-settings"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CourierPathaoSettings />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "create-store",
      path: isPermittedRoute("create-store"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <StoreCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "terms-and-condition",
      path: isPermittedRoute("terms-and-condition"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <TermsCondition />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "shipping-policy",
      path: isPermittedRoute("shipping-policy"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ShippingPolicy />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "shipping-policy",
      path: isPermittedRoute("shipping-policy"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ShippingPublicPolicy />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "discount",
      path: isPermittedRoute("discount"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <DiscountForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "discount",
      path: isPermittedRoute("transactions"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      // path: "discount",
      path: isPermittedRoute("new-arrival-banner"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <NewArrivalBanner />
          </PrivateRoute>
        </Suspense>
      ),
    },
  ];

  // return role === "admin" ? dashboardChildrenRoutes : [];
  return dashboardChildrenRoutes;
}

export default DashboardChildrenRoutes;
