import { Grid, Typography, List } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Agriculture({ itemReferences }) {
  return (
    <div>
      <Grid container p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>
            Proposal Number :<span style={{ color: "#0071D9" }}> {itemReferences.proposalNo}</span>
          </MDTypography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          ml: 14,
          mt: 3,
        }}
      >
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <MDBox>
            <MDBox
              sx={{
                backgroundColor: "#eeeeee",
                p: "15px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography>Basic Premium</Typography>

                  {(itemReferences.policyDetails.Product === "Ostrich" ||
                    itemReferences.policyDetails.Product === "Fish" ||
                    itemReferences.policyDetails.Product === "HoneyBee") && (
                    <Typography>Discount</Typography>
                  )}
                  <Typography>Govt Subsidy</Typography>
                  <Typography>Premium After Subsidy</Typography>
                  <Typography>Stamp Duty</Typography>
                  <Typography>Total Accidental Premium</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>रु</Typography>
                  <Typography>रु</Typography>
                  <Typography>रु</Typography>
                  <Typography>रु</Typography>
                  <Typography>रु</Typography>
                  {(itemReferences.policyDetails.Product === "HoneyBee" ||
                    itemReferences.policyDetails.Product === "Fish" ||
                    itemReferences.policyDetails.Product === "Ostrich") && (
                    <Typography>रु</Typography>
                  )}
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {itemReferences.policyDetails.Product === "HoneyBee" ||
                    itemReferences.policyDetails.Product === "Pheasant"
                      ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .BasicPremium
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .BasePremium}
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {(itemReferences.policyDetails.Product === "HoneyBee" ||
                      itemReferences.policyDetails.Product === "Fish" ||
                      itemReferences.policyDetails.Product === "Ostrich") &&
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .DirectDiscountAmt}
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {itemReferences.policyDetails.Product === "HoneyBee" ||
                    itemReferences.policyDetails.Product === "Fish" ||
                    itemReferences.policyDetails.Product === "Ostrich" ||
                    itemReferences.policyDetails.Product === "Pheasant"
                      ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .GovtSubsidy
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .GovtSubsidyPremium}
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {itemReferences.policyDetails.Product === "HoneyBee" ||
                    itemReferences.policyDetails.Product === "Fish" ||
                    itemReferences.policyDetails.Product === "Ostrich" ||
                    itemReferences.policyDetails.Product === "Pheasant"
                      ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .PremiumAfterSubsidy
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .PremiumafterSubsidy}
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.StampDuty}
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {itemReferences.policyDetails.Product === "HoneyBee" ||
                    itemReferences.policyDetails.Product === "Fish" ||
                    itemReferences.policyDetails.Product === "Ostrich" ||
                    itemReferences.policyDetails.Product === "Pheasant"
                      ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .TotalAccidentalPremium
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .AccidentalPremium}
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
                    <b>Total Premium to be paid by Customer</b>
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

export default Agriculture;
