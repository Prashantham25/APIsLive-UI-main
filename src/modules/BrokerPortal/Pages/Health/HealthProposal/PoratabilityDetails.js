import { React, useState, useEffect } from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { Grid, Checkbox, FormGroup } from "@mui/material";
import { Share } from "@mui/icons-material";
import MDAvatar from "components/MDAvatar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "components/MDInput";
import { getRequest } from "core/clients/axiosclient";

// import CareLogo from "assets/images/BrokerPortal/CareLogo.png";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
import {
  useDataController,
  images,
  // setHealthInsuranceDetails,
  // setQuoteProposalOutput,
} from "../../../context";

function PoratabilityDetails() {
  const [controller] = useDataController();
  const { quoteProposalOutput } = controller;
  console.log("quoteProposalOutput", quoteProposalOutput);
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
                      Portability Details
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
                      In case of any mishappening to the proposer, nominee is the person who gets
                      the benefits
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
                      When does your current policy expire?
                    </MDTypography>
                    <Grid container spacing={4.5} mb={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="Policy expiry date " />
                      </Grid>
                    </Grid>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
                      Why do you want to port from your existing policy?
                    </MDTypography>
                    <Grid container spacing={4.5} mb={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <Autocomplete
                          renderInput={(params) => (
                            <MDInput label="Reason for Portability" {...params} />
                          )}
                        />
                      </Grid>
                    </Grid>

                    <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                      <MDTypography
                        sx={{ fontSize: "0.9rem", color: "#344054", weight: 600, pt: 0.7, mb: 2 }}
                      >
                        Do you want the cumulative bonus to be converted to an enhanced sum Insured?
                      </MDTypography>

                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{ justifyContent: "center", ml: 2.5 }}
                        defaultValue="No"
                        // value={data.ProposerDetails.PermanentAddressSameAsCommunication}
                        // onChange={handlePermanentAddSameComm}
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </MDBox>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
                      Existing insurer Details
                    </MDTypography>

                    <Grid container spacing={4.5} mb={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <Autocomplete
                          renderInput={(params) => <MDInput label="Insurer" {...params} />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <Autocomplete
                          renderInput={(params) => <MDInput label="PAN" {...params} />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="Policy Number" />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <Autocomplete
                          renderInput={(params) => <MDInput label="Policy Tenure" {...params} />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="Add on/Rider Taken" />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDTypography
                          variant="body1"
                          color="primary"
                          sx={{ fontSize: "0.8rem", mb: 2 }}
                        >
                          Leave blank if you didn’t have any add-on/rider
                        </MDTypography>
                      </Grid>
                    </Grid>

                    <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                      <MDTypography
                        sx={{ fontSize: "0.9rem", color: "#344054", weight: 600, pt: 0.7, mb: 2 }}
                      >
                        Whether the PED exclusions/time bound exclusions have longer exclusion
                        period then the existing policy.If Yes Please give a written consent to the
                        declaration below:
                      </MDTypography>
                    </MDBox>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      sx={{ ml: 2.5 }}
                      defaultValue="No"
                      // value={data.ProposerDetails.PermanentAddressSameAsCommunication}
                      // onChange={handlePermanentAddSameComm}
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>

                    <MDTypography
                      variant="h6"
                      color="primary"
                      sx={{ fontSize: "1.5rem", mb: 2, mt: 2 }}
                    >
                      Which members are covered in the existing policy?
                    </MDTypography>
                    <Grid container spacing={4.5}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox />} label="Self (Madhu nandu)" />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Spouse (Madhuri kumari)"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox />} label="Son (Kumaran Sai)" />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox />} label="Daughter (Makena sri)" />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Daughter 01 (Makena sri)"
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <MDTypography
                      variant="h6"
                      color="primary"
                      sx={{ fontSize: "1rem", mb: 2, mt: 2 }}
                    >
                      Madhu nandu
                    </MDTypography>
                    <MDTypography
                      sx={{ fontSize: "0.9rem", color: "#344054", weight: 600, pt: 0.7, mb: 2 }}
                    >
                      For how many years the member have been renewing their health insurance
                      without any break?
                    </MDTypography>
                    <Grid container spacing={4.5}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="Select No. of Years" />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="Date of Enrollment" />
                      </Grid>
                    </Grid>

                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#344054",
                        weight: 600,
                        pt: 0.7,
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      Year 1 (2021 - 2022)
                    </MDTypography>
                    <Grid xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput label="Sum Insured" />
                    </Grid>
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#344054",
                        weight: 600,
                        pt: 0.7,
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      Year 2 (2020 - 2021)
                    </MDTypography>
                    <Grid xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput label="Sum Insured" />
                    </Grid>
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#344054",
                        weight: 600,
                        pt: 0.7,
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      No Claim Bonus Earned
                    </MDTypography>
                    <Grid xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput label="No claim Bonus Amount" />
                    </Grid>
                    <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                      <MDTypography
                        sx={{ fontSize: "0.9rem", color: "#344054", weight: 600, pt: 0.7, mb: 2 }}
                      >
                        Have you made any claim(s) in the previous policies?
                      </MDTypography>

                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{ justifyContent: "center", ml: 2.5 }}
                        defaultValue="No"
                        // value={data.ProposerDetails.PermanentAddressSameAsCommunication}
                        // onChange={handlePermanentAddSameComm}
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </MDBox>

                    <MDTypography
                      variant="h6"
                      color="primary"
                      sx={{ fontSize: "1rem", mb: 2, mt: 2 }}
                    >
                      Madhuri kumari
                    </MDTypography>
                    <MDTypography
                      sx={{ fontSize: "0.9rem", color: "#344054", weight: 600, pt: 0.7, mb: 2 }}
                    >
                      For how many years the member have been renewing their health insurance
                      without any break?
                    </MDTypography>
                    <Grid container spacing={4.5}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="Select No. of Years" />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="Date of Enrollment" />
                      </Grid>
                    </Grid>

                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#344054",
                        weight: 600,
                        pt: 0.7,
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      No Claim Bonus Earned
                    </MDTypography>
                    <Grid xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput label="No claim Bonus Amount" />
                    </Grid>
                    <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                      <MDTypography
                        sx={{ fontSize: "0.9rem", color: "#344054", weight: 600, pt: 0.7, mb: 2 }}
                      >
                        Have you made any claim(s) in the previous policies?
                      </MDTypography>

                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{ justifyContent: "center", ml: 2.5 }}
                        defaultValue="No"
                        // value={data.ProposerDetails.PermanentAddressSameAsCommunication}
                        // onChange={handlePermanentAddSameComm}
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </MDBox>

                    <MDTypography
                      variant="h6"
                      color="primary"
                      sx={{ fontSize: "1rem", mb: 2, mt: 2 }}
                    >
                      Kumaran Sai
                    </MDTypography>
                    <MDTypography
                      sx={{ fontSize: "0.9rem", color: "#344054", weight: 600, pt: 0.7, mb: 2 }}
                    >
                      For how many years the member have been renewing their health insurance
                      without any break?
                    </MDTypography>
                    <Grid container spacing={4.5}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="Select No. of Years" />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="Date of Enrollment" />
                      </Grid>
                    </Grid>

                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#344054",
                        weight: 600,
                        pt: 0.7,
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      No Claim Bonus Earned
                    </MDTypography>
                    <Grid xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput label="No claim Bonus Amount" />
                    </Grid>
                    <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                      <MDTypography
                        sx={{ fontSize: "0.9rem", color: "#344054", weight: 600, pt: 0.7, mb: 2 }}
                      >
                        Have you made any claim(s) in the previous policies?
                      </MDTypography>

                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{ justifyContent: "center", ml: 2.5 }}
                        defaultValue="No"
                        // value={data.ProposerDetails.PermanentAddressSameAsCommunication}
                        // onChange={handlePermanentAddSameComm}
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </MDBox>

                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox alignItems="center" />}
                        label="I propose to port my health insurance policy with Care Health Insurance Limited (formerly known as 
Religare Health Insurance Company Limited) from, I hereby declare that Care Health Insurance Limited (formerly known as Religare Health Insurance Company Limited) would not be held liable for lapse of coverage with my previous insurer and agree with the final decision of CHIL with respect to my proposal processed with 21-days from the login date. In case my application is declined by the company, I agree to be the medical expenses(if
any) required to underwrite my application"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox alignItems="center" />}
                        label="I/We hereby state and confirm that I/we continue to enjoy good health since the expiry of our policy till today.
                        I/We further state and confirm that neither has any member covered under the policy undergone any consultation, investigation and treatment for any disease/illness/ injury or accidental/medical condition other
                        than common cold or fever nor any claims has been logged during this period.
                        Also, I understand application acceptance doesn't form the basis of policy issuance. Policy issuance is
                        subjected to risk assessment by the underwriting team. Insurance Company reserves the right to evaluate and
                        assess the risk to finally accept or reject the proposal."
                      />
                    </FormGroup>
                  </MDBox>
                </Grid>
              </MDBox>
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
                    {quoteProposalOutput.PolicyTenure}Year
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
                    Proceed to Proposal
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
export default PoratabilityDetails;
