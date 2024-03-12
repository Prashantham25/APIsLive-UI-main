import { useEffect, Suspense } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
// import { CircularProgress } from "@mui/material";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";
import loader from "assets/images/Gifs/loading1.gif";
import { useDataController } from "./modules/BrokerPortal/context";
// Material Dashboard 2 React routes
import routes from "./modules/PolicyLive/Routes/PLRoutes";
import PLPagesLayout from "./modules/PolicyLive/Layouts/PLPagesLayout/PLPagesLayout";
import PLLogin from "./modules/PolicyLive/Login/PLLogin";

// import Layout from "./modules/PolicyLive/Layouts/PLMainLayout/PageLayout";
// import MDBox from "./components/MDBox";

export default function PLApp() {
  const [controller] = useMaterialUIController();
  const [newController] = useDataController();

  const { direction } = controller;
  const { custTheme } = newController;
  const { pathname } = useLocation();

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
    // <ThemeProvider theme={darkMode ? themeDark : theme}>
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
          <Route path="/" element={<Navigate to="/pages/login-page" />} />
          <Route path="/login" element={<PLLogin />} />
          <Route path="/" element={<PLPagesLayout />}>
            {getRoutes(routes)}
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}
