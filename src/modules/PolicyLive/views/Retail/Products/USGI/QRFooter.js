// import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import MDTypography from "../../../../../../components/MDTypography";
import QRCode from "./QRCode";

function QRFooter() {
  // const [setShowFooter] = useState(false);
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setShowFooter(true);
  //   }, 1450);

  //   return () => clearTimeout(timeoutId);
  // }, []);

  return (
    <>
      <div
        style={{
          borderTop: "5px solid #FFD700",
          paddingTop: "5px",
          margin: 0,
          marginLeft: "-25px",
        }}
      />
      <MDBox
        style={{
          borderRadius: "2rem",
          marginTop: "-5px",
          marginLeft: "-25px",
        }}
      >
        <MDTypography
          sx={{
            backgroundColor: "#1C2951",
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: "12px",
          }}
        >
          Copyright @ Universal Sompo General Insurance Co Ltd
        </MDTypography>
        <MDTypography
          sx={{
            backgroundColor: "#1C2951",
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: "12px",
          }}
        >
          Regd & Corp Office: Universal Sompo General Insurance Co Ltd. Office No 103, First Floor,
          Ackruti Star, MIDC Central Road, Andheri (East), Mumbai-400093, Maharashtra
          Tel:022-41659800, 022-41659900
        </MDTypography>
        <MDTypography
          sx={{
            backgroundColor: "#1C2951",
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: "12px",
          }}
        >
          Insurance is the subject matter of solicitation. IRDAI Registration Number - 134. CIN
          #U66010MH2007PLC166770. Control Number - ENG/WEBSITE/157/Feb 2015
        </MDTypography>
      </MDBox>
    </>
  );
}

function YourPageContent() {
  return (
    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
      <Grid item>
        <Grid container direction="column" spacing={0}>
          <Grid item width={1250}>
            <QRCode />
          </Grid>
          <Grid item width={1300}>
            {/* Content of your page */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function App() {
  return (
    <>
      <PageLayout>
        <YourPageContent />
      </PageLayout>
      <QRFooter />
    </>
  );
}

export default App;
