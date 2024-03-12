import React, { lazy } from "react";
import Icon from "@mui/material/Icon";

//
// const PLPagesLayout = lazy(() => import("../Layouts/PLPagesLayout/PLPagesLayout"));
const GroupHealth = lazy(() => import("../views/GroupHealth"));
const GroupHealthProposal = lazy(() => import("../views/GroupHealth/Proposal"));
const CustChomp = lazy(() => import("modules/PolicyLive/views/Health/Chomp"));

const routes = [
  {
    type: "collapse",
    name: "Policy Live Login",
    key: "pl-dashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/CP/GroupHealth",
    component: <GroupHealth />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Policy Live Login",
    key: "pl-dashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/CP/GroupHealth/Proposal",
    component: <GroupHealthProposal />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CustChomp",
    key: "custchomp",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/CP/Chomp",
    component: <CustChomp />,
    noCollapse: true,
  },
];

export default routes;
