import React, { useState } from "react";
//  import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import IconButton from "@mui/material/IconButton";
//  import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
// import MDAvatar from "components/MDAvatar";
import carlogo from "assets/images/BrokerPortal/Customer/car.png";
import bikelogo from "assets/images/BrokerPortal/Customer/bike.png";
// import companylogo from "assets/images/BrokerPortal/CompanyLogos/Chola.png";
// import royallogo from "assets/images/BrokerPortal/CompanyLogos/Rsa.png";
// import tatalogo from "assets/images/BrokerPortal/CompanyLogos/ICICI.png";
// import travellogo from "assets/images/BrokerPortal/Customer/travel.png";
import realiancelogo from "assets/images/BrokerPortal/CompanyLogos/Reliance.png";
import icicilogo from "assets/images/BrokerPortal/CompanyLogos/ICICI.png";
import kotaklogo from "assets/images/BrokerPortal/CompanyLogos/KotakLogo.png";
import godigitlogo from "assets/images/BrokerPortal/CompanyLogos/GoDigit.png";
import hdfclogo from "assets/images/BrokerPortal/CompanyLogos/HDFCErgoLogo.png";
import bajajlogo from "assets/images/BrokerPortal/CompanyLogos/BajajAlliance.png";
import { postRequest } from "../../../../../core/clients/axiosclient";

function GetImages({ vehicleType }) {
  console.log("key", vehicleType);
  let content;
  if (vehicleType === "16") {
    content = (
      <span>
        <MDBox src={carlogo} size="lg" variant="square" component="img" />
      </span>
    );
  } else if (vehicleType === "17") {
    content = (
      <span>
        <MDBox src={bikelogo} size="lg" variant="square" component="img" />
      </span>
    );
  }
  return content;
}

function GetLogo({ partnerID }) {
  console.log("partnerID", partnerID);
  let image = <MDBox src="" size="sm" variant="square" component="img" sx={{ width: "62%" }} />;
  if (partnerID === "99") {
    image = (
      <span>
        <MDBox
          src={realiancelogo}
          size="sm"
          variant="square"
          component="img"
          sx={{ width: "62%" }}
        />
      </span>
    );
  } else if (partnerID === "77") {
    image = (
      <span>
        <MDBox src={icicilogo} size="sm" variant="square" component="img" sx={{ width: "62%" }} />
      </span>
    );
  } else if (partnerID === "128") {
    image = (
      <span>
        <MDBox src={kotaklogo} size="sm" variant="square" component="img" sx={{ width: "62%" }} />
      </span>
    );
  } else if (partnerID === "62") {
    image = (
      <span>
        <MDBox src={godigitlogo} size="sm" variant="square" component="img" sx={{ width: "62%" }} />
      </span>
    );
  } else if (partnerID === "73") {
    image = (
      <span>
        <MDBox src={hdfclogo} size="sm" variant="square" component="img" sx={{ width: "62%" }} />
      </span>
    );
  } else if (partnerID === "86") {
    image = (
      <span>
        <MDBox src={bajajlogo} size="sm" variant="square" component="img" sx={{ width: "62%" }} />
      </span>
    );
  }
  return image;
}

function downloadPDF(pdf, name) {
  const linkSource = `data:application/pdf;base64,${pdf}`;

  const downloadLink = document.createElement("a");

  const fileName = `${name}.pdf`;

  downloadLink.href = linkSource;

  downloadLink.download = fileName;

  downloadLink.click();
}

function PolicyType({ policyData1 }) {
  console.log("policyData1", policyData1);
  // let content;
  if (policyData1 === "1") {
    return (
      <MDTypography
        sx={{
          width: "164px",
          color: "#000000",
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "21px",
          letterSpacing: "0.15000000596046448px",
        }}
      >
        Package
      </MDTypography>
    );
  }
  if (policyData1 === "2") {
    return (
      <MDTypography
        sx={{
          width: "164px",
          color: "#000000",
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "21px",
          letterSpacing: "0.15000000596046448px",
        }}
      >
        Standalone Own Damage
      </MDTypography>
    );
  }
  if (policyData1 === "3") {
    return (
      <MDTypography
        sx={{
          width: "164px",
          color: "#000000",
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "21px",
          letterSpacing: "0.15000000596046448px",
        }}
      >
        Standalone Third Party
      </MDTypography>
    );
  }
  return "";
}

