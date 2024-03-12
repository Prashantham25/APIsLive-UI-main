/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import React, { lazy } from "react";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Settings from "layouts/pages/account/settings";
import BillingPage from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Timeline from "layouts/pages/projects/timeline";
import PricingPage from "layouts/pages/pricing-page";
import NotificationPage from "layouts/pages/notifications";
import AllProjects from "layouts/pages/profile/all-projects";
import NewUser from "layouts/pages/users/new-user";
import Dashboard from "layouts/dashboards/dashboard";
import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import NBLayout from "layouts/NBLayout";
import RTL from "layouts/rtl";
import Widgets from "layouts/pages/widgets";
import Charts from "layouts/pages/charts";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpCover from "layouts/authentication/sign-up/cover";
import ResetCover from "layouts/authentication/reset-password/cover";
// import NBLogin from "layouts/authentication/NBLogin";
import BPLogin from "modules/BrokerPortal/Login/BPLogin";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";
import BPLanding from "modules/BrokerPortal/Pages/BPLanding";
import BrokerUserLanding from "modules/BrokerPortal/Pages/BrokerUserLanding";
import MotorComparison from "modules/BrokerPortal/Pages/MotorComparison";
import MotorProposal from "modules/BrokerPortal/Pages/MotorProposal";
import CustomerEngage from "modules/BrokerPortal/Pages/CustomerEngage";
import CustomerDetails from "modules/BrokerPortal/Pages/CustomerDetails";
import Payment from "modules/BrokerPortal/Pages/Payment";
import CKYC from "modules/BrokerPortal/Pages/CKYC";
import MyProfile from "modules/BrokerPortal/Pages/MyProfile";
import MyTrainings from "modules/BrokerPortal/Pages/MyTrainings";
import Registration from "modules/BrokerPortal/Pages/Registration";
import AgentRegistration from "modules/PolicyLive/views/LICDemo/Registration";
import AgentLogin from "modules/PolicyLive/views/LICDemo/Login/BPLogin";
import AgentProfile from "modules/PolicyLive/views/LICDemo/BPLanding";

import ProfileDetails from "modules/BrokerPortal/Pages/MyProfile/ProfileDetails";
import AgentProfileDetails from "modules/PolicyLive/views/LICDemo/MyProfile/ProfileDetails";

import InubeBrokerAdmin from "modules/BrokerPortal/Pages/InubeBrokerAdmin";
import MDAvatar from "components/MDAvatar";
import MotorQuote from "modules/BrokerPortal/Pages/MotorQuote";
import CarBrand from "modules/BrokerPortal/Pages/MotorQuote/Brand";
import InputSummary from "modules/BrokerPortal/Pages/MotorQuote/InputSummary";
import BikeInputSummary from "modules/BrokerPortal/Pages/Bike/InputSummary";
import CustomerLanding from "modules/BrokerPortal/Pages/CustomerLanding";
import HealthQuote from "modules/BrokerPortal/Pages/Health/HealthQuote";
import HealthInputSummary from "modules/BrokerPortal/Pages/Health/HealthQuote/HealthInputSummary";
import HealthCustomerEngage from "modules/BrokerPortal/Pages/Health/HealthCustomerEngage";
import QuoteSummary from "modules/BrokerPortal/Pages/Health/HealthQuote/QuoteSummary";
import HealthProposal from "modules/BrokerPortal/Pages/Health/HealthProposal";
import ProposerDetails from "modules/BrokerPortal/Pages/Health/HealthProposal/ProposerDetails";
import TravelQuote from "modules/BrokerPortal/Pages/Travel/TravelQuote";
import TravelQuickQuote from "modules/BrokerPortal/Pages/Travel/TravelQuickQuote";
import CustomerProfile from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/CustomerProfile";
import PolicyDetails from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/PolicyDetails";
import PolicyViewMore from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/PolicyViewMore";
import CustomerSignIn from "modules/BrokerPortal/Pages/CustomerPortal/CustomerSignIn";
import LICCustomerSignIn from "modules/PolicyLive/views/LICDemo/CustomerPortal/CustomerSignIn";

import CustomerOTP from "modules/BrokerPortal/Pages/CustomerPortal/CustomerOTP";
import CustomerSignUp from "modules/BrokerPortal/Pages/CustomerPortal/CustomerSignUp";
import CustomerProfileDetails from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/ProfileDetails";
import PendingPolicies from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/PendingPolicies";
import Family from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Family";
import CustomerPayment from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Payment";
import Policies from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Policies";
import SideMenuBar from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/SideMenu";
import CustomerQuotes from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Quotes";
import Preferences from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Preferences";
import Claims from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Claims";
import TravelDetails from "modules/BrokerPortal/Pages/Travel/TravelQuote/TravelDetails";
import TravelQuoteComparision from "modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteComparision";
import TravelQuoteSummary from "modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteSummary";
import TravelPolicySummary from "modules/BrokerPortal/Pages/Travel/TravelQuote/TravelPolicySummary";
import TravelCustomerEngage from "modules/BrokerPortal/Pages/Travel/TravelQuote/TravelCustomerEngage/TravelCustomerEngage";
import TravelCustomerDetails from "modules/BrokerPortal/Pages/Travel/TravelQuote/TravelCustomerEngage/TravelCustomerDetails";
import TravelMemberDetails from "modules/BrokerPortal/Pages/Travel/TravelQuote/MemberDetails";
import FinalTravelDetails from "modules/BrokerPortal/Pages/Travel/TravelQuote/FinalTravelDetails";
import TravelPaymentDetails from "modules/BrokerPortal/Pages/Travel/TravelQuote/PaymentDetails";
import TravelPayment from "modules/BrokerPortal/Pages/Travel/TravelQuote/PaymentMethod";
// GCV
import GCVQuote from "modules/BrokerPortal/Pages/GCV";
import GCVInsureVehicle from "modules/BrokerPortal/Pages/GCV/GCVInsureVehicle";
import GCVInputSummary from "modules/BrokerPortal/Pages/GCV/InputSummary";
// PCV
import PCVQuote from "modules/BrokerPortal/Pages/PCV";
import PCVInsureVehicle from "modules/BrokerPortal/Pages/PCV/PCVInsureVehicle";
import PCVInputSummary from "modules/BrokerPortal/Pages/PCV/InputSummary";
// import PCVBrand from "modules/BrokerPortal/Pages/PCV/PCVBrand";
// Adminflow
import AdminLogin from "modules/BrokerPortal/Pages/Admin/AdminLogin/AdminLogin";

