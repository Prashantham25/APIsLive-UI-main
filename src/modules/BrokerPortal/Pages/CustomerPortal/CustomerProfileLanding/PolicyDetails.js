import * as React from "react";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import carlogo from "assets/images/BrokerPortal/Customer/car.png";
import bikelogo from "assets/images/BrokerPortal/Customer/bike.png";
import MDTypography from "components/MDTypography";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import PageLayout from "examples/LayoutContainers/PageLayout";
import ErrorIcon from "@mui/icons-material/Error";
// import { useNavigate } from "react-router-dom";
import realiancelogo from "assets/images/BrokerPortal/CompanyLogos/Reliance.png";
import icicilogo from "assets/images/BrokerPortal/CompanyLogos/ICICI.png";
import kotaklogo from "assets/images/BrokerPortal/CompanyLogos/KotakLogo.png";
import godigitlogo from "assets/images/BrokerPortal/CompanyLogos/GoDigit.png";
import hdfclogo from "assets/images/BrokerPortal/CompanyLogos/HDFCErgoLogo.png";
import bajajlogo from "assets/images/BrokerPortal/CompanyLogos/BajajAlliance.png";
// import MDAvatar from "components/MDAvatar";
// import companylogo from "assets/images/BrokerPortal/CompanyLogos/Chola.png";
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
        <MDBox src={bikelogo} variant="square" component="img" />
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
        <MDBox src={realiancelogo} size="lg" variant="square" component="img" />
      </span>
    );
  } else if (partnerID === "77") {
    image = (
      <span>
        <MDBox src={icicilogo} size="lg" variant="square" component="img" />
      </span>
    );
  } else if (partnerID === "128") {
    image = (
      <span>
        <MDBox src={kotaklogo} size="lg" variant="square" component="img" />
      </span>
    );
  } else if (partnerID === "62") {
    image = (
      <span>
        <MDBox src={godigitlogo} size="lg" variant="square" component="img" />
      </span>
    );
  } else if (partnerID === "73") {
    image = (
      <span>
        <MDBox src={hdfclogo} size="lg" variant="square" component="img" />
      </span>
    );
  } else if (partnerID === "86") {
    image = (
      <span>
        <MDBox src={bajajlogo} size="lg" variant="square" component="img" />
      </span>
    );
  }
  return image;
}

