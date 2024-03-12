import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Grid, Icon, IconButton } from "@mui/material";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import { GetEndorsementJson, GetPolicy } from "../data/index";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDButton from "../../../../../../../components/MDButton";

function EndorsementSuccess() {
  const location = useLocation();
  const Navigate = useNavigate();
  const handlegotoUW = () => {
    Navigate("/Magma/NSTPDashboard");
  };
  const OnEmail = async () => {
    await GetEndorsementJson(location.state.EndoReqNo).then((resp) => {
      console.log("response of endorsement json for EMAIL pdf ", resp.data.finalResult);
    });
  };
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);
    link.click();
  };
  const handleDownloadEndorsement = async () => {
    if (
      location.state.EndorsementType === "Policy Cancellation" &&
      location.state.EndorsementCategory === "COI Policy Cancellation"
    ) {
      const Payload = {
        key: location.state.EndoReqNo,
        keyValue: "",
        templateKey: "",
        templateId: 342,
        requestData: "",
        referenceId: "",
        communicationId: 0,
      };
      const policy = await GetPolicy(Payload);
      console.log("polidownload1", policy);
      generateFile(policy.data, location.state.EndoNo);
    }

    await GetEndorsementJson(location.state.EndoReqNo).then((resp) => {
      console.log("response of endorsement json for download pdf ", resp.data.finalResult);
    });
  };
  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", m: 1, mt: "10%", background: "#FFFFFF" }}
      fullwidth
    >
      <Card
        position="absolute"
        sx={{ borderRadius: "0.3rem", m: 2, background: "#EEEEEE" }}
        fullwidth
      >
        <Grid container spacing={2} p={3}>
          {location.state.EndorsementType === "Non-Financial Endorsement" ? (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDBox
                sx={{
                  m: "1rem",
                  display: "flex",
                  // backgroundImage: `url(${PaySuccess})`,
                  background: "#FFFFFF",
                  backgroundSize: "cover",
                  flexDirection: "column",
                  backgroundPosition: "center",
                  textAlign: "center",
                  alignItems: "center",
                  minHeight: "20rem",
                }}
              >
                <Grid container spacing={2} p={6} m={10}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <IconButton
                      size="large"
                      color="white"
                      iconOnly
                      circular
                      // sx={{ background: "#00CA72" }}  // for green background
                      sx={{ background: "red" }}
                    >
                      <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={4}>
                    <MDTypography
                      variant="h3"
                      sx={{
                        // fontSize: "1.5rem",
                        textAlign: "center",
                        // color: "#000000",
                      }}
                    >
                      Endorsement
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography
                      variant="h3"
                      sx={{
                        // fontSize: "1.5rem",
                        textAlign: "center",
                        // color: "#000000",
                      }}
                    >
                      Done Successfully
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          ) : (
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
                      m: "1rem",
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
                      variant="h3"
                      sx={{
                        mt: "2rem",
                        // fontSize: "1.25rem",
                        textAlign: "center",
                        widht: "100%",
                        color: "#00CA72",
                      }}
                    >
                      {" "}
                      Payment Details <p>Saved Successfully</p>
                    </MDTypography>
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
                    <Grid container spacing={2} mt={3} pb={10}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} align="right">
                        {/* {location.state?.Refund ? (
                          <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                            Amount Refunded :
                          </MDTypography>
                        ) : (
                          <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                            Amount Paid :
                          </MDTypography>
                        )} */}
                        <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                          {location.state?.Refund ? "Amount Refunded :" : "Amount Paid :"}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} align="left">
                        <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                          ₹ {location.state?.paymentDto.Amount}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} align="right">
                        <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                          Payment Mode :
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} align="left">
                        <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                          CD Account
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Grid container spacing={2} sx={{ mt: "2rem" }} p={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h3">Your Endorsement Details</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} align="left">
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  Endorsement No. :
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8} align="right">
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  {location.state.EndoNo}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} align="left">
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>COI No. :</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8} align="right">
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  {location.state.COINo}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} align="left">
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  Member Name :
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8} align="right">
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  {location.state.Name}
                </MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={3}>
                <MDButton
                  variant="outlined"
                  display="flex"
                  color="error"
                  sx={{ color: "#E41D25" }}
                  onClick={OnEmail}
                >
                  Email PDF
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={3}>
                <MDButton display="flex" color="error" onClick={handleDownloadEndorsement}>
                  Download PDF
                </MDButton>
              </Grid> */}
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt={3}>
                <MDButton
                  variant="outlined"
                  display="flex"
                  color="error"
                  sx={{ color: "#E41D25" }}
                  onClick={OnEmail}
                >
                  Email PDF
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5} mt={3}>
                <MDButton
                  display="flex"
                  color="error"
                  sx={{ justifyContent: "flex-end", color: "error", whiteSpace: "nowrap" }}
                  onClick={handleDownloadEndorsement}
                >
                  Download PDF
                </MDButton>
              </Grid>
              {location.state.NSTPButton === true && (
                <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5} mt={3}>
                  <MDButton
                    display="flex"
                    color="error"
                    sx={{ justifyContent: "flex-end", color: "error", whiteSpace: "nowrap" }}
                    onClick={handlegotoUW}
                  >
                    Go to Endorsement Referred to UW
                  </MDButton>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Card>
  );
}
export default EndorsementSuccess;
