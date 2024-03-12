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
// import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components

import { useMaterialUIController } from "context";
import breakpoints from "assets/theme/base/breakpoints";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
// import { Grid } from "@mui/material";
// import BPNavbarLink from "modules/BrokerPortal/Layouts/BPNavbar/BPNavbarLink";
import BPNavbarMobile from "modules/BrokerPortal/Layouts/BPNavbar/BPNavbarMobile";
// import MenuData from "modules/BrokerPortal/Layouts/BPNavbar/data";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useDataController } from "modules/BrokerPortal/context";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
// import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import MDTypography from "../../../../../components/MDTypography";
// Material Dashboard 2 PRO React base styles

// Material Dashboard 2 PRO React context

function Navbar({ transparent, light }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  //   ProfileFlag
  // setProfileFlag
  const [dataController] = useDataController();
  const { logo, loggedIn } = dataController;

  const action = { type: "internal", route: "", label: "Login" };
  //   if (isCustomer) action.type = "external";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //   const [ProfileFlag, setProfileFlag] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");

    navigate("/Nepal/B2CLogin");
  };
  const handleNavigateProfile = () => {
    window.open("/Nepal/B2CDashboard", "_blank");
  };
  //   console.log("ProfileFlag", ProfileFlag);
  // const handleNavigateCustomerSignIn = () => {
  //   // navigate("/modules/BrokerPortal/Pages/CustomerPortal/CustomerSignIN");
  //   window.open(process.env.REACT_APP_Login, "_blank");
  // };

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
          {/* <a href={process.env.REACT_APP_CustomerHomePageURL}> */}
          <MDBox component="img" src={logo} sx={{ maxHeight: "3.5rem" }} />
          {/* </a> */}
        </MDBox>
        <MDBox
          color="inherit"
          display={{ xs: "none", lg: "flex" }}
          sx={{ width: "100%", justifyContent: "right" }}
          m={0}
          p={0}
        >
          {/* <MDBox sx={{ maxHeight: "2.2rem" }}>
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
            >
              Insurance
            </MDButton>
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
            >
              POSP
            </MDButton>
          </MDBox> */}
          <MDBox sx={{ maxHeight: "2.2rem", mt: "0.2rem" }}>
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
          {localStorage.getItem("loggedIn") === undefined ||
          localStorage.getItem("loggedIn") === null ? (
            // <MDBox sx={{ maxHeight: "2.2rem" }}>
            //   <MDButton
            //     sx={{
            //       fontSize: "0.587rem",
            //       width: "100%",
            //     }}
            //     fullWidth
            //     onClick={handleNavigate}
            //   >
            //     Login/Signup
            //   </MDButton>
            // </MDBox>
            ""
          ) : (
            <>
              <MDBox sx={{ maxHeight: "2.2rem" }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <AccountBoxIcon />
                    </Avatar>
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </Tooltip>
              </MDBox>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleNavigateProfile}>
                  <Avatar />
                  My Profile
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem> */}
                <MenuItem onClick={handleNavigate}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </MDBox>

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
        {/* {isCustomer === true ? ( */}
        {/* <MDButton onClick={handleNavigateCustomerSignIn}>Login</MDButton> */}
        {/* ) : null} */}
      </MDBox>
      {mobileView && <BPNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
Navbar.defaultProps = {
  transparent: false,
  light: false,
  // action: false,
};

// Typechecking props for the DefaultNavbar
Navbar.propTypes = {
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

export default Navbar;
