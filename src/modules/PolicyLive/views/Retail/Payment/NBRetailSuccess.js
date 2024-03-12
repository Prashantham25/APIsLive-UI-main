import { React, useEffect, useState } from "react";
import { Grid, Card, Icon } from "@mui/material";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import MDBox from "components/MDBox";
import { useLocation } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { GetPolicyDetailsByNumber } from "../data/APIs/NBTravelApi";

// import { useDataController, setGenericPolicyDto } from "../../../../BrokerPortal/context";

function NBRetailSuccess() {
  const [policyNoValue, setPolicyNoValue] = useState("");
  const { search } = useLocation();

  useEffect(async () => {
    //  if( new URLSearchParams(search).get("Policyno")!== " " ||  )
    const Policyno = new URLSearchParams(search).get("policyno");
    const res = await GetPolicyDetailsByNumber(Policyno);
    console.log("res", res);
    setPolicyNoValue(res.data);
    console.log("checkresponse", policyNoValue);
    console.log("ajayaarr", policyNoValue.PaymentDetails.ModeOfPayment);
  }, []);

  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", m: 1, background: "#FFFFFF" }}
      fullwidth
    >
      <Card
        position="absolute"
        sx={{ borderRadius: "0.3rem", m: 2, background: "#EEEEEE" }}
        fullwidth
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                <MDBox
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  sx={{
                    m: "2rem",
                    display: "flex",
                    backgroundImage: `url(${PaySuccess})`,
                    backgroundSize: "cover",
                    flexDirection: "column",
                    backgroundPosition: "center",
                    textAlign: "center",
                    alignItems: "center",
                    minHeight: "20rem",
                  }}
                >
                  <MDButton
                    size="large"
                    variant="outlined"
                    color="white"
                    iconOnly
                    circular
                    sx={{ mt: "1.5rem", background: "#00CA72" }}
                  >
                    <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                  </MDButton>
                  <MDTypography
                    variant="h6"
                    sx={{
                      mt: "2rem",
                      fontSize: "1.25rem",
                      textAlign: "center",
                      widht: "100%",
                      color: "#00CA72",
                    }}
                  >
                    {" "}
                    Payment Details <p>Saved Successfully</p>
                  </MDTypography>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography sx={{ fontSize: "0.8rem", ml: "0rem" }}>
                      Transaction Number :
                      {/* {dto &&
                      dto.policyPaymentSaveDetails &&
                      dto.policyPaymentSaveDetails.transactionNo
                        ? dto.policyPaymentSaveDetails.transactionNo
                        : ""} */}
                    </MDTypography>
                  </Grid>

                  <MDTypography
                    variant="h6"
                    sx={{
                      my: "2rem",
                      fontSize: "1rem",
                      textAlign: "center",
                      widht: "100%",
                    }}
                  >
                    {" "}
                  </MDTypography>
                  <Grid container spacing={2} ml={5} mt={2} pb={10}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      xxl={6}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                        Amount Paid :₹
                        {policyNoValue.TotalPremium}
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                        Payment Mode:
                        {/* {policyNoValue.ModeOfPayment} */}
                        {/* {dto &&
                        dto.policyPaymentSaveDetails &&
                        dto.policyPaymentSaveDetails.paymentSource
                          ? dto.policyPaymentSaveDetails.paymentSource
                          : ""} */}
                      </MDTypography>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                  <MDTypography sx={{ fontSize: "1rem" }}>
                                    {formatter.format(Number(paydetails.paidAmount).toFixed(0))}
                                  </MDTypography>
                                  <MDTypography sx={{ fontSize: "1rem" }}>
                                    {paydetails.paymentMode}
                                  </MDTypography>
                                </Grid> */}
                    {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDTypography sx={{ fontSize: "1rem" }}>Online</MDTypography>
                              </Grid> */}
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Grid container spacing={4} sx={{ mt: "2rem" }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" sx={{ fontSize: "1.8rem", color: "#000000" }}>
                  Here is your policy details
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  {/* COI No : {dto && dto.id ? dto.id : ""} */}
                </MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                              <b>{paydetails.policyNo}</b>
                            </MDTypography>
                          </Grid> */}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  Policy Number :{/* {policyNoValue.PolicyNumber} */}
                  {policyNoValue.PolicyNumber}
                  {/* {dto2 && dto2.ProposerDetails && dto2.ProposerDetails.Name
                    ? dto2.ProposerDetails.Name
                    : ""} */}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  Proposer Name :{/* {policyNoValue.ProposerName} */}
                  {policyNoValue.ProposerName}
                  {/* {dto2 && dto2.ProposerDetails && dto2.ProposerDetails.Name
                    ? dto2.ProposerDetails.Name
                    : ""} */}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  No of Insured Members : {policyNoValue["Total Count"]}
                </MDTypography>
              </Grid>
              {/* <Grid item md={3}>
                <MDButton
                  variant="outlined"
                  display="flex"
                  color="error"
                  sx={{ color: "#E41D25" }}
                  // onClick={ }
                >
                  Email Policy
                </MDButton>
              </Grid> */}
              {/* <Grid item md={3}>
                <MDButton display="flex" color="success">
                  Download Policy
                </MDButton>
              </Grid> */}
              {/* <Grid item md={3}>
                <MDButton variant="outlined" display="flex" sx={{ color: "#E41D25" }}>
                  Go To Home
                </MDButton>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Card>
      {/* )} */}
    </Card>
  );
}

export default NBRetailSuccess;
