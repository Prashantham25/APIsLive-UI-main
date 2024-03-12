import { Grid, List, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function PersonalDomiciliaryInsurance({ itemReferences }) {
  console.log(itemReferences, 111);
  return (
    <div>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>
            Proposal Number :<span style={{ color: "#0071D9" }}> {itemReferences.proposalNo}</span>
          </MDTypography>
        </Grid>
        {itemReferences.policyDetails.Class === "Domicillary & Hospitalization" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Basic Premium"
              value={
                itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.BasicPremium
              }
              disabled
            />
          </Grid>
        )}

        {itemReferences.policyDetails.Class === "Domicillary & Hospitalization" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="13 % VAT"
              value={itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.VAT}
              disabled
            />
          </Grid>
        )}
        {itemReferences.policyDetails.Class === "Domicillary & Hospitalization" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Stamp Duty"
              value={itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.StampDuty}
              disabled
            />
          </Grid>
        )}
      </Grid>

      {itemReferences.policyDetails.Class === "Domicillary & Hospitalization" && (
        <Grid container sx={{ display: "flex", justifyContent: "center", paddingLeft: "300px" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={10}>
            <MDBox>
              <MDBox
                sx={{
                  backgroundColor: "#eeeeee",
                  p: "30px",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <Typography>Basic Premium</Typography>
                    <Typography>13% VAT</Typography>
                    <Typography>Stamp Duty</Typography>
                  </Grid>
                  <Grid item xs={1}>
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
                      {itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.VAT}
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
      )}
    </div>
  );
}
export default PersonalDomiciliaryInsurance;
