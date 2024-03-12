import React from "react";
import { Outlet } from "react-router-dom";
import MDBox from "components/MDBox";
import { Grid } from "@mui/material";
import AdminSidenav from "../../Pages/Admin/AdminSidenav";
import MenuItems from "../../Pages/Admin/MenuItems";
import InterviewMenuItems from "../../Pages/Admin/InterviewMenuItems";
// import Footer from "layouts/authentication/components/Footer";
import BPNavbar from "../BPNavbar";
import Layout from "../BPMainLayout/PageLayout";
import { useDataController } from "../../context";

function BPPagesLayout(props) {
  const { children } = props;
  const [controller] = useDataController();
  const { InterviewLoginFlag } = controller;

  return (
    <Layout>
      <BPNavbar />
      <MDBox
        mx="auto"
        // height="100vh"
        sx={{
          display: "flex",
          flexDirection: "Column",
          mt: "5rem",
          // background: `linear-gradient(90.67deg, #0073DD 2.32%, #83B4F4 100%)`,
          padding: "1%",
        }}
      >
        <Grid container>
          <Grid item xl={2.5} md={2.5} xxl={2.5}>
            {InterviewLoginFlag === false ? (
              <AdminSidenav brandName="APIsLive" routes={MenuItems} />
            ) : (
              <AdminSidenav brandName="APIsLive" routes={InterviewMenuItems} />
            )}
          </Grid>
          <Grid item xl={9.5} md={9.5} xxl={9.5}>
            <Outlet>{children}</Outlet>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer dark /> */}
    </Layout>
  );
}

export default BPPagesLayout;
