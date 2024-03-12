import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import PageLayout from "examples/LayoutContainers/PageLayout";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import { Grid, Link, Modal } from "@mui/material";
import { Share } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import MDAvatar from "components/MDAvatar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "components/MDInput";
import { useNavigate } from "react-router-dom";
import { getRequest } from "core/clients/axiosclient";
// import CareLogo from "assets/images/BrokerPortal/CareLogo.png";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
import { images, useDataController } from "../../../context/index";
// import { GetQuote } from "../HealthQuote/data/index";

function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/modules/BrokerPortal/Pages/Health/HealthProposal`);
  };
  return (
    <div>
      <MDButton sx={{ width: "auto", fontSize: "0.7rem" }} onClick={handleOpen}>
        Proceed to Proposal
      </MDButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox pt={18} pl={40}>
          <MDTypography id="modal-modal-description" sx={{ mt: 3 }}>
            <MDBox
              // p={6}
              sx={{
                background: "#FFFFFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "15px",
                height: "300px",
                width: "650px",
              }}
            >
              <Grid ml={5} mr={5} textAlign="center">
                <MDTypography font-family="Roboto" fontSize="20px" mb={1}>
                  <strong> Do you wish to port your existing policy?</strong>
                </MDTypography>
                <MDTypography fontSize="17px" mb={2}>
                  We Help you to upgrade your existing health insurance with better coverage at a
                  similar premium
                </MDTypography>
                <MDBox mb={3}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    sx={{ justifyContent: "center", ml: 2.5 }}
                    // onChange={(event) => handleChange(event)}
                    // value={value}
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />

                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </MDBox>
                <MDButton onClick={onClick}>Proceed</MDButton>
              </Grid>
            </MDBox>
          </MDTypography>
        </MDBox>
      </Modal>
    </div>
  );
}

function PlanSelected() {
  const [controller] = useDataController();
  // const data1 = controller.getQuoteOutput;

  const { quoteProposalOutput } = controller;
  const { partnerDetails } = controller;
  const { premiumResult } = partnerDetails;
  console.log("partnerDetails", partnerDetails);
  console.log("quoteProposalOutput", quoteProposalOutput);

  const { InsurableItem } = quoteProposalOutput;

  const { RiskItems } = InsurableItem[0];
  const Riskdetails = RiskItems;
  console.log("riskDetails", Riskdetails);

  const [data, setData] = useState();
  console.log("data1234", data);

  useEffect(async () => {
    const productPartnerDetails = await getRequest(
      `Partner/GetPartnerNameById?PartnerId=${quoteProposalOutput.PartnerId}`
    );
    // console.log("partnerDetails", productPartnerDetails);
    const partnerDetailsData = productPartnerDetails.data;
    // console.log("partnerDetailsData", partnerDetailsData);
    setData(partnerDetailsData);
  });

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  return (
    <PageLayout>
      <BPNavbar />
      <MDBox m={4}>
        <MDTypography fontSize="18px">Back to quotes</MDTypography>
        <Grid container direction="row">
          <Grid item md={7} lg={7} xl={7} xxl={7}>
            <Grid container spacing={3}>
              <MDBox px={2}>
                <Card
                  position="inline"
                  sx={{
                    borderRadius: "0",
                    mt: 3,
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Grid m={2}>
                    <MDBox>
                      <MDTypography color="primary">Plan Selected</MDTypography>
                    </MDBox>
                    <Grid container direction="row" mt={2} mb={2}>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        {/* {data &&
                          data.quotationDetails &&
                          data.quotationDetails.map((quote) => ( */}
                        <MDAvatar
                          src={images[data]}
                          size="xl"
                          variant="square"
                          sx={{ mx: "0rem" }}
                        />
                        {/* ))} */}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography fontSize="17px">
                          <strong>
                            {/* Care Health Insurance (formerly Religare) */}
                            {partnerDetails.partnerName}
                          </strong>
                        </MDTypography>
                        <MDTypography fontSize="17px">
                          Plan name: <strong>{partnerDetails.partnerName}</strong>
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDBox
                          sx={{
                            height: "auto",

                            display: "flex",
                            justifyContent: "end",
                            alignItems: "end",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <Link
                            href="https://mui.com/material-ui/react-link/#main-content"
                            color="primary"
                          >
                            View all Features &nbsp;
                          </Link>
                        </MDBox>
                        <MDBox
                          sx={{
                            height: "auto",

                            display: "flex",
                            justifyContent: "end",
                            alignItems: "end",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                        >
                          <Link
                            href="https://mui.com/material-ui/react-link/#main-content"
                            color="primary"
                          >
                            View Network Hospitals
                          </Link>
                        </MDBox>
                      </Grid>
                    </Grid>
                    <MDTypography color="primary" sx={{ mb: "10px" }}>
                      Member Covered
                    </MDTypography>

                    <MDBox
                      font-family="Roboto"
                      sx={{
                        height: "auto",
                        display: "flex",
                        mt: "6px",
                      }}
                    >
                      {" "}
                      {Riskdetails.map((row) => (
                        <MDTypography fontSize="17px">
                          {/* Self, Spouse, Son & 2 Daughters */}
                          {row.RelationshipWithApplicant}
                        </MDTypography>
                      ))}
                      <Link
                        href="http://localhost:3000/modules/BrokerPortal/Pages/Health/HealthQuote"
                        color="primary"
                        fontSize={15}
                        ml={45}
                      >
                        Edit Members
                      </Link>
                    </MDBox>

                    <Grid container direction="row" Spacing={4} mt={3} mb={3}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography color="primary">Cover Amount</MDTypography>
                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4} xxl={4} mt={2}>
                          <Autocomplete
                            // sx={{
                            //   "& .MuiOutlinedInput-root": {
                            //     padding: "4px!important",
                            //   },
                            // }}
                            style={{
                              width: 300,
                              padding: "4px!important",
                            }}
                            renderInput={(params) => (
                              <MDInput
                                label={formatter.format(quoteProposalOutput.SumInsured)}
                                {...params}
                              />
                            )}
                            disabled
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography color="primary">Policy Period</MDTypography>
                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4} xxl={4} mt={2}>
                          <Autocomplete
                            style={{
                              width: 300,
                              padding: "4px!important",
                            }}
                            renderInput={(params) => (
                              <MDInput
                                label={`${quoteProposalOutput.PolicyTenure} Year`}
                                {...params}
                              />
                            )}
                            disabled
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <MDTypography color="primary" sx={{ mb: "15px" }}>
                      Riders Available
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    >
                      Hospital Cash
                    </MDTypography>
                    <Grid container mt={1}>
                      <MDTypography
                        sx={{
                          fontWeight: "400",
                          fontSize: "12px",
                          color: "rgba(0, 0, 0, 0.87)",
                          width: "443px",
                        }}
                      >
                        The add-on pays hospital cash for up to 30 days of hospitalisation if
                        hospitalised for more than 48 hours
                      </MDTypography>
                      <Grid pl={15}>
                        <MDBox
                          align="right"
                          sx={{
                            borderRadius: "3px",
                            width: "130px",
                            background: "rgba(217, 217, 217, 0.3)",
                            border: "1px solid rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <Grid container>
                            <Checkbox />
                            <MDTypography
                              sx={{
                                color: "#000000",
                              }}
                            >
                              ₹ 1,107
                            </MDTypography>
                          </Grid>
                        </MDBox>
                      </Grid>
                    </Grid>

                    <br />
                    <Grid>
                      <MDTypography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "24px",
                          color: "rgba(0, 0, 0, 0.87)",
                        }}
                      >
                        Safeguard Benefit
                      </MDTypography>
                      <Grid container mt={1}>
                        <MDTypography
                          sx={{
                            width: "481px",
                            fontSize: "12px",
                            fontWeight: "400",
                            lineHeight: "17px",
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          Get additional benefit likes annual increase in coverage, coverage for
                          non-payable items and impact on booster benefit
                        </MDTypography>
                        <Grid pl={10}>
                          <MDBox
                            align="right"
                            sx={{
                              borderRadius: "3px",
                              width: "130px",
                              background: "rgba(217, 217, 217, 0.3)",
                              border: "1px solid rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            <Grid container>
                              <Checkbox />
                              <MDTypography
                                sx={{
                                  color: "#000000",
                                }}
                              >
                                ₹ 674
                              </MDTypography>
                            </Grid>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid>
                      <MDTypography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "24px",
                          color: "rgba(0, 0, 0, 0.87)",
                        }}
                      >
                        Instant Cover
                      </MDTypography>
                      <Grid container mt={1}>
                        <MDTypography
                          sx={{
                            width: "470px",
                            fontSize: "12px",
                            fontWeight: "400",
                            lineHeight: "17.16px",
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          Claim can be made for hospitalization related to Diabetes, Hypertension,
                          Hyperlipidemia & Asthama after initial wait period of 30 days
                        </MDTypography>
                        <Grid pl={11}>
                          <MDBox
                            align="right"
                            sx={{
                              borderRadius: "3px",
                              width: "130px",
                              background: "rgba(217, 217, 217, 0.3)",
                              border: "1px solid rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            <Grid container>
                              <Checkbox />
                              <MDTypography
                                sx={{
                                  color: "#000000",
                                }}
                              >
                                ₹ 2,995
                              </MDTypography>
                            </Grid>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
          </Grid>

          <Grid item md={5} lg={5} xl={5} xxl={5}>
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
                    {" "}
                    {/* 53436251711 */}
                    {quoteProposalOutput.BaseQuotationNo}
                    {/* {data1.quoteNumber} */}
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
                    {" "}
                    {quoteProposalOutput.PolicyTenure} Year
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Base Plan Premium{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {formatter.format(premiumResult.PremiumDetail.BasicPremium)}
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
                    {/* {" "} */}
                    {/* + ₹ 2,187{" "} */}
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
                    {" "}
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
                  <BasicModal />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}
export default PlanSelected;
