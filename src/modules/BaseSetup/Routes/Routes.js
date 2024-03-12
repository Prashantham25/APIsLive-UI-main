import React, { lazy } from "react";
import Icon from "@mui/material/Icon";

//
// const PLPagesLayout = lazy(() => import("../Layouts/PLPagesLayout/PLPagesLayout"));
const BaseTest = lazy(() => import("../views/BaseTest"));
// const Template = lazy(() => import("../views/Templates"));
// const RateExecution = lazy(() => import("../views/Rating/RateExecution"));
const ViewRateTable = lazy(() => import("../views/Rating/ViewRateTable"));
// const ReportConfiguration = lazy(() => import("../views/Reports/ReportConfiguration"));
// const ReportGeneration = lazy(() => import("../views/Reports/ReportGeneration"));
// const ReportUpdate = lazy(() => import("../views/Reports/ReportUpdate"));
const Dispatcher = lazy(() => import("../views/ProductDispatcher/Dispatcher"));
// const Configuration = lazy(() => import("../views/Communication/Configuration"));
// const Execution = lazy(() => import("../views/Communication/Execution"));
// const PolicySearch = lazy(() => import("../views/Policy/PolicySearch"));
const QuoteSearch = lazy(() => import("../views/Quote/QuoteSearch"));
// const RateParameters = lazy(() => import("../views/Rating/RateParameters"));
// const ParameterGroup = lazy(() => import("../views/Rating/ParameterGroup"));
// const RateTable = lazy(() => import("../views/Rating/RateTable"));
// const CalculationConfig = lazy(() => import("../views/Rating/CalculationConfig"));
// const CalculationResult = lazy(() => import("../views/Rating/CalculationResult"));
// const CalculationDisplay = lazy(() => import("../views/Rating/CalculationDisplay"));
const EditCalculationConfig = lazy(() => import("../views/Rating/EditCalculationConfig"));
const IllustrationConfig = lazy(() => import("../views/Rating/IllustrationConfig"));
const IllustrationResult = lazy(() => import("../views/Rating/IllustrationResult"));
const ObjectMapper = lazy(() => import("../views/ProductDispatcher/ObjectMapper"));
const ConfigureEntity = lazy(() => import("../views/ProductDispatcher/ConfigureEntity"));
const ProductGenericAPI = lazy(() => import("../views/ProductDispatcher/ProductGenericAPI"));
// const ProductConfiguration = lazy(() => import("../views/Products/ProductConfiguration"));
const ClaimIntimation = lazy(() => import("../views/TravelClaims/ClaimIntimation"));
const ClaimProcessing = lazy(() => import("../views/TravelClaims/ClaimProcessing"));
// const Endorsement = lazy(() => import("../views/Endorsement/Endorsement"));
// const UserCreation = lazy(() => import("../views/Users/UserCreation"));
// const MyProfile = lazy(() => import("../views/Users/MyProfile"));
// const ChangePassword = lazy(() => import("../views/Users/ChangePassword"));
// const ModifyUser = lazy(() => import("../views/Users/ModifyUser"));
// const CreateRole = lazy(() => import("../views/Users/CreateRole"));
// const AssignRole = lazy(() => import("../views/Users/AssignRole"));

const routes = [
  {
    type: "collapse",
    name: "Policy Live Login",
    key: "pl-dashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/BaseTest",
    component: <BaseTest />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Create User",
  //   key: "UserCreation",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Users/CreateUser",
  //   component: <UserCreation />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "My Profile",
  //   key: "MyProfile",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Users/MyProfile",
  //   component: <MyProfile />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Change Password",
  //   key: "ChangePassword",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Users/ChangePassword",
  //   component: <ChangePassword />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Modify User",
  //   key: "ModifyUser",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Users/ModifyUser",
  //   component: <ModifyUser />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Create Role",
  //   key: "CreateRole",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Users/CreateRole",
  //   component: <CreateRole />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Assign Role",
  //   key: "Assign Role",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Users/AssignRole",
  //   component: <AssignRole />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Template",
  //   key: "template",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/Template",
  //   component: <Template />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RateParameters",
  //   key: "rateParameters",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/RateParameters",
  //   component: <RateParameters />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "ParameterGroup",
  //   key: "parameterGroup",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/ParameterGroup",
  //   component: <ParameterGroup />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RateTable",
  //   key: "rateTable",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Rating/RateRules",
  //   component: <RateTable />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RateExecution",
  //   key: "rateExecution",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/RateExecution",
  //   component: <RateExecution />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "CalculationConfig",
  //   key: "calculationConfig",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/CalculationConfig",
  //   component: <CalculationConfig />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "CalculationResult",
  //   key: "calculationResult",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/CalculationResult",
  //   component: <CalculationResult />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "CalculationDisplay",
  //   key: "calculationDisplay",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/CalculationDisplay",
  //   component: <CalculationDisplay />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "EditCalculationConfig",
    key: "editCalculationConfig",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/config/EditCalculationConfig",
    component: <EditCalculationConfig />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "IllustrationConfig",
    key: "illustrationConfig",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/config/IllustrationConfig",
    component: <IllustrationConfig />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "IllustrationResult",
    key: "illustrationResult",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/config/IllustrationResult",
    component: <IllustrationResult />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ViewRateTable",
    key: "viewRateTable",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/config/ViewRateTable",
    component: <ViewRateTable />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "ReportConfiguration",
  //   key: "reportConfiguration",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/ReportConfiguration",
  //   component: <ReportConfiguration />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "ReportGeneration",
  //   key: "reportGeneration",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/ReportGeneration",
  //   component: <ReportGeneration />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "ReportUpdate",
  //   key: "reportUpdate",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/ReportUpdate",
  //   component: <ReportUpdate />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "ConfigureEntity",
    key: "configureEntity",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/config/ConfigureEntity",
    component: <ConfigureEntity />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ObjectMapper",
    key: "objectMapper",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/config/ObjectMapper",
    component: <ObjectMapper />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Dispatcher",
    key: "dispatcher",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/config/Dispatcher",
    component: <Dispatcher />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ProductGenericAPI",
    key: "productGenericAPI",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/config/ProductGenericAPI",
    component: <ProductGenericAPI />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "PolicySearch",
  //   key: "PolicySearch",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/PolicySearch",
  //   component: <PolicySearch />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "QuoteSearch",
    key: "QuoteSearch",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/config/QuoteSearch",
    component: <QuoteSearch />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Setup",
  //   key: "commsetup",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/Setup",
  //   component: <Configuration />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Check",
  //   key: "commcheck",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/config/Check",
  //   component: <Execution />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Product Configuration",
  //   key: "productconfiguration",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Products/ProductConfiguration",
  //   component: <ProductConfiguration />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Claim Intimation",
    key: "claimIntimation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/TravelClaims/TravelClaimIntimation",
    component: <ClaimIntimation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Claim Processing",
    key: "claimProcessing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Processing",
    component: <ClaimProcessing />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Endorsement",
  //   key: "endorsement",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Endorsement/Endorsement",
  //   component: <Endorsement />,
  //   noCollapse: true,
  // },
];

export default routes;
