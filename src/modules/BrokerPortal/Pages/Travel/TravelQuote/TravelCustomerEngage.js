import { useNavigate } from "react-router-dom";
import { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { KeyboardBackspace } from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";

import PageLayout from "examples/LayoutContainers/PageLayout";
// import breakpoints from "assets/theme/base/breakpoints";
// Authentication pages components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import CustEngage from "assets/images/BrokerPortal/CustEngage.png";
import { GetQuote } from "../data/index";
// import { calculatePremium } from "../data/index";
import { useDataController, setQuoteProposalOutput } from "../../../context";

function TravelCustomerEngage() {
  const [controller, dispatch] = useDataController();
  const navigate = useNavigate();
  const { quoteProposalOutput } = controller;

  const [PolicyDto, setPolicyDto] = useState(quoteProposalOutput);
  console.log("data in Proposer", PolicyDto);
  const TPolicyDto = PolicyDto;
  console.log("data in TPolicyDto", TPolicyDto);

  const ProposerDetails = {
    Name: "",
    Phoneno: "",
    Email: "",
  };
  console.log("aaaa", ProposerDetails);

  // const handleSetProposer = (e) => {
  //   TPolicyDto.ProposerDetails[e.target.name] = e.target.value;
  //   if (e.target.name === "Name") {
  //     setPolicyDto((prevState) => ({
  //       ...prevState,
  //       Name: e.target.value,
  //     }));
  //   }
  //   setPolicyDto((prevState) => ({
  //     ...prevState,
  //     TPolicyDto: prevState.TPolicyDto,
  //   }));
  // };

  // const data = controller.getQuoteOutput;
  const { quickQuoteOutput } = controller;
  console.log("quickQuoteOutput", quickQuoteOutput);
  const onClick = () => {
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
    setQuoteProposalOutput(dispatch, TPolicyDto);
    console.log("policy123", TPolicyDto);
    GetQuote(dispatch, quickQuoteOutput.quoteDetails.quoteNumber);
    // calculatePremium(dispatch, PolicyDto);
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteComparision`);
  };
  return (
    <MDBox>
      <PageLayout>
        <BPNavbar />
        <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 4 }}>
          <MDBox display="flex" flexDirection="row">
            <KeyboardBackspace />
            <MDTypography variant="body1" sx={{ fontSize: 13 }}>
              Back
            </MDTypography>
          </MDBox>
          <Grid container>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
              <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                Engage your customer
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Card
                position="inline"
                sx={{ borderRadius: "0", mt: 3, border: `1px solid #3E7BAB` }}
              >
                <Grid container>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDBox component="img" src={CustEngage} width="100%" height="100%" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <Grid container spacing={3} sx={{ mt: 6, px: 2, textAlign: "center" }}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDTypography
                          variant="body1"
                          sx={{ textAlign: "center", fontSize: "1.25rem", color: "#0071D9" }}
                        >
                          {" "}
                          Please fill Customer Details{" "}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDInput
                          name="name"
                          // value={cust.name}
                          label="Name"
                          // onChange={onChange}
                        />
                        {/* <MDInput
                          label="Name"
                          name="Name"
                          value={PolicyDto.ProposerDetails.Name}
                          onChange={handleSetProposer}
                        /> */}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          name="phoneno"
                          //  value={cust.phoneno}
                          label="Phone No"
                          // onChange={onChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          name="otp"
                          // value={cust.otp}
                          label="Verify OTP"
                          // onChange={onChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                        <MDInput
                          name="email"
                          // value={cust.email}
                          label="Email ID"
                          // onChange={onChange}
                        />
                      </Grid>
                      <Grid container justifyContent="space-between">
                        <MDBox mt={2} ml={3}>
                          <MDTypography
                            sx={{
                              color: "#1976D2",
                              fontSize: "0.875rem",
                              textAlign: "end",
                              cursor: "pointer",
                            }}
                            // onClick={onSendOTP}
                          >
                            Resend OTP
                          </MDTypography>
                        </MDBox>
                        <MDBox mt={2} ml={2}>
                          <MDTypography
                            sx={{
                              color: "#1976D2",
                              fontSize: "0.875rem",
                              textAlign: "end",
                              cursor: "pointer",
                            }}
                            // onClick={onSendOTP}
                          >
                            Send OTP
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} textAlign="right">
                        <MDButton sx={{ mt: "2rem" }} onClick={onClick}>
                          View QUOTES
                        </MDButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </PageLayout>
    </MDBox>
  );
}

export default TravelCustomerEngage;
