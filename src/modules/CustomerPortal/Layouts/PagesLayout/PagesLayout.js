import React from "react";
import { Outlet } from "react-router-dom";
import MDBox from "components/MDBox";
// import Footer from "layouts/authentication/components/Footer";
import Navbar from "../Navbar";
import Layout from "../MainLayout/PageLayout";

function PagesLayout(props) {
  const { children } = props;

  return (
    <Layout>
      <Navbar />
      <MDBox
        sx={{
          position: "relative",
          pt: "0.5rem",
          mt: "4.2rem",
        }}
      >
        <MDBox sx={{ width: "100%" }}>
          <Outlet>{children}</Outlet>
        </MDBox>
      </MDBox>
      {/* <Footer dark /> */}
    </Layout>
  );
}

export default PagesLayout;
