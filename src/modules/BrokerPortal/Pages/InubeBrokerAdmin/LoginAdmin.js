import * as React from "react";
// import { useState, useEffect } from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";
import BPNavbarEmpty from "modules/BrokerPortal/Layouts/BPNavbar";
import { Circle } from "@mui/icons-material";
// import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";

import MDBox from "components/MDBox";
import POSPREg from "assets/images/BrokerPortal/POSPReg.png";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import { blue } from "@mui/material/colors";
import MDButton from "../../../../components/MDButton";

const { Grid, Stack } = require("@mui/material");

function LoginAdmin() {
  //   const [fields, setFields] = React.useState({
  //     UserName: "",
  //     Password: "",
  //   });

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.danger,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));
  const theme = createTheme({
    status: {
      danger: blue[500],
    },
  });

  return (
    <PageLayout>
      <BPNavbarEmpty />
      <MDBox mt={8} sx={{ overflowY: "auto" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox width="100" height={window.innerHeight} sx={{ background: "#1A4CAF" }}>
              <MDAvatar
                src={POSPREg}
                size="reglogo"
                variant="square"
                sx={{ ml: "11rem", pt: "3rem" }}
              />
              <MDTypography
                variant="h6"
                sx={{ fontSize: "1.5rem", textAlign: "center", color: "#FFFFFF", mx: "3rem" }}
              >
                Become A Tech-Enabled Insurance Broker By Registering Our Ready-To-Use Platform
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  textAlign: "left",
                  color: "#FFFFFF",
                  mt: "2rem",
                  mx: "4rem",
                }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} />
                APIs Pre-Integrated
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} />
                White Labelled Portal
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} />
                Complete Customer Buying Journey
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} />
                Essential Components/Modules Bun
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} />
                On-Board PoSPs, Scale Your Reach
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox sx={{ mx: "10.75rem", mt: 3 }}>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                Broker Login
              </MDTypography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="User Name"
                    name="UserName"
                    //   onChange={handleInput}
                    // onBlur={handleInputChange}
                    //   inputProps={{ maxLength: 10 }}
                    //   error={data.mobileNumber === "" ? data.dataError : null}
                    required
                    autoComplete="off"
                  />
                  {/* {data.errorMobile && data.dataError === false && data.inValidMobError === false ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    This Mobile Number is already registered in our network
                  </MDTypography>
                ) : null}
                {data.dataError && data.errorMobile === false && data.mobileNumber === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    Please fill the required field
                  </MDTypography>
                ) : null}
                {data.inValidMobError && data.mobileNumber !== "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    Please fill the valid 10 digit mobile number
                  </MDTypography>
                ) : null} */}
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Password"
                    // value={fields.CompanyEmailId}
                    name="Password"
                    //   onChange={handleInput}
                    // onBlur={handleInputChange}
                    //   error={data.email === "" ? data.dataError : null}
                    required
                    autoComplete="off"
                  />
                  {/* {data.errorEmail && data.dataError === false && data.inValidEmailError === false ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    This Email ID is already registered in our network
                  </MDTypography>
                ) : null} */}
                  {/* {data.dataError && data.errorEmail === false && data.email === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    Please fill the required field
                  </MDTypography>
                ) : null} */}
                  {/* {data.inValidEmailError && data.email !== "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    Please fill the valid Email ID
                  </MDTypography>
                ) : null} */}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox display="flex" flexDirection="row" alignItems="center">
                    <ThemeProvider theme={theme}>
                      <CustomCheckbox />
                      {/* checked={checkState} onChange={updateCompareList}  */}
                    </ThemeProvider>

                    <MDTypography sx={{ fontSize: "0.8rem" }}>
                      I agree to the{" "}
                      <span
                        role="button"
                        tabIndex={0}
                        //   onClick={handleTermsAndConditions}
                        //   onKeyDown={handleTermsAndConditions}
                        style={{
                          textDecoration: "underline",
                          color: "#0071D9",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                      >
                        Terms and Conditions
                      </span>
                    </MDTypography>
                  </MDBox>
                  <Stack justifyContent="right" direction="row">
                    <MDButton variant="contained">LOGIN</MDButton>
                  </Stack>
                </Grid>
              </Grid>
              <MDTypography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Havent registered as a Broker?
                <Link
                  style={{ color: "#0071D9", cursor: "pointer", marginLeft: "10px" }}
                  to="/modules/BrokerPortal/Pages/InubeBrokerAdmin"
                >
                  Register
                </Link>
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}
export default LoginAdmin;
