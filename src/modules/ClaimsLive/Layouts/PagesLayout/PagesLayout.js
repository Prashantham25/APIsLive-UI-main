import React from "react";
import { Outlet } from "react-router-dom";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import MenuItems from "../../Menus/MenuItems";
import Sidenav from "../Sidenav";
// import Footer from "layouts/authentication/components/Footer";
import Navbar from "../Navbar";
import Layout from "../MainLayout/PageLayout";

function PagesLayout(props) {
  const { children } = props;
  const [controller] = useMaterialUIController();

  const { miniSidenav } = controller;
  return (
    <Layout>
      <Navbar />
      <MDBox
        // mx="auto"
        // height="100vh"
        // p={2}
        // sx={{
        //   display: "flex",
        //   flexDirection: "row",
        //   mt: "4.2rem",
        //   // background: `linear-gradient(90.67deg, #0073DD 2.32%, #83B4F4 100%)`,
        //   padding: "1%",
        // }}

        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          position: "relative",
          padding: "1%",
          mt: "4.2rem",
          [breakpoints.up("xl")]: {
            marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
            transition: transitions.create(["margin-left", "margin-right"], {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard,
            }),
          },
        })}
      >
        <MDBox sx={{ width: "150px" }}>
          <Sidenav brandName="APIsLive" routes={MenuItems} />
        </MDBox>
        <MDBox sx={{ width: "100%" }}>
          <Outlet>{children}</Outlet>
        </MDBox>
      </MDBox>
      {/* <Footer dark /> */}
    </Layout>
  );
}

export default PagesLayout;
