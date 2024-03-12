import React from "react";
import { Outlet } from "react-router-dom";
import MDBox from "components/MDBox";
import { Grid } from "@mui/material";
import { useMaterialUIController } from "context";
import PLSidenav from "modules/PolicyLive/views/Home/PLSidenav";
import MenuItems from "modules/PolicyLive/Menus/MenuItems";
// import Footer from "layouts/authentication/components/Footer";
import PLNavbar from "../PLNavbar";
import Layout from "../PLMainLayout/PageLayout";

function GetSideMenu(childrenMenu) {
  let rootnode = "";
  switch (process.env.REACT_APP_IsSideMenu) {
    case "true":
      rootnode = (
        // <Grid container>
        //   <Grid item xl={2.5} md={2.5} xxl={2.5}>
        //     <PLSidenav brandName="APIsLive" routes={MenuItems} />
        //   </Grid>
        //   <Grid item xl={9.5} md={9.5} xxl={9.5}>
        //     <Outlet>{childrenMenu}</Outlet>
        //   </Grid>
        // </Grid>
        <MDBox sx={{ width: "100%" }}>
          <MDBox>
            <PLSidenav brandName="APIsLive" routes={MenuItems} />
          </MDBox>
          <MDBox>
            <Outlet>{childrenMenu}</Outlet>
          </MDBox>
        </MDBox>
      );
      break;
    default:
      rootnode = (
        // <Grid container>
        //   <Grid item xl={12} md={12} xxl={12}>
        //     <Outlet>{childrenMenu}</Outlet>
        //   </Grid>
        // </Grid>
        <MDBox sx={{ width: "100%" }}>
          <MDBox>
            <PLSidenav brandName="APIsLive" routes={MenuItems} />
          </MDBox>
          <MDBox>
            <Outlet>{childrenMenu}</Outlet>
          </MDBox>
        </MDBox>
      );
  }
  return rootnode;
}

function PLPagesLayout(props) {
  const { children } = props;
  const [controller] = useMaterialUIController();

  const { miniSidenav } = controller;
  return (
    <Layout>
      <PLNavbar />
      <MDBox
        mx="auto"
        // height="100vh"
        // sx={{
        //   display: "flex",
        //   flexDirection: "Column",
        //   mt: "5rem",
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
        <Grid container>
          <GetSideMenu childrenMenu={children} />
        </Grid>
      </MDBox>
      {/* <Footer dark /> */}
    </Layout>
  );
}

export default PLPagesLayout;
