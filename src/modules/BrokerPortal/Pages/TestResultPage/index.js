import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDTypography from "../../../../components/MDTypography";
import TestResult from "../../../../assets/images/BrokerPortal/TestResult.png";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";

function TestResultPage() {
  return (
    <Card
      sx={{
        m: 3,
      }}
    >
      <Grid container justifyContent="center">
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}> */}
        <MDBox
          component="img"
          src={TestResult}
          sx={{ width: "11.25rem", height: "13rem" }}
          alignItems="center"
        />
      </Grid>
      {/* </Grid> */}
      <Grid container justifyContent="center">
        <MDTypography sx={{ fontSize: "32px", fontWeight: 400 }}>Congratulations!</MDTypography>
      </Grid>
      <Grid container justifyContent="center">
        <MDTypography sx={{ fontSize: "24px", fontWeight: 400 }}>
          You have scored <span style={{ color: "#00CA72" }}>37 Marks</span> out of 50 Marks
        </MDTypography>
      </Grid>
      <Grid container justifyContent="center">
        <MDTypography sx={{ fontSize: "16px", fontWeight: 400 }}>
          We will mail your certificate to your email and also you can access from{" "}
          <span style={{ color: "#025292", textDecoration: "underline" }}>My Certificate</span>
          section
        </MDTypography>
      </Grid>
      <Grid container justifyContent="center">
        <MDBox display="flex" flexDirection="row" alignItems="center" m={2}>
          <MDButton variant="outlined" color="info">
            View My Course
          </MDButton>
          <MDBox ml={10}>
            <MDButton variant="contained" color="info">
              Download Certificate
            </MDButton>
          </MDBox>
        </MDBox>
      </Grid>
    </Card>
  );
}
export default TestResultPage;
