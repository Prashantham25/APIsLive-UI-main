import { Divider, Grid } from "@mui/material";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "../../../../../components/MDButton";

function Summary({ PolicyDto, policyPeriod, sumInsured }) {
  console.log("summary", PolicyDto);
  return (
    <MDBox fullwidth sx={{ background: "#CEEBFF", px: "2rem", pb: "2rem" }}>
      <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
        Summary
      </MDTypography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            Total Lives
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <MDTypography textAlign="right" variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            {PolicyDto.TotalLivesCount}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            Sum Insured
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography textAlign="right" variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            ₹ {sumInsured}
          </MDTypography>
        </Grid>
        {policyPeriod > 0 ? (
          <>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                Policy Period
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography
                textAlign="right"
                variant="h6"
                sx={{ fontSize: "1rem", color: "#5F5F5F" }}
              >
                {policyPeriod} Year
              </MDTypography>
            </Grid>
          </>
        ) : null}

        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            Coverage
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <MDTypography textAlign="right" variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            Employee+Spouse+2 kids (upto 25 years)
          </MDTypography>
        </Grid> */}
        <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
        {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            Additional Coverages (Add-ons)
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography
            textAlign="right"
            variant="h6"
            color="primary"
            // onClick={handlePlanOpen}
            sx={{ fontSize: "0.87rem", cursor: "pointer" }}
          >
            View
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography
            variant="body1"
            sx={{ fontSize: "1rem", color: "#5F5F5F", cursor: "pointer" }}
          >
            Maternity Benefit
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography
            textAlign="right"
            variant="h6"
            color="primary"
            // onClick={handleAddonOpen}
            sx={{ fontSize: "0.87rem" }}
          >
            View
          </MDTypography>
        </Grid> */}
        {/* <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} /> */}
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            Premium
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography textAlign="right" variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            {PolicyDto.PremiumDetail.BasicPremium}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            GST@18%
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography textAlign="right" variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            ₹ {PolicyDto.PremiumDetail.TaxAmount}
          </MDTypography>
        </Grid>
        <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} display="flex" alignItems="center">
          <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
            Total Premium
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography textAlign="right" variant="h6" color="primary" fontSize="2rem" mt={0}>
            {/* {formatter.format(premiumData.gst + premiumData.premium)} */}₹
            {PolicyDto.PremiumDetail.TotalPremium}
          </MDTypography>
        </Grid>

        {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDButton
            size="medium"
            startIcon={<ArrowDownwardIcon />}
            color="white"
            sx={{
              textSize: "0.87rem",

              borderRadius: "0.25rem",

              borderColor: "#1976D2",

              border: 1,

              background: "transparent",
            }}
          >
            Download Quote
          </MDButton>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          justifyContent="right"
          alignItems="start"
          display="flex"
        >
          {/* <MDButton sx={{ fontSize: "0.7rem" }}>Proceed</MDButton> */}
        {/* </Grid>  */}
      </Grid>
    </MDBox>
  );
}
export default Summary;
