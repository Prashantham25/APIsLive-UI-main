import React, { lazy } from "react";
import Icon from "@mui/material/Icon";

// const ClaimIntimation = lazy(() => import("../views/TravelClaims/ClaimIntimation"));
// const ClaimProcessing = lazy(() => import("../views/TravelClaims/ClaimProcessing"));
// const ClaimEnquiry = lazy(() => import("../views/TravelClaims/ClaimEnquiry"));
// const GenerateReport = lazy(() => import("../views/TravelClaims/GenerateReport"));
// const UploadReport = lazy(() => import("../views/TravelClaims/UploadReport"));
const ClaimHome = lazy(() => import("../views/TravelClaims/ClaimHome"));
const Empanelment = lazy(() => import("../views/Empanelment"));
const MotorProcessing = lazy(() => import("../views/MotorClaims/Processing"));
const HealthClaimIntimation = lazy(() => import("../views/HealthClaims/ClaimIntimation"));
const HealthClaimProcessing = lazy(() => import("../views/HealthClaims/ClaimProcessing"));
const HealthClaimEnquiry = lazy(() => import("../views/HealthClaims/ClaimEnquiry"));
const HealthGenerateReport = lazy(() => import("../views/HealthClaims/GenerateReport"));
const HealthUploadReport = lazy(() => import("../views/HealthClaims/UploadReport"));
const HealthClaimHome = lazy(() => import("../views/HealthClaims/ClaimHome"));
const TopLevelProcessing = lazy(() => import("../views/TopLevelProcessing"));
const GenericIntimation = lazy(() => import("../views/GenericClaims/Intimation/index"));
// const MotorIntimation = lazy(() => import("../views/MotorClaims/Processing/Intimation/index"));
// const Intimation = lazy(() => import("../views/HealthClaims/Intimation"));
// const CustomerClaimIntimation = lazy(() =>
//   import("../views/HealthClaims/Intimation/CustomerClaimIntimation")
// );
const NepalClaimIntimation = lazy(() =>
  import("../views/HealthClaims/Intimation/NepalClaimIntimation")
);
// const IfcuuserHome = lazy(() => import("../views/HealthClaims/Intimation/IfcuuserHome"));
// const Home = lazy(() => import("../views/HealthClaims/Intimation/Home"));
const TrackClaims = lazy(() => import("../views/HealthClaims/Intimation/TrackClaims"));
// const Processing = lazy(() => import("../views/GenericClaims/Processing"));
const IntimationTinyURL = lazy(() => import("../views/HealthClaims/Intimation/IntimationTinyURL"));
const QueryReplyTinyURL = lazy(() => import("../views/HealthClaims/Intimation/QueryReplyTinyURL"));
// const ClaimProcessingSearch = lazy(() => import("../views/GenericClaims/ClaimProcessingSearch"));

const routes = [
  // {
  //   type: "collapse",
  //   name: "Claim Intimation",
  //   key: "claimIntimation",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Claims/Intimation",
  //   component: <ClaimIntimation />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Claim Processing",
  //   key: "claimProcessing",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Claims/Processing",
  //   component: <ClaimProcessing />,
  //   noCollapse: true,
  // },
  // // {
  // //   type: "collapse",
  // //   name: "Claim Processing Search",
  // //   key: "claimProcessing",
  // //   icon: <Icon fontSize="small">assignment</Icon>,
  // //   route: "/ClaimProcessingSearch",
  // //   component: <ClaimProcessingSearch />,
  // //   noCollapse: true,
  // // },
  // {
  //   type: "collapse",
  //   name: "Claim Enquiry",
  //   key: "ClaimEnquiry",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Claims/ClaimEnquiry",
  //   component: <ClaimEnquiry />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Generate Report",
  //   key: "GenerateReport",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Claims/GenerateReport",
  //   component: <GenerateReport />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Upload Report",
  //   key: "UploadReport",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Claims/UploadReport",
  //   component: <UploadReport />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Claim Home",
    key: "ClaimHome",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/ClaimHome",
    component: <ClaimHome />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Empanelment",
    key: "Empanelment",
    icon: <Icon fontSize="small">handshake</Icon>,
    route: "/Claims/Empanelment/New",
    component: <Empanelment />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MotorProcessing",
    key: "motorprocessing",
    icon: <Icon fontSize="small">handshake</Icon>,
    route: "/Claims/MotorProcessing",
    component: <MotorProcessing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Claim Intimation",
    key: "ClaimIntimation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/HealthClaims/Intimation",
    component: <HealthClaimIntimation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Claim Processing",
    key: "claimProcessing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/HealthClaims/Processing",
    component: <HealthClaimProcessing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Claim Enquiry",
    key: "ClaimEnquiry",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/HealthClaims/ClaimEnquiry",
    component: <HealthClaimEnquiry />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Generate Report",
    key: "GenerateReport",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/HealthClaims/GenerateReport",
    component: <HealthGenerateReport />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Upload Report",
    key: "UploadReport",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/HealthClaims/UploadReport",
    component: <HealthUploadReport />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Claim Home",
    key: "ClaimHome",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/HealthClaims/ClaimHome",
    component: <HealthClaimHome />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Top Level Processing",
    key: "topLevelProcessing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/TopLevelProcessing",
    component: <TopLevelProcessing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Generic Claims",
    key: "gen-claims",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/GenericIntimation",
    component: <GenericIntimation />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Intimation",
  //   key: "claim-intimation",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Claims/ClaimIntimation",
  //   component: <Intimation />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Intimation",
  //   key: "claim-intimation",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Claims/CustomerClaimIntimation",
  //   component: <CustomerClaimIntimation />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Intimation",
    key: "nepal-intimation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/NepalClaimIntimation",
    component: <NepalClaimIntimation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Intimation",
    key: "IntimationTinyURL",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/IntimationTinyURL",
    component: <IntimationTinyURL />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Intimation",
    key: "QueryReplyTinyURL",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/QueryReplyTinyURL",
    component: <QueryReplyTinyURL />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Intimation",
  //   key: "IfcuuserHome",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Claims/IfcuuserHome",
  //   component: <IfcuuserHome />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Intimation",
  //   key: "Home",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Claims/Home",
  //   component: <Home />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "TrackClaims",
    key: "Track-Claims",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/TrackClaims",
    component: <TrackClaims />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "MotorIntimation",
  //   key: "MotorIntimation",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Claims/MotorIntimation",
  //   component: <MotorIntimation />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Processing",
  //   key: "claim-Processing",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Claim/Processing",
  //   component: <Processing />,
  //   noCollapse: true,
  // },
];

export default routes;
