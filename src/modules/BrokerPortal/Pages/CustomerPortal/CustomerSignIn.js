import React, { useState } from "react";
import Grid from "@mui/material/Grid";
// import { Link } from "@mui/material";
// import { Stack } from "@mui/material";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
// import PageLayout from "examples/LayoutContainers/PageLayout";

import CustomerMain from "assets/images/BrokerPortal/Customer/CustomerMain.png";
import swal from "sweetalert";
import BPFooter from "../../Layouts/BPFooter";
import { sendOTP } from "../../Login/BPLogin/data/index";
import { useDataController, setloginDetails } from "../../context";
// import Navbar from "./CustomerLandingNavBar/NavBar";
import BPNavbarEmpty from "../../Layouts/BPNavbarEmpty";
import breakpoints from "../../../../assets/themes/BrokerPortal/iNubeTheme/base/breakpoints";

function CustomerSignIn() {
  const navigate = useNavigate();
  const [, dispatch] = useDataController();
  const [loginDetails, setLoginDetails] = useState({
    Email: "",
  });

  const [flags, setFlags] = useState({
    errorFlag: false,
    disableFlag: false,
    emailError: false,
  });

  const sentOTPClick = () => {
    // if (loginDetails.Email === "") {
    //   // setFlags((prevState) => ({ ...prevState, errorFlag: false }));
    //   swal({
    //     text: "Please Enter the Email Id",
    //     icon: "error",
    //   });
    // }
    if (flags.emailError || flags.emailError === true || loginDetails.Email === "") {
      swal({
        text: "Please Enter Valid Email Id",
        icon: "error",
      });
    } else {
      localStorage.setItem("Email", loginDetails.Email);

      const sendOTP1 = {
        otp: "1234",
        email: loginDetails.Email,
        userName: loginDetails.Email,
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: "",
        sendSms: true,
        isBerry: false,
        client: "iNube BrokerPortal",
      };
      sendOTP(sendOTP1).then((result) => {
        setloginDetails(dispatch, loginDetails);
        console.log("sendotpemail", result);
        if (result.status === 4) {
          swal({
            icon: "error",
            text: "User Does Not Exist!",
          });
        } else {
          swal({
            icon: "success",
            text: "OTP sent successfully",
          });
          navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerOTP`);
        }
      });
    }
  };

  const handleBasicChange = (event) => {
    if (event.target.name === "Email") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(event.target.value)) {
        const newValue = { ...loginDetails, [event.target.name]: event.target.value };
        setLoginDetails(newValue);
        setFlags((prevState) => ({ ...prevState, emailError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailError: false }));
      }
    } else {
      const newValue = { ...loginDetails, [event.target.name]: event.target.value };
      setLoginDetails(newValue);
    }
  };

  return (
    <MDBox sx={{ bgcolor: "#ffffff" }}>
      <BPNavbarEmpty />
      <Grid container spacing={2}>
        {window.innerWidth > breakpoints.values.md && (
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDBox width="100%" p={3} sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox
                component="img"
                src={CustomerMain}
                width="60%"
                height="40%"
                // sx={{ mx: "10.75rem", mt: "0.5rem" }}
              />
            </MDBox>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          xxl={5}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid container spacing={4} p={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h2">Welcome Back</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h5" fontSize="1rem">
                Enter your Register Email to login
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox>
                <MDInput
                  label="Email"
                  type="text"
                  value={loginDetails.Email}
                  onBlur={handleBasicChange}
                  onChange={(e) => {
                    setLoginDetails({
                      ...loginDetails,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="Email"
                  error={loginDetails.Email === "" ? flags.errorFlag : null}
                  required
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
                />
                {flags.errorFlag && loginDetails.Email === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
                {flags.emailError && loginDetails.Email !== "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the valid email id
                  </MDTypography>
                ) : null}
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                <MDButton
                  onClick={sentOTPClick}
                  variant="contained"
                  color="info"
                  style={{ textTransform: "capitalize" }}
                >
                  Continue
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BPFooter />
    </MDBox>
  );
}
export default CustomerSignIn;