export default function PolicyDetails({ itemBind }) {
  console.log("itemBind", itemBind);
  // const navigate = useNavigate();
  // const handleLink = () => {
  //   navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/MyPolicies`);
  // };

  return (
    <PageLayout>
      <Card sx={{ maxWidth: "74.1%" }}>
        {/* <CardContent>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography
                sx={{
                  width: "100%",
                  height: "20px",
                  fontSize: "14px",
                  marginLeft: "-18px",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    color: "#0071D9",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={handleLink}
                  role="button"
                  onKeyDown={handleLink}
                  tabIndex="0"
                  //   to="/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Policies"
                >
                  Go back to My Policies
                </span>
              </MDTypography>
            </Grid>
          </Grid>
        </CardContent> */}
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox */}
        {/* // marginLeft="0.5%" // borderRadius="lg" // sx=
        {{ background: "#CEEBFF", mr: "3.5%", mt: "20px" }} */}
        {/* sx={{
              bgcolor: "#ceebff",
              borderRadius: "10px",
              width: "95%",
              ml: "2rem",
              mt: "20px",
            }}
          > */}
        {/* <MDBox display="flex" flexDirection="row" sx={{ mt: "5px" }}>
              <Grid container mt={3}>
                <Grid item>
                  <GetImages vehicleType={itemBind.vehicleType}  />
                </Grid>
              </Grid>

              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      variant="h6"
                      sx={{
                        color: "#000000",
                        fontSize: "14px",
                        marginTop: "-8px",
                        marginLeft: "-540px",
                        letterSpacing: "0.15px",
                      }}
                    >
                      {itemBind.vehicleDetails.MakeValue}
                    </MDTypography>
                    <Grid item md={3} textAlign="right">
                      <MDBox sx={{ width: "950%" }}>
                        <Chip label="Active" sx={{ color: "#009B58" }} />
                      </MDBox>
                    </Grid>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        color: "#000000",
                        fontSize: "18px",
                        marginLeft: "25%",
                        marginTop: "-20px",
                        letterSpacing: "0.15px",
                        fontWeight: "500",
                      }}
                    >
                      {itemBind.vehicleDetails.MakeValue} {itemBind.vehicleDetails.ModelValue}
                    </MDTypography>
                    <Grid item md={3} textAlign="right">
                      <MDBox
                        sx={{
                          ml: "444px",
                          //   md: "10px ",
                          mt: "-3px",
                        }}
                      > */}
        {/* <MDAvatar
                          src={itemBind.partnerID}
                          size="smalllogo"
                          variant="square"
                          sx={{ ml: "270%", mt: "10px" }}
                        /> */}
        {/* <GetLogo partnerID={itemBind.partnerID} />
                      </MDBox>
                    </Grid>
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}> */}
        {/* <Chip
                  sx={{ ml: "25%", color: " #000000", fontSize: "12px", mt: "-24px" }}
                  label="KA-20-AJ-1234"
                /> */}
        {/* <Chip
                  sx={{ ml: "25%", color: " #000000", fontSize: "12px", mt: "-24px" }}
                  //   label="KA-20-AJ-1234"
                >
                  {itemBind.vehicleDetails.RegistrationNumber1}-
                  {itemBind.vehicleDetails.RegistrationNumber2}-
                  {itemBind.vehicleDetails.RegistrationNumber3}-
                  {itemBind.vehicleDetails.RegistrationNumber4}
                </Chip> */}
        {/* <MDBox
                  p={0.8}
                  sx={{
                    height: "28px",
                    width: "100px",
                    borderRadius: "5px",
                    padding: "5px, 9px, 5px, 9px",
                    background: "#D9D9D9",
                    marginLeft: "170px",
                    marginTop: "-30px",
                  }}
                >
                  <MDTypography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      letterSpacing: "0.15000000596046448px",
                      textAlign: "center",
                      color: "#000000",
                    }}
                  >
                    {itemBind.vehicleDetails.RegistrationNumber} */}
        {/* {itemBind.vehicleDetails.RegistrationNumber1}-
                    {itemBind.vehicleDetails.RegistrationNumber2}-
                    {itemBind.vehicleDetails.RegistrationNumber3}-
                    {itemBind.vehicleDetails.RegistrationNumber4} */}
        {/* </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDBox display="flex" flexDirection="row">
                  <MDTypography
                    sx={{
                      color: "#000000",
                      fontSize: "14px",
                      marginLeft: "25%",
                      marginTop: "10px",
                      letterSpacing: "0.15px",
                      fontWeight: "500",
                    }}
                  >
                    Validity:
                  </MDTypography>
                  <MDTypography
                    sx={{
                      color: "#000000",
                      fontSize: "14px",
                      marginLeft: "5px",
                      marginTop: "10px",
                      letterSpacing: "0.15px",
                    }}
                  >
                    {itemBind.policyStartDate} - {itemBind.policyEndDate}
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDBox display="flex" flexDirection="row">
                  <MDTypography
                    sx={{
                      color: "#000000",
                      fontSize: "14px",
                      marginLeft: "25%",
                      marginTop: "10px",
                      letterSpacing: "0.15px",
                      fontWeight: "500",
                    }}
                  >
                    Policy Holder Name:
                  </MDTypography>
                  <MDBox disply="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        color: "#000000",
                        fontSize: "14px",
                        marginLeft: "5px",
                        marginTop: "10px",
                        letterSpacing: "0.15px",
                      }}
                    >
                      {itemBind.proposerDetails.CustomerFirstName}{" "}
                      {itemBind.proposerDetails.CustomerLastName}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox display="flex" flexDirection="row">
                <MDBox display="flex" flexDirection="row">
                  <IconButton size="small">
                    <FileDownloadIcon pl={2} sx={{ ml: "156px", color: "#0071D9", mt: "15px" }} />
                  </IconButton>
                  <MDTypography
                    style={{
                      color: "#0071D9",
                      fontSize: "14px",
                      marginLeft: "7px",
                      marginTop: "16px",
                      letterSpacing: "0.15px",
                      cursor: "pointer",
                    }}
                  >
                    Download Policy
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" flexDirection="row">
                  <IconButton size="small">
                    <ErrorIcon pl={2} sx={{ ml: "45px", color: "#0071D9", mt: "15px" }} />
                  </IconButton>
                  <MDTypography
                    sx={{
                      color: "#0071D9",
                      fontSize: "14px",
                      marginLeft: "7px",
                      marginTop: "16px",
                      letterSpacing: "0.15px",
                    }}
                  >
                    Intimate Claim
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" flexDirection="row">
                  <IconButton size="small">
                    <CreateIcon pl={2} sx={{ ml: "45px", color: "#0071D9", mt: "15px" }} />
                  </IconButton>
                  <MDTypography
                    sx={{
                      color: "#0071D9",
                      fontSize: "14px",
                      marginLeft: "7px",
                      marginTop: "16px",
                      letterSpacing: "0.15px",
                    }}
                  >
                    Edit Information
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Grid>
          </MDBox>
        </Grid> */}
        <MDBox
          sx={{
            bgcolor: "#ceebff",
            borderRadius: "10px",
            width: "95%",
            ml: "2rem",
            mt: "20px",
          }}
        >
          <Grid container px={2} py={1} mt={1}>
            <Grid item md={2} pt={3}>
              <GetImages vehicleType={itemBind.vehicleType} />
              {/* <MDAvatar src={carlogo} size="lg" variant="square" /> */}
            </Grid>
            <Grid item md={7} ml={-8}>
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
                <PolicyType policyData1={itemBind.policyType} />
              </MDTypography>
              <MDTypography
                sx={{
                  fontFamily: "Roboto",
                  // fontSize: "1rem",
                  fontSize: "18px",
                  fontWeight: "400",
                  lineHeight: "45px",
                  letterSpacing: "0.15000000596046448px",
                  textAlign: "left",
                  color: "#000000",
                }}
              >
                {`${itemBind.vehicleDetails.MakeValue} ${itemBind.vehicleDetails.ModelValue} ${itemBind.vehicleDetails.VariantValue} (${itemBind.vehicleDetails.FuelType})`}
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
                  {itemBind.vehicleDetails.RegistrationNumber}
                </MDTypography>
              </MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "45px",
                        letterSpacing: "0.15000000596046448px",
                        textAlign: "left",
                        color: "#000000",
                      }}
                    >
                      Validity:
                    </MDTypography>
                    <MDTypography
                      sx={{
                        color: "#000000",
                        fontSize: "14px",
                        marginLeft: "5px",
                        lineHeight: "45px",
                        letterSpacing: "0.15000000596046448px",
                      }}
                    >
                      {itemBind.policyStartDate} - {itemBind.policyEndDate}
                    </MDTypography>
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "30px",
                        letterSpacing: "0.15000000596046448px",
                        textAlign: "left",
                        color: "#000000",
                      }}
                    >
                      Policy Holder Name:
                    </MDTypography>
                    <MDBox disply="flex" flexDirection="row">
                      <MDTypography
                        sx={{
                          color: "#000000",
                          fontSize: "14px",
                          marginLeft: "5px",
                          lineHeight: "30px",
                          letterSpacing: "0.15000000596046448px",
                        }}
                      >
                        {itemBind.proposerDetails.CustomerFirstName}{" "}
                        {itemBind.proposerDetails.CustomerLastName}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox display="flex" flexDirection="row">
                  <MDBox display="flex" flexDirection="row">
                    <IconButton size="small">
                      <FileDownloadIcon
                        pl={2}
                        sx={{
                          color: "#0071D9",
                          left: "3.33px",
                          marginTop: "15px",
                        }}
                      />
                    </IconButton>
                    <MDTypography
                      sx={{
                        color: "#0071D9",
                        width: "106px",
                        fontSize: "14px",
                        cursor: "pointer",
                        marginTop: "15px",
                      }}
                    >
                      Download Policy
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <IconButton size="small">
                      <ErrorIcon pl={2} sx={{ ml: "45px", color: "#0071D9", mt: "15px" }} />
                    </IconButton>
                    <MDTypography
                      sx={{
                        color: "#0071D9",
                        fontSize: "14px",
                        marginLeft: "7px",
                        marginTop: "16px",
                        letterSpacing: "0.15px",
                      }}
                    >
                      Intimate Claim
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <IconButton size="small">
                      <CreateIcon pl={2} sx={{ ml: "45px", color: "#0071D9", mt: "15px" }} />
                    </IconButton>
                    <MDTypography
                      sx={{
                        color: "#0071D9",
                        fontSize: "14px",
                        marginLeft: "7px",
                        marginTop: "16px",
                        letterSpacing: "0.15px",
                      }}
                    >
                      Edit Information
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>

            <Grid item md={3} justifyContent="right">
              <MDBox sx={{ width: "100%" }}>
                <MDBox sx={{ width: "100%" }}>
                  <Chip label="Active" sx={{ color: "#009B58" }} />
                </MDBox>
                <MDBox sx={{ width: "100%" }}>
                  <GetLogo partnerID={itemBind.partnerID} />
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox display="flex" flexDirection="row">
          <Grid item xs={12} sm={12} md={6}>
            <MDBox display="flex" flexDirection="column">
              <MDBox marginLeft="10%" borderRadius="lg" sx={{ mr: "3.5%" }}>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      variant="h6"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "20px",
                        marginLeft: "10%",
                        color: "#000000",
                        mx: "1rem",
                      }}
                    >
                      Vehicle Details
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox marginLeft="6.5%" borderRadius="lg" sx={{ mr: "3.5%" }}>
                <MDBox display="flex" flexDirection="column">
                  <MDBox display="flex" flexDirection="row" sx={{ mt: "15px" }}>
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "8%",
                        // mx: "3rem",
                        color: "#000000",
                      }}
                    >
                      Car Number
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "110px",
                        color: "#000000",
                        fontWeight: "500",
                      }}
                    >
                      {/* {itemBind.vehicleDetails.RegistrationNumber1}-
                      {itemBind.vehicleDetails.RegistrationNumber2}-
                      {itemBind.vehicleDetails.RegistrationNumber3}-
                      {itemBind.vehicleDetails.RegistrationNumber4} */}
                      {itemBind.vehicleDetails.RegistrationNumber}
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "8%",
                        // mx: "3rem",
                        mt: "10px",
                        color: "#000000",
                      }}
                    >
                      Make/Model
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "107px",
                        mt: "10px",
                        color: "#000000",
                        fontWeight: "500",
                      }}
                    >
                      {itemBind.vehicleDetails.MakeValue} / {itemBind.vehicleDetails.ModelValue}
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "8%",
                        // mx: "3rem",
                        mt: "10px",
                        color: "#000000",
                      }}
                    >
                      Fuel Type
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "127px",
                        fontWeight: "500",
                        mt: "10px",
                        color: "#000000",
                      }}
                    >
                      {itemBind.vehicleDetails.FuelType}
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "8%",
                        // mx: "3rem",
                        mt: "10px",
                        color: "#000000",
                      }}
                    >
                      Registration Year
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "78px",
                        mt: "10px",
                        color: "#000000",
                        fontWeight: "500",
                      }}
                    >
                      {itemBind.vehicleDetails.RegistrationDate.split("-")[2]}
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "8%",
                        // mx: "3rem",
                        mt: "10px",
                        color: "#000000",
                      }}
                    >
                      Insured Declared Value(IDV)
                    </MDTypography>
                    <MDBox display="flex" flexDirection="row">
                      <MDTypography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "14px",
                          marginLeft: "9px",
                          mt: "10px",
                          color: "#000000",
                          fontWeight: "500",
                        }}
                      >
                        ₹
                      </MDTypography>
                      <MDTypography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "14px",
                          marginLeft: "2px",
                          mt: "10px",
                          color: "#000000",
                          fontWeight: "500",
                        }}
                      >
                        {itemBind.vehicleDetails.IDVofVehicle}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "8%",
                        // mx: "3rem",
                        mt: "10px",
                        color: "#000000",
                      }}
                    >
                      Engine Number
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "87px",
                        mt: "10px",
                        color: "#000000",
                        fontWeight: "500",
                      }}
                    >
                      {itemBind.vehicleDetails.EngineNumber}
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "8%",
                        // mx: "3rem",
                        mt: "10px",
                        color: "#000000",
                      }}
                    >
                      Chassis Number
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "83px",
                        mt: "10px",
                        color: "#000000",
                        fontWeight: "500",
                      }}
                    >
                      {itemBind.vehicleDetails.ChassisNumber}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <MDBox display="flex" flexDirection="column">
              <MDBox marginLeft="8%" sx={{ mr: "2.5%" }}>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      variant="h6"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "20px",
                        marginLeft: "8%",
                        color: "#000000",
                      }}
                    >
                      Proposer Details
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox marginLeft="19%" borderRadius="lg" sx={{ mr: "2.5%" }}>
                <MDBox display="flex" flexDirection="column">
                  <MDBox display="flex" flexDirection="row" sx={{ mt: "15px" }}>
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "-10%",
                        // mx: "3rem",
                        color: "#000000",
                      }}
                    >
                      Name
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "70px",
                        color: "#000000",
                        fontWeight: "500",
                      }}
                    >
                      {itemBind.proposerDetails.CustomerFirstName}{" "}
                      {itemBind.proposerDetails.CustomerLastName}
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "-10%",
                        // mx: "3rem",
                        mt: "10px",
                        color: "#000000",
                      }}
                    >
                      Email ID
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "57px",
                        mt: "10px",
                        color: "#000000",
                        fontWeight: "500",
                      }}
                    >
                      {itemBind.proposerDetails.EmailId}
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "-10%",
                        // mx: "3rem",
                        mt: "10px",
                        color: "#000000",
                      }}
                    >
                      Mobile Number
                    </MDTypography>
                    <MDBox display="flex" flexDirection="row">
                      <MDTypography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "14px",
                          marginLeft: "10px",
                          fontWeight: "500",
                          mt: "10px",
                          color: "#000000",
                        }}
                      >
                        +91
                      </MDTypography>
                      <MDTypography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "14px",
                          marginLeft: "2px",
                          fontWeight: "500",
                          mt: "10px",
                          color: "#000000",
                        }}
                      >
                        {itemBind.proposerDetails.ContactNo}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "-10%",
                        // mx: "3rem",
                        mt: "10px",
                        color: "#000000",
                      }}
                    >
                      Pincode
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "58px",
                        mt: "10px",
                        color: "#000000",
                        fontWeight: "500",
                      }}
                    >
                      {itemBind.proposerDetails.CommunicationAddress.Pincode}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
          </Grid>
        </MDBox>
        <MDBox display="flex" flexDirection="column">
          <Grid item xs={12} sm={12} md={6}>
            <MDBox marginLeft="10%" marginTop="35px" borderRadius="lg" sx={{ mr: "3.5%" }}>
              <MDTypography
                variant="h6"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "20px",
                  marginLeft: "10%",
                  color: "#000000",
                  mx: "1rem",
                }}
              >
                Covers
              </MDTypography>
            </MDBox>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox marginLeft="6.5%" borderRadius="lg" sx={{ mr: "3.5%" }}>
                <MDTypography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    marginLeft: "8%",
                    // mx: "3rem",
                    color: "#000000",
                    mt: "15px",
                  }}
                >
                  Damage to your car (1 year) <ContactSupportIcon />
                </MDTypography>
                <MDTypography
                  sx={{
                    fontSize: "14px",
                    marginLeft: "8%",
                    // mx: "3rem",
                    mt: "10px",
                    color: "#000000",
                  }}
                >
                  Theft of your car
                </MDTypography>
                <MDTypography
                  sx={{
                    fontSize: "14px",
                    marginLeft: "8%",
                    // mx: "3rem",
                    mt: "10px",
                    color: "#000000",
                  }}
                >
                  Natural Calamities
                </MDTypography>
                <MDTypography
                  sx={{
                    fontSize: "14px",
                    marginLeft: "8%",
                    // mx: "3rem",
                    mt: "10px",
                    color: "#000000",
                  }}
                >
                  Man-made hazards
                </MDTypography>
                <MDTypography
                  sx={{
                    fontSize: "14px",
                    marginLeft: "8%",
                    // mx: "3rem",
                    mt: "10px",
                    color: "#000000",
                  }}
                >
                  File and Explosions
                </MDTypography>
                <MDTypography
                  sx={{
                    fontSize: "14px",
                    marginLeft: "8%",
                    // mx: "3rem",
                    mt: "10px",
                    color: "#000000",
                  }}
                >
                  Damage During Transit
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </PageLayout>
  );
}