// @mui icons
import Icon from "@mui/material/Icon";
import PlanDetails from "modules/BrokerPortal/Pages/Health/HealthProposal/PlanDetails";
import PlanSelected from "modules/BrokerPortal/Pages/Health/HealthProposal/PlanSelected";

import PaymentDetails from "modules/BrokerPortal/Pages/Health/HealthProposal/PaymentDetails";

import profilePicture from "assets/images/team-3.jpg";

import InterviewRegistration from "modules/BrokerPortal/Pages/Admin/Interview/InterviewRegistration";

// DBI Project
import DBI from "modules/PolicyLive/views/DBI";
import DBIMobile from "modules/PolicyLive/views/DBI/MobileApp/DBIMobile";
import AddDriverDetails from "modules/PolicyLive/views/DBI/MobileApp/AddDriverDetails";

// BrokerPortal Health
import HealthQuote1 from "modules/BrokerPortal/Pages/Health1/Quote";
import QuoteSummary1 from "modules/BrokerPortal/Pages/Health1/QuoteSummary";
import Proposal1 from "modules/BrokerPortal/Pages/Health1/Proposal";

import CreateCourseRegistration from "modules/BrokerPortal/Pages/Admin/AdminCourse/CreateCourseRegistration";
import MotorPayUPayment from "modules/BrokerPortal/Pages/MotorProposal/MotorPAYUPayment";

import TravelPlanDetails from "./modules/BrokerPortal/Pages/Travel/TravelQuote/TravelPlanDetails";
import TravelSingleScreen from "./modules/BrokerPortal/Pages/Travel/TravelQuote/TravelSingleScreen";
// import BrokerInsuranceCompany from "./modules/BrokerPortal/Pages/BrokerInsuranceCompany";
// import ProfileAndTraining from "./modules/BrokerPortal/Pages/ProfileAndTraining";
import ViewCourse from "./modules/BrokerPortal/Pages/ViewCourses";
import ProfileDetail from "./modules/BrokerPortal/Pages/InubeBrokerAdmin/ProfileDetail";
import LoginAdmin from "./modules/BrokerPortal/Pages/InubeBrokerAdmin/LoginAdmin";
// import CompanyDetails from "./modules/BrokerPortal/Pages/BrokerInsuranceCompany/CompanyDetails";
import ViewProfile from "./modules/BrokerPortal/Pages/ViewProfile";
import POSPTest from "./modules/BrokerPortal/Pages/POSPTest/POSPTest";
import VodafoneLanding from "./modules/Vodafone/VodafoneLanding";
import BikeQuote from "./modules/BrokerPortal/Pages/Bike/BikeQuote";
import MotorProposalPayment from "./modules/BrokerPortal/Pages/MotorProposal/MotorProposalPayment";
import HdfcPayment from "./modules/PolicyLive/views/Health/Chomp/ProposalSummary";
import SuccessPayment from "./modules/PolicyLive/views/Health/Chomp/SuccessPayment";
import COI from "./modules/PolicyLive/views/Health/Chomp/COI";
import ChompLogin from "./modules/PolicyLive/views/Health/Chomp/Login/ChompLogin";
import BGRPaymentFailure from "./modules/PolicyLive/views/Home/PaymentFailure";
import BGRPaymentSuccess from "./modules/PolicyLive/views/Home/PaymentSuccess";
import BLUSPaymentSuccess from "./modules/PolicyLive/views/BLUS/PaymentSuccess";
import BLUSPaymentFailure from "./modules/PolicyLive/views/BLUS/PaymentFailure";
import MarinePaymentFailure from "./modules/PolicyLive/views/Marine/SpecificVoyage/PaymentFailure";
import MarinePaymentSuccess from "./modules/PolicyLive/views/Marine/SpecificVoyage/PaymentSuccess";
import Login from "./modules/Login/index";
import PasswordPage from "./modules/Login/PasswordPage";
import BGRPaymentLink from "./modules/PolicyLive/views/Home/PaymentLinkDetails";
import Test from "./modules/BrokerPortal/Pages/Testing/Test";
import SamplePage from "./modules/BrokerPortal/Pages/Sample/Sample";
import DashBoard from "./modules/BrokerPortal/Pages/BPLanding/DashBoard";
import MyQuotationsTab from "./modules/BrokerPortal/Pages/BPLanding/MyQuotationsTab";
import MyPoliciesTab from "./modules/BrokerPortal/Pages/BPLanding/MyPoliciesTab";
import PaymentLink from "./modules/PolicyLive/views/Retail/Payment/PaymentLink";
import ProposerDetails1 from "./modules/PolicyLive/views/Retail/Products/NBRetail/ProposerDetails";
// import ExcelUpload from "./modules/PolicyLive/views/Retail/Products/NBRetail/ExcelUpload";
import BrokerUserLogin from "./modules/BrokerPortal/Login/BrokerUserLogin";

import PaymentFailure from "./modules/PolicyLive/views/Retail/Products/NBRetail/PaymentFailure";
import CustomerPolicyIssuance from "./modules/PolicyLive/views/Retail/Products/NBRetail/CustomerPolicyIssuance";
// import CustomerValidation from "./modules/PolicyLive/views/Retail/Products/NBRetail/CustomerValidation";
// import PLLogin from "./modules/PolicyLive/Login/PLLogin";

// CRM

import Opportunities from "./modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Opportunities";
import ProspectModal from "./modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/ProspectModal";

import RND from "./modules/BaseSetup/views/RND";
import DynamicPageConfigurator from "./modules/BaseSetup/views/RND/DynamicPageConfigurator";

// Commercial

import CommercialQuote from "./modules/BrokerPortal/Pages/Commercial/BPCommercial";

import QuoteList from "./modules/BrokerPortal/Pages/Commercial/BPCommercial/QuoteList";

import Quote from "./modules/BrokerPortal/Pages/Quote";
import QuoteDetails from "./modules/BrokerPortal/Pages/Quote/index1";
import DashboardMenu from "./modules/BrokerPortal/Pages/Quote/DashboardMenu";
import PaymentStatus from "./modules/BrokerPortal/Pages/Quote/PaymentDetails/PaymentStatus";

