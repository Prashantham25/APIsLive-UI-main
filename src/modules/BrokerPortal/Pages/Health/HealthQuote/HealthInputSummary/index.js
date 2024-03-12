// import { useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import { KeyboardBackspace } from "@mui/icons-material";
import { useDataController } from "../../../../context/index";
import { GenerateQuickQuote } from "../data";
import Health from "../../../../../../assets/images/BrokerPortal/Health/Health.png";

function HealthInputSummary() {
  const navigate = useNavigate();
  const [controller, dispatch] = useDataController();
  const { HealthInsuranceDetails } = controller;

  console.log("health1", HealthInsuranceDetails);

  // const data1 = HealthInsuranceDetails.newArray;
  // const data2 = HealthInsuranceDetails.Diseases;
  // console.log("data2", data2);

  const { InsurableItem } = HealthInsuranceDetails;

  const { RiskItems } = InsurableItem[0];

  const Riskdetails = RiskItems;
  console.log("riskDetails", Riskdetails);

  const { Address } = RiskItems[0];
  const address = Address;
  console.log("address", address);

  const handleBasicEdit = () => {
    navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote`);
  };
  const handleClick = () => {
    navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote`);
  };

  const handleProceed = () => {
    console.log("health", HealthInsuranceDetails);
    GenerateQuickQuote(dispatch, HealthInsuranceDetails);
    navigate(`/modules/BrokerPortal/Pages/Health/HealthCustomerEngage`);
  };
  return (
    <MDBox>
      <BPNavbar />
      <Grid container spacing={3} sx={{ px: "2rem", pt: "0.5rem" }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox display="flex" flexDirection="row">
            <KeyboardBackspace />
            <MDTypography variant="body1" sx={{ fontSize: 13 }}>
              Back
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
          <MDBox component="img" src={Health} sx={{ width: "100%" }} />
          <MDBox sx={{ fontsize: "32px", fontweight: 600, color: "#000000", rm: 2 }}>
            <MDTypography variant="h4" sx={{ fontSize: "1.9rem", color: "#000000" }}>
              Live More Relaxed with
              <br />
              Health Insurance
            </MDTypography>
            <MDTypography>
              Having health insurance is a smart choice,
              <br />
              where you can have many benefits form it
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <Card sx={{ borderRadius: 0, background: "rgba(144, 202, 249, 0.2)", px: "2rem" }}>
            <MDBox>
              <MDTypography variant="h6" sx={{ mt: "3rem", fontSize: "1.5rem" }}>
                Please check the details and proceed for plans
              </MDTypography>
              <MDBox flexDirection="row" display="flex" sx={{ mt: "3rem", alignItems: "center" }}>
                <MDTypography variant="h6" sx={{ color: "#CA0000", fontSize: "1.25rem" }}>
                  Basic Details
                </MDTypography>
                <Icon sx={{ cursor: "pointer" }} onClick={handleBasicEdit}>
                  edit
                </Icon>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="row" sx={{ mt: "2rem" }}>
              <Grid container spacing={2}>
                {Riskdetails.map((row) => (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDBox display="flex" flexDirection="column">
                      <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                        {row.RelationshipWithApplicant} ({row.Age}years)
                      </MDTypography>
                    </MDBox>
                  </Grid>
                ))}
              </Grid>
            </MDBox>
            <MDBox>
              <MDBox flexDirection="row" display="flex" sx={{ mt: "3rem", alignItems: "center" }}>
                <MDTypography variant="h6" sx={{ color: "#CA0000", fontSize: "1.25rem" }}>
                  Location Details(Pincode)
                </MDTypography>
                <Icon sx={{ cursor: "pointer" }}>edit</Icon>
              </MDBox>
            </MDBox>
            {Riskdetails.map((row1) => (
              <MDBox>
                {row1.Address.map((a) => (
                  <MDBox display="flex" flexDirection="row" sx={{ mt: "2rem" }}>
                    <Grid container spacing={2}>
                      {row1.RelationshipWithApplicant === "Self" ? (
                        <>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDBox display="flex" flexDirection="row">
                              <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                                Where do you live?
                              </MDTypography>
                            </MDBox>
                          </Grid>

                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDBox display="flex" flexDirection="row">
                              <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                                {a.Pincode}
                              </MDTypography>
                            </MDBox>
                          </Grid>
                        </>
                      ) : null}
                      {row1.RelationshipWithApplicant === "Father" ||
                      row1.RelationshipWithApplicant === "Mother" ? (
                        <>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDBox display="flex" flexDirection="row">
                              <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                                Where do your parents live?
                              </MDTypography>
                            </MDBox>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDBox display="flex" flexDirection="row">
                              <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                                {/* {HealthInsuranceDetails.Pincode.ParentsPincode} */}
                                {a.Pincode}
                              </MDTypography>
                            </MDBox>
                          </Grid>
                        </>
                      ) : null}
                      {row1.RelationshipWithApplicant === "FatherInLaw" ||
                      row1.RelationshipWithApplicant === "MotherInLaw" ? (
                        <>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDBox display="flex" flexDirection="row">
                              <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                                Where do your parent-in-law`s live?
                              </MDTypography>
                            </MDBox>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDBox display="flex" flexDirection="row">
                              <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                                {/* {HealthInsuranceDetails.Pincode.ParentsPincode} */}
                                {a.Pincode}
                              </MDTypography>
                            </MDBox>
                          </Grid>
                        </>
                      ) : null}
                    </Grid>
                  </MDBox>
                ))}
              </MDBox>
            ))}
            <MDBox display="flex" flexDirection="row" sx={{ mt: "2rem" }}>
              <Grid container spacing={2}>
                <MDBox flexDirection="column" display="flex">
                  <MDBox
                    flexDirection="row"
                    display="flex"
                    sx={{ mt: "3rem", alignItems: "center" }}
                  >
                    <MDTypography variant="h6" sx={{ color: "#CA0000", fontSize: "1.25rem" }}>
                      Medical Details
                    </MDTypography>
                    <Icon sx={{ cursor: "pointer" }}>edit</Icon>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                      <MDBox display="flex" flexDirection="row">
                        <MDTypography
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#344054", weight: 400, pt: 0.5 }}
                        >
                          Does any member have an existing illness or medical history?
                        </MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDBox display="flex" flexDirection="row">
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          sx={{ justifyContent: "center", ml: 2.5 }}
                        >
                          <FormControlLabel
                            //  checked={POSPJson.PermAddressSameAsCommAddress === "Yes"}
                            control={<Radio />}
                            label="Yes"
                            // name="PermAddressSameAsCommAddress"
                            //  onChange={handleBasicChange}
                            value="Yes"
                          />

                          <FormControlLabel
                            // checked={POSPJson.PermAddressSameAsCommAddress === "No"}
                            control={<Radio />}
                            label="No"
                            // name="PermAddressSameAsCommAddress"
                            // onChange={handleBasicChange}
                            value="No"
                          />
                        </RadioGroup>
                      </MDBox>
                    </Grid>
                  </MDBox>
                </MDBox>

                <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#344054", weight: 400 }}>
                  Selected Diseases
                </MDTypography>
                <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#344054", weight: 400 }}>
                  <Stack
                    direction="row"
                    spacing={3}
                    fontFamily="Roboto"
                    sx={{ fontSize: "0.5rem", color: "#344054", weight: 400, pt: 0.9 }}
                  >
                    {/* {data2.map((item) => (
                      <MDTypography>{item}</MDTypography>
                    ))} */}
                  </Stack>
                </MDTypography>
              </Grid>
            </MDBox>

            <Grid container justifyContent="space-between">
              <MDButton onClick={handleClick} variant="outlined" color="info" sx={{ mt: "2rem" }}>
                Back
              </MDButton>

              <MDButton
                onClick={handleProceed}
                variant="contained"
                color="info"
                sx={{ mt: "2rem" }}
              >
                Proceed
              </MDButton>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default HealthInputSummary;
