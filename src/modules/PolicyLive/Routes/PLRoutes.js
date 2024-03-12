import React, { lazy } from "react";
import Icon from "@mui/material/Icon";

//
// const PLPagesLayout = lazy(() => import("../Layouts/PLPagesLayout/PLPagesLayout"));
// const PLLanding = lazy(() => import("../views/PLLanding/index"));
// const ProposerDetails = lazy(() => import("../views/ProposerDetails"));
// const HomeInsurance = lazy(() => import("../views/Home"));
// const TravelInsurance = lazy(() => import("../views/Travel/TravelAssure"));
const TravelInfinityInsurance = lazy(() => import("../views/Travel/TravelInfinity"));
const DentalInsurance = lazy(() => import("../views/Health/Chomp"));
// const RetailInsurance = lazy(() => import("../views/Retail"));
const COI = lazy(() => import("../views/Health/Chomp/COI"));
// const Car = lazy(() => import("../views/Car/Car"));
// const SpecificVoyage = lazy(() => import("../views/Marine/SpecificVoyage"));
// const IMDProfileCreation = lazy(() =>
//   import("../views/Marine/SpecificVoyage/IMDProfileCreation/IMDProfileCreation")
// );
// const ViewDisableProfile = lazy(() =>
//   import("../views/Marine/ViewDisableProfile/ViewDisableProfile")
// );
// const BLUS = lazy(() => import("../views/BLUS"));
const ViewPolicy = lazy(() => import("../views/ViewPolicy/Viewpolicy"));
// const CPM = lazy(() => import("../views/CPM"));
// const MasterPolicyStop = lazy(() => import("../views/Marine/MSTOP/MasterPolicyStop"));
// const MasterPolicyOpen = lazy(() => import("../views/Marine/MOPEN/MasterPolicyOpen"));
// const CertificateIssueOpen = lazy(() => import("../views/Marine/MOPEN/CertificateIssueOpen"));
// const CertificateIssueStop = lazy(() => import("../views/Marine/MSTOP/CertificateIssueStop"));
// const ViewCertificateStop = lazy(() => import("../views/Marine/MSTOP/ViewCertificateStop"));
// const ViewCertificateOpen = lazy(() => import("../views/Marine/MOPEN/ViewCertificateOpen"));
// const DownloadCertificateStop = lazy(() => import("../views/Marine/MSTOP/DownloadCertificateStop"));
// const CreateCertificateStop = lazy(() => import("../views/Marine/MSTOP/CreateCertificateStop"));
// const CreateCertificateOpen = lazy(() => import("../views/Marine/MOPEN/CreateCertificateOpen"));
// const AddOpenCertificate = lazy(() => import("../views/Marine/MOPEN/AddOpenCertificate"));
// const AddStopCertificate = lazy(() => import("../views/Marine/MSTOP/AddStopCertificate"));
const CustomerFLow = lazy(() => import("../views/Health/CustomerFLow"));

const routes = [
  // {
  //   type: "collapse",
  //   name: "Policy Live Login",
  //   key: "pl-dashboard",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "dashboard",
  //   component: <PLLanding />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Policy Live Login",
  //   key: "pl-dashboard",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "proposerdetails",
  //   component: <ProposerDetails />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Policy Live Login",
  //   key: "pl-car",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Car",
  //   component: <Car />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Home Insurance",
  //   key: "pl-home",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Home",
  //   component: <HomeInsurance />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Travel Insurance",
  //   key: "pl-travel",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Travel",
  //   component: <TravelInsurance />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Specific Voyage",
  //   key: "pl-marineSV",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "marine",
  //   component: <SpecificVoyage />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Specific Voyage",
  //   key: "pl-marineSV",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "marine",
  //   component: <SpecificVoyage />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "View/Disable Profile",
  //   key: "pl-ViewDisableProfile",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "marine/ViewDisableProfile",
  //   component: <ViewDisableProfile />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Marine Stop",
  //   key: "pl-MasterPolicyStop",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Marine/MSTOP",
  //   component: <MasterPolicyStop />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Marine Open",
  //   key: "pl-MasterPolicyOpen",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Marine/MOPEN",
  //   component: <MasterPolicyOpen />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Marine Open",
  //   key: "pl-CerificateIssueOpen",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Marine/MOPEN/CertificateIssueOpen",
  //   component: <CertificateIssueOpen />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Marine Stop",
  //   key: "pl-CerificateIssueStop",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Marine/MSTOP/CertificateIssueStop",
  //   component: <CertificateIssueStop />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Marine Stop",
  //   key: "pl-ViewCertificateStop",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Marine/MSTOP/ViewCertificateStop",
  //   component: <ViewCertificateStop />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Marine Open",
  //   key: "pl-ViewCertificateOpen",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Marine/MOPEN/ViewCertificateOpen",
  //   component: <ViewCertificateOpen />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Marine Stop",
  //   key: "pl-DownloadCertificateStop",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Marine/MSTOP/DownloadCertificateStop",
  //   component: <DownloadCertificateStop />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Marine Stop",
  //   key: "pl-CreateCertificateStop",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Marine/MSTOP/CreateCertificateStop",
  //   component: <CreateCertificateStop />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Marine Open",
  //   key: "pl-CreateCertificateOpen",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Marine/MOPEN/CreateCertificateOpen",
  //   component: <CreateCertificateOpen />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Marine Open",
  //   key: "pl-AddOpenCertificate",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Marine/MOPEN/AddOpenCertificate",
  //   component: <AddOpenCertificate />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Marine Stop",
  //   key: "pl-AddStopCertificate",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Marine/MSTOP/AddStopCertificate",
  //   component: <AddStopCertificate />,
  //   noCollapse: true,
  // },

  // {
  //   type: "collapse",
  //   name: "IMDProfile Creation",
  //   key: "pl-IMDProfileCreation",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "marine/IMDProfileCreation",
  //   component: <IMDProfileCreation />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "BLUS",
  //   key: "pl-BLUS",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "BLUS",
  //   component: <BLUS />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "CPM",
  //   key: "pl-home",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "CPM",
  //   component: <CPM />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Chmmp",
    key: "pl-Chomp",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "chomp",
    component: <DentalInsurance />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Retail",
  //   key: "pl-Retail",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "retail",
  //   component: <RetailInsurance />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "CustomerFLow",
    key: "pl-customerflow",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "CustomerFLow",
    component: <CustomerFLow />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Search Policies",
    key: "pl-SearchPolicies",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "SearchPolicies",
    component: <COI />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ViewPolicy",
    key: "pl-viewPolicy",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "ViewPolicy",
    component: <ViewPolicy />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Travel Infinity Insurance",
    key: "pl-travel",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "groupTravel",
    component: <TravelInfinityInsurance />,
    noCollapse: true,
  },
];

export default routes;
