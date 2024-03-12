import React from "react";
import Icon from "@mui/material/Icon";
import OnBoardPOSP from "modules/BrokerPortal/Pages/Admin/AppLication/OnBoardPOSP";
import ApplicationList from "modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList";
import PospOnboarding from "modules/BrokerPortal/Pages/Admin/AppLication/index";
import PopUp from "modules/BrokerPortal/Pages/Admin/AppLication/PopUp";
import POSPAdded from "modules/BrokerPortal/Pages/Admin/AppLication/POSPAdded";
import CourseList from "modules/BrokerPortal/Pages/Admin/AdminCourse/CoursesList";
import NewCourses from "modules/BrokerPortal/Pages/Admin/AdminCourse/NewCourses/index";
import Dashboardindex from "modules/BrokerPortal/Pages/CRM/DashBoard/Dashboardindex";
import Prospectsindex from "modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Prospectsindex";
import Profileindex from "modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Profileindex";
import Clientsindex from "modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Clientsindex";
import Leadsindex from "modules/BrokerPortal/Pages/CRM/DashBoard/Leads/Leadsindex";
import Profileindexlead from "modules/BrokerPortal/Pages/CRM/DashBoard/Leads/Profileindex";
import ProfileindexClient from "modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Profileindex";
import Prospectsimport from "modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Prospectsimport";
import Leadsimport from "modules/BrokerPortal/Pages/CRM/DashBoard/Leads/Leadsimport";
import Clientsimport from "modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Clientsimport";
import CRMReports from "modules/BrokerPortal/Pages/CRM/DashBoard/CRMReports";
// import InterviewApplication from "modules/BrokerPortal/Pages/Admin/Interview/ApplicationList";
// import Interview from "modules/BrokerPortal/Pages/Admin/Interview/index";
// import Modules from "modules/BrokerPortal/Pages/Admin/AdminCourse/NewCourses/Modules";

const adminRoutes = [
  {
    type: "collapse",
    name: "Admin Broker Portal",
    key: "pl-dashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/modules/BrokerPortal/Pages/Admin/AppLication/OnBoardPOSP",
    component: <OnBoardPOSP />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin Broker Portal",
    key: "ApplicationList",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList",
    component: <ApplicationList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin Broker Portal",
    key: "PospOnboarding",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/modules/BrokerPortal/Pages/Admin/AppLication/index",
    component: <PospOnboarding />,
    noCollapse: true,
  },
  {
    name: "PopUp",
    key: "PopUp",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/Admin/AppLication/PopUp",
    component: <PopUp />,
  },
  {
    name: "POSPAdded",
    key: "POSPAdded",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/Admin/AppLication/POSPAdded",
    component: <POSPAdded />,
  },
  {
    name: "NewCourses",
    key: "NewCourses",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/Admin/AdminCourse/NewCourses/index",
    component: <NewCourses />,
  },
  {
    name: "CourseList",
    key: "CourseList",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/Admin/AdminCourse/CoursesList",
    component: <CourseList />,
  },
  {
    name: "DashBoard",
    key: "Dashboardindex",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Dashboardindex",
    component: <Dashboardindex />,
  },
  {
    name: "Prospects",
    key: "Prospectsindex",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Prospectsindex",
    component: <Prospectsindex />,
  },
  {
    name: "Prospects",
    key: "Profileindex",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Profileindex",
    component: <Profileindex />,
  },
  {
    name: "Clients",
    key: "Clientsindex",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Clientsindex",
    component: <Clientsindex />,
  },
  {
    name: "Clients",
    key: "ProfileindexClient",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Profileindex",
    component: <ProfileindexClient />,
  },
  {
    name: "Leads",
    key: "Leadsindex",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Leads/Leadsindex",
    component: <Leadsindex />,
  },
  {
    name: "Leads",
    key: "Profileindexlead",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Leads/Profileindex",
    component: <Profileindexlead />,
  },
  {
    name: "CRMProspects",
    key: "Prospectsimport",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Prospectsimport",
    component: <Prospectsimport />,
  },
  {
    name: "CRMLeads",
    key: "Leadsimport",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Leads/Leadsimport",
    component: <Leadsimport />,
  },
  {
    name: "CRMClients",
    key: "Clientsimport",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Clientsimport",
    component: <Clientsimport />,
  },
  {
    name: "CRMReports",
    key: "CRMReports",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/CRM/DashBoard/CRMReports",
    component: <CRMReports />,
  },
  // {
  //   name: "InterviewApplication",
  //   key: "InterviewApplication",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/modules/BrokerPortal/Pages/Admin/Interview/ApplicationList",
  //   component: <InterviewApplication />,
  // },
  // {
  //   name: "Interview",
  //   key: "Interview",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/modules/BrokerPortal/Pages/Admin/Interview/index",
  //   component: <Interview />,
  // },
];

export default adminRoutes;
