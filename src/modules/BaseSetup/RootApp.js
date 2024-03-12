import { useEffect, Suspense } from "react";

// react-router components
import { Routes, Route, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import loader from "assets/images/Gifs/loading1.gif";
import routes from "modules/BaseSetup/Routes/Routes";
import PagesLayout from "modules/BaseSetup/Layouts/PagesLayout/PagesLayout";

import { useMaterialUIController } from "context";
import { useDataController } from "modules/BrokerPortal/context";

// import Layout from "./modules/BaseSetup/Layouts/MainLayout/PageLayout";
// import MDBox from "./components/MDBox";

export default function RootApp() {
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
          <Route path="/" element={<PagesLayout />}>
            {getRoutes(routes)}
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}
