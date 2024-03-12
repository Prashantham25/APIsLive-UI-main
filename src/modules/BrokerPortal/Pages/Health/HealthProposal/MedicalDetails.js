import { React, useState, useEffect } from "react";

// import Card from "@mui/material/Card";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { Grid, Checkbox, FormGroup } from "@mui/material";
import { Share } from "@mui/icons-material";

import MDAvatar from "components/MDAvatar";

import FormControlLabel from "@mui/material/FormControlLabel";

// import CareLogo from "assets/images/BrokerPortal/CareLogo.png";
import { getRequest } from "core/clients/axiosclient";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
import {
  useDataController,
  images,
  // setHealthInsuranceDetails,
  // setQuoteProposalOutput,
} from "../../../context";

function MedicalDetails({ handleBack, handleNext }) {
  const [controller] = useDataController();
  const { quoteProposalOutput } = controller;

  const [data1, setData1] = useState();
  useEffect(async () => {
    const partnerDetails = await getRequest(
      `Partner/GetPartnerNameById?PartnerId=${quoteProposalOutput.PartnerId}`
    );
    // console.log("partnerDetails", partnerDetails);
    const partnerDetailsData = partnerDetails.data;
    // console.log("partnerDetailsData", partnerDetailsData);
    setData1(partnerDetailsData);
  });

  const { partnerDetails } = controller;
  const { premiumResult } = partnerDetails;
  console.log("partnerDetails", partnerDetails);
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const onHandleNext = () => {
    // setQuoteProposalOutput(dispatch, data);
    handleNext();
  };

  const onHandleBack = () => {
    handleBack();
  };
  return (
    <PageLayout>
      <MDBox m={4}>
        <Grid container direction="row">
          <Grid item md={7} lg={7} xl={7} xxl={7}>
            <Grid container spacing={3}>
              <MDBox px={2}>
                <Grid m={2}>
                  <MDBox>
                    <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                      Medical Details
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
                      Help us know medical Conditions if any
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
                      Q. Have any of the person proposed to be insured ever suffered from/ are
                      currently suffering from any of the following
                    </MDTypography>

                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="None of the family members" />
                      <FormControlLabel control={<Checkbox />} label=" Diabetes" />
                      <FormControlLabel control={<Checkbox />} label=" Thyroid Disorder" />
                      <FormControlLabel
                        control={<Checkbox />}
                        label=" Any nervous disorder,fits,Mental Condition"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label=" Any heart & Circulatory disorders"
                      />
                      <FormControlLabel control={<Checkbox />} label=" Any respiratory disorder" />
                      <FormControlLabel
                        control={<Checkbox />}
                        label=" Disorders of the stomach including intestine, Kidney, Prostate"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label=" Disorder of Spine and Joints"
                      />
                      <FormControlLabel control={<Checkbox />} label=" Tumour or Cancer" />
                      <FormControlLabel
                        control={<Checkbox />}
                        label=" Any ongoing disease or alignment requiring surgical or medical treatment"
                      />
                    </FormGroup>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2, mt: 2 }}>
                      Q. Have you or any other member proposed to be insured under this policy
                      sought medical advice or undergone any treatment medical or surgical in past 5
                      years due to any of the diseases/ conditions listed above or otherwise or
                      attended follow up for any disease/condition/ ailment/injury/addiction (except
                      for infrequent common illness for example fever, common cold, loose motions,
                      cough and cold, headaches, acidity ?
                    </MDTypography>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label=" None of the family members"
                      />
                      <FormControlLabel control={<Checkbox />} label="  Self (Madhu nandu) " />
                      <FormControlLabel control={<Checkbox />} label=" Spouse (Madhuri kumari)" />
                      <FormControlLabel control={<Checkbox />} label=" Son (Makena sri) " />
                      <FormControlLabel control={<Checkbox />} label=" Daughter 01 (Makena sri)" />

                      <FormControlLabel control={<Checkbox />} label="Daughter 02 (Makena sri)" />
                    </FormGroup>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2, mt: 2 }}>
                      Q. Is any of the insured member pregnant ?
                    </MDTypography>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label=" None of the family members"
                      />
                      <FormControlLabel control={<Checkbox />} label="  Self (Madhu nandu) " />
                      <FormControlLabel control={<Checkbox />} label=" Spouse (Madhuri kumari)" />
                      <FormControlLabel control={<Checkbox />} label=" Son (Makena sri) " />
                      <FormControlLabel control={<Checkbox />} label=" Daughter 01 (Makena sri)" />

                      <FormControlLabel control={<Checkbox />} label="Daughter 02 (Makena sri)" />
                    </FormGroup>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2, mt: 2 }}>
                      Q. Does any insured member consume tobacco?
                    </MDTypography>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label=" None of the family members"
                      />
                      <FormControlLabel control={<Checkbox />} label="  Self (Madhu nandu) " />
                      <FormControlLabel control={<Checkbox />} label=" Spouse (Madhuri kumari)" />
                      <FormControlLabel control={<Checkbox />} label=" Son (Makena sri) " />
                      <FormControlLabel control={<Checkbox />} label=" Daughter 01 (Makena sri)" />

                      <FormControlLabel control={<Checkbox />} label="Daughter 02 (Makena sri)" />
                    </FormGroup>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2, mt: 2 }}>
                      Q. Does insured person consume alcohol?
                    </MDTypography>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label=" None of the family members"
                      />
                      <FormControlLabel control={<Checkbox />} label="  Self (Madhu nandu) " />
                      <FormControlLabel control={<Checkbox />} label=" Spouse (Madhuri kumari)" />
                      <FormControlLabel control={<Checkbox />} label=" Son (Makena sri) " />
                      <FormControlLabel control={<Checkbox />} label=" Daughter 01 (Makena sri)" />

                      <FormControlLabel control={<Checkbox />} label="Daughter 02 (Makena sri)" />
                    </FormGroup>
                  </MDBox>
                </Grid>
              </MDBox>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDButton sx={{ mr: "3rem" }} onClick={onHandleBack}>
                  Back
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDButton sx={{ mr: "3rem" }} onClick={onHandleNext}>
                  Proceed To Nominee
                </MDButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
            <MDBox fullwidth sx={{ background: "#CEEBFF", px: "2rem", pb: "2rem" }}>
              <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
                Summary
              </MDTypography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Quote No{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {quoteProposalOutput.BaseQuotationNo}
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Insurer
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDAvatar src={images[data1]} size="xl" variant="square" sx={{ mx: "9rem" }} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Plan Name
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {/* Care Classic */}
                    {partnerDetails.partnerName}
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Cover Amount{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {formatter.format(quoteProposalOutput.SumInsured)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Policy Period{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {quoteProposalOutput.PolicyTenure} Year
                  </MDTypography>
                </Grid>
                {/* <Grid item xs={12} sm={12} mt={2}>
                  <MDTypography variant="h6" sx={{ fontSize: "20px" }}>
                    Selected Riders
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Hospital Cash{" "}
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    ₹ 1,107{" "}
                  </MDTypography>
                </Grid> */}

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    GST@18%{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {formatter.format(premiumResult.PremiumDetail.TaxAmount)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Total Premium
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} marginBottom={4} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    mt={0}
                    sx={{ fontSize: "2rem", color: "#0071D9" }}
                  >
                    {formatter.format(premiumResult.PremiumDetail.TotalPremium)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDButton
                    size="medium"
                    startIcon={<Share />}
                    sx={{
                      color: "#1976D2",
                      textSize: "0.87rem",
                      borderRadius: "0.25rem",
                      borderColor: "#1976D2",
                      border: 1,
                      background: "transparent",
                    }}
                  >
                    Share Quote
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
                  justifyContent="end"
                  display="flex"
                >
                  <MDButton sx={{ width: "auto", fontSize: "0.7rem" }}>
                    {/* Proceed to Proposal */}
                    Save Quote
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}
export default MedicalDetails;
