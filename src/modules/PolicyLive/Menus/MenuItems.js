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
    name: "Motor",
    key: "Motor",
    icon: <Icon fontSize="medium">directions_car</Icon>,
    collapse: [
      {
        name: "Private Car",
        key: "Private Car",
        route: "",
        component: "",
      },
      {
        name: "Bike",
        key: "Bike",
        route: " ",
        component: " ",
      },
      {
        name: "GCV",
        key: "GCV",
        route: " ",
        component: " ",
      },
    ],
  },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Health",
    key: "Health",
    icon: <Icon fontSize="medium">health_and_safety</Icon>,
    collapse: [
      {
        name: "Chomp",
        key: "Chomp",
        route: "/chomp",
        component: "",
      },
      {
        name: "Search Policies",
        key: "Search Policies",
        route: "/SearchPolicies",
        component: "",
      },
      {
        name: "CustomerFLow",
        key: "CustomerFLow",
        route: "/CustomerFLow",
        component: " ",
      },
    ],
  },

  {
    type: "collapse",
    name: "Travel",
    key: "Travel",
    icon: <Icon fontSize="medium">flight_takeoff</Icon>,
    collapse: [
      {
        name: "Travel Assure",
        key: "Travel Assure",
        route: "/travel",
        component: "",
      },
      {
        name: "Travel Infinity",
        key: "Travel Infinity",
        route: "/groupTravel",
        component: " ",
      },
    ],
  },
  {
    type: "collapse",
    name: "Marine",
    key: "Marine",
    icon: <Icon fontSize="medium">sailing</Icon>,
    collapse: [
      {
        name: "Specific Voyage",
        key: "Specific Voyage",
        route: "/Marine",
        component: "",
      },
      {
        name: "MSTOP",
        key: "MSTOP",
        route: "/Marine/MSTOP",
        component: "",
      },
      {
        name: "MOPEN",
        key: "MOPEN",
        route: "/Marine/MOPEN",
        component: "",
      },
      {
        name: "Profile Creation",
        key: "Profile Creation",
        route: "/Marine",
        component: "",
      },
      // {
      //   name: "View/Disable Profile",
      //   key: "View/Disable Profile",
      //   route: "/Marine/ViewDisableProfile",
      //   component: "",
      // },
      {
        name: "Open Policy",
        key: "Open Policy",
        route: " ",
        component: " ",
      },
    ],
  },
];

export default MenuItems;
