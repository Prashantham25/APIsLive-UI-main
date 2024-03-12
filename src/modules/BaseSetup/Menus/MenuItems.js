import Icon from "@mui/material/Icon";

const MenuItems = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "",
    noCollapse: true,
  },
  { type: "divider", title: "Configuration", key: "title-pages" },
  {
    type: "collapse",
    name: "Template",
    key: "Template",
    icon: <Icon fontSize="medium">description</Icon>,
    collapse: [
      {
        name: "Create",
        key: "templateconfig",
        route: "/config/Template",
        component: "",
      },
      {
        name: "Verify",
        key: "verifytemplate",
        route: " ",
        component: " ",
      },
    ],
  },
  // {
  //   type: "collapse",
  //   name: "Communication",
  //   key: "communication",
  //   icon: <Icon fontSize="medium">email</Icon>,
  //   collapse: [
  //     {
  //       name: "Setup",
  //       key: "commsetup",
  //       route: "/config/Setup",
  //       component: "",
  //     },
  //     {
  //       name: "Check",
  //       key: "commcheck",
  //       route: "/config/Check",
  //       component: " ",
  //     },
  //   ],
  // },
  {
    type: "collapse",
    name: "Rating",
    key: "Rating",
    icon: <Icon fontSize="medium">calculate</Icon>,
    collapse: [
      {
        name: "Rate Parameters",
        key: "rateParameters",
        route: "/config/RateParameters",
        component: "",
      },
      {
        name: "Parameter Group",
        key: "parameterGroup",
        route: "/config/ParameterGroup",
        component: "",
      },
      {
        name: "Rate Table",
        key: "rateTable",
        route: "/config/RateTable",
        component: "",
      },
      {
        name: "Rate Execution",
        key: "rateExecution",
        route: "/config/RateExecution",
        component: "",
      },
      {
        name: "Calculation Config",
        key: "calculationConfig",
        route: "/config/CalculationConfig",
        component: "",
      },
      {
        name: "Calculation Result",
        key: "calculationResult",
        route: "/config/CalculationResult",
        component: "",
      },
      {
        name: "Calculation Display",
        key: "calculationDisplay",
        route: "/config/CalculationDisplay",
        component: "",
      },
      {
        name: "Edit Calculation Config",
        key: " editCalculationConfig",
        route: "/config/EditCalculationConfig",
        component: "",
      },
      {
        name: "Illustration Config",
        key: " illustrationConfig",
        route: "/config/IllustrationConfig",
        component: "",
      },
      {
        name: "Illustration Result",
        key: "illustrationResult",
        route: "/config/IllustrationResult",
        component: "",
      },
      {
        name: "View Rate Table",
        key: "viewRateTable",
        route: "/config/ViewRateTable",
        component: " ",
      },
    ],
  },
  {
    type: "collapse",
    name: "Reports",
    key: "Reports",
    icon: <Icon fontSize="medium">summarize</Icon>,
    collapse: [
      {
        name: "Report Configuration",
        key: "reportConfiguration",
        route: "/config/ReportConfiguration",
        component: "",
      },
      {
        name: "Report Generation",
        key: "reportGeneration",
        route: "/config/ReportGeneration",
        component: " ",
      },
      {
        name: "Report Update",
        key: "reportUpdate",
        route: "/config/ReportUpdate",
        component: " ",
      },
    ],
  },
  {
    type: "collapse",
    name: "Products",
    key: "productConfiguration",
    icon: <Icon fontSize="medium">inventory_2</Icon>,
    collapse: [
      {
        name: "Product Configuration",
        key: "productConfiguration",
        route: "/Products/ProductConfiguration",
        component: "",
      },
      // {
      //   name: "Report Generation",
      //   key: "reportGeneration",
      //   route: "/config/ReportGeneration",
      //   component: " ",
      // },
      // {
      //   name: "Report Update",
      //   key: "reportUpdate",
      //   route: "/config/ReportUpdate",
      //   component: " ",
      // },
    ],
  },
  {
    type: "collapse",
    name: "Product Dispatcher",
    key: "productDispatcher",
    icon: <Icon fontSize="medium">event_seat</Icon>,
    collapse: [
      {
        name: "Configure Entity",
        key: "configureEntity",
        route: "/config/ConfigureEntity",
        component: "",
      },
      {
        name: "Object Mapper",
        key: "objectMapper",
        route: "/config/ObjectMapper",
        component: "",
      },
      {
        name: "Dispatcher",
        key: "dispatcher",
        route: "/config/Dispatcher",
        component: "",
      },
      {
        name: "ProductGenericAPI",
        key: "productGenericAPI",
        route: "/config/ProductGenericAPI",
        component: "",
      },
    ],
  },
  // {
  //   type: "collapse",
  //   name: "Policy",
  //   key: "Policy",
  //   icon: <Icon fontSize="medium">summarize</Icon>,
  //   collapse: [
  //     {
  //       name: "Policy Search",
  //       key: "policySearch",
  //       route: "config/PolicySearch",
  //       component: "",
  //     },
  //   ],
  // },
  {
    type: "collapse",
    name: "Quote",
    key: "Quote",
    icon: <Icon fontSize="medium">request_quote</Icon>,
    collapse: [
      {
        name: "Quote Search",
        key: "QuoteSearch",
        route: "/config/QuoteSearch",
        component: "",
      },
    ],
  },
  {
    type: "collapse",
    name: "Travel Claims",
    key: "TravelClaims",
    icon: <Icon fontSize="medium">no_luggage</Icon>,
    collapse: [
      {
        name: "Claim Intimation",
        key: "claimIntimation",
        route: "/Intimation",
        component: "",
      },
      {
        name: "Claim Processing",
        key: "claimProcessing",
        route: "Processing",
        component: " ",
      },
    ],
  },
  {
    type: "collapse",
    name: "Endorsement",
    key: "Endorsement",
    icon: <Icon fontSize="medium">no_luggage</Icon>,
    collapse: [
      {
        name: "Endorsement",
        key: "endorsement",
        route: "/Endorsement",
        component: "",
      },
      // {
      //   name: "Claim Processing",
      //   key: "claimProcessing",
      //   route: "Processing",
      //   component: " ",
      // },
    ],
  },
];

export default MenuItems;