import QuotationError from "./modules/BrokerPortal/Pages/Admin/QuotationError";
// import MagmaSuccess from "./modules/PolicyLive/views/Retail/Payment/MagmaSuccess";
import MagmaRazor from "./modules/PolicyLive/views/Retail/Payment/MagmaRazor";
import CommonRedirection from "./modules/Login/CommonRedirection";
import OAuthRedirection from "./modules/Login/OAuthRedirection";
import NBCommon from "./modules/PolicyLive/views/Retail/Products/NBRetail/NBHome";
// import USGICommon from "./modules/PolicyLive/views/Retail/Products/USGI/USGIHome";
import SMSPDFDown from "./modules/PolicyLive/views/Retail/Products/NepalProds/SMSPDFDown";
import BranchesList from "./modules/BrokerPortal/Pages/Branches/BranchesList";
import AddNewBranch from "./modules/BrokerPortal/Pages/Branches/AddNewBranch";
import EditBranch from "./modules/BrokerPortal/Pages/Branches/EditBranch";
import MagmaOnlineSuccess from "./modules/PolicyLive/views/Retail/Payment/MagmaOnlineSuccess";
import MotorQuickQuote from "./modules/BrokerPortal/Pages/MotorQuote/MotorQuickQuote";

import CustomerLandingPage from "./modules/PolicyLive/views/Customer/LandingPage";
import CustomerDemoLandingPage from "./modules/PolicyLive/views/Customer/DemoLandingPage";

import CPMPaymentSuccess from "./modules/PolicyLive/views/CPM/PaymentSuccess";
import CPMPaymentFailure from "./modules/PolicyLive/views/CPM/PaymentFailure";

import Logs from "./modules/BaseSetup/views/Logs";

import CustomerLifeLanding from "./modules/PolicyLive/views/Life/Products/Customer";
import CustomerLifeRedirection from "./modules/PolicyLive/views/Life/Products/Customer/LifeCustomerRedirection";

import CustomerQuote from "./modules/PolicyLive/views/Life/Products/Customer/Quote";
import CustomerProposal from "./modules/PolicyLive/views/Life/Products/Customer/Proposal";
import PaymentLinkFlow from "./modules/PolicyLive/views/Retail/Products/Magma/PaymentLinkFlow";
import MagmaPaymentFailure from "./modules/PolicyLive/views/Retail/Payment/MagmaPaymentFailure";
import ProposalVerification from "./modules/PolicyLive/views/Life/Products/NewBusiness/Proposal/ProposalVerification";
import CustomerEConsent from "./modules/PolicyLive/views/Life/Products/NewBusiness/Proposal/CustomerEConsent";
import CustomerProposalIndex from "./modules/PolicyLive/views/Life/Products/NewBusiness/Proposal/CustomerProposalIndex";
import LifeCustomerPayment from "./modules/PolicyLive/views/Life/Products/NewBusiness/Proposal/CustomerPayment";
import LifePostPayment from "./modules/PolicyLive/views/Life/Products/NewBusiness/Proposal/PostPayment";
import PostVideoVerification from "./modules/PolicyLive/views/Life/Products/NewBusiness/Proposal/PostVideoVerification";
import PIVCRedirectionForCommunication from "./modules/PolicyLive/views/Life/Products/NewBusiness/data/PIVCRedirectionForCommunication";
import EKYCRedirection from "./modules/PolicyLive/views/Life/Products/NewBusiness/data/EKYCRedirection";
import ViewDocuments from "./modules/PolicyLive/views/Life/Products/Customer/data/ViewDocuments";
import TrackApplications from "./modules/PolicyLive/views/Life/Products/Customer/data/TrackApplications";
import AdditionalQuestions from "./modules/PolicyLive/views/Life/Products/NewBusiness/data/AdditionalQuestions";

// import CourseList from "modules/PolicyLive/views/LICDemo/Admin/AdminCourse/CoursesList";
import StepperV1 from "./modules/PolicyLive/views/Retail/Layout/StepperV1";
import RedirectToRetail from "./modules/PolicyLive/views/Retail/data/RedirectToRetail";
import MotorCustomerPaymentPage from "./modules/PolicyLive/views/Retail/Products/Demo/MotorCustomerPaymentPage";

import B2CLogin from "./modules/PolicyLive/views/Retail/Products/NepalProds/NepalLogin/B2CLogin";
import B2CPolicyType from "./modules/PolicyLive/views/Retail/Products/NepalProds/NepalLogin/B2CPolicyType";
import B2CDashboard from "./modules/PolicyLive/views/Retail/Products/NepalProds/B2C/B2CDashboard";
import B2CPaymentSuccess from "./modules/PolicyLive/views/Retail/Payment/B2CPaymentSuccess";
import B2CPaymentFailure from "./modules/PolicyLive/views/Retail/Payment/B2CPaymentFailure";
import LifeBancaLogin from "./modules/Login/LifeBancaLogin";
import GenericDocumentViewer from "./Common/GenericDocumentViewer";
import GenericDashboard from "./modules/PolicyLive/views/Dashboards/GenericDashboard";
import CustomerClaimIntimation from "./modules/ClaimsLive/views/HealthClaims/Intimation/CustomerClaimIntimation";
import NepalLoginPage from "./modules/Login/NepalLoginPage";
import TakafulOmanLoginPage from "./modules/Login/TakafulOmanLoginPage";
import QRFooter from "./modules/PolicyLive/views/Retail/Products/USGI/QRFooter";
// const StepperV2 = lazy(() => import("./modules/PolicyLive/views/Retail/Layout/StepperV2"));
const StepperV2 = lazy(() =>
  import("./modules/PolicyLive/views/Retail/Products/NepalProds/B2C/B2CProd")
);

