import { Grid, List, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function PropertyInsurance({ itemReferences }) {
  return (
    <div>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>
            Proposal Number :<span style={{ color: "#0071D9" }}> {itemReferences.proposalNo}</span>
          </MDTypography>
        </Grid>
      </Grid>

      <Grid container sx={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={7}>
          <MDBox>
            <MDBox
              sx={{
                backgroundColor: "#eeeeee",
                p: "30px",
                width: "500px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography>Basic Premium</Typography>
                  <Typography>Discount Amount</Typography>
                  <Typography> Basic Premium After Discount</Typography>
                  <Typography>VAT</Typography>
                  <Typography>Premium After VAT</Typography>
                  <Typography>Stamp Duty</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>रु</Typography>
                  <Typography>रु</Typography>
                  <Typography>रु</Typography>
                  <Typography>रु</Typography>
                  <Typography>रु</Typography>
                  <Typography>रु</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .BasicPremium
                    }
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .DiscountAmount
                    }
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .BasicPremiumAfterDiscount
                    }
                  </Typography>

                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.VAT}
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .PremiumAfterVAT
                    }
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.StampDuty}
                  </Typography>
                </Grid>

                <List
                  sx={{
                    width: "100%",
                    height: "1px",
                    bgcolor: "#9e9e9e",
                  }}
                >
                  {/* <Divider sx={{ height: "1px" }} /> */}
                </List>

                <Grid item xs={8}>
                  <Typography>
                    <b>Total Premium</b>
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>
                    <b>रु</b>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    <b>
                      {
                        itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .FinalPremium
                      }
                    </b>
                  </Typography>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </div>
  );
}
export default PropertyInsurance;
