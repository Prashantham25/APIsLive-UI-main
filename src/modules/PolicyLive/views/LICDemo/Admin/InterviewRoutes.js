import React from "react";
import Icon from "@mui/material/Icon";
// import OnBoardPOSP from "modules/BrokerPortal/Pages/Admin/AppLication/OnBoardPOSP";
// import ApplicationList from "modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList";
// import PospOnboarding from "modules/BrokerPortal/Pages/Admin/AppLication/index";
// import PopUp from "modules/BrokerPortal/Pages/Admin/AppLication/PopUp";
// import POSPAdded from "modules/BrokerPortal/Pages/Admin/AppLication/POSPAdded";
// import CourseList from "modules/BrokerPortal/Pages/Admin/AdminCourse/CoursesList";
// import NewCourses from "modules/BrokerPortal/Pages/Admin/AdminCourse/NewCourses/index";
import InterviewApplication from "modules/BrokerPortal/Pages/Admin/Interview/ApplicationList";
import Interview from "modules/BrokerPortal/Pages/Admin/Interview/index";
// import Modules from "modules/BrokerPortal/Pages/Admin/AdminCourse/NewCourses/Modules";

const InterviewRoutes = [
  //   {
  //     type: "collapse",
  //     name: "Admin Broker Portal",
  //     key: "pl-dashboard",
  //     icon: <Icon fontSize="small">assignment</Icon>,
  //     route: "/modules/BrokerPortal/Pages/Admin/AppLication/OnBoardPOSP",
  //     component: <OnBoardPOSP />,
  //     noCollapse: true,
  //   },
  //   {
  //     type: "collapse",
  //     name: "Admin Broker Portal",
  //     key: "ApplicationList",
  //     icon: <Icon fontSize="small">assignment</Icon>,
  //     route: "/modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList",
  //     component: <ApplicationList />,
  //     noCollapse: true,
  //   },
  //   {
  //     type: "collapse",
  //     name: "Admin Broker Portal",
  //     key: "PospOnboarding",
  //     icon: <Icon fontSize="small">assignment</Icon>,
  //     route: "/modules/BrokerPortal/Pages/Admin/AppLication/index",
  //     component: <PospOnboarding />,
  //     noCollapse: true,
  //   },
  //   {
  //     name: "PopUp",
  //     key: "PopUp",
  //     icon: <Icon fontSize="small">login</Icon>,
  //     route: "/modules/BrokerPortal/Pages/Admin/AppLication/PopUp",
  //     component: <PopUp />,
  //   },
  //   {
  //     name: "POSPAdded",
  //     key: "POSPAdded",
  //     icon: <Icon fontSize="small">login</Icon>,
  //     route: "/modules/BrokerPortal/Pages/Admin/AppLication/POSPAdded",
  //     component: <POSPAdded />,
  //   },
  //   {
  //     name: "NewCourses",
  //     key: "NewCourses",
  //     icon: <Icon fontSize="small">login</Icon>,
  //     route: "/modules/BrokerPortal/Pages/Admin/AdminCourse/NewCourses/index",
  //     component: <NewCourses />,
  //   },
  //   {
  //     name: "CourseList",
  //     key: "CourseList",
  //     icon: <Icon fontSize="small">login</Icon>,
  //     route: "/modules/BrokerPortal/Pages/Admin/AdminCourse/CoursesList",
  //     component: <CourseList />,
  //   },
  {
    name: "InterviewApplication",
    key: "InterviewApplication",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/Admin/Interview/ApplicationList",
    component: <InterviewApplication />,
  },
  {
    name: "Interview",
    key: "Interview",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/modules/BrokerPortal/Pages/Admin/Interview/index",
    component: <Interview />,
  },
];

export default InterviewRoutes;
