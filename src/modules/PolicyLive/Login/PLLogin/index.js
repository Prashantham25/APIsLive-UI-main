import { useState, useEffect } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";
import { getRequest } from "core/clients/axiosclient";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";

// Images
// import bgImage from "assets/images/BPLoginBg.png";
import bgLoginImage from "assets/images/insurance-agent-near-me-background-image.png";
import mglogo from "assets/images/logos/iNube.png";
import startup from "assets/images/BrokerPortal/startup.png";

import PLLoginMobile from "./PLLoginMobile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 432,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

async function fetchUser() {
  try {
    const user = await getRequest("Product/GetMasterData?sMasterlist=All&isFilter=true");
    console.log("user", user.data);
  } catch (error) {
    // Log errors
  }
}

function PLLogin() {
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    navigate(`/dashboard`);
    fetchUser();
  };

  const getReturnValue = () => {
    console.log("Return value");
    return (
      <PageLayout>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style}>
            <MDBox component="img" src={startup} />
            <MDTypography variant="h6" sx={{ fontSize: "0.75rem", color: "#E56353", mt: "1rem" }}>
              {" "}
              Hello
            </MDTypography>
            <MDTypography variant="h6" sx={{ fontSize: "1.5rem", mt: "1rem" }}>
              {" "}
              Ravichandran Mahalingam
            </MDTypography>
            <MDTypography variant="h6" sx={{ fontSize: "0.75rem", color: "#858585", mt: "1rem" }}>
              {" "}
              Let’s get started!
            </MDTypography>
            <MDButton variant="gradient" color="info" sx={{ mt: "2rem" }} onClick={handleClose}>
              Ok
            </MDButton>
          </MDBox>
        </Modal>
        <MDBox width="100%" height="100vh" mx="auto">
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card>
                <Grid container justifyContent="center" alignItems="center" mx="auto">
                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <MDBox
                      minHeight="100vh"
                      width="100%"
                      sx={{
                        backgroundImage: `url(${bgLoginImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      textAlign="center"
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        mt="-12rem"
                        justifyContent="center"
                        alignContent="center"
                      >
                        <MDBox
                          minHeight="22vh"
                          width="18rem"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            backgroundImage: `url(${mglogo})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                        <MDTypography
                          align="center"
                          variant="caption"
                          fontWeight="medium"
                          fontSize="10"
                          // color={"white"}
                        >
                          Policy Live
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <MDBox mt={3} mb={1} px={0} textAlign="Left">
                      <MDBox
                        bgColor="info"
                        width="max-content"
                        px={4}
                        pt={0}
                        pb={0.5}
                        mx="auto"
                        mt={-1.375}
                        ml="0"
                        sx={{ borderTopRightRadius: "25px", borderBottomRightRadius: "25px" }}
                        lineHeight={1.5}
                      >
                        <MDTypography
                          variant="caption"
                          fontWeight="medium"
                          color="white"
                          fontSize="18px"
                        >
                          Welcome to Policy Live
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                    <MDBox px={1} width="100%" mx="auto">
                      <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="flex-end"
                        height="100%"
                      >
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                          <MDTypography variant="h4" fontWeight="medium" mt={1}>
                            Sign in
                          </MDTypography>
                          <MDBox pt={5} pb={3}>
                            <MDBox component="form" role="form">
                              <MDBox mb={1}>
                                <MDInput
                                  type="email"
                                  label="Mobile No/Email ID"
                                  fullWidth
                                  height="44px"
                                />
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
                              <MDBox
                                mt={4}
                                mb={1}
                                display="flex"
                                alignItems="right"
                                justifyContent="right"
                              >
                                <MDButton variant="gradient" color="info" onClick={handleOpen}>
                                  Login
                                </MDButton>
                              </MDBox>
                            </MDBox>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </PageLayout>
    );
  };

  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayBPMobile() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayBPMobile);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayBPMobile();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayBPMobile);
  }, []);
  return mobileView === true ? <PLLoginMobile /> : getReturnValue();
}

export default PLLogin;
