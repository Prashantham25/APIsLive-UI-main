import { Grid, Typography, List } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function MotorCycle({ itemReferences, formater, EndorsementDetails }) {
  console.log("itemReferences11111111", itemReferences, formater, EndorsementDetails);
  return (
    <>
      <Grid container spacing={2} rowSpacing={3} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography sx={{ color: "#000000", fontSize: "24px" }}>
            {
              /* eslint-disable */
              EndorsementDetails &&
              EndorsementDetails !== undefined &&
              EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement"
                ? "Endorsement Premium Break-Up Screen"
                : EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation"
                ? "Cancellation Premium Break-Up Screen"
                : EndorsementDetails?.EndorsementType[0]?.mValue === "Non-Financial Endorsement"
                ? "Premium Break-Up Screen"
                : "Premium Break-Up Screen"
              /* eslint-enable */
            }
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>
            Debit Note Number:
            <span style={{ color: "#0071D9" }}>
              {" "}
              {EndorsementDetails && EndorsementDetails.EndorsementNo !== undefined
                ? EndorsementDetails.EndorsementNo
                : itemReferences.proposalNo}
            </span>
          </MDTypography>
        </Grid>
        <Grid container spacing={2} rowSpacing={3} p={2}>
          {(EndorsementDetails === undefined ||
            EndorsementDetails?.EndorsementType[0]?.mValue === "Non-Financial Endorsement") && (
            <>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Basic Premium"
                  value={
                    /* eslint-disable */
                    EndorsementDetails &&
                    EndorsementDetails !== undefined &&
                    (EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" ||
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation")
                      ? itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].BasePremium
                      : EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Non-Financial Endorsement"
                      ? "0.00"
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .BasePremium
                    /* eslint-enable */
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Old Vehicle Loading"
                  value={
                    /* eslint-disable */
                    EndorsementDetails !== undefined &&
                    (EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" ||
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation")
                      ? itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].AgeofVehicleLoading
                      : EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Non-Financial Endorsement"
                      ? "0.00"
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .AgeofVehicleLoading
                    /* eslint-enable */
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Voluntry Excess"
                  value={
                    /* eslint-disable */
                    // EndorsementDetails === undefined
                    //   ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.ExcessDiscount
                    //   : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.ExcessDiscount
                    EndorsementDetails !== undefined &&
                    (EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" ||
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation")
                      ? itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].ExcessDiscount
                      : EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Non-Financial Endorsement"
                      ? "0.00"
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .ExcessDiscount
                    /* eslint-enable */
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="No Claim Discount"
                  value={
                    /* eslint-disable */
                    // EndorsementDetails === undefined
                    //   ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .NoClaimDiscountBase
                    //   : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .NoClaimDiscountBase
                    EndorsementDetails !== undefined &&
                    (EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" ||
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation")
                      ? itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].NoClaimDiscountBase
                      : EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Non-Financial Endorsement"
                      ? "0.00"
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .NoClaimDiscountBase
                    /* eslint-enable */
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Eco Friendly Discount"
                  value={
                    /* eslint-disable */
                    // EndorsementDetails === undefined
                    //   ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .EnvironmentDiscount
                    //   : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .EnvironmentDiscount
                    EndorsementDetails !== undefined &&
                    (EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" ||
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation")
                      ? itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].EnvironmentDiscount
                      : EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Non-Financial Endorsement"
                      ? "0.00"
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .EnvironmentDiscount
                    /* eslint-enable */
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Direct Discount"
                  value={
                    /* eslint-disable */
                    // EndorsementDetails === undefined
                    //   ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .DirectDiscountAmount
                    //   : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .DirectDiscountAmount

                    EndorsementDetails !== undefined &&
                    (EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" ||
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation")
                      ? itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].DirectDiscountAmount
                      : EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Non-Financial Endorsement"
                      ? "0.00"
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .DirectDiscountAmount
                    /* eslint-enable */
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Minimum Premium"
                  value={
                    /* eslint-disable */
                    // EndorsementDetails === undefined
                    //   ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .ApplicableAdditionalPremium
                    //   : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .ApplicableAdditionalPremium
                    EndorsementDetails &&
                    EndorsementDetails !== undefined &&
                    (EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" ||
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation")
                      ? itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].ApplicableAdditionalPremium
                      : EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Non-Financial Endorsement"
                      ? "0.00"
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .ApplicableAdditionalPremium
                    /* eslint-enable */
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Third Party Insurance"
                  value={
                    /* eslint-disable */
                    // EndorsementDetails === undefined
                    //   ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.BaseTPRate
                    //   : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.BaseTPRate
                    EndorsementDetails &&
                    EndorsementDetails !== undefined &&
                    (EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" ||
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation")
                      ? itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].BaseTPRate
                      : EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Non-Financial Endorsement"
                      ? "0.00"
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .BaseTPRate
                    /* eslint-enable */
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="No Claim Discount(PT)"
                  value={
                    /* eslint-disable */
                    // EndorsementDetails === undefined
                    //   ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .NoClaimDiscountTP
                    //   : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .NoClaimDiscountTP
                    EndorsementDetails &&
                    EndorsementDetails !== undefined &&
                    (EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" ||
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation")
                      ? itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].NoClaimDiscountTP
                      : EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Non-Financial Endorsement"
                      ? "0.00"
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .NoClaimDiscountTP
                    /* eslint-enable */
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Roits and Strike Damange"
                  value={
                    /* eslint-disable */
                    // EndorsementDetails === undefined
                    //   ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .RSDMDRiderPillion
                    //   : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    //       .RSDMDRiderPillion
                    EndorsementDetails &&
                    EndorsementDetails !== undefined &&
                    (EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" ||
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation")
                      ? itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].RSDMDRiderPillion
                      : EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Non-Financial Endorsement"
                      ? "0.00"
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .RSDMDRiderPillion
                    /* eslint-enable */
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Terrorsim"
                  value={
                    /* eslint-disable */
                    // EndorsementDetails === undefined
                    //   ? itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.STPremiumPDF
                    //   : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.STPremiumPDF
                    EndorsementDetails &&
                    EndorsementDetails !== undefined &&
                    (EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" ||
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation")
                      ? itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].STPremiumPDF
                      : EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Non-Financial Endorsement"
                      ? "0.00"
                      : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                          .STPremiumPDF
                    /* eslint-enable */
                  }
                  disabled
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      {(EndorsementDetails === undefined ||
        EndorsementDetails?.EndorsementType[0]?.mValue === "Non-Financial Endorsement") && (
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox
              sx={{
                backgroundColor: "#eeeeee",
                p: "15px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography>Gross Premium</Typography>
                  <Typography>VAT</Typography>
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
                      /* eslint-disable */
                      EndorsementDetails &&
                      EndorsementDetails !== undefined &&
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement"
                        ? itemReferences.FormatedData.EndCalculatedPremiumDetails.EndorsementPremium
                        : EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation"
                        ? itemReferences.FormatedData.EndCalculatedPremiumDetails
                            .CancellationPremium
                        : EndorsementDetails?.EndorsementType[0]?.mValue ===
                          "Non-Financial Endorsement"
                        ? "0.00"
                        : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                            .NetPremium
                      /* eslint-enable */
                    }
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {
                      /* eslint-disable */
                      EndorsementDetails &&
                      EndorsementDetails !== undefined &&
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement"
                        ? itemReferences.FormatedData.EndCalculatedPremiumDetails.EndorsementVAT
                        : EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation"
                        ? itemReferences.FormatedData.EndCalculatedPremiumDetails.CancellationVAT
                        : EndorsementDetails?.EndorsementType[0]?.mValue ===
                          "Non-Financial Endorsement"
                        ? "0.00"
                        : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.VAT
                      /* eslint-enable */
                    }
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "right" }}>
                    {
                      /* eslint-disable */
                      EndorsementDetails &&
                      EndorsementDetails !== undefined &&
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement"
                        ? itemReferences.FormatedData.EndCalculatedPremiumDetails
                            .EndorsementStampDuty
                        : EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation"
                        ? itemReferences.FormatedData.EndCalculatedPremiumDetails
                            .CancellationStampDuty
                        : EndorsementDetails?.EndorsementType[0]?.mValue ===
                          "Non-Financial Endorsement"
                        ? "0.00"
                        : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                            .StampDuty
                      /* eslint-enable */
                    }
                  </Typography>
                </Grid>

                <List
                  sx={{
                    width: "100%",
                    height: "1px",
                    bgcolor: "#9e9e9e",
                  }}
                >
                  {/* "" */}
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
                      {" "}
                      {
                        /* eslint-disable */
                        EndorsementDetails &&
                        EndorsementDetails !== undefined &&
                        EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement"
                          ? itemReferences.FormatedData.EndCalculatedPremiumDetails
                              .EndorsementFinalPremium
                          : EndorsementDetails?.EndorsementType[0]?.mValue === "Policy Cancellation"
                          ? itemReferences.FormatedData.EndCalculatedPremiumDetails
                              .CancellationFinalPremium
                          : EndorsementDetails?.EndorsementType[0]?.mValue ===
                            "Non-Financial Endorsement"
                          ? "0.00"
                          : itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                              .FinalPremium
                        /* eslint-enable */
                      }
                    </b>
                  </Typography>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      )}
      {EndorsementDetails !== undefined &&
        EndorsementDetails?.EndorsementType[0]?.mValue !== "Non-Financial Endorsement" && (
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDBox
                sx={{
                  backgroundColor: "#eeeeee",
                  p: "15px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography>
                      {/* Gross Premium */}
                      Policy Premium Excluding VAT
                    </Typography>
                    <Typography>
                      {
                        /* eslint-disable */
                        EndorsementDetails &&
                        EndorsementDetails?.EndorsementType[0]?.mValue ===
                          "Financial Endorsement" &&
                        (EndorsementDetails?.EndorsementType[1]?.endorsementConfigName ===
                          "Extra" ||
                          EndorsementDetails?.EndorsementType[1]?.endorsementConfigName ===
                            "Refund")
                          ? "Endorsement Premium Excluding VAT"
                          : "Cancellation Premium Excluding VAT"
                        /* eslint-enable */
                      }
                    </Typography>
                    <Typography>
                      {
                        /* eslint-disable */
                        EndorsementDetails &&
                        EndorsementDetails?.EndorsementType[0]?.mValue ===
                          "Financial Endorsement" &&
                        EndorsementDetails?.EndorsementType[1]?.endorsementConfigName === "Extra"
                          ? "Endorsement Additional Premium"
                          : EndorsementDetails?.EndorsementType[0]?.mValue ===
                              "Financial Endorsement" &&
                            EndorsementDetails?.EndorsementType[1]?.endorsementConfigName ===
                              "Refund"
                          ? "Endorsement Refund Premium"
                          : "Cancellation Refund Premium"
                        /* eslint-enable */
                      }
                      {/* Cancellation Refund Premium */}
                    </Typography>
                    {/* {EndorsementDetails &&
                      EndorsementDetails?.EndorsementType[0]?.mValue === */}
                    {/* "Financial Endorsement" &&  */}
                    <Typography>
                      {EndorsementDetails &&
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement"
                        ? "Endorsement VAT"
                        : "Cancellation VAT"}
                    </Typography>
                    {/* } */}
                    {EndorsementDetails &&
                      EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Financial Endorsement" && <Typography>Stamp Duty</Typography>}
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    {/* {EndorsementDetails &&
                      EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Financial Endorsement" &&  */}
                    <Typography>रु</Typography>
                    {/* } */}
                    {EndorsementDetails &&
                      EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Financial Endorsement" && <Typography>रु</Typography>}{" "}
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {itemReferences.FormatedData.CalculatedPremiumDetails.NetPremium}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {
                        itemReferences.FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating
                          .output[0].NetPremium
                      }
                    </Typography>
                    {/* {EndorsementDetails &&
                      EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Financial Endorsement" && ( */}
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {EndorsementDetails &&
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement"
                        ? itemReferences.FormatedData.EndCalculatedPremiumDetails.EndorsementPremium
                        : itemReferences.FormatedData.EndCalculatedPremiumDetails
                            .CancellationPremium}
                      {/* itemReferences.FormatedData.EndCalculatedPremiumDetails.CancellationPremium */}
                    </Typography>
                    {/* )} */}
                    {/* {EndorsementDetails &&
                      EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Financial Endorsement" && ( */}
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {EndorsementDetails &&
                      EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement"
                        ? itemReferences.FormatedData.EndCalculatedPremiumDetails.EndorsementVAT
                        : itemReferences.FormatedData.EndCalculatedPremiumDetails.CancellationVAT}
                    </Typography>
                    {/* )} */}
                    {EndorsementDetails &&
                      EndorsementDetails?.EndorsementType[0]?.mValue ===
                        "Financial Endorsement" && (
                        <Typography sx={{ display: "flex", justifyContent: "right" }}>
                          {
                            itemReferences.FormatedData.EndCalculatedPremiumDetails
                              .EndorsementStampDuty
                          }
                        </Typography>
                      )}
                  </Grid>
                  {/* {EndorsementDetails &&
                    EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" && ( */}
                  <List
                    sx={{
                      width: "100%",
                      height: "1px",
                      bgcolor: "#9e9e9e",
                    }}
                  >
                    {/* <Divider sx={{ height: "1px" }} /> */}
                  </List>
                  {/* )} */}
                  {/* {EndorsementDetails &&
                    EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" && ( */}
                  <Grid item xs={8}>
                    <Typography>
                      <b>
                        {/* Total Premium */}
                        {
                          /* eslint-disable */
                          EndorsementDetails &&
                          EndorsementDetails?.EndorsementType[0]?.mValue ===
                            "Financial Endorsement" &&
                          EndorsementDetails?.EndorsementType[1]?.endorsementConfigName === "Extra"
                            ? "Endorsement Final Premium"
                            : EndorsementDetails?.EndorsementType[0]?.mValue ===
                                "Financial Endorsement" &&
                              EndorsementDetails?.EndorsementType[1]?.endorsementConfigName ===
                                "Refund"
                            ? "Endorsement Final Premium"
                            : "Cancellation Final Premium"
                          /* eslint-enable */
                        }
                      </b>
                    </Typography>
                  </Grid>
                  {/* )} */}
                  {/* {EndorsementDetails && */}
                  {/* EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" && ( */}
                  <Grid item xs={1}>
                    <Typography>
                      <b>रु</b>
                    </Typography>
                  </Grid>
                  {/* // )} */}
                  {/* {EndorsementDetails &&
                    EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement" && ( */}
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      <b>
                        {EndorsementDetails &&
                        EndorsementDetails?.EndorsementType[0]?.mValue === "Financial Endorsement"
                          ? itemReferences.FormatedData.EndCalculatedPremiumDetails
                              .EndorsementFinalPremium
                          : itemReferences.FormatedData.EndCalculatedPremiumDetails
                              .CancellationFinalPremium}
                      </b>
                    </Typography>
                  </Grid>
                  {/* )} */}
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        )}
    </>
  );
}
export default MotorCycle;
