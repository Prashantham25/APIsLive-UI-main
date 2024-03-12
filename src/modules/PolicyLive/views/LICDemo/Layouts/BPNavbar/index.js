/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";

// react-router components
import { Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components

import { useMaterialUIController } from "context";
import breakpoints from "assets/theme/base/breakpoints";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Grid, Popover } from "@mui/material";
import BPNavbarLink from "modules/BrokerPortal/Layouts/BPNavbar/BPNavbarLink";
import BPNavbarMobile from "modules/BrokerPortal/Layouts/BPNavbar/BPNavbarMobile";
import MenuData from "modules/BrokerPortal/Layouts/BPNavbar/data";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ContactSupportIcon from "@mui/icons-material/ContactSupport";
// import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDataController, setPOSPDetails } from "modules/BrokerPortal/context";
import MDTypography from "../../../../components/MDTypography";
import profileimage from "../../../../assets/images/BrokerPortal/ProfileImg.png";

// Material Dashboard 2 PRO React base styles

// Material Dashboard 2 PRO React context
let topBPPermission = [];

function BPNavbar({ transparent, light, Brokerpermissions }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  // const BPPermissions = Brokerpermissions === undefined ? [] : Brokerpermissions;
  topBPPermission = Brokerpermissions === undefined ? topBPPermission : Brokerpermissions;
  const [dataController] = useDataController();
  const {
    isCustomer,
    logo,
    loggedIn,
    POSPDetails,
    SalesLoginResponse,
    InterviewLoginFlag,
    AdminLoginFlag,
  } = dataController;
  // const [pospJson] = useState(POSPDetails.pospdetailsJson);
  console.log("POSPDetails", POSPDetails);
  const [pospDetails, setpospDetails] = useState({});
  const [Salesloginresponse, setSalesloginresponse] = useState({});
  useEffect(() => {
    if (POSPDetails !== null) {
      setpospDetails(POSPDetails);
    }
  }, [POSPDetails]);
  useEffect(() => {
    if (SalesLoginResponse !== null) {
      setSalesloginresponse(SalesLoginResponse);
    }
  }, [Salesloginresponse]);
  console.log("Salesloginresponse", Salesloginresponse);
  console.log("pospDetails", pospDetails);
  console.log("setPOSPDetails", setPOSPDetails);
  const action = { type: "internal", route: "", label: "Login" };
  if (isCustomer) action.type = "external";

  if (loggedIn) {
    action.label = "";
    action.route = "";
  }

  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  const handleContactSupport = () => {
    window.open(process.env.REACT_APP_CONTACTSUPPORT, "_blank");
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/modules/BrokerPortal/Pages/MyProfile");
  };
  const handleNavigateCreateCourseRegistration = () => {
    navigate("/modules/BrokerPortal/Pages/Admin/AdminCourse/CreateCourseRegistration");
    localStorage.removeItem("CourseLoggedIn");
  };
  const handleNaigateinterviewRegistration = () => {
    navigate("modules/BrokerPortal/Pages/Admin/Interview/InterviewRegistration");
  };
  const handleDashBoard = () => {
    // navigate("/modules/BrokerPortal/Pages/BPLanding/DashBoard");
  };
  // const handleMyPolicies = () => {
  //   navigate("/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Policies");
  // };
  // const handleMyQuotes = () => {
  //   navigate("/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Quotes");
  // };
  const handleInsurance = (nUrl) => {
    navigate(nUrl);
  };
  // const handleNavigateCustomerSignIn = () => {
  // navigate("/modules/BrokerPortal/Pages/CustomerPortal/CustomerSignIN");
  // window.open(process.env.REACT_APP_Login, "_blank");
  // };

  console.log("23456789", localStorage.getItem("CourseLoggedIn"));
  console.log("Brokerpermissions", Brokerpermissions);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorE2, setAnchorE2] = React.useState(null);
  const handleClick1 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorE2(null);
  };
  const open1 = Boolean(anchorE2);
  const open = Boolean(anchorEl);

  return (
    <Container sx={{ maxWidth: "100%!important" }}>
      <MDBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        // my={3}
        // mx={3}
        // width="calc(100% - 48px)"
        width="100%"
        ml="-23px"
        // borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        // position="absolute"
        // left={0}
        zIndex={3}
        sx={({
          palette: { transparent: transparentColor, white, background },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(darkMode ? background.sidenav : white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <MDBox
          display="flex"
          flexDirection="column"
          to=""

          // py={transparent ? 1.5 : 0.75}
          // lineHeight={1}
          // pl={{ xs: 0, lg: 1 }}
        >
          {/* <MDTypography variant="button"  fontWeight="bold" color={light ? "white" : "dark"}>
            Broker Portal 
          </MDTypography> */}
          <a href={process.env.REACT_APP_CustomerHomePageURL}>
            <MDBox component="img" src={logo} sx={{ maxHeight: "2.2rem" }} />
          </a>
        </MDBox>
        <MDBox
          color="inherit"
          display={{ xs: "none", lg: "flex" }}
          sx={{ width: "100%", justifyContent: "right" }}
          m={0}
          p={0}
        >
          {isCustomer === false ? (
            <MDBox sx={{ maxHeight: "2.2rem" }}>
              <MDButton
                sx={{
                  fontSize: "0.875rem",
                  textTransform: "capitalize",
                  fontWeight: "regular",
                  width: "100%",
                }}
                color="secondary"
                fullWidth
                variant="text"
                onClick={handleDashBoard}
              >
                Dashboard
              </MDButton>
            </MDBox>
          ) : null}
          <MDBox sx={{ maxHeight: "2.2rem" }}>
            <MDButton
              sx={{
                fontSize: "0.875rem",
                textTransform: "capitalize",
                fontWeight: "regular",
                width: "100%",
              }}
              color="secondary"
              fullWidth
              variant="text"
              startIcon={<ContactSupportIcon />}
              onClick={handleContactSupport}
            >
              Contact Support
            </MDButton>
          </MDBox>

          {/* {localStorage.getItem("CourseLoggedIn") === undefined ||
          localStorage.getItem("CourseLoggedIn") === null ? (
            ""
          ) : ( */}
          {AdminLoginFlag === true && (
            <>
              <MDBox
                // onClick={handleNavigate}
                style={{ width: "2.5rem", height: "3rem", clipPath: "circle()", mr: "12px" }}
                src={
                  localStorage.getItem("ProfileImg") !== null
                    ? `data:image/jpeg;base64,${localStorage.getItem("ProfileImg")}`
                    : profileimage
                }
                component="img"
              />
              <MDBox
                sx={{ maxHeight: "2.2rem", display: "flex", flexDirection: "column", ml: "7px" }}
              >
                <MDTypography
                  // onClick={handleNavigate}
                  sx={{
                    fontSize: "0.875rem",
                    textTransform: "capitalize",
                    // fontWeight: "regular",
                    fontWeight: "bold",
                    width: "100%",
                    // ml: "12px",
                  }}
                  color="secondary"
                  fullWidth
                  variant="text"
                >
                  {/* <PersonIcon /> */}
                  {Salesloginresponse.firstName}
                </MDTypography>
                <MDTypography
                  sx={{
                    fontSize: "0.875rem",
                    width: "100%",
                  }}
                  fullWidth
                  color="secondary"
                  variant="text"
                >
                  Admin
                </MDTypography>
              </MDBox>
              <MDBox sx={{ maxHeight: "2.2rem" }}>
                <MDButton
                  sx={{
                    fontSize: "0.875rem",
                    textTransform: "capitalize",
                    fontWeight: "regular",
                    width: "100%",
                  }}
                  color="secondary"
                  fullWidth
                  variant="text"
                  startIcon={<LogoutIcon />}
                  onClick={handleNavigateCreateCourseRegistration}
                >
                  Logout
                </MDButton>
              </MDBox>
            </>
          )}
          {isCustomer === false ? (
            <>
              <MDBox sx={{ maxHeight: "2.2rem" }}>
                {/* <MDButton
              sx={{
                fontSize: "1.1rem",
                textTransform: "capitalize",
                fontWeight: "regular",
                width: "100%",
              }}
              color="secondary"
              fullWidth
              variant="text"
              onClick={handleNavigate}
            >
              {pospDetails.partnerName}
            </MDButton> */}
                <Grid>
                  <MDTypography
                    onClick={handleNavigate}
                    sx={{
                      fontSize: "0.875rem",
                      textTransform: "capitalize",
                      fontWeight: "regular",
                      width: "100%",
                      maxHeight: "2.2rem",
                    }}
                    color="secondary"
                    fullWidth
                    variant="text"
                  >
                    {pospDetails.partnerName}
                  </MDTypography>
                </Grid>
              </MDBox>
              <MDBox
                onClick={handleNavigate}
                sx={{ clipPath: "circle()", maxHeight: "2.2rem" }}
                // src={
                //   localStorage.getItem("ProfileImg") !== null
                //     ? `data:image/jpeg;base64,${localStorage.getItem("ProfileImg")}`
                //     : null
                // }
                src={logo}
                component="img"
              />
              <MDBox sx={{ maxHeight: "2.2rem" }}>
                <MDButton
                  disabled
                  sx={{
                    fontSize: "0.875rem",
                    textTransform: "capitalize",
                    fontWeight: "regular",
                    width: "100%",
                    // marginLeft: "3rem",
                  }}
                  color="secondary"
                  fullWidth
                  variant="text"
                  onClick={handleClick1}
                >
                  My Business
                </MDButton>
                <Popover
                  open={open1}
                  anchorEl={anchorE2}
                  onClose={handleClose1}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <MDTypography
                    sx={{ backgroundColor: "#ffffff", cursor: "pointer" }}
                    // onClick={handleMyQuotes}
                  >
                    My Quotes
                  </MDTypography>
                  <MDTypography
                    sx={{ backgroundColor: "#ffffff", cursor: "pointer" }}
                    // onClick={handleMyPolicies}
                  >
                    My Policies
                  </MDTypography>
                </Popover>
              </MDBox>
              <MDBox sx={{ maxHeight: "2.2rem" }}>
                <MDButton
                  sx={{
                    fontSize: "0.875rem",
                    textTransform: "capitalize",
                    fontWeight: "regular",
                    width: "100%",
                    // marginLeft: "3rem",
                  }}
                  color="secondary"
                  fullWidth
                  variant="text"
                  endIcon={<ExpandMoreIcon />}
                  onClick={handleClick}
                >
                  Sell Insurance
                </MDButton>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  {topBPPermission
                    .filter((x) => x.status === true)
                    .map((x) => (
                      <MDTypography
                        sx={{ backgroundColor: "#ffffff", cursor: "pointer" }}
                        onClick={() => handleInsurance(x.mData)}
                      >
                        {x.mValue}
                      </MDTypography>
                    ))}
                </Popover>
              </MDBox>
            </>
          ) : null}
          {InterviewLoginFlag === true && AdminLoginFlag === false ? (
            <>
              {/* <MDBox> */}

              <MDBox
                // onClick={handleNavigate}
                style={{ width: "2.5rem", height: "3rem", clipPath: "circle()" }}
                src={
                  localStorage.getItem("ProfileImg") !== null
                    ? `data:image/jpeg;base64,${localStorage.getItem("ProfileImg")}`
                    : profileimage
                }
                component="img"
              />
              {/* </MDBox> */}
              <MDBox
                sx={{ maxHeight: "3.2rem", display: "flex", flexDirection: "column", ml: "7px" }}
              >
                <MDTypography
                  // onClick={handleNavigate}
                  sx={{
                    fontSize: "0.875rem",
                    // textTransform: "capitalize",
                    // fontWeight: "regular",
                    fontWeight: "bold",
                    width: "100%",
                    // ml: "12px",
                  }}
                  color="secondary"
                  fullWidth
                  variant="text"
                >
                  {Salesloginresponse.firstName} {Salesloginresponse.lastName}{" "}
                </MDTypography>
                <MDTypography
                  sx={{
                    fontSize: "0.875rem",
                    width: "100%",
                  }}
                  fullWidth
                  color="secondary"
                  variant="text"
                >
                  Interview Officer
                </MDTypography>
              </MDBox>
              <MDBox sx={{ maxHeight: "2.2rem" }}>
                <MDButton
                  sx={{
                    fontSize: "0.875rem",
                    textTransform: "capitalize",
                    fontWeight: "regular",
                    width: "100%",
                  }}
                  color="secondary"
                  fullWidth
                  variant="text"
                  startIcon={<LogoutIcon />}
                  onClick={handleNaigateinterviewRegistration}
                >
                  Logout
                </MDButton>
              </MDBox>
            </>
          ) : null}
          {action && action.type === "internal"
            ? MenuData().MenuList.POSPMenu.map((item) => (
                <BPNavbarLink icon={item.icon} name={item.name} route={item.route} light={light} />
              ))
            : MenuData().MenuList.CustMenu.map((item) => (
                <BPNavbarLink icon={item.icon} name={item.name} route={item.route} light={light} />
              ))}
        </MDBox>
        {action &&
          (action.type === "internal" ? (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              {!loggedIn && (
                <MDButton
                  component={Link}
                  to={action.route}
                  variant="gradient"
                  color={action.color ? action.color : "info"}
                  size="small"
                >
                  {action.label}
                </MDButton>
              )}
            </MDBox>
          ) : (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              {!loggedIn && (
                <MDButton
                  component="a"
                  // href={action.route}
                  to={action.route}
                  target="_blank"
                  rel="noreferrer"
                  variant="gradient"
                  color={action.color ? action.color : "info"}
                  size="small"
                  sx={{ mt: -0.3 }}
                >
                  {action.label}
                </MDButton>
              )}
            </MDBox>
          ))}
        <MDBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
        </MDBox>
        {/* {isCustomer === true ? (
          <MDButton onClick={handleNavigateCustomerSignIn}>Login</MDButton>
        ) : null} */}
      </MDBox>
      {mobileView && <BPNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
BPNavbar.defaultProps = {
  transparent: false,
  light: false,
  // action: false,
};

// Typechecking props for the DefaultNavbar
BPNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  // action: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.shape({
  //     type: PropTypes.oneOf(["external", "internal"]).isRequired,
  //     route: PropTypes.string.isRequired,
  //     color: PropTypes.oneOf([
  //       "primary",
  //       "secondary",
  //       "info",
  //       "success",
  //       "warning",
  //       "error",
  //       "dark",
  //       "light",
  //     ]),
  //     label: PropTypes.string.isRequired,
  //   }),
  // ]),
};

export default BPNavbar;
