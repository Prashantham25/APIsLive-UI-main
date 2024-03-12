import { Grid, List, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function CommercialVehicle({ itemReferences }) {
  //   console.log("itemReferences11111111", itemReferences);
  return (
    <div>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>
            Proposal Number :<span style={{ color: "#0071D9" }}> {itemReferences.proposalNo}</span>
          </MDTypography>
        </Grid>
        {itemReferences.policyDetails.Product === "CommercialVehicle" && (
          <Grid container spacing={2} p={2}>
            {itemReferences.policyDetails.Class !== "Third Party Commercial" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Basic Premium"
                  value={
                    itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                      .BaseRatePremiumAsPerSumInsured
                  }
                  disabled
                />
              </Grid>
            )}
            {itemReferences.policyDetails.ClassCategorylabel === "Agriculture & Forestry Vehicle" &&
              itemReferences.policyDetails.Class !== "Third Party Commercial" && (
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="Additional Premium for Extra Load"
                    value={
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .PremiumAccCarryingCapacity
                    }
                    disabled
                  />
                </Grid>
              )}
            {itemReferences.policyDetails.ClassCategorylabel === "Agriculture & Forestry Vehicle" &&
              itemReferences.policyDetails.Class !== "Third Party Commercial" && (
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="Discount on TON Discount"
                    value={
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .TonDiscountPremium
                    }
                    disabled
                  />
                </Grid>
              )}
            {itemReferences.policyDetails.Class !== "Third Party Commercial" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Old Vehicle Loading"
                  value={
                    itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                      .PremiumafterAgeofVehicleLoading
                  }
                  disabled
                />
              </Grid>
            )}
            {itemReferences.policyDetails.Class !== "Third Party Commercial" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Voluntary Excess"
                  value={
                    itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                      .ExcessDiscount
                  }
                  disabled
                />
              </Grid>
            )}
            {itemReferences.policyDetails.Class !== "Third Party Commercial" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="No Claim Discount"
                  value={
                    itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                      .NoClaimDiscountBase
                  }
                  disabled
                />
              </Grid>
            )}
            {itemReferences.policyDetails.ClassCategorylabel !== "Tempo/E-Rickshaw" &&
              itemReferences.policyDetails.Class !== "Third Party Commercial" && (
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="Own Goods Carrying Discount"
                    value={
                      itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                        .OwnGoodsCarryingDiscountAmt
                    }
                    disabled
                  />
                </Grid>
              )}
            {itemReferences.policyDetails.Class !== "Third Party Commercial" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Direct Discount"
                  value={
                    itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                      .DirectDiscountAmount
                  }
                  disabled
                />
              </Grid>
            )}
            {itemReferences.policyDetails.Class !== "Third Party Commercial" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Towing Charges"
                  value={
                    itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.TowingCharges
                  }
                  disabled
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Third Party Insurance"
                value={
                  // itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.TotalTPPremium
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.TPPremium
                }
                disabled
              />
            </Grid>
            {itemReferences.policyDetails.Class !== "Third Party Commercial" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="No Claim Discount(TP)"
                  value={
                    itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                      .TPPremiumafterNCD
                  }
                  disabled
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="PA Driver- Normal"
                value={itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.DriverPA}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label={
                  itemReferences.policyDetails.ClassCategorylabel === "Tempo/E-Rickshaw"
                    ? "PA  Passenger- Normal"
                    : "PA  Helper/Employee- Normal"
                }
                value={itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.HelperPA}
                disabled
              />
            </Grid>
            {itemReferences.policyDetails.Class !== "Third Party Commercial" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Riot And Strike Damage(RSD/MD)"
                  value={
                    itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.RSDMDPremium
                  }
                  disabled
                />
              </Grid>
            )}
            {itemReferences.policyDetails.Class !== "Third Party Commercial" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Sabotage/Terrorism"
                  value={
                    itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.STPremium
                  }
                  disabled
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="PA Driver- Pool"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.RSDTRDriver
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label={
                  itemReferences.policyDetails.ClassCategorylabel === "Tempo/E-Rickshaw"
                    ? "PA Passenger- Pool"
                    : "PA Helper/Employee- Pool"
                }
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.RSDTRHelper
                }
                disabled
              />
            </Grid>
            <Grid container paddingTop={2} sx={{ display: "flex", justifyContent: "center" }}>
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
                        <Typography>Stamp Duty</Typography>
                        <Typography>VAT</Typography>
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
                              .NetPremium
                          }
                        </Typography>
                        <Typography sx={{ display: "flex", justifyContent: "right" }}>
                          {
                            itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                              .StampDuty
                          }
                        </Typography>
                        <Typography sx={{ display: "flex", justifyContent: "right" }}>
                          {itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.VAT}
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
          </Grid>
        )}

        {itemReferences.policyDetails.Product === "PrivateVehicle" && (
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Basic Premium"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.BasicPremium
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Discount as per CC"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.CCDiscount
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Old Vehicle Loading"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.LoadingAmount
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Voluntary Excess"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.ExcessAmount
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="No Claim Discount"
                value={itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.NCDAmount}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Direct Discount"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    .DirectDiscountAmount
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Towing Charge Premium"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.TowingCharges
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Minimum Premium"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    .MinimumPremiumOD
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Third Party Insurance"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    .TPPremiumAsPerCC
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="No Claim Discount(TP)"
                value={itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.TPNCD}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="PA Driver Premium (Normal)"
                value={itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.DriverPA}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="PA Passenger Premium (Normal)"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.PassengerPA
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Riot And Strike Damage(RSD/MD)"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.RSDMDPremium
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Terrorism"
                value={itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.STPremium}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="PA Driver Premium (Pool)"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    .DriverRSDSTPremium
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="PA Passenger Premium (Pool)"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                    .PassengerRSDSTPremium
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Pool Premium"
                value={
                  itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails.PoolPremium
                }
                disabled
              />
            </Grid>
            <Grid container paddingTop={5} sx={{ display: "flex", justifyContent: "center" }}>
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
                        <Typography>VAT</Typography>
                        <Typography>Premium After VAT</Typography>
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
                          {
                            itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                              .NetPremium
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
                          {
                            itemReferences.policyDetails.FormatedData.CalculatedPremiumDetails
                              .StampDuty
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
          </Grid>
        )}
      </Grid>
    </div>
  );
}
export default CommercialVehicle;
