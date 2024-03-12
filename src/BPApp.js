import { useEffect, Suspense } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React themes
// import theme from "assets/themes/BrokerPortal/MutualGlobalTheme";

// Material Dashboard 2 React Dark Mode themes
// import themeDark from "assets/theme-dark";
import loader from "assets/images/Gifs/loading1.gif";
// Material Dashboard 2 React routes
import routes from "routes";
import BPRoutes from "BPRoutes";
import adminRoutes from "modules/BrokerPortal/Pages/Admin/AdminRoutes";
import BPPagesLayout from "modules/BrokerPortal/Layouts/BPPagesLayout/BPPagesLayout";
import InterviewRoutes from "modules/BrokerPortal/Pages/Admin/InterviewRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";
import { useDataController } from "./modules/BrokerPortal/context";
import MDSpeedDial from "./modules/Login/Layouts/SpeedDial";

export default function BPApp() {
  const [controller] = useMaterialUIController();
  const [newController] = useDataController();

  const { direction } = controller;

  const { pathname } = useLocation();
  const { custTheme } = newController;
  // console.log("Current theme", custTheme);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  return (
    <ThemeProvider theme={createTheme(custTheme)}>
      <CssBaseline />
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <img
              alt=""
              src={loader}
              style={{ justifyContent: "center", height: "150px", width: "150px" }}
            />
          </div>
        }
      >
        <Routes>
          {getRoutes(process.env.REACT_APP_Project === "BrokerPortal" ? BPRoutes : routes)}
          <Route path="/" element={<BPPagesLayout />}>
            {getRoutes(adminRoutes)}
          </Route>
          <Route path="/" element={<BPPagesLayout />}>
            {getRoutes(InterviewRoutes)}
          </Route>
          <Route path="/" element={<Navigate to="/modules/BrokerPortal/Login/BPLogin" />} />
        </Routes>
        {process.env.React_APP_ShowSpeedDialButton === "true" && <MDSpeedDial />}
      </Suspense>
    </ThemeProvider>
  );
}