function MYPolicies({ policyData }) {
  console.log("ddddd", policyData);

  const navigate = useNavigate();
  const handleNav = () => {
    navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Policies`);
  };

  const [pdf, setpdf] = useState();
  const handleDownloadPolicy = async (poprosalno, policyno, transNo, customerID) => {
    const obj = {
      proposalNo: poprosalno,
      policyNo: policyno,
      transactionId: transNo,
      customerId: customerID,
      productType: "",
    };
    await postRequest(`Policy/GetPolicyPDF`, obj).then(async (res) => {
      console.log("pdfdownload", res);
      const pdf1 = res.data.finalResult.OutputResult;
      setpdf(pdf1);
      await downloadPDF(pdf.PolicyBase64String, obj.policyNo);
    });
  };

  return (
    <MDBox>
      <MDTypography ml="2rem" sx={{ color: "#0071D9DE" }}>
        <h4>My Policies</h4>
      </MDTypography>
      {Array.isArray(policyData) &&
        policyData.map((item) => (
          <MDBox
            sx={{
              bgcolor: "#ceebff",
              borderRadius: "10px",
              width: "95%",
              ml: "2rem",
            }}
          >
            <Grid container px={2} py={1} mt={1}>
              <Grid item md={2} pt={3}>
                {item.vehicleType && <GetImages vehicleType={item.vehicleType} />}
                {/* <MDAvatar src={carlogo} size="lg" variant="square" /> */}
              </Grid>
              <Grid item md={7}>
                <MDTypography
                  sx={{
                    width: "164px",
                    color: "#000000",
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "21px",
                    letterSpacing: "0.15000000596046448px",
                  }}
                >
                  {/* {item.policyType} */}
                  <PolicyType policyData1={item.policyType} />
                </MDTypography>
                <MDTypography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                    fontWeight: "400",
                    lineHeight: "27px",
                    letterSpacing: "0.15000000596046448px",
                    textAlign: "left",
                    color: "#000000",
                  }}
                >
                  {`${item.vehicleDetails?.MakeValue} ${item.vehicleDetails?.ModelValue} ${item.vehicleDetails?.VariantValue} (${item.vehicleDetails?.FuelType})`}
                </MDTypography>
                <MDBox
                  p={0.8}
                  sx={{
                    height: "28px",
                    width: "100px",
                    borderRadius: "5px",
                    padding: "5px, 9px, 5px, 9px",
                    background: "#D9D9D9",
                  }}
                >
                  <MDTypography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      letterSpacing: "0.15000000596046448px",
                      textAlign: "left",
                      color: "#000000",
                    }}
                  >
                    {item.vehicleDetails?.RegistrationNumber}
                  </MDTypography>
                </MDBox>
                <Grid container>
                  <IconButton size="small">
                    <FileDownloadIcon
                      pl={2}
                      sx={{
                        color: "#0071D9",
                        left: "3.33px",
                      }}
                    />
                  </IconButton>
                  <MDTypography
                    sx={{
                      color: "#0071D9",
                      width: "106px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      onClick={() =>
                        handleDownloadPolicy(
                          item.poprosalno,
                          item.policyno,
                          item.transNo,
                          item.customerID
                        )
                      }
                      role="button"
                      onKeyDown={() =>
                        handleDownloadPolicy(
                          item.poprosalno,
                          item.policyno,
                          item.transNo,
                          item.customerID
                        )
                      }
                      tabIndex="0"
                    >
                      Download Policy
                    </span>
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid item md={3} textAlign="right">
                <MDBox sx={{ width: "100%" }}>
                  <Chip label="Active" sx={{ color: "#009B58" }} />
                  <GetLogo partnerID={item.partnerID} />
                  <MDTypography
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "150%",
                      color: "#0071D9",
                      cursor: "pointer",
                    }}
                  >
                    <span onClick={handleNav} role="button" onKeyDown={handleNav} tabIndex="0">
                      View more
                    </span>
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        ))}
    </MDBox>
  );
}
export default MYPolicies;