const routes = [
  {
    type: "collapse",
    name: "Brooklyn Alice",
    key: "brooklyn-alice",
    icon: <MDAvatar src={profilePicture} alt="Brooklyn Alice" size="sm" />,
    collapse: [
      {
        name: "My Profile",
        key: "my-profile",
        route: "/pages/profile/profile-overview",
        component: <ProfileOverview />,
      },
      {
        name: "Settings",
        key: "profile-settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
      {
        name: "Logout",
        key: "logout",
        route: "/authentication/sign-in/basic",
        component: <SignInBasic />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: "Analytics",
        key: "analytics",
        route: "/dashboards/analytics",
        component: <Analytics />,
      },
      {
        name: "Sales",
        key: "sales",
        route: "/dashboards/sales",
        component: <Sales />,
      },
      {
        name: "Dashboard",
        key: "dashboard",
        route: "/dashboards/dashboard",
        component: <Dashboard />,
      },
    ],
  },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Pages",
    key: "pages",
    icon: <Icon fontSize="medium">image</Icon>,
    collapse: [
      {
        name: "Profile",
        key: "profile",
        collapse: [
          {
            name: "Profile Overview",
            key: "profile-overview",
            route: "/pages/profile/profile-overview",
            component: <ProfileOverview />,
          },
          {
            name: "All Projects",
            key: "all-projects",
            route: "/pages/profile/all-projects",
            component: <AllProjects />,
          },
        ],
      },
      {
        name: "Users",
        key: "users",
        collapse: [
          {
            name: "New User",
            key: "new-user",
            route: "/pages/users/new-user",
            component: <NewUser />,
          },
        ],
      },
      {
        name: "Account",
        key: "account",
        collapse: [
          {
            name: "Settings",
            key: "settings",
            route: "/pages/account/settings",
            component: <Settings />,
          },
          {
            name: "Billing",
            key: "billing",
            route: "/pages/account/billing",
            component: <BillingPage />,
          },
          {
            name: "Invoice",
            key: "invoice",
            route: "/pages/account/invoice",
            component: <Invoice />,
          },
        ],
      },
      {
        name: "Projects",
        key: "projects",
        collapse: [
          {
            name: "Timeline",
            key: "timeline",
            route: "/pages/projects/timeline",
            component: <Timeline />,
          },
        ],
      },
      {
        name: "Pricing Page",
        key: "pricing-page",
        route: "/pages/pricing-page",
        component: <PricingPage />,
      },
      { name: "RTL", key: "rtl", route: "/pages/rtl", component: <RTL /> },
      { name: "Widgets", key: "widgets", route: "/pages/widgets", component: <Widgets /> },
      { name: "Charts", key: "charts", route: "/pages/charts", component: <Charts /> },
      {
        name: "Notfications",
        key: "notifications",
        route: "/pages/notifications",
        component: <NotificationPage />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Ecommerce",
    key: "ecommerce",
    icon: <Icon fontSize="medium">shopping_basket</Icon>,
    collapse: [
      {
        name: "Products",
        key: "products",
        collapse: [
          {
            name: "New Product",
            key: "new-product",
            route: "/ecommerce/products/new-product",
            component: <NewProduct />,
          },
          {
            name: "Edit Product",
            key: "edit-product",
            route: "/ecommerce/products/edit-product",
            component: <EditProduct />,
          },
          {
            name: "Product Page",
            key: "product-page",
            route: "/ecommerce/products/product-page",
            component: <ProductPage />,
          },
        ],
      },
      {
        name: "Orders",
        key: "orders",
        collapse: [
          {
            name: "Order List",
            key: "order-list",
            route: "/ecommerce/orders/order-list",
            component: <OrderList />,
          },
          {
            name: "Order Details",
            key: "order-details",
            route: "/ecommerce/orders/order-details",
            component: <OrderDetails />,
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Applications",
    key: "applications",
    icon: <Icon fontSize="medium">apps</Icon>,
    collapse: [
      {
        name: "Kanban",
        key: "kanban",
        route: "/applications/kanban",
        component: <Kanban />,
      },
      {
        name: "Wizard",
        key: "wizard",
        route: "/applications/wizard",
        component: <Wizard />,
      },
      {
        name: "Data Tables",
        key: "data-tables",
        route: "/applications/data-tables",
        component: <DataTables />,
      },
      {
        name: "Calendar",
        key: "calendar",
        route: "/applications/calendar",
        component: <Calendar />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Authentication",
    key: "authentication",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    collapse: [
      {
        name: "Sign In",
        key: "sign-in",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/sign-in/basic",
            component: <SignInBasic />,
          },
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-in/cover",
            component: <SignInCover />,
          },
          {
            name: "Illustration",
            key: "illustration",
            route: "/authentication/sign-in/illustration",
            component: <SignInIllustration />,
          },
        ],
      },
      {
        name: "Sign Up",
        key: "sign-up",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-up/cover",
            component: <SignUpCover />,
          },
        ],
      },
      {
        name: "Reset Password",
        key: "reset-password",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/reset-password/cover",
            component: <ResetCover />,
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Broker Portal",
    key: "BrokerPortal",
    icon: <Icon fontSize="medium">shopping_basket</Icon>,
    collapse: [
      {
        name: "Layouts",
        key: "layouts",
        collapse: [
          {
            name: "New Product",
            key: "new-product",
            route: "/ecommerce/products/new-product",
            component: <NewProduct />,
          },
          {
            name: "Edit Product",
            key: "edit-product",
            route: "/ecommerce/products/edit-product",
            component: <EditProduct />,
          },
          {
            name: "Product Page",
            key: "product-page",
            route: "/ecommerce/products/product-page",
            component: <ProductPage />,
          },
        ],
      },
      {
        name: "Pages",
        key: "pages",
        collapse: [
          {
            name: "BPLogin",
            key: "BPLogin",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Login/BPLogin",
            component: <BPLogin />,
          },
          {
            name: "Broker User Login",
            key: "BrokerUserLogin",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Login/BrokerUserLogin",
            component: <BrokerUserLogin />,
          },
          {
            name: "Customer Home",
            key: "CustomerHome",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerLanding",
            component: <CustomerLanding />,
          },
          {
            name: "Customer Profile Landing",
            key: "CustomerProfile",
            icon: <Icon fontSize="small">login</Icon>,
            route:
              "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/CustomerProfile",
            component: <CustomerProfile />,
          },
          {
            name: "Policy_Details",
            key: "PolicyDeatils",
            icon: <Icon fontSize="small">login</Icon>,
            route:
              "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/PolicyDetails",
            component: <PolicyDetails />,
          },
          {
            name: "Policy_ViewMore",
            key: "PolicyViewMore",
            icon: <Icon fontSize="small">login</Icon>,
            route:
              "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/PolicyViewMore",
            component: <PolicyViewMore />,
          },
          {
            name: "Customer Sign In",
            key: "CustomerSignIn",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerPortal/CustomerSignIn",
            component: <CustomerSignIn />,
          },
          {
            name: "LIC Customer Sign In",
            key: "CustomerOTP",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/CustomerPortal/OTP",
            component: <CustomerOTP />,
          },
          {
            name: "Nepal Login Page",
            key: "NepalLogin",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/Nepal/Login",
            component: <NepalLoginPage />,
          },
          {
            name: "TakafulOman Login Page",
            key: "TakafulOmanLogin",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/TakafulOman/Login",
            component: <TakafulOmanLoginPage />,
          },
          {
            name: "Customer OTP",
            key: "CustomerOTP",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerPortal/CustomerOTP",
            component: <CustomerOTP />,
          },
          {
            name: "Customer SignUP ",
            key: "CustomerSignUp",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerPortal/CustomerSignUp",
            component: <CustomerSignUp />,
          },
          {
            name: "Customer ProfileDetails ",
            key: "CustomerProfileDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route:
              "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/ProfileDetails",
            component: <CustomerProfileDetails />,
          },
          {
            name: "Pending Policies ",
            key: "PendingPolicies",
            icon: <Icon fontSize="small">login</Icon>,
            route:
              "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/PendingPolicies",
            component: <PendingPolicies />,
          },
          {
            name: "Customer Payment",
            key: "CustomerPayment",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Payment",
            component: <CustomerPayment />,
          },
          {
            name: "Side MenuBar",
            key: "SideMenuBar",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/SideMenu",
            component: <SideMenuBar />,
          },
          {
            name: "Policy Details",
            key: "Policies",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Policies",
            component: <Policies />,
          },
          {
            name: "Quotes",
            key: "CustomerQuotes",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Quotes",
            component: <CustomerQuotes />,
          },
          {
            name: "Preferences",
            key: "Preferences",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Preferences",
            component: <Preferences />,
          },
          {
            name: "Family Details",
            key: "Family",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Family",
            component: <Family />,
          },
          {
            name: "Claims",
            key: "Claims",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Claims",
            component: <Claims />,
          },
          {
            name: "AdminLogin",
            key: "AdminLogin",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Admin/AdminLogin/AdminLogin",
            component: <AdminLogin />,
          },
          {
            name: "BP Home",
            key: "BPLanding",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/BPLanding",
            component: <BPLanding />,
          },
          {
            name: "Broker User Home",
            key: "BrokerUserLanding",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/BrokerUserLanding",
            component: <BrokerUserLanding />,
          },
          {
            name: "Motor Quote",
            key: "MotorQuote",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/MotorQuote",
            component: <MotorQuote />,
          },
          {
            name: "Car Brand",
            key: "CarBrand",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/MotorQuote/Brand",
            component: <CarBrand />,
          },
          {
            name: "Input Summary",
            key: "InputSummary",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/MotorQuote/InputSummary",
            component: <InputSummary />,
          },
          {
            name: "Motor Comparison",
            key: "MotorComparison",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/MotorComparison",
            component: <MotorComparison />,
          },
          {
            name: "Health Comparision",
            key: "QuoteSummary",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Health/HealthQuote/QuoteSummary",
            component: <QuoteSummary />,
          },
          {
            name: "Health Proposal",
            key: "HealthProposal",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Health/HealthProposal",
            component: <HealthProposal />,
          },
          {
            name: "Plan Details",
            key: "PlanDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route: "modules/BrokerPortal/Pages/Health/HealthProposal/PlanDetails",
            component: <PlanDetails />,
          },
          {
            name: "BranchesList",
            key: "BranchesList",
            icon: <Icon fontSize="small">assignment</Icon>,
            route: "modules/BrokerPortal/Pages/Branches/BranchesList",
            component: <BranchesList />,
          },
          {
            name: "AddNewBranch",
            key: "AddNewBranch",
            icon: <Icon fontSize="small">assignment</Icon>,
            route: "modules/BrokerPortal/Pages/Branches/AddNewBranch",
            component: <AddNewBranch />,
          },
          {
            name: "EditBranch",
            key: "EditBranch",
            icon: <Icon fontSize="small">assignment</Icon>,
            route: "modules/BrokerPortal/Pages/Branches/EditBranch",
            component: <EditBranch />,
          },
          {
            name: "PlanSelected",
            key: "PlanSelected",
            icon: <Icon fontSize="small">login</Icon>,
            route: "modules/BrokerPortal/Pages/Health/HealthProposal/PlanSelected",
            component: <PlanSelected />,
          },
          {
            name: "ProposerDetails",
            key: "ProposerDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route: "modules/BrokerPortal/Pages/Health/HealthProposal/ProposerDetails",
            component: <ProposerDetails />,
          },
          {
            name: "Bike InputSummary",
            key: "BikeInputSummary",
            icon: <Icon fontSize="small">login</Icon>,
            route: "modules/BrokerPortal/Pages/Bike/InputSummary",
            component: <BikeInputSummary />,
          },

          {
            name: "PaymentDetails",
            key: "PaymentDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route: "modules/BrokerPortal/Pages/Health/HealthProposal/PaymentDetails",
            component: <PaymentDetails />,
          },
          {
            name: "Motor Proposal",
            key: "MotorProposal",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/MotorProposal",
            component: <MotorProposal />,
          },
          {
            name: "Customer Engagement",
            key: "CustomerEngage",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerEngage",
            component: <CustomerEngage />,
          },
          {
            name: "Customer Details",
            key: "CustomerDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CustomerDetails",
            component: <CustomerDetails />,
          },
          {
            name: "Payment",
            key: "Payment",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Payment",
            component: <Payment />,
          },
          {
            name: "CKYC",
            key: "CKYC",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CKYC",
            component: <CKYC />,
          },
          {
            name: "Health Quote",
            key: "HealthQuote",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Health/HealthQuote",
            component: <HealthQuote />,
          },
          {
            name: "Bike Quote",
            key: "BikeQuote",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Bike/BikeQuote",
            component: <BikeQuote />,
          },
          {
            name: "Travel Quote",
            key: "TravelQuote",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuote",
            component: <TravelQuote />,
          },
          {
            name: "Travel Quick Quote",
            key: "TravelQuickQuote",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuickQuote",
            component: <TravelQuickQuote />,
          },
          {
            name: "Travel Policy summary",
            key: "TravelPolicySummary",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelPolicySummary",
            component: <TravelPolicySummary />,
          },
          {
            name: "Travel Details",
            key: "TravelDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelDetails",
            component: <TravelDetails />,
          },
          {
            name: "Travel QuoteComparision",
            key: "TravelQuoteComparision",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteComparision",
            component: <TravelQuoteComparision />,
          },
          {
            name: "Travel QuoteSummary",
            key: "TravelQuoteSummary",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteSummary",
            component: <TravelQuoteSummary />,
          },
          {
            name: "Travel Customer Engage",
            key: "TravelCustomerEngage",
            icon: <Icon fontSize="small">login</Icon>,
            route:
              "/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelCustomerEngage/TravelCustomerEngage",
            component: <TravelCustomerEngage />,
          },
          {
            name: "Travel Customer Details",
            key: "TravelCustomerDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route:
              "/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelCustomerEngage/TravelCustomerDetails",
            component: <TravelCustomerDetails />,
          },
          {
            name: "Travel MemberDetails",
            key: "TravelMemberDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuote/MemberDetails",
            component: <TravelMemberDetails />,
          },
          {
            name: "Travel Details",
            key: "FinalTravelDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuote/FinalTravelDetails",
            component: <FinalTravelDetails />,
          },
          {
            name: "Travel PaymentDetails",
            key: "TravelPaymentDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuote/PaymentDetails",
            component: <TravelPaymentDetails />,
          },
          {
            name: "Travel Payment",
            key: "TravelPayment",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuote/PaymentMethod",
            component: <TravelPayment />,
          },
          {
            name: "Travel PlanDetails",
            key: "TravelPlanDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelPlanDetails",
            component: <TravelPlanDetails />,
          },
          {
            name: "Travel SingleScreen",
            key: "TravelSingleScreen",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelSingleScreen",
            component: <TravelSingleScreen />,
          },
          {
            name: "My Profile",
            key: "MyProfile",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/MyProfile",
            component: <MyProfile />,
          },
          {
            name: "Profile Details",
            key: "ProfileDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/MyProfile/ProfileDetails",
            component: <ProfileDetails />,
          },
          {
            name: "Agent Profile Details",
            key: "AgentProfileDetails",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/Agent/ProfileDetails",
            component: <AgentProfileDetails />,
          },
          {
            name: "My Trainings",
            key: "MyTrainings",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/MyTrainings",
            component: <MyTrainings />,
          },
          {
            name: "Inube Broker Admin",
            key: "InubeBrokerAdmin",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/InubeBrokerAdmin",
            component: <InubeBrokerAdmin />,
          },
          // {
          //   name: "Broker Insurance Company",
          //   key: "BrokerInsuranceCompany",
          //   icon: <Icon fontSize="small">login</Icon>,
          //   route: "/modules/BrokerPortal/Pages/BrokerInsuranceCompany",
          //   component: <BrokerInsuranceCompany />,
          // },
          // {
          //   name: "Company Details",
          //   key: "CompanyDetails",
          //   icon: <Icon fontSize="small">login</Icon>,
          //   route: "/modules/BrokerPortal/Pages/BrokerInsuranceCompany/CompanyDetails",
          //   component: <CompanyDetails />,
          // },
          {
            name: "Profile Details",
            key: "ProfileDetail",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/pages/ProfileDetail",
            component: <ProfileDetail />,
          },
          {
            name: "Login Admin",
            key: "LoginAdmin",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/pages/LoginAdmin",
            component: <LoginAdmin />,
          },

          {
            name: "Registration",
            key: "Registration",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Registration",
            component: <Registration />,
          },
          {
            name: "AgentRegistration",
            key: "AgentRegistration",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/Agent/Registration",
            component: <AgentRegistration />,
          },
          {
            name: "AgentLogin",
            key: "AgentLogin",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/Agent/Login",
            component: <AgentLogin />,
          },
          {
            name: "AgentProfile",
            key: "AgentProfile",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/Agent/Profile",
            component: <AgentProfile />,
          },
          {
            name: "LIC Customer Sign In",
            key: "LICCustomerSignIn",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/CustomerPortal/CustomerSignIn",
            component: <LICCustomerSignIn />,
          },
          {
            name: "ViewCourse",
            key: "ViewCourse",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/ViewCourse",
            component: <ViewCourse />,
          },
          {
            name: "ViewProfile",
            key: "ViewProfile",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/ViewProfile",
            component: <ViewProfile />,
          },
          {
            name: "Take Test",
            key: "TakeTest",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/TakeTest",
            component: <POSPTest />,
          },
          {
            name: "Vodafone",
            key: "Vodafone",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/Vodafone",
            component: <VodafoneLanding />,
          },
          {
            name: "Health Input Summary",
            key: "HealthInputSummary",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Health/HealthQuote/HealthInputSummary",
            component: <HealthInputSummary />,
          },
          {
            name: "Health Customer Engage",
            key: "HealthCustomerEngage",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Health/HealthCustomerEngage",
            component: <HealthCustomerEngage />,
          },
          {
            name: "EConsent Payment",
            key: "EConsentPayment",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/MakePayment",
            component: <MotorProposalPayment />,
          },
          {
            name: "Hdfc Payment",
            key: "HdfcPayment",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/PolicyLive/Pages/MakePayment",
            component: <HdfcPayment />,
          },
          {
            name: "Success Payment",
            key: "SuccessPayment",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/PolicyLive/views/Health/Chomp/SuccessPayment",
            component: <SuccessPayment />,
          },
          {
            name: "COI",
            key: "COI",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/PolicyLive/views/Health/Chomp/COI",
            component: <COI />,
          },
          {
            name: "Chomp Login",
            key: "ChompLogin",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/Chomp/Login/ChompLogin",
            component: <ChompLogin />,
          },
          {
            name: "BGRPayment failure",
            key: "BGRPaymentFailure",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/Home/PaymentFailure",
            component: <BGRPaymentFailure />,
          },
          {
            name: "BGRPayment Sucess",
            key: "BGRPaymentSuccess",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/Home/PaymentSuccess",
            component: <BGRPaymentSuccess />,
          },
          {
            name: "CPMPayment failure",
            key: "CPMPaymentFailure",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/CPM/PaymentFailure",
            component: <CPMPaymentFailure />,
          },
          {
            name: "CPMPayment Sucess",
            key: "CPMPaymentSuccess",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/CPM/PaymentSuccess",
            component: <CPMPaymentSuccess />,
          },
          {
            name: "MarinePayment Sucess",
            key: "MarinePaymentSuccess",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/Marine/SpecificVoyage/PaymentSuccess",
            component: <MarinePaymentSuccess />,
          },
          {
            name: "BLUSPayment failure",
            key: "BLUSPaymentFailure",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/BLUS/PaymentFailure",
            component: <BLUSPaymentFailure />,
          },
          {
            name: "MarinePayment failure",
            key: "MarinePaymentFailure",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/Marine/SpecificVoyage/PaymentFailure",
            component: <MarinePaymentFailure />,
          },
          {
            name: "BLUSPayment Sucess",
            key: "BLUSPaymentSuccess",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/BLUS/PaymentSuccess",
            component: <BLUSPaymentSuccess />,
          },
          {
            name: "Login",
            key: "Login",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/pages/login-page",
            component: <Login />,
          },
          {
            name: "Password Page",
            key: "PasswordPage",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/pages/password-page",
            component: <PasswordPage />,
          },
          {
            name: "GCVQuote",
            key: "GCVQuote",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/GCV",
            component: <GCVQuote />,
          },
          {
            name: "GCVInsureVehicle",
            key: "GCVInsureVehicle",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/GCV/GCVInsureVehicle",
            component: <GCVInsureVehicle />,
          },

          {
            name: "GCVInputSummary",
            key: "GCVInputSummary",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/GCV/InputSummary",
            component: <GCVInputSummary />,
          },
          {
            name: "PCVQuote",
            key: "PCVQuote",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/PCV",
            component: <PCVQuote />,
          },
          {
            name: "PCVInsureVehicle",
            key: "PCVInsureVehicle",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/PCV/PCVInsureVehicle",
            component: <PCVInsureVehicle />,
          },

          {
            name: "PCVInputSummary",
            key: "PCVInputSummary",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/PCV/InputSummary",
            component: <PCVInputSummary />,
          },
          {
            name: "BGRPaymentLink ",
            key: "BGRPaymentLink",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/Home/PaymentLink",
            component: <BGRPaymentLink />,
          },
          {
            name: "PaymentLink",
            key: "PaymentLink",
            icon: <Icon fontSize="small">assignment</Icon>,
            route: "/Retail/PaymentLink",
            component: <PaymentLink />,
          },
          {
            name: "InterviewRegistration",
            key: "InterviewRegistration",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Admin/Interview/InterviewRegistration",
            component: <InterviewRegistration />,
          },
          {
            name: "CreateCourseRegistration",
            key: "CreateCourseRegistration",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Admin/AdminCourse/CreateCourseRegistration",
            component: <CreateCourseRegistration />,
          },
          {
            name: "Test",
            key: "Test",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/pages/Test",
            component: <Test />,
          },
          {
            name: "SamplePage",
            key: "SamplePage",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/pages/Sample",
            component: <SamplePage />,
          },
          {
            name: "PAYU Payment",
            key: "MotorPayUPayment",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/MakePAYUPayment",
            component: <MotorPayUPayment />,
          },
          {
            name: "DashBoard",
            key: "DashBoard",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/BPLanding/DashBoard",
            component: <DashBoard />,
          },
          {
            name: "MyQuotationsTab",
            key: "MyQuotationsTab",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/BPLanding/MyQuotationsTab",
            component: <MyQuotationsTab />,
          },
          {
            name: "MyPoliciesTab",
            key: "MyPoliciesTab",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/BPLanding/MyPoliciesTab",
            component: <MyPoliciesTab />,
          },
          {
            name: "CRMClientsOpportunities",
            key: "Opportunities",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Opportunities",
            component: <Opportunities />,
          },
          {
            name: "ProspectModal",
            key: "ProspectModal",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/ProspectModal",
            component: <ProspectModal />,
          },
          {
            name: "CommercialQuote",
            key: "CommercialQuote",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Commercial/BPCommercial",
            component: <CommercialQuote />,
          },

          {
            name: "QuoteList",
            key: "QuoteList",
            icon: <Icon fontSize="small">login</Icon>,
            route: "/modules/BrokerPortal/Pages/Commercial/BPCommercial/QuoteList",
            component: <QuoteList />,
          },

          // Life screens

          {
            name: "CustomerLifeLanding",
            key: "CustomerLifeLanding",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/CustomerLifeLanding",
            component: <CustomerLifeLanding />,
          },
          {
            name: "ViewDocuments",
            key: "ViewDocuments",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/life/ViewDocuments",
            component: <ViewDocuments />,
          },
          {
            name: "AdditionalQuestions",
            key: "AdditionalQuestions",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/life/AdditionalQuestions",
            component: <AdditionalQuestions />,
          },
          {
            name: "LifeApplicationTrack",
            key: "LifeApplicationTrack",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/life/MyApplications",
            component: <TrackApplications />,
          },
          {
            name: "CustomerLifeRedirection",
            key: "CustomerLifeRedirection",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/eSales/liconline/setprop",
            component: <CustomerLifeRedirection />,
          },
          {
            type: "collapse",
            name: "CustomerQuote",
            key: "CustomerQuote",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/CustomerQuote",
            component: <CustomerQuote />,
            noCollapse: true,
          },
          {
            type: "collapse",
            name: "CustomerProposal",
            key: "CustomerProposal",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/CustomerProposal",
            component: <CustomerProposal />,
            noCollapse: true,
          },

          {
            name: "ProposalVerification",
            key: "ProposalVerification",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/ProposalVerification",
            component: <ProposalVerification />,
          },
          {
            name: "CustomerEConsent",
            key: "CustomerEConsent",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/CustomerEConsent",
            component: <CustomerEConsent />,
          },

          {
            name: "CustomerProposalIndex",
            key: "CustomerProposalIndex",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/lifeCustomerProposals",
            component: <CustomerProposalIndex />,
          },
          {
            name: "LifeCustomerPayment",
            key: "LifeCustomerPayment",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/LifeCustomerPayment",
            component: <LifeCustomerPayment />,
          },
          {
            name: "LifePostPayment",
            key: "LifePostPayment",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/LifePostPayment",
            component: <LifePostPayment />,
          },
          {
            name: "PIVCRedirectionForCommunication",
            key: "PIVCRedirectionForCommunication",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/LifePIVC",
            component: <PIVCRedirectionForCommunication />,
          },
          {
            name: "PostVideoVerification",
            key: "PostVideoVerification",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/LifeVideoVerification",
            component: <PostVideoVerification />,
          },
          {
            name: "EKYCRedirection",
            key: "EKYCRedirection",
            icon: <Icon fontSize="small">alarm</Icon>,
            route: "/EKYCRedirection",
            component: <EKYCRedirection />,
          },
        ],
      },
    ],
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Endorsement",
  //   key: "Endorsement",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/Endorsement",
  //   component: <NBLayout />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "NBLogin",
  //   key: "NBLogin",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/NBLogin",
  //   component: <NBLogin />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Policy Live Login",
  //   key: "pl-login",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/modules/PolicyLive/PLLogin",
  //   component: <PLLogin />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "RND",
    key: "rnd",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/RND",
    component: <RND />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "DynamicPageConfigurator",
    key: "DynamicPageConfigurator",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/retail/config",
    component: <DynamicPageConfigurator />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Quote",
    key: "Quote",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Quote",
    component: <Quote />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "QuoteDetails",
    key: "QuoteDetails",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "QuoteDetails",
    component: <QuoteDetails />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "DashboardMenu",
    key: "DashboardMenu",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "DashboardMenu",
    component: <DashboardMenu />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "PaymentStatus",
    key: "PaymentStatus",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "PaymentStatus",
    component: <PaymentStatus />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "QuotationError",
    key: "QuotationError",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "QuotationError",
    component: <QuotationError />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "MagmaSuccess",
  //   key: "MagmaSuccess",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/retail/Payment/MagmaSuccess",
  //   component: <MagmaSuccess />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "GenericProposerDetails",
    key: "GenericProposerDetails",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "GenericProposerDetails",
    component: <ProposerDetails1 />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "ExcelUpload",
  //   key: "ExcelUpload",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "NBRetail/ExcelUpload",
  //   component: <ExcelUpload />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "CustomerPolicyIssuance",
    key: "CustomerPolicyIssuance",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "CustomerPolicyIssuance",
    component: <CustomerPolicyIssuance />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "GenericPaymentFailure",
    key: "GenericPaymentFailure",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "retail/Products/NBRetail/PaymentFailure",
    component: <PaymentFailure />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "CustomerValidation",
  //   key: "CustomerValidation",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "CustomerValidation",
  //   component: <CustomerValidation />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "CommonRedirection",
    key: "CommonRedirection",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "CommonRedirection",
    component: <CommonRedirection />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MagmaRazor",
    key: "MagmaRazor",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/retail/Payment/MagmaRazor",
    component: <MagmaRazor />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "DBI",
    key: "DBI",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "DBI",
    component: <DBI />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddDriverDetails",
    key: "AddDriverDetails",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "DBIDriverDetails",
    component: <AddDriverDetails />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "DBIMobile",
    key: "DBIMobile",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "DBIMobile",
    component: <DBIMobile />,
    noCollapse: true,
  },
  {
    name: "Health Quote",
    key: "HealthQuote",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/BrokerPortal/HealthQuote",
    component: <HealthQuote1 />,
  },
  {
    name: "Quote Summary",
    key: "QuoteSummary",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/BrokerPortal/HealthQuoteSummary",
    component: <QuoteSummary1 />,
  },
  {
    name: "Proposal",
    key: "Proposal",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/BrokerPortal/HealthProposal",
    component: <Proposal1 />,
  },

  {
    name: "NBCommon",
    key: "NBCommon",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Retail/NBHome",
    component: <NBCommon />,
  },
  // {
  //   name: "USGICommon",
  //   key: "USGICommon",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/USGI/USGIHome",
  //   component: <USGICommon />,
  // },
  {
    name: "SMSPDFDown",
    key: "SMSPDFDown",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Retail/SMSPDFDown",
    component: <SMSPDFDown />,
  },
  {
    name: "MagmaOnlineSuccess",
    key: "MagmaOnlineSuccess",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Retail/MagmaOnlineSuccess",
    component: <MagmaOnlineSuccess />,
  },
  {
    name: "MotorQuickQuote",
    key: "MotorQuickQuote",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/MotorQuickQuote",
    component: <MotorQuickQuote />,
  },

  {
    name: "CustomerLandingPage",
    key: "CustomerLandingPage",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/CustomerPortal",
    component: <CustomerLandingPage />,
  },
  {
    name: "CustomerDemoLandingPage",
    key: "CustomerDemoLandingPage",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/CustomerLandingPortal",
    component: <CustomerDemoLandingPage />,
  },
  {
    name: "Logs",
    key: "Logs",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Logs",
    component: <Logs />,
  },
  {
    name: "PaymentLinkFlow",
    key: "PaymentLinkFlow",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/PaymentLinkFlow",
    component: <PaymentLinkFlow />,
  },
  {
    name: "MagmaPaymentFailure",
    key: "MagmaPaymentFailure",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/MagmaPaymentFailure",
    component: <MagmaPaymentFailure />,
  },
  {
    name: "StepperV1",
    key: "StepperV1",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/CustomerRetailV1",
    component: <StepperV1 />,
  },
  {
    name: "RedirectToRetail",
    key: "RedirectToRetail",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/RedirectionToRetail",
    component: <RedirectToRetail />,
  },
  {
    name: "MotorCustomerPaymentPage",
    key: "MotorCustomerPaymentPage",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/MotorCustomerPaymentPage",
    component: <MotorCustomerPaymentPage />,
  },
  {
    name: "NepalLogin",
    key: "NepalLogin",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Nepal/B2CLogin",
    component: <B2CLogin />,
  },
  {
    name: "NepalLogin",
    key: "NepalLogin",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Nepal/B2CPolicyType",
    component: <B2CPolicyType />,
  },
  {
    name: "NepalLogin",
    key: "NepalLogin",
    icon: <Icon fontSize="small">login</Icon>,
    route: "Nepal/B2CPaymentSuccess",
    component: <B2CPaymentSuccess />,
  },
  {
    name: "NepalLogin",
    key: "NepalLogin",
    icon: <Icon fontSize="small">login</Icon>,
    route: "Nepal/B2CPaymentFailure",
    component: <B2CPaymentFailure />,
  },
  {
    name: "NepalLogin",
    key: "NepalLogin",
    icon: <Icon fontSize="small">login</Icon>,
    route: "Nepal/B2CDashboard",
    component: <B2CDashboard />,
  },
  {
    type: "collapse",
    name: "Retail",
    key: "pl-Retail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Nepal/B2CMotorCycle",
    component: <StepperV2 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "OAuthRedirection",
    key: "OAuthRedirection",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/OAuthRedirection",
    component: <OAuthRedirection />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "LifeBancaLogin",
    key: "LifeBancaLogin",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/LifeBancaLogin",
    component: <LifeBancaLogin />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "GenericDocumentViewer",
    key: "GenericDocumentViewer",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/GenericDocumentViewer",
    component: <GenericDocumentViewer />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "GenericDashboard",
    key: "GenericDashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/GenericDashboard",
    component: <GenericDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CustomerClaimIntimation",
    key: "CustomerClaimIntimation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Claims/CustomerClaimIntimation",
    component: <CustomerClaimIntimation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "QRFooter",
    key: "QRFooter",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Home/QRCodeScanner",
    component: <QRFooter />,
    noCollapse: true,
  },
];

export default routes;
