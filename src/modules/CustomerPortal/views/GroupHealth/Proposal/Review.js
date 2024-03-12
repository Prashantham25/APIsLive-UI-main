import { Grid, CircularProgress, Backdrop } from "@mui/material";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "../../../../../components/MDButton";

function Review({ PolicyDto, qFlag, finalData }) {
  return (
    <MDBox>
      <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
        Review & Proceed for Payment
      </MDTypography>
      {finalData.proposalNo === "" ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={qFlag}>
          <CircularProgress />
        </Backdrop>
      ) : (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="body1" sx={{ fontSize: "1.4rem" }}>
                Company Details
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="h6" sx={{ fontSize: "1.1rem", color: "primary" }}>
                Organization Name
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography textAlign="left" variant="h6" sx={{ fontSize: "1rem" }}>
                {PolicyDto.ProposerDetails.OrganizationName}
              </MDTypography>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
      <MDTypography variant="h6" sx={{ fontSize: "1.1rem", color: "#5F5F5F" }}>
        City
      </MDTypography>
    </Grid>
    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
      <MDTypography textAlign="left" variant="h6" sx={{ fontSize: "1rem" }}>
        {PolicyDto.Location}
      </MDTypography>
    </Grid> */}
          </Grid>
          <br />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="body1" sx={{ fontSize: "1.4rem" }}>
                Cover Details
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "primary" }}>
                Cover Type
              </MDTypography>
            </Grid>
            <br />
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography textAlign="left" variant="h6" sx={{ fontSize: "1rem" }}>
                {PolicyDto.ProposerDetails.CoverageType}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                Coverage Amount Per Employee
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography textAlign="left" variant="h6" sx={{ fontSize: "1rem" }}>
                {PolicyDto.ProposerDetails.CoverageAmountPerEmployee}
              </MDTypography>
            </Grid>

            <br />

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="h6" sx={{ fontSize: "1.1rem", color: "primary" }}>
                Total Number Of Lives
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography textAlign="left" variant="h6" sx={{ fontSize: "1rem" }}>
                {PolicyDto.TotalLivesCount}
              </MDTypography>
            </Grid>
          </Grid>
        </>
      )}
    </MDBox>
  );
}
export default Review;
