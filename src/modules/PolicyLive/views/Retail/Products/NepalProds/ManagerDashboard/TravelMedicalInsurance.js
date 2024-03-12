import { Grid, List, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function TravelMedicalInsurance({ itemReferences }) {
  console.log(itemReferences, 111);
  return (
    <div>
      <Grid container p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>
            Proposal Number :<span style={{ color: "#0071D9" }}> {itemReferences.proposalNo}</span>
          </MDTypography>
        </Grid>
        {itemReferences.policyDetails.Class !== "Burglary" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Basic Premium"
              value={itemReferences.policyDetails.PremiumDetails.PremiumAfterCorporateDiscount}
              disabled
            />
          </Grid>
        )}
        {itemReferences.policyDetails.Class !== "Burglary" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Corporate Discount"
              value={itemReferences.policyDetails.InsurableItem[0].RiskItems[0].CorporateDiscount}
              disabled
            />
          </Grid>
        )}
        {itemReferences.policyDetails.Class !== "Burglary" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="OtherLoading Charge premium"
              value={itemReferences.policyDetails.PremiumDetails.OtherLoadingChargePremium}
              disabled
            />
          </Grid>
        )}
        {itemReferences.policyDetails.Class !== "Burglary" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="CovidLoading Charge Premium"
              value={itemReferences.policyDetails.PremiumDetails.CovidLoadingChargePremium}
              disabled
            />
          </Grid>
        )}
        {itemReferences.policyDetails.Class !== "Burglary" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="ConversionRate"
              value={itemReferences.policyDetails.InsurableItem[0].RiskItems[0].ConversionRate}
              disabled
            />
          </Grid>
        )}
      </Grid>

      {itemReferences.policyDetails.Class !== "Burglary" && (
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox>
              <MDBox
                sx={{
                  backgroundColor: "#eeeeee",
                  p: "15px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography>Gross Premium</Typography>
                    <Typography>Other Loading Charge PremiumAmt</Typography>
                    <Typography>Covid Loading Charge PremiumAmt</Typography>
                    <Typography>Stamp Duty</Typography>
                    <Typography>VAT</Typography>
                  </Grid>

                  <Grid item xs={1}>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {itemReferences.policyDetails.PremiumDetails.GrossPremiumNepal}
                    </Typography>

                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {itemReferences.policyDetails.PremiumDetails.OtherLoadingChargePremiumAmt}
                    </Typography>

                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {itemReferences.policyDetails.PremiumDetails.CovidLoadingChargePremiumAmt}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {itemReferences.policyDetails.PremiumDetails.StampDuty}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {itemReferences.policyDetails.PremiumDetails.VAT}
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
                      <b>{itemReferences.policyDetails.PremiumDetails.FinalPremium}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      )}

      {itemReferences.policyDetails.Class === "Burglary" && (
        <Grid container sx={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
            <MDBox
              sx={{
                backgroundColor: "#eeeeee",
                p: "15px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography>Basic Premium</Typography>
                  <Typography>Direct Discount</Typography>
                  <Typography>Premium after Direct Discount</Typography>
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
                        .DirectDiscountAmount
                    }
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .PremiumafterDirectDiscount
                    }
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.VAT}
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .PremiumafterVAT
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
          </Grid>
        </Grid>
      )}
    </div>
  );
}
export default TravelMedicalInsurance;
