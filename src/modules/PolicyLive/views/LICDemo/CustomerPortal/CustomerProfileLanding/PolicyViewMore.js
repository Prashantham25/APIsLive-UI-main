import * as React from "react";
//  import Container from "@mui/material/Container";
import { Grid, Stack } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import IconButton from "@mui/material/IconButton";
//  import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
// import { useNavigate } from "react-router-dom";
// import MDAvatar from "components/MDAvatar";
import carlogo from "assets/images/BrokerPortal/Customer/car.png";
import bikelogo from "assets/images/BrokerPortal/Customer/bike.png";
import { useState } from "react";
import realiancelogo from "assets/images/BrokerPortal/CompanyLogos/Reliance.png";
import icicilogo from "assets/images/BrokerPortal/CompanyLogos/ICICI.png";
import kotaklogo from "assets/images/BrokerPortal/CompanyLogos/KotakLogo.png";
import godigitlogo from "assets/images/BrokerPortal/CompanyLogos/GoDigit.png";
import hdfclogo from "assets/images/BrokerPortal/CompanyLogos/HDFCErgoLogo.png";
import bajajlogo from "assets/images/BrokerPortal/CompanyLogos/BajajAlliance.png";
import PolicyDetails from "./PolicyDetails";
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

// function VehicleDetails({ vehicleType }) {
//   console.log("key111", vehicleType);

//   if (vehicleType === "16") {
//     return <MDTypography>Four Wheeler</MDTypography>;
//   }
//   if (vehicleType === "17") {
//     return <MDTypography>Two Wheeler</MDTypography>;
//   }
//   if (vehicleType === "193") {
//     return <MDTypography>GCV</MDTypography>;
//   }
//   if (vehicleType === "194") {
//     return <MDTypography>PCV</MDTypography>;
//   }
//   return "";
// }
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
          sx={{ width: "50%" }}
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

function PolicyViewMore({ policyData }) {
  console.log("ddddd", policyData);

  const [viewMore, setViewMore] = useState(false);
  const [itemBind, setItemBind] = useState();
  const handleViewMore = (item) => {
    setItemBind(item);
    setViewMore(true);
  };

  function downloadPDF(pdf, name) {
    const linkSource = `data:application/pdf;base64,${pdf}`;

    const downloadLink = document.createElement("a");

    const fileName = `${name}.pdf`;

    downloadLink.href = linkSource;

    downloadLink.download = fileName;

    downloadLink.click();
  }
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
      downloadPDF(pdf.PolicyBase64String, obj.policyNo);
    });
  };
  return (
    <MDBox>
      <MDTypography ml="2rem" sx={{ color: "#0071D9DE" }}>
        <h4>My Policies</h4>
      </MDTypography>
      <Stack spacing={2} p={4}>
        {policyData !== null
          ? policyData.map((item, index) => (
              <MDBox
                sx={{
                  bgcolor: "#ceebff",
                  borderRadius: "10px",
                  width: "100%",
                }}
                p={2}
              >
                <Grid container>
                  <Grid item xs={12} sm={1.5} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
                    {item.vehicleType && <GetImages vehicleType={item.vehicleType} />}
                    {/* <MDAvatar src={carlogo} size="lg" variant="square" /> */}
                  </Grid>
                  <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5} xxl={3.5}>
                    <MDTypography
                      sx={{
                        color: "#000000",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {/* {item.policyType} */}
                      <PolicyType policyData1={item.policyType} />
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "400",

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
                          fontSize: "12px",
                          fontWeight: "400",

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
                  <Grid xs={12} sm={5} md={5} lg={5} xl={5} xxl={5} />
                  <Grid xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <Stack spacing={1}>
                      <MDBox sx={{ width: "100%" }}>
                        <Chip label="Active" sx={{ color: "#009B58" }} />
                      </MDBox>
                      <MDBox sx={{ width: "100%" }}>
                        <GetLogo partnerID={item.partnerID} />
                      </MDBox>

                      <MDTypography
                        sx={{
                          fontWeight: "400",
                          fontSize: "14px",
                          color: "#0071D9",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          onClick={() => handleViewMore(item, index)}
                          role="button"
                          onKeyDown={() => handleViewMore(item, index)}
                          tabIndex="0"
                        >
                          View more
                        </span>
                      </MDTypography>
                    </Stack>
                  </Grid>
                </Grid>
              </MDBox>
            ))
          : ""}
      </Stack>
      {viewMore && <PolicyDetails itemBind={itemBind} />}
    </MDBox>
  );
}
export default PolicyViewMore;
