import { useState } from "react";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
// import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import NBLayout from "examples/LayoutContainers/NBLayout";

// Images
import bgImage from "assets/images/NBLogin.png";
import { useNavigate } from "react-router-dom";

// import Image from 'assets/images/bg-sign-in-basic.jpeg';

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const navigate = useNavigate();
  const routeChange = () => {
    navigate(`/Endorsement`);
  };

  return (
    <NBLayout>
      <Grid container spacing={1} jheight="100%">
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <MDBox
            minHeight="100vh"
            sx={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <MDBox px={1} width="100%" height="100vh" mx="auto">
            <Grid container spacing={1} justifyContent="center" alignItems="flex-end" height="100%">
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <MDTypography variant="h4" fontWeight="medium" mt={1}>
                  Sign in
                </MDTypography>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form">
                    <MDBox mb={1}>
                      <MDInput type="email" label="Login ID" fullWidth height="44px" />
                    </MDBox>
                    <MDBox mb={1}>
                      <MDInput type="password" label="Password" fullWidth />
                    </MDBox>
                    <MDBox display="flex" alignItems="center" ml={-1}>
                      <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        color="text"
                        onClick={handleSetRememberMe}
                        sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                      >
                        &nbsp;&nbsp;Remember me
                      </MDTypography>
                    </MDBox>
                    <MDBox mt={4} mb={1} display="flex" alignItems="right" justifyContent="right">
                      <MDButton variant="gradient" color="info" onClick={routeChange}>
                        sign in
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </NBLayout>
  );
}

export default Basic;
