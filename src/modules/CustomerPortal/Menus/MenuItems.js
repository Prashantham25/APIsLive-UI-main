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
        name: "Group Health",
        key: "grouphealth",
        route: "/CP/GroupHealth",
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
        name: "Menu item 1",
        key: "Menu item 1",
        route: "",
        component: "",
      },

      {
        name: "Menu item 2",
        key: "Menu item 2",
        route: " ",
        component: " ",
      },
      {
        name: "Menu item 3",
        key: "Menu item 3",
        route: " ",
        component: " ",
      },
    ],
  },
  {
    type: "collapse",
    name: "Home",
    key: "Home",
    icon: <Icon fontSize="medium">house</Icon>,
    collapse: [
      {
        name: "BGR",
        key: "BGR",
        route: "/home",
        component: "",
      },
      {
        name: "BLUS",
        key: "BLUS",
        route: "/BLUS",
        component: " ",
      },
      {
        name: "Menu item 3",
        key: "Menu item 3",
        route: " ",
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
        route: " ",
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
        route: "/marine",
        component: "",
      },
      {
        name: "Open Policy",
        key: "Open Policy",
        route: " ",
        component: " ",
      },
    ],
  },
  {
    type: "collapse",
    name: "Business",
    key: "Business",
    icon: <Icon fontSize="medium">business</Icon>,
    collapse: [
      {
        name: "Menu2",
        key: "Menu2",
        route: "",
        component: "",
      },
      {
        name: "Menu1",
        key: "Menu1",
        route: " ",
        component: " ",
      },
    ],
  },
];

export default MenuItems;
