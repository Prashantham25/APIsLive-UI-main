import React from "react";
import Grid from "@mui/material/Grid";
// import { Link } from "@mui/material";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import LoginImg from "assets/images/BrokerPortal/Adminlogin.png";
// import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
// import PageLayout from "examples/LayoutContainers/PageLayout";
import { Typography } from "@mui/material";
import Footer from "modules/BrokerPortal/Pages/MotorComparison/Footer";
// import MDTypography from "components/MDTypography";

function AdminLogin() {
  const navigate = useNavigate();
  const handleProceed = () => {
    navigate(`/modules/BrokerPortal/Pages/Admin/AppLication/Applicationlist`);
  };
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={0}>
        <MDBox component="img" backgroundSize="contain" src={LoginImg} sx={{ m: "0rem" }} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt="13rem">
        <MDBox m={4}>
          <Typography
            font-family="Roboto"
            font-style="normal"
            font-size="5px"
            color="#000000;"
            textAlign="left"
            text-decoration-line="underline"
            ml={8}
          >
            <div>
              <h4>Hi! &nbsp;&nbsp;Welcome Back</h4>
            </div>
            <h6>Sign In</h6>
            <div>
              <MDBox ml={1} mt={2} width="60%">
                <MDInput label="Email Id" type="text" justifyContent="flex-end" textAlign="left" />
              </MDBox>
              <MDBox ml={1} mt={2} width="60%">
                <MDInput label="Password" type="text" justifyContent="flex-end" />
              </MDBox>
            </div>
            <Typography
              font-family="Roboto"
              font-style="normal"
              font-size="5px"
              color="#000000;"
              textAlign="left"
              text-decoration-line="underline"
              ml={1}
            >
              <small>
                <font color="blue">Forgot Password</font>
              </small>
            </Typography>
            <MDButton
              onClick={handleProceed}
              variant="contained"
              color="info"
              sx={{ mt: "2rem" }}
              justifyContent="flex-end"
              ml={8}
            >
              Login
            </MDButton>
          </Typography>
          <br />
          <Typography
            font-family="Roboto"
            font-style="normal"
            font-size="5px"
            color="#000000;"
            textAlign="left"
            text-decoration-line="underline"
            ml={8}
          >
            <div>
              <h6>
                Dont have an account?<font color="blue"> Register with us</font>
              </h6>
            </div>
          </Typography>
          <Footer />
        </MDBox>
      </Grid>
    </Grid>
  );
}
export default AdminLogin;
