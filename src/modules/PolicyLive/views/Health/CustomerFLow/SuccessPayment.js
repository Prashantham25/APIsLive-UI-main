import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import { useNavigate } from "react-router-dom";
import { useDataController } from "../../../../BrokerPortal/context";
// import { postRequest } from "../../../../../core/clients/axiosclient";
import { sendMail, HandleDownload } from "./data";

function SuccessPayment() {
  // {
  //   // PolicyDto,
  //   // handleproposal,
  //   //   ProposalData,
  //   // handlepolicy,
  //   // proposalNumber,
  // }

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,

    style: "currency",

    currency: "INR",
  });
  const [controller] = useDataController();
  const { DentalInsuranceDetails } = controller;

  console.log(DentalInsuranceDetails, "DentalInsuranceDetails");

  const navigate = useNavigate();
  const handleProceed = () => {
    navigate(`/Chomp`);
  };
  useEffect(() => {
    console.log(DentalInsuranceDetails, "DentalInsuranceDetails11");
  }, [DentalInsuranceDetails]);
  console.log(
    DentalInsuranceDetails.proposalNumber.proposalNumber,
    DentalInsuranceDetails.PolicyDto.ProposerDetails.EmailId,
    "mailid,proposalno"
  );
  // useEffect(() => {
  //   if (DentalInsuranceDetails.PolicyDto.ProposerDetails.Emailid) {
  //   const emailDTO = {
  //     proposalNo: "",
  //     policyNo:" 0769 / 0000 / 0042 / 00 / 000",
  //     transactionId: "",
  //     customerId: "",
  //     key:" 0769 / 0000 / 0042 / 00 / 000",
  //     keyType: "",
  //     communicationId: 102,
  //     referenceId: 62,
  //     ICPDF: true,
  //     ISDMS: false,
  //   };
  //   postRequest(
  //     `Policy/SendNotification?PolicyNumber=${0769 / 0000 / 0042 / 00 / 000}& EmailId=${pallavi.b@inubesolutions.com}`,
  //     emailDTO
  //   ).then((result) => {
  //     console.log("result", result);
  //   });
  //   // }
  // });

  return (
    <Card
      position="absolute"
      // sx={{ borderRadius: "0.3rem", mt: 3, background: " #EEEEEE" }}
      sx={{ borderRadius: "0.3rem", m: 7, background: "#FFFFFF" }}
      fullwidth
    >
      <Card
        position="absolute"
        // sx={{ borderRadius: "0.3rem", mt: 3, background: " #EEEEEE" }}
        sx={{ borderRadius: "0.3rem", m: 7, background: "#EEEEEE" }}
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
                  <MDTypography
                    variant="h6"
                    sx={{ my: "2rem", fontSize: "1rem", textAlign: "center", widht: "100%" }}
                  >
                    {" "}
                  </MDTypography>
                  <Grid container spacing={2} ml={5} mt={2} pb={10}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                        Amount Paid &nbsp;&nbsp; :
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                        Payment Mode &nbsp;&nbsp;:
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        {formatter.format(
                          DentalInsuranceDetails.PolicyDto.PremiumDetails.TotalPremium
                        )}
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem" }}>Net banking</MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Grid container spacing={4} sx={{ mt: "2rem" }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" sx={{ fontSize: "1.8rem", color: "#000000" }}>
                  Here is your policy
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>Policy No :</MDTypography>
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" sx={{ fontSize: "1.4rem", color: "#000000" }}>
                  {/* {proposalNumber} */}
                  PB4453PG008320331
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  Proposer Name :
                </MDTypography>
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" sx={{ fontSize: "1.4rem", color: "#000000" }}>
                  {DentalInsuranceDetails.PolicyDto.ProposerDetails.FirstName} &nbsp;{" "}
                  {DentalInsuranceDetails.PolicyDto.ProposerDetails.MiddleName} &nbsp;{" "}
                  {DentalInsuranceDetails.PolicyDto.ProposerDetails.LastName}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  Total insured members
                </MDTypography>
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" sx={{ fontSize: "1.4rem", color: "#000000" }}>
                  {DentalInsuranceDetails.PolicyDto.TotalMembers}&nbsp;Members
                </MDTypography>
              </Grid>
              <Grid item md={3}>
                <MDButton
                  variant="outlined"
                  display="flex"
                  color="error"
                  sx={{ color: "#E41D25" }}
                  onClick={() =>
                    sendMail(
                      DentalInsuranceDetails.proposalNumber.proposalNumber,
                      DentalInsuranceDetails.PolicyDto.ProposerDetails.EmailId
                    )
                  }
                  // sx={{
                  //   maxHeight: "1.5rem",
                  //   // width: "7rem",
                  //   fontSize: "0.5rem",
                  //   width: "8rem",
                  //   mr: "0rem",
                  //   borderRadius: "0rem",
                  // }}
                >
                  Email Policy
                </MDButton>
              </Grid>
              <Grid item md={3}>
                <MDButton
                  display="flex"
                  color="success"
                  onClick={() =>
                    HandleDownload(DentalInsuranceDetails.proposalNumber.proposalNumber)
                  }
                  // sx={{
                  //   maxHeight: "1.5rem",
                  //   width: "8rem",
                  //   fontSize: "0.5rem",
                  //   ml: "2rem",
                  //   borderRadius: "0rem",
                  // }}
                >
                  Download Policy
                </MDButton>
              </Grid>
              <Grid item md={3}>
                <MDButton
                  display="flex"
                  color="error"
                  // sx={{ color: "#E41D25" }}
                  // display="flex"
                  // sx={{
                  //   maxHeight: "1.5rem",
                  //   width: "7rem",
                  //   fontSize: "0.5rem",
                  //   ml: "4rem",
                  //   borderRadius: "0rem",
                  //   fontcolor: "White",
                  // }}
                  onClick={handleProceed}
                >
                  Go To Home
                  {/* <a href="https://uatagency.universalsompo.com/Home/Dashboard"> Go To Home</a> */}
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Card>
  );
}
export default SuccessPayment;
