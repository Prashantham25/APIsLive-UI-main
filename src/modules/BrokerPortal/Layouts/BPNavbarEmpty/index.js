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

import { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// import mglogo from "assets/images/BrokerPortal/MutualGlobalLogo.png";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useDataController } from "modules/BrokerPortal/context";

// Material Dashboard 2 React example components
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Material Dashboard 2 PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

function BPNavbarEmpty({ transparent, light, action }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [dataController] = useDataController();
  const { logo } = dataController;

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

  return (
    <Container sx={{ maxWidth: "100%!important" }}>
      <MDBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        // my={3}
        // mx={3}
        // width="calc(100% - 48px)"
        width="auto"
        ml="-20px"
        // borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
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
          component={Link}
          display="flex"
          flexDirection="column"
          to="/"
          // py={transparent ? 1.5 : 0.75}
          // lineHeight={1}
          // pl={{ xs: 0, lg: 1 }}
        >
          {/* <MDTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
            Broker Portal 
          </MDTypography> */}
          <MDBox component="img" src={logo} sx={{ maxHeight: "50px" }} />
          {/* <MDTypography align="center" variant="caption" fontWeight="medium" fontSize="0.7rem">
            INSURANCE BROKING PVT LTD. (REGD NO : 752)
          </MDTypography> */}
        </MDBox>
        <MDBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          {/* {action && action.type === "internal"
            ? MenuData().MenuList.OnboardingMenu.map((item) => (
                <BPNavbarLink icon={item.icon} name={item.name} route={item.route} light={light} />
              ))
            : MenuData().MenuList.OnboardingMenu.map((item) => (
                <BPNavbarLink icon={item.icon} name={item.name} route={item.route} light={light} />
              ))} */}
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
        {action &&
          (action.type === "internal" ? (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              <MDButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
              >
                {action.label}
              </MDButton>
            </MDBox>
          ) : (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              <MDButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                sx={{ mt: -0.3 }}
              >
                {action.label}
              </MDButton>
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
      </MDBox>
      {mobileView && <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
BPNavbarEmpty.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
BPNavbarEmpty.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default BPNavbarEmpty;
