import Icon from "@mui/material/Icon";

const InterviewMenuItems = [
  //   {
  //     type: "collapse",
  //     name: "Dashboard",
  //     key: "dashboard",
  //     icon: <Icon fontSize="small">dashboard</Icon>,
  //     route: "/dashboard",
  //     noCollapse: true,
  //   },
  //   {
  //     type: "collapse",
  //     name: "POSP",
  //     key: "POSP",
  //     icon: <Icon fontSize="medium">person</Icon>,
  //     collapse: [
  //       {
  //         name: "View All",
  //         key: "View All",
  //         route: "",
  //         component: "",
  //       },
  //       {
  //         name: "Applications",
  //         key: "Applications",
  //         route: "/modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList",
  //         component: " ",
  //       },
  //       {
  //         name: "Drafts",
  //         key: "Drafts",
  //         route: " ",
  //         component: " ",
  //       },
  //       {
  //         name: "OnBoarded",
  //         key: "OnBoarded",
  //         route: "/modules/BrokerPortal/Pages/Admin/AppLication/OnBoardPOSP",
  //         component: " ",
  //       },
  //     ],
  //   },
  //   {
  //     type: "collapse",
  //     name: "Courses",
  //     key: "Courses",
  //     icon: <Icon fontSize="medium">assignment</Icon>,
  //     collapse: [
  //       {
  //         name: "Create New Course",
  //         key: "Create New Course",
  //         route: "modules/BrokerPortal/Pages/Admin/AdminCourse/NewCourses/index",
  //         component: "",
  //       },
  //     ],
  //   },
  {
    type: "collapse",
    name: "Interview",
    key: "Interview",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "modules/BrokerPortal/Pages/Admin/Interview/ApplicationList",
    noCollapse: true,
  },
];

export default InterviewMenuItems;
