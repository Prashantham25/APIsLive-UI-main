import { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
// import Container from "@mui/material/Container";
import { Card, Icon } from "@mui/material";

import Modal from "@mui/material/Modal";

// Material Dashboard 2 React components

import { useMaterialUIController } from "context";
import breakpoints from "assets/theme/base/breakpoints";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { images, setLogo, setCustTheme, useDataController } from "modules/BrokerPortal/context";
import NavbarLink from "./NavbarLink";
import NavbarMobile from "./NavbarMobile";
import MenuData from "./data";

function Configurator({ handleConfiguratorClose }) {
  const logoOptions = [
    "iNubeLogo",
    "SBIGeneral",
    "Rsa",
    "HDFCErgoLogo",
    "USGILogo",
    "LICLogo",
    "DhofarLogo",
  ];

  const [, dispatch] = useDataController();
  const handleClick = (event) => {
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

function Navbar({ transparent, light, action }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  const [controller1] = useDataController();
  const { logo } = controller1;

  const handleConfiguratorOpen = () => setConfiguratorOpen(true);
  const handleConfiguratorClose = () => setConfiguratorOpen(false);
  // const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

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
        <MDBox component={Link} display="flex" flexDirection="column" to="/dashboard">
          <MDBox component="img" src={logo} sx={{ maxHeight: "3.5rem" }} />
        </MDBox>
        {/* <IconButton
          size="small"
          disableRipple
          color="inherit"
          // sx={navbarMobileMenu}
          onClick={handleMiniSidenav}
        >
          <Icon sx={iconsStyle} fontSize="medium">
            {miniSidenav ? "menu_open" : "menu"}
          </Icon>
        </IconButton> */}

        <MDBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <Icon onClick={handleConfiguratorOpen}>settings</Icon>
          <Modal open={configuratorOpen} onClose={handleConfiguratorClose}>
            <Configurator handleConfiguratorClose={handleConfiguratorClose} />
          </Modal>
          {action && action.type === "internal"
            ? MenuData().MenuList.POSPMenu.map((item) => (
                <NavbarLink
                  key={item.name}
                  icon={item.icon}
                  name={item.name}
                  route={item.route}
                  light={light}
                />
              ))
            : MenuData().MenuList.CustMenu.map((item) => (
                <NavbarLink
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
      {mobileView && <NavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </>
  );
}

// Setting default values for the props of DefaultNavbar
Navbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
Navbar.propTypes = {
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

export default Navbar;
