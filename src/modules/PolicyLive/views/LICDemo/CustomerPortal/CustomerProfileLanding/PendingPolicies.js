import React, { useEffect, useState } from "react";
//  import Container from "@mui/material/Container";
import { Grid, Divider, Stack } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import carlogo from "assets/images/BrokerPortal/Customer/car.png";
import bikelogo from "assets/images/BrokerPortal/Customer/bike.png";
import realiancelogo from "assets/images/BrokerPortal/CompanyLogos/Reliance.png";
import icicilogo from "assets/images/BrokerPortal/CompanyLogos/ICICI.png";
import kotaklogo from "assets/images/BrokerPortal/CompanyLogos/KotakLogo.png";
import godigitlogo from "assets/images/BrokerPortal/CompanyLogos/GoDigit.png";
import hdfclogo from "assets/images/BrokerPortal/CompanyLogos/HDFCErgoLogo.png";
import bajajlogo from "assets/images/BrokerPortal/CompanyLogos/BajajAlliance.png";
// import companylogo from "assets/images/BrokerPortal/CompanyLogos/Kotak.png";
// import hondalogo from "assets/images/BrokerPortal/Carbrandlogos/Honda.png";
// import royallogo from "assets/images/BrokerPortal/CompanyLogos/Rsa.png";
import MDButton from "../../../../../components/MDButton";
import SideMenuBar from "./SideMenu";
import { setPolicyPendingData, useDataController } from "../../../context";
import { getRequest } from "../../../../../core/clients/axiosclient";
import breakpoints from "../../../../../assets/themes/BrokerPortal/iNubeTheme/base/breakpoints";

function GetImages({ VehicleType }) {
  console.log("key", VehicleType);
  let content;
  if (VehicleType === "16") {
    content = (
      <span>
        <MDBox src={carlogo} size="lg" variant="square" component="img" />
      </span>
    );
  } else if (VehicleType === "17") {
    content = (
      <span>
        <MDBox src={bikelogo} variant="square" component="img" />
      </span>
    );
  }
  return content;
}

function GetLogo({ PartnerId }) {
  console.log("partnerID", PartnerId);
  let image = <MDBox src="" size="sm" variant="square" component="img" sx={{ width: "62%" }} />;
  if (PartnerId === "99") {
    image = (
      <span>
        <MDBox src={realiancelogo} size="sm" variant="square" component="img" />
      </span>
    );
  } else if (PartnerId === "77") {
    image = (
      <span>
        <MDBox src={icicilogo} size="sm" variant="square" component="img" />
      </span>
    );
  } else if (PartnerId === "128") {
    image = (
      <span>
        <MDBox src={kotaklogo} size="sm" variant="square" component="img" />
      </span>
    );
  } else if (PartnerId === "62") {
    image = (
      <span>
        <MDBox src={godigitlogo} size="sm" variant="square" component="img" />
      </span>
    );
  } else if (PartnerId === "73") {
    image = (
      <span>
        <MDBox src={hdfclogo} size="sm" variant="square" component="img" />
      </span>
    );
  } else if (PartnerId === "86") {
    image = (
      <span>
        <MDBox src={bajajlogo} size="sm" variant="square" component="img" />
      </span>
    );
  }
  return image;
}

function PendingPolicies() {
  const [, dispatch] = useDataController();
  const [policyPending, setpolicyPending] = useState([]);

  const [controller] = useDataController();
  const { loginDetails } = controller;
  console.log("loginDetails", loginDetails);

  useEffect(async () => {
    await getRequest(`Policy/PolicyPending?Email=${loginDetails.Email}`).then((res) => {
      console.log("policypending", res);
      setpolicyPending(res.data);
      setPolicyPendingData(dispatch, res.data);
    });
  });

  // const [controller] = useDataController();
  // const { policyPending } = controller;;

  const handleurl = (item) => {
    const url = `${process.env.REACT_APP_ProposalRedirection_URL}${item.proposalNo}`;
    window.open(url, "_blank");
  };

  return (
    // <MDBox m={0}>
    <Grid container>
      <Grid item md={2} l={2}>
        <SideMenuBar selectedMenuItem="Pending Policies" />
      </Grid>
      {window.innerWidth > breakpoints.values.md && (
        <Grid item md={0.5} l={0.5}>
          <Divider
            orientation="vertical"
            flexItem
            style={{
              alignSelf: "auto",
              backgroundColor: "#36454F",
              height: "50rem",
              margin: "3.5rem",
              width: "0.25rem",
            }}
          />
        </Grid>
      )}
      <Grid item md={9.5} mt={5}>
        <Card>
          <Grid container spacing={4} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h4" sx={{ color: "#0071D9DE" }}>
                Pending Policies
              </MDTypography>
            </Grid>

            {policyPending.map((policyBind) => (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox
                  sx={{
                    bgcolor: "#ceebff",
                    borderRadius: "10px",
                  }}
                >
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={12} sm={12} md={2} lg={1.5} xl={1.5} xxl={1.5}>
                      {policyBind.proposerDetails?.VehicleType && (
                        <GetImages VehicleType={policyBind.proposerDetails?.VehicleType} />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6.5} lg={6.5} xl={6.5} xxl={6.5}>
                      <MDTypography>{policyBind.proposerDetails?.PolicyType}</MDTypography>
                      <MDTypography
                        sx={{
                          fontFamily: "Roboto",
                          color: "#000000",
                        }}
                      >
                        {policyBind.proposerDetails?.VehicleDetails?.MakeValue}{" "}
                        {policyBind.proposerDetails?.VehicleDetails?.ModelValue}
                      </MDTypography>
                      <MDBox
                        p={0.8}
                        sx={{
                          height: "28px",
                          width: "100px",
                          left: "523px",
                          top: "283px",
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
                          {policyBind.proposerDetails?.VehicleDetails?.RegistrationNumber}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Stack justifyContent="right" direction="row">
                        <GetLogo PartnerId={policyBind.proposerDetails?.PartnerId} />
                      </Stack>
                      <Stack justifyContent="right" direction="row" spacing={2} mt={2}>
                        <MDButton
                          size="medium"
                          startIcon={<FileDownloadIcon />}
                          variant="text"
                          onClick={() => handleurl(policyBind)}
                          sx={{
                            color: "#1976D2",
                          }}
                        >
                          download Quote
                        </MDButton>

                        <MDButton
                          variant="outlined"
                          onClick={() => handleurl(policyBind)}
                          sx={{
                            color: "#1976D2",
                          }}
                        >
                          PROCEED
                        </MDButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>
    </Grid>
    // </MDBox>
  );
}
export default PendingPolicies;
