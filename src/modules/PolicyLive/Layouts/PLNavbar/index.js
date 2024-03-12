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
// import Container from "@mui/material/Container";
import { Card, Icon, IconButton } from "@mui/material";

import Modal from "@mui/material/Modal";

// Material Dashboard 2 React components

import { useMaterialUIController } from "context";
import breakpoints from "assets/theme/base/breakpoints";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// import mglogo from "assets/images/logos/iNube-small.png";

// import mglogo from "assets/images/BrokerPortal/CompanyLogos/MutualGlobalLogo.png";

// import mglogo from "assets/images/BrokerPortal/CompanyLogos/ChiragLogo.png";

import PLNavbarLink from "modules/PolicyLive/Layouts/PLNavbar/PLNavbarLink";
import PLNavbarMobile from "modules/PolicyLive/Layouts/PLNavbar/PLNavbarMobile";
import MenuData from "modules/PolicyLive/Layouts/PLNavbar/data";
import {
  images,
  setLogo,
  setCustTheme,
  useDataController,
  setMiniSidenav,
} from "../../../BrokerPortal/context";
import Transition from "../../../../components/Translation";
// Material Dashboard 2 PRO React base styles

// Material Dashboard 2 PRO React context

function Configurator({ handleConfiguratorClose }) {
  const logoOptions = [
    "iNubeLogo",
    "SBIGeneral",
    "Rsa",
    "HDFCErgoLogo",
    "USGILogo",
    "NepalLogo",
    "MagmaLogo",
    "ProtectiveMILogo",
    "LICLogo",
    "DhofarLogo",
  ];

  const [, dispatch] = useDataController();
  const handleClick = (event) => {
    // console.log("EventID!11", event.target.id);
    setLogo(dispatch, event.target.id);
    setCustTheme(dispatch, event.target.id);
  };
  return (
    <MDBox
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      p={6}
    >
      <Card>
        <MDBox width="100%" display="flex" justifyContent="end">
          <Icon
            onClick={handleConfiguratorClose}
            sx={{ color: "#000000", fontSize: "2rem!important" }}
          >
            close
          </Icon>
        </MDBox>
        <MDTypography sx={{ textAlign: "center" }}>Choose the logo</MDTypography>
        <MDBox
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={2}
        >
          {logoOptions.map((logo) => (
            <MDBox
              component="img"
              id={logo}
              src={images[logo]}
              onClick={handleClick}
              m={2}
              sx={{ maxHeight: "2.2rem" }}
            />
          ))}
        </MDBox>
      </Card>
    </MDBox>
  );
}

function PLNavbar({ transparent, light, action }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, darkMode } = controller;
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  const [controller1] = useDataController();
  const { logo } = controller1;

  const handleConfiguratorOpen = () => setConfiguratorOpen(true);
  const handleConfiguratorClose = () => setConfiguratorOpen(false);
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
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

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      // if (transparentNavbar && !light) {
      if (!light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <>
      <MDBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        // my={3}
        // mx={3}
        // width="calc(100% - 48px)"
        width="100%"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
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
        <MDBox display="flex" flexDirection="column" to="">
          <a href={process.env.REACT_APP_CustomerHomePageURL}>
            <MDBox component="img" src={logo} sx={{ maxHeight: "3.5rem" }} />
          </a>
        </MDBox>
        <MDBox color="inherit" display="flex-end">
          <Transition />
        </MDBox>
        <IconButton
          size="small"
          disableRipple
          color="inherit"
          // sx={navbarMobileMenu}
          onClick={handleMiniSidenav}
        >
          <Icon sx={iconsStyle} fontSize="medium">
            {miniSidenav ? "menu_open" : "menu"}
          </Icon>
        </IconButton>

        <MDBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <Icon onClick={handleConfiguratorOpen}>settings</Icon>
          <Modal open={configuratorOpen} onClose={handleConfiguratorClose}>
            <Configurator handleConfiguratorClose={handleConfiguratorClose} />
          </Modal>
          {action && action.type === "internal"
            ? MenuData().MenuList.POSPMenu.map((item) => (
                <PLNavbarLink
                  key={item.name}
                  icon={item.icon}
                  name={item.name}
                  route={item.route}
                  light={light}
                />
              ))
            : MenuData().MenuList.CustMenu.map((item) => (
                <PLNavbarLink
                  key={item.name}
                  icon={item.icon}
                  name={item.name}
                  route={item.route}
                  light={light}
                />
              ))}
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
      {mobileView && <PLNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </>
  );
}

// Setting default values for the props of DefaultNavbar
PLNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
PLNavbar.propTypes = {
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

export default PLNavbar;
