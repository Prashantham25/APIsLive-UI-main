import Icon from "@mui/material/Icon";

const MenuItems = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Agent",
    key: "Agent",
    icon: <Icon fontSize="medium">person</Icon>,
    collapse: [
      {
        name: "View All",
        key: "View All",
        route: "",
        component: "",
      },
      {
        name: "Applications",
        key: "Applications",
        route: "/modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList",
        component: " ",
      },
      {
        name: "Drafts",
        key: "Drafts",
        route: " ",
        component: " ",
      },
      {
        name: "OnBoarded",
        key: "OnBoarded",
        route: "/modules/BrokerPortal/Pages/Admin/AppLication/OnBoardPOSP",
        component: " ",
      },
    ],
  },
  {
    type: "collapse",
    name: "Courses",
    key: "Courses",
    icon: <Icon fontSize="medium">assignment</Icon>,
    collapse: [
      {
        name: "Create New Course",
        key: "Create New Course",
        route: "modules/BrokerPortal/Pages/Admin/AdminCourse/NewCourses/index",
        component: "",
      },
    ],
  },
  {
    type: "collapse",
    name: "CRM",
    key: "CRM",
    icon: <Icon fontSize="medium">assignment</Icon>,
    collapse: [
      {
        name: "DashBoard",
        key: "Dashboardindex",
        route: "modules/BrokerPortal/Pages/CRM/DashBoard/DashBoardindex",
        component: "",
      },
      {
        name: "Prospects",
        key: "Prospects",
        route: "modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Prospectsindex",
        component: "",
      },
      {
        name: "Leads",
        key: "Leads",
        route: "modules/BrokerPortal/Pages/CRM/DashBoard/Leads/Leadsindex",
        component: "",
      },
      {
        name: "Clients",
        key: "Clients",
        route: "modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Clientsindex",
        component: "",
      },
      {
        name: "Renewals",
        key: "Renewals",
        route: "",
        component: "",
      },
      {
        type: "collapse",
        name: "Channel Users",
        key: "ChannelUsers",
        // route: "",
        // component: "",
        collapse: [
          {
            name: "Total Agent",
            key: "TotalPOSP",
            route: "",
            component: "",
          },
          {
            name: "Total Broker User",
            key: "TotalBrokerUser",
            route: "",
            component: "",
          },
          {
            name: "Total Agent",
            key: "TotalAgent",
            route: "",
            component: "",
          },
        ],
      },
      {
        name: "CRM Reports",
        key: "CRMReports",
        route: "modules/BrokerPortal/Pages/CRM/DashBoard/CRMReports",
        component: "",
      },
      {
        name: "Channel Users",
        key: "ChannelUsers",
        route: "",
        component: "",
      },
    ],
  },
  // {
  //   type: "collapse",
  //   name: "Interview",
  //   key: "Interview",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   route: "modules/BrokerPortal/Pages/Admin/Interview/ApplicationList",
  //   noCollapse: true,
  // },
];

export default MenuItems;
