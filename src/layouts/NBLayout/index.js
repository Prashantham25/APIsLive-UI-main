import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import NBPageLayout from "examples/LayoutContainers/NBPageLayout";
import NBNavbar from "examples/Navbars/NBNavbar";

// Data
// import reportsLineChartData from "layouts/dashboards/dashboard/data/reportsLineChartData";

// Dashboard components
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";

function NBLayout() {
  // const { sales, tasks } = reportsLineChartData;
  return (
    <NBPageLayout>
      <NBNavbar />

      <Card position="inline">
        <MDBox p={2}>
          <Grid container spacing={2} textAlign="center">
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={2}>
              <MDInput label="Passport No" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={2}>
              <MDInput label="Policy Number" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={2}>
              <MDInput label="Customer ID" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={2}>
              <MDInput label="Endorsement No" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={2}>
              <MDInput label="Mobile No" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={2}>
              <MDInput label="Name" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={2}>
              <MDInput label="eMail" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={2}>
              <MDButton variant="gradient" color="info">
                Search Policy
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Card>

      {/* <Footer /> */}
    </NBPageLayout>
  );
}

export default NBLayout;
