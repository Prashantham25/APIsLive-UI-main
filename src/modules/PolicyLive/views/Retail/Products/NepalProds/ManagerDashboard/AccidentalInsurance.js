import { Grid, Typography, List } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function AccidentalInsurance({ itemReferences, formater }) {
  console.log(itemReferences, formater);
  return (
    <>
      <Grid container p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>
            Proposal Number :<span style={{ color: "#0071D9" }}> {itemReferences.proposalNo}</span>
          </MDTypography>
        </Grid>
      </Grid>
      {/* <MDBox sx={{ display: "flex", justifyContent: "center" }}> */}
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox sx={{ backgroundColor: "#eeeeee", p: "15px" }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography>Basic Premium</Typography>
                <Typography>Direct Discount</Typography>
                <Typography>Premium after Direct Discount</Typography>
                <Typography>Stamp Duty</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>रु</Typography>
                <Typography>रु</Typography>
                <Typography>रु</Typography>
                <Typography>रु</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ display: "flex", justifyContent: "right" }}>
                  {formater.format(itemReferences?.policyDetails?.PremiumDetails?.BasePremium)}
                </Typography>
                <Typography sx={{ display: "flex", justifyContent: "right" }}>
                  {formater.format(
                    itemReferences?.policyDetails?.PremiumDetails?.DirectDiscountAmt
                  )}
                </Typography>
                <Typography sx={{ display: "flex", justifyContent: "right" }}>
                  {formater.format(
                    itemReferences?.policyDetails?.PremiumDetails?.PremiumAfterDirectDiscount
                  )}
                </Typography>
                <Typography sx={{ display: "flex", justifyContent: "right" }}>
                  {formater.format(itemReferences?.policyDetails?.PremiumDetails?.StampDuty)}
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
              </List>{" "}
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
                    {formater.format(itemReferences?.policyDetails?.PremiumDetails?.FinalPremium)}
                  </b>
                </Typography>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      {/* </MDBox> */}
    </>
  );
}

export default AccidentalInsurance;
