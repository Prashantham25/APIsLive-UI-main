import Icon from "@mui/material/Icon";

const MenuItems = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "Claim Processing",
        key: "topLevelProcessing",
        route: "/Claims/TopLevelProcessing",
        component: " ",
      },
    ],
  },
  // { type: "title", title: "Configuration", key: "title-pages" },

  // { type: "title", title: "Transaction", key: "title-transaction" },

  {
    type: "collapse",
    name: "Travel Claims",
    key: "TravelClaims",
    icon: <Icon fontSize="medium">local_airport</Icon>,
    collapse: [
      {
        name: "Claim Intimation",
        key: "claimIntimation",
        route: "/Claims/Intimation",
        component: "",
      },
      {
        name: "Claim Processing",
        key: "claimProcessing",
        route: "/Claims/Processing",
        component: " ",
      },
      {
        name: "Claim Enquiry",
        key: "ClaimEnquiry",
        route: "/Claims/ClaimEnquiry",
        component: " ",
      },
      {
        name: "Generate Report",
        key: "GenerateReport",
        route: "/Claims/GenerateReport",
        component: " ",
      },
      {
        name: "Upload Report",
        key: "UploadReport",
        route: "/Claims/UploadReport",
        component: " ",
      },
      {
        name: "Claim Home",
        key: "ClaimHome",
        route: "/Claims/ClaimHome",
        component: " ",
      },
    ],
  },
  {
    type: "collapse",
    name: "Empanelment",
    key: "empanelment",
    icon: <Icon fontSize="medium">handshake</Icon>,
    collapse: [
      {
        name: "New",
        key: "empanelmentnew",
        route: "/Claims/Empanelment/New",
        component: " ",
      },
    ],
  },
  {
    type: "collapse",
    name: "Motor Claims",
    key: "motorclaims",
    icon: <Icon fontSize="medium">car_repair</Icon>,
    collapse: [
      {
        name: "Processing",
        key: "processing",
        route: "/Claims/MotorProcessing",
        component: " ",
      },
    ],
  },
  {
    type: "collapse",
    name: "Health Claims",
    key: "HealthClaims",
    icon: <Icon fontSize="medium">local_hospital</Icon>,
    collapse: [
      {
        name: "Claim Intimation",
        key: "claimIntimation",
        route: "/HealthClaims/Intimation",
        component: "",
      },
      {
        name: "Claim Processing",
        key: "claimProcessing",
        route: "/HealthClaims/Processing",
        component: " ",
      },
      {
        name: "Claim Enquiry",
        key: "ClaimEnquiry",
        route: "/HealthClaims/ClaimEnquiry",
        component: " ",
      },
      {
        name: "Generate Report",
        key: "GenerateReport",
        route: "/HealthClaims/GenerateReport",
        component: " ",
      },
      {
        name: "Upload Report",
        key: "UploadReport",
        route: "/HealthClaims/UploadReport",
        component: " ",
      },
      {
        name: "Claim Home",
        key: "ClaimHome",
        route: "/HealthClaims/ClaimHome",
        component: " ",
      },
    ],
  },
];

export default MenuItems;
