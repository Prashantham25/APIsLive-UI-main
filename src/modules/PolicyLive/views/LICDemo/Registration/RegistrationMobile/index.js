import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";
import BPNavbarEmpty from "modules/BrokerPortal/Layouts/BPNavbarEmpty";
import { Circle } from "@mui/icons-material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import Checkbox from "@mui/material/Checkbox";
import POSPREg from "assets/images/BrokerPortal/POSPReg.png";
import { useNavigate } from "react-router-dom";

function RegistrationMobile() {
  const navigate = useNavigate();

  const [checkState, setCheckState] = useState(false);

  const updateCompareList = () => {
    setCheckState(!checkState);
    // console.log("New List", newList);
  };

  const handleOpen = () => {
    navigate(`/modules/BrokerPortal/Pages/MyProfile/ProfileDetails`);
  };

  return (
    <PageLayout>
      <BPNavbarEmpty />
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <MDBox width="100" height={window.innerHeight} sx={{ background: "#1A4CAF" }}>
            <MDAvatar
              src={POSPREg}
              size="reglogo"
              variant="square"
              sx={{ ml: "5rem", pt: "3rem" }}
            />
            <MDTypography
              variant="h6"
              sx={{ fontSize: "1.5rem", textAlign: "center", color: "#FFFFFF", mx: "3rem" }}
            >
              Become Online Agent in Insurance Join as Agent with
              {process.env.REACT_APP_TITLE},
            </MDTypography>
            <MDTypography
              variant="body1"
              sx={{
                fontSize: "1rem",
                textAlign: "center",
                color: "#FFFFFF",
                mt: "2rem",
                mx: "4rem",
              }}
            >
              <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Zero Investment
            </MDTypography>
            <MDTypography
              variant="body1"
              sx={{ fontSize: "1rem", textAlign: "center", color: "#FFFFFF", mx: "4rem" }}
            >
              <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Product
              training & knowledge sharing sessions
            </MDTypography>
            <MDTypography
              variant="body1"
              sx={{ fontSize: "1rem", textAlign: "center", color: "#FFFFFF", mx: "4rem" }}
            >
              <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Many Insurance
              Products
            </MDTypography>
            <MDTypography
              variant="body1"
              sx={{ fontSize: "1rem", textAlign: "center", color: "#FFFFFF", mx: "4rem" }}
            >
              <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Multiple
              Insurance Companies
            </MDTypography>
            <MDTypography
              variant="body1"
              sx={{ fontSize: "1rem", textAlign: "center", color: "#FFFFFF", mx: "3rem" }}
            >
              <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Single Platform
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={12} xl={12} xxl={6}>
          <MDBox sx={{ mx: "5rem", mt: 3 }}>
            <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
              Register
            </MDTypography>
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDInput label="Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDInput label="EMail" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDInput label="Mobile Number" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography
                  sx={{
                    fontSize: "0.9rem",
                    color: "blue",
                    textAlign: "right",
                    textDecoration: "underline",
                    cursor: "pointer",
                    mt: "-1rem",
                  }}
                >
                  Send OTP
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDInput label="Enter OTP" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox display="flex" flexDirection="row" alignItems="center">
                  {/* <Checkbox  color="secondary" onClick={toggleDrawer('bottom',true)}/> */}
                  <Checkbox
                    // id={name}
                    checked={checkState}
                    color="primary"
                    onChange={updateCompareList}
                  />
                  <MDBox>
                    <MDTypography
                      // variant="body1"
                      // fontWeight="medium"
                      textAlign="center"
                      // color="info"
                      sx={{ fontSize: "0.9rem" }}
                    >
                      I agree to the Terms and Conditions
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox display="flex" alignItems="center" justifyContent="center">
                  <MDButton color="info" onClick={handleOpen}>
                    Get Started
                  </MDButton>
                </MDBox>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
              {/* <MDBox> */}
              {/* </MDBox> */}
              {/* </Grid> */}
            </Grid>

            <MDTypography
              sx={{
                fontSize: "1.1rem",
                // color: "blue",
                textAlign: "center",
              }}
            >
              Already registered as Agent? Login
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default RegistrationMobile;
