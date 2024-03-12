import { List, Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
import Grid from "@mui/material/Grid";

function HomeInsurance({ itemReferences }) {
  console.log(itemReferences, "itemReferences");
  return (
    <div>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>
            Proposal Number :<span style={{ color: "#0071D9" }}> {itemReferences.proposalNo} </span>
          </MDTypography>
        </Grid>
      </Grid>

      <Grid container sx={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={7}>
          <MDBox
            sx={{
              backgroundColor: "#eeeeee",
              p: "30px",
              width: "500px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <MDTypography>Basic Premium</MDTypography>
                <MDTypography>Direct Discount</MDTypography>
                <MDTypography>Premium after Direct Discount</MDTypography>
                <MDTypography>VAT</MDTypography>
                <MDTypography>Premium After VAT</MDTypography>
                <MDTypography>Stamp Duty</MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography>रु</MDTypography>
                <MDTypography>रु</MDTypography>
                <MDTypography>रु</MDTypography>
                <MDTypography>रु</MDTypography>
                <MDTypography>रु</MDTypography>
                <MDTypography>रु</MDTypography>
              </Grid>
              <Grid item xs={3}>
                <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                  <MDTypography>
                    {
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .BasicPremium
                    }
                  </MDTypography>
                </MDTypography>
                <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                  <MDTypography>
                    {
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .DiscountAmount
                    }
                  </MDTypography>
                </MDTypography>
                <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                  <MDTypography>
                    {
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .BasicPremiumAfterDiscount
                    }
                  </MDTypography>
                </MDTypography>
                <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                  <MDTypography>
                    {itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.VAT}
                  </MDTypography>
                </MDTypography>

                <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                  <MDTypography>
                    {
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .PremiumAfterVAT
                    }
                  </MDTypography>
                </MDTypography>
                <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                  <MDTypography>
                    {itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.StampDuty}
                  </MDTypography>
                </MDTypography>
              </Grid>
              <List
                sx={{
                  width: "100%",
                  height: "1px",
                  bgcolor: "#9e9e9e",
                }}
              >
                <Divider />
              </List>
              <Grid item xs={8}>
                <MDTypography sx={{ fontWeight: "bold" }}>Total Premium</MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography sx={{ fontWeight: "bold" }}>रु</MDTypography>
              </Grid>
              <Grid item xs={3}>
                <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                  <MDTypography sx={{ fontWeight: "bold" }}>
                    {
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .FinalPremium
                    }
                  </MDTypography>
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </div>
  );
}
export default HomeInsurance;
